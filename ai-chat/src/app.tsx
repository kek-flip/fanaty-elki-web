import { useEffect, useRef, useState } from 'preact/hooks';
import { Message, MessageSide } from './ui/Message/Message';
import { InputBlock } from './ui/InputBlock/InputBlock';

import './app.css';

// const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

export function App() {
    const [messages, setMessages] = useState<Message[]>([
        {
            text: 'Привет! Это городской помощник Лиза. Что у тебя случилось?',
            side: MessageSide.left,
        },
        {
            text: 'Привет! Это городской помощник Лиза. Что у тебя случилось?',
            side: MessageSide.right,
        },
        {
            text: 'Привет! Это городской помощник Лиза. Что у тебя случилось?',
            side: MessageSide.left,
        },
        {
            text: 'Привет! Это городской помощник Лиза. Что у тебя случилось?',
            side: MessageSide.right,
        },
        {
            text: 'Привет! Это городской помощник Лиза. Что у тебя случилось?',
            side: MessageSide.left,
        },
    ]);

    const [error, setError] = useState<string | null>(null);

    const ws = useRef<WebSocket>(null);

    useEffect(() => {
        if (ws.current) return;

        try {
            // ws.current = new WebSocket(WEBSOCKET_URL);
        } catch (e) {
            setError((e as Error).message);
        }

        return () => {
            ws.current?.close();
        };
    }, []);

    useEffect(() => {
        function onMessage(e: MessageEvent<string>) {
            setMessages([
                ...messages,
                { text: e.data, side: MessageSide.left },
            ]);
        }

        ws.current?.addEventListener('message', onMessage);

        return () => {
            ws.current?.removeEventListener('message', onMessage);
        };
    }, [messages, setMessages]);

    useEffect(() => {
        function onError() {
            setError('Ошибка при получении сообщения');
        }

        ws.current?.addEventListener('error', onError);

        return () => {
            ws.current?.addEventListener('error', onError);
        };
    }, [error, setError]);

    function sendMessage() {
        // if (!ws.current) return;
        // ws.current.send(message);

        //@ts-ignore
        window.AndroidInterface.createProblem('Резня', 'Грызня', 'Возня');

        // setMessages([...messages, { text: message, side: MessageSide.right }]);
    }

    if (error) {
        return <div>Ошибка "{error}", попробуйте позже</div>;
    }

    return (
        <div class="chat">
            <div class="chat__messages">
                {messages.map((message, idx) => (
                    <Message key={idx} {...message} />
                ))}
            </div>
            <div class="chat__input-block">
                <InputBlock onSend={() => sendMessage()} />
            </div>
        </div>
    );
}
