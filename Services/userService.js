import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import { get } from 'lodash';

const prismaClient = new PrismaClient();
const secretKey = process.env.SECRET_KEY

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
}

export const getUserIdFromRequest = (req) => {
    const authHeader = get(req, 'headers.authorization', '');
    return getUserIdFromJwt(authHeader.substring(7));
}

const hashPassword = async (plaintextPassword) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
    return hashedPassword;
}

export const createUser = async (username, password) => {
    try {
        const hashedPassword = await hashPassword(password)
        const dbRes = await prismaClient.User.create({
            data: { username, password: hashedPassword }
        });

        const token = jwt.sign({
            id: dbRes.id,
            username: dbRes.username,
        }, secretKey);

        return { data: dbRes, jwt: token, statusCode: 200 };
    } catch (e) {
        console.log(e.message, e);
        const unqiueConstraintFailed = e.code === 'P2002';
        if (unqiueConstraintFailed) {
            return { error: 'Username already taken', statusCode: 400 };
        } else {
            return { error: 'Internal Server Error', statusCode: 500 };
        }
    }
}


export const getAllUsers = async () => {
    const dbRes = await prismaClient.user.findMany();
    return dbRes;
}


export const loginAndGenerateJwt = async (username, password) => {
    const user = await prismaClient.user.findUnique({
        where: {
            username,
        }
    });

    if (!user) {
        return { error: 'No user with that username', statusCode: 400 }
    }

    const validPw = await bcrypt.compare(password, user.password);

    if (!validPw) {
        return { error: 'Invalid credentials', statusCode: 400 };
    }

    const token = jwt.sign({
        id: user.id,
    }, secretKey);

    return {
        jwt: token,
        username: user.username,
        statusCode: 200,
    }
}