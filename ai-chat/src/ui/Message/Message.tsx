import cn from 'classnames';

import './Message.css';

export const enum MessageSide {
    right = 'right',
    left = 'left',
}

export interface MessageProps {
    text: string;
    side: MessageSide;
}

export function Message({ text, side }: MessageProps) {
    return (
        <div
            class={cn('message', {
                message_left: side === MessageSide.left,
                message_right: side === MessageSide.right,
            })}
        >
            <div
                class={cn('message__message', {
                    message__message_left: side === MessageSide.left,
                    message__message_right: side === MessageSide.right,
                })}
            >
                {text}
            </div>
        </div>
    );
}
