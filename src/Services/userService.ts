import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
const secretKey = process.env.SECRET_KEY;

export const getUserIdFromJwt = (token) => {
    if(!token) return null;

    if(!jwt.verify(token, secretKey)) {
        console.log('invalid', token, secretKey);
        return null;
    }
    
    try {
        return jwt.decode(token).id;
    } catch (e) {
        console.log(e.message, e);
        return null;
    }
};

export const getUserIdFromRequest = (req) => {
    const authHeader = req.headers?.authorization || '';
    return getUserIdFromJwt(authHeader.substring(7));
};

const hashPassword = async (plaintextPassword) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
    return hashedPassword;
};

export type createUserResponse = {
    status: number,
    data?: any,
    error?: string,
    jwt?: string
}

export const createUser = async (username, password) : Promise<createUserResponse> => {
    try {
        const hashedPassword = await hashPassword(password);
        const dbRes = await prismaClient.user.create({
            data: { username, password: hashedPassword }
        });

        const token = jwt.sign({
            id: dbRes.id,
            username: dbRes.username,
        }, secretKey);

        return { data: dbRes, jwt: token, status: 200 };
    } catch (e) {
        console.log(e.message, e);
        const uniqueConstraintFailed = e.code === 'P2002';
        if (uniqueConstraintFailed) {
            return { error: 'Username already taken', status: 400 };
        } else {
            return { error: 'Internal Server Error', status: 500 };
        }
    }
};


export const getAllUsers = async () => {
    const dbRes = await prismaClient.user.findMany();
    return dbRes;
};

export type loginResponse = {
    status: number,
    username?: string,
    error?: string,
    jwt?: string,
}

export const loginAndGenerateJwt = async (username, password) : Promise<loginResponse> => {
    const user = await prismaClient.user.findUnique({
        where: {
            username,
        }
    });

    if (!user) {
        return { error: 'No user with that username', status: 400 };
    }

    const validPw = await bcrypt.compare(password, user.password);

    if (!validPw) {
        return { error: 'Invalid credentials', status: 400 };
    }

    const token = jwt.sign({
        id: user.id,
    }, secretKey);

    return {
        jwt: token,
        username: user.username,
        status: 200,
    };
};

export const getActiveDeckOfPlayer = async (userId) => {
    const user = await prismaClient.user.findFirst({
        where: {
            id: {
                equals: userId
            }
        }
    });

    if(!user) {
        console.log(`warning attempting to get active deck of user who was not found- id ${userId}`);
        return null;
    }

    //@ts-ignore
    if(user.meta.activeDeckId) {
        const foundDeck = prismaClient.deck.findFirst({
            where: {
                id: {
                    //@ts-ignore
                    equals: user.meta.activeDeck
                }
            }
        });

        return foundDeck;
    } else {
        return null;
    }
};

