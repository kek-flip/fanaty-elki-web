import { memo, useEffect, useState } from "react";
import Api, { RequestError } from "../../api/api";
import { Problem } from "../../modules/problems/problems.types";
import { ProblemListItem } from "./ProblemsListItem/ProblemsListItem";
import { PageWrapper } from "../../ui/PageWrapper/PageWrapper";
import { CustomLink } from "../../ui/CustomLink/CustomLink";

import "./ProblemsPage.css";

export const ProblemsPage = memo(function ProblemsPage() {
    const [problems, setProblems] = useState<Problem[]>([]);

    useEffect(() => {
        Api.problems
            .fetch()
            .then(({ problems }) => {
                setProblems(problems);
            })
            .catch((e) => {
                if (!(e instanceof RequestError)) return;
            });
    }, []);

    return (
        <PageWrapper>
            <div className="problems-page">
                <div className="title">Список всех проблем</div>
                <div className="list">
                    {problems.map((problem) => (
                        <CustomLink to={`/${problem.id}`}>
                            <ProblemListItem key={problem.id} {...problem} />
                        </CustomLink>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
});

