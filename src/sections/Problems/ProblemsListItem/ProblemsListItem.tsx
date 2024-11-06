import "./ProblemsListItem.css";

export interface ProblemListItemProps {
    title: string;
    lat: string;
    long: string;
    status: string;
}

export function ProblemListItem({
    title,
    lat,
    long,
    status,
}: ProblemListItemProps) {
    return (
        <div className="problem-list-item">
            <div className="title">{title}</div>
            <div className="cords">
                <div className="lat">{lat}</div>
                <div className="long">{long}</div>
            </div>
            <div className="status">{status}</div>
        </div>
    );
}

