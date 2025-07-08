import { io } from 'socket.io-client';

export const ChatSocket = (token) => {
    io(import.meta.env.VITE_CHAT_SOCKET_URL, {
        auth: {
            token
        },
        autoConnect: false
    })
}
