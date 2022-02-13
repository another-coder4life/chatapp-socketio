import { useContext } from 'react';
import Context from './Context';

export default function Message({ msg }) {
    const { user } = useContext(Context);

    const isCurrentUser = user.id === msg.user.id;

    return (
        <li className={`flex justify-${isCurrentUser ? 'end' : 'start'}`}>
            <div
                className={`relative max-w-xl px-4 py-2 text-white bg-${
                    isCurrentUser ? 'cyan' : 'blue'
                }-500 rounded shadow`}
            >
                {!isCurrentUser ? <span className="block">{msg.user.name}</span> : null}
                <span>{msg.message}</span>
            </div>
        </li>
    );
}
