import cookie from 'cookie'
import { verifyAuthToken } from '../helper/jwtAuthTokenHelper.js';

const authenticateSocket = async (socket, next) => {
    try {
        // 1️⃣ Read raw cookie header
        const cookieHeader = socket.handshake.headers.cookie;
        if (!cookieHeader) throw new Error('No cookie found');

        // 2️⃣ Parse cookies into an object
        const cookies = cookie.parse(cookieHeader);

        // 3️⃣ Get your JWT token (example: "token" cookie)
        const token = cookies.authToken;
        if (!token) throw new Error('Token not found in cookies');

        // 4️⃣ Verify and decode
        const authenticated = verifyAuthToken(token)

        // 6️⃣ Attach user to socket
        socket.user = authenticated;

        next();
    } catch (err) {
        console.error('Socket auth failed:', err.message);
        next(new Error('Unauthorized'));
    }
}

export default authenticateSocket