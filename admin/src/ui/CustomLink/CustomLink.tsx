import { Link, LinkProps } from "react-router-dom";

export interface CustomLinkProps extends LinkProps {}

export function CustomLink(props: CustomLinkProps) {
    return (
        <Link
            {...props}
            style={{
                textDecoration: "none",
                color: "#000000",
            }}
        >
            {props.children}
        </Link>
    );
}

