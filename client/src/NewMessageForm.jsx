import { PaperAirplaneIcon } from '@heroicons/react/outline';
import { useContext, useState } from 'react';
import Context from './Context';

export default function NewMessageForm({ socket }) {
    const { user } = useContext(Context);
    const [message, setMessage] = useState('');

    const sendMsg = e => {
        e.preventDefault();

        socket.emit('msg', { user, message });
        setMessage('');
    };

    return (
        <form onSubmit={sendMsg}>
            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <input
                    type="text"
                    placeholder="Message..."
                    className="w-full py-2 pl-4 mr-3 bg-slate-100 rounded-lg outline-none focus:text-slate-800"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                />
                <button type="submit">
                    <PaperAirplaneIcon className="w-5 h-5 text-slate-500 hover:text-slate-800 origin-center transform rotate-90" />
                </button>
            </div>
        </form>
    );
}
