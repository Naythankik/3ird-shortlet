import { io } from 'socket.io-client';

/** --- SINGLETON socket instance --- */
const socket = io(import.meta.env.VITE_CHAT_SOCKET_URL, {
    autoConnect: false,          // we’ll connect manually after attaching auth
    transports: ['websocket'],   // optional: skip long‑polling fallback
});

/** Call once, e.g., in a context/provider */
export function connectSocket() {
    if (!socket.connected) {
        socket.auth = { token: localStorage.getItem('token') };
        socket.connect();
    }
}

/** Helper: join a chat room */
export function joinChat(chatId) {
    connectSocket();
    socket.emit('chat:join', { chatId });
}

/** Helper: send a message */
export function sendMessage(chatId, message, cb) {
    connectSocket();
    socket.emit('message:send', { chatId, message }, cb);
}

export default socket;
