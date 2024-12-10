import { useEffect, useRef, useState } from 'preact/hooks';
import { Message, MessageSide } from './ui/Message/Message';
import { InputBlock } from './ui/InputBlock/InputBlock';

import './app.css';
import { LastMessage } from './ui/LastMessage/LastMessage';

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

export interface Problem {
    title?: string;
    desc?: string;
    address?: string;
}

export function App() {
    const [lastMessage, setLastMessage] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const [problem, setProblem] = useState<Problem>({});

    const [error, setError] = useState<string | null>(null);

    const ws = useRef<WebSocket>(null);

    useEffect(() => {
        if (ws.current) return;

        try {
            ws.current = new WebSocket(WEBSOCKET_URL);
        } catch (e) {
            setError((e as Error).message);
        }

        return () => {
            ws.current?.close();
        };
    }, []);

    useEffect(() => {
        function onMessage(e: MessageEvent<string>) {
            const text = e.data.toLocaleLowerCase();

            if (text.startsWith('по вашей проблеме создана заявка')) {
                const [title, desc, address] = text
                    .replace('по вашей проблеме создана заявка', '')
                    .split('\n');

                setProblem({ title, desc, address });
                setLastMessage(true);
            } else {
                setLastMessage(false);
            }
            setMessages([...messages, { text, side: MessageSide.left }]);
        }

        ws.current?.addEventListener('message', onMessage);

        return () => {
            ws.current?.removeEventListener('message', onMessage);
        };
    }, [messages, setMessages, setLastMessage]);

    useEffect(() => {
        function onError() {
            setError('Ошибка при получении сообщения');
        }

        ws.current?.addEventListener('error', onError);

        return () => {
            ws.current?.addEventListener('error', onError);
        };
    }, [error, setError]);

    function sendMessage(message: string) {
        if (!ws.current) return;
        ws.current.send(message);
        setMessages([...messages, { text: message, side: MessageSide.right }]);
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
                {lastMessage && (
                    <LastMessage
                        onApprove={() => {
                            const {
                                title = 'Не найдено',
                                desc = 'Не найдено',
                                address = 'Не найдено',
                            } = problem;

                            //@ts-ignore
                            window.AndroidInterface.createProblem(
                                title,
                                desc,
                                address,
                            );
                        }}
                        onDiscard={() => {
                            //@ts-ignore
                            window.AndroidInterface.discardProblem();
                        }}
                    />
                )}
            </div>
            <div class="chat__input-block">
                <InputBlock onSend={(message) => sendMessage(message)} />
            </div>
        </div>
    );
}
