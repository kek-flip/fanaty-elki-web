import "./PageWrapper.css";

export interface PageWrapperProps {
    children: any;
}

export function PageWrapper({ children }: PageWrapperProps) {
    return <div className="page">{children}</div>;
}

