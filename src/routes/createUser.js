import { createUser } from "../Services/userService";

export const createUserHandler = async (req, res) => {
    console.log('hitting create user');
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ error: 'Username and Password Required' });

    const result = await createUser(username, password);

    return res.status(result.statusCode).json(result);
};
