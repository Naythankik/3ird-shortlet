import { createContext, useContext, useEffect } from 'react';
import socket, { connectSocket } from '../api/socket';

const SocketContext = createContext(socket);

export const SocketProvider = ({ children }) => {
    useEffect(() => {
        connectSocket();                // connect once on mount
        return () => socket.disconnect();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
