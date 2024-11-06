import { memo, useEffect, useState } from "react";
import { type Problem } from "../../modules/problems/problems.types";
import { PageWrapper } from "../../ui/PageWrapper/PageWrapper";
import { TitledText } from "../../ui/TitledText/TitledText";
import { useParams } from "react-router-dom";
import Api, { RequestError } from "../../api/api";

import "./ProblemPage.css";
import { CustomLink } from "../../ui/CustomLink/CustomLink";

export const ProblemPage = memo(function ProblemPage() {
    const [problem, setProblem] = useState<Problem | null>(null);

    const { problemId } = useParams();

    useEffect(() => {
        Api.getProblem
            .fetch({ params: { id: problemId } })
            .then((problem) => {
                setProblem(problem);
            })
            .catch((e) => {
                if (!(e instanceof RequestError)) return;
            });
    }, [problemId]);

    return (
        <PageWrapper>
            <div className="problem-page">
                <CustomLink to="/">
                    <div className="problem-page__back-button">
                        {"<- К списку проблем"}
                    </div>
                </CustomLink>
                <div className="problem-page__title">{problem?.title}</div>
                <div className="content">
                    <TitledText title="Описание">
                        {problem?.description}
                    </TitledText>
                    <TitledText title="Конкретное место">
                        {problem?.specificLocation}
                    </TitledText>
                </div>
            </div>
        </PageWrapper>
    );
});

