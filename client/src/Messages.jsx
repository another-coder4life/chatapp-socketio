import { useEffect, useState } from 'react';
import Message from './Message';

export default function Messages({ socket }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('msg', messages => {
            setMessages(messages);
        });
    }, [socket]);

    return (
        <ul className="space-y-2">
            {messages.map((message, i) => (
                <Message key={i} msg={message} />
            ))}
        </ul>
    );
}
