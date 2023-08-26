import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient();

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
        }, process.env.SECRET_KEY);

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