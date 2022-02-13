import { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Context from './Context';
import EnterChatForm from './EnterChatForm';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import Users from './Users';

export default function Container() {
    const { user, setUser } = useContext(Context);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);
        setUser(null);
        return () => newSocket.close();
    }, [setSocket]);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-b py-3 mb-5">
                {user ? `Chatting as ${user.name}` : 'Chat as...'}
            </h1>
            {user && socket && socket.connected ? (
                <div className="border rounded grid grid-cols-3">
                    <div className="border-r border-gray-300 col-span-1">
                        <Users socket={socket} />
                    </div>
                    <div className="col-span-2">
                        <div className="w-full p-6 overflow-y-auto h-[40rem]">
                            <Messages socket={socket} />
                        </div>
                        <NewMessageForm socket={socket} />
                    </div>
                </div>
            ) : null}
            {!user && socket ? (
                <div className="w-1/3 mx-auto">
                    <EnterChatForm socket={socket} />
                </div>
            ) : null}
            <div className="hidden bg-cyan-500 justify-end justify-start"></div>
        </div>
    );
}
