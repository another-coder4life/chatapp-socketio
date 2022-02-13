import { LoginIcon } from '@heroicons/react/outline';
import { useContext, useEffect, useState } from 'react';
import Context from './Context';

export default function EnterChatForm({ socket }) {
    const { setUser } = useContext(Context);
    const [localUser, setLocalUser] = useState('');

    useEffect(() => {
        socket.on('user', user => {
            setUser(user);
        });
    }, [socket]);

    const handleEnterChat = e => {
        e.preventDefault();

        socket.emit('user', localUser);
        setLocalUser('');
    };

    return (
        <form onSubmit={handleEnterChat}>
            <input
                type="text"
                className="w-full py-2 pl-4 mb-3 bg-slate-100 rounded-lg outline-none focus:text-slate-800"
                placeholder="Name..."
                value={localUser}
                onChange={e => setLocalUser(e.target.value)}
            />
            <button
                type="submit"
                className="flex items-center justify-center w-full bg-blue-500 text-white text-lg p-2 rounded-lg"
            >
                <LoginIcon className="w-7 h-7 mr-2" />
                <span>Enter...</span>
            </button>
        </form>
    );
}
