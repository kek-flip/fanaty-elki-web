import { useState } from 'preact/hooks';
import sendIcon from '../../assets/send.svg';

import './InputBlock.css';

export interface InputBlockProps {
    onSend?: (text: string) => void;
}

export function InputBlock({ onSend }: InputBlockProps) {
    const [text, setText] = useState('');

    function onSubmit(e: SubmitEvent) {
        e.preventDefault();
        onSend?.(text);
        setText('');
    }

    function onInput(e: InputEvent) {
        const input = e.target as HTMLInputElement;
        setText(input.value);
    }

    return (
        <form class="input-block" onSubmit={onSubmit}>
            <input
                type="text"
                name="message"
                id="message"
                class="input-block__input"
                onInput={onInput}
                value={text}
            />
            <button type="submit" class="input-block__send-btn">
                <img
                    src={sendIcon}
                    alt="Отправить"
                    class="input-block__send-btn__icon"
                />
            </button>
        </form>
    );
}
