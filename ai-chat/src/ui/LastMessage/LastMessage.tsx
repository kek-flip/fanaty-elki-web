import './LastMessage.css';

export interface LastMessageProps {
    onApprove?: () => void;
    onDiscard?: () => void;
}

export function LastMessage({ onApprove, onDiscard }: LastMessageProps) {
    return (
        <div class="message message_right last-message">
            <div className="message__message message__message_right last-message__message">
                <button
                    type="button"
                    class="last-message__message__control last-message__message__control_approve"
                    onClick={() => onApprove?.()}
                >
                    Да, все верно
                </button>
                <button
                    type="button"
                    class="last-message__message__control last-message__message__control_discard"
                    onClick={() => onDiscard?.()}
                >
                    Нет, заполню заявку сам
                </button>
            </div>
        </div>
    );
}
