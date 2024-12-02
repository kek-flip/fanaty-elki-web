import { useEffect, useRef, useState } from 'preact/hooks';
import { Message, MessageSide } from './ui/Message/Message';
import { InputBlock } from './ui/InputBlock/InputBlock';

import './App.css';

function getMessageSide(messageIdx: number) {
    if (messageIdx % 2 === 0) {
        return MessageSide.left;
    } else {
        return MessageSide.right;
    }
}

export function App() {
    const [messages, setMessages] = useState<string[]>([]);

    const ws = useRef<WebSocket>(null);

    useEffect(() => {
        if (ws.current) return;

        ws.current = new WebSocket('ws://176.114.91.154:8001/echo');

        return () => {
            ws.current?.close();
        };
    }, []);

    useEffect(() => {
        function onMessage(e: MessageEvent<string>) {
            setMessages([...messages, e.data]);
        }

        ws.current?.addEventListener('message', onMessage);

        return () => {
            ws.current?.removeEventListener('message', onMessage);
        };
    }, [messages]);

    function sendMessage(message: string) {
        if (!ws.current) return;
        ws.current.send(message);
        setMessages([...messages, message]);
    }

    return (
        <div class="chat">
            <div class="chat__messages">
                {messages.map((text, idx) => (
                    <Message key={idx} text={text} side={getMessageSide(idx)} />
                ))}
            </div>
            <div class="chat__input-block">
                <InputBlock onSend={(message) => sendMessage(message)} />
            </div>
        </div>
    );
}
