import "./TitledText.css";

export interface TitledTextProps {
    title: string;
    children: any;
}

export function TitledText({ title, children }: TitledTextProps) {
    return (
        <div className="titled-text">
            <div className="title">{title}</div>
            <div className="text">{children}</div>
        </div>
    );
}

