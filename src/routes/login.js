import { createUser, loginAndGenerateJwt } from "../Services/userService";

export const loginHandler = async (req, res) => {
    console.log('hitting create user');
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ error: 'Username and Password Required' });

    const result = await loginAndGenerateJwt(username, password);

    return res.status(result.statusCode).json(result);
};
