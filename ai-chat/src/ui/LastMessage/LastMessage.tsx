// import './LastMessage.css';

export interface LastMessageProps {
    onApprove?: () => void;
    onDiscard?: () => void;
}

export function LastMessage({ onApprove, onDiscard }: LastMessageProps) {
    return (
        <div class="last-message">
            <div className="last-message__message">
                <button
                    type="button"
                    class="last-message__message__approve"
                    onClick={() => onApprove?.()}
                >
                    Да, все верно
                </button>
                <button
                    type="button"
                    class="last-message__message__discard"
                    onClick={() => onDiscard?.()}
                >
                    Нет, заполню заявку сам
                </button>
            </div>
        </div>
    );
}
