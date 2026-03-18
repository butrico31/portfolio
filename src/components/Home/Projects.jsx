import styled from "styled-components";
import React from "react";

export default function Projects() {
    const projectsData = [
        {
            title: "Criador de Contratos",
            description: "Automação para criação de contrato de prestação de serviços, gerando documentos personalizados com base em templates e dados fornecidos pelo usuário.",
            tags: ["N8N", "ZapSign", "ChatGpt", "Node.js"],
        },
        {
            title: "Crowdfunding de Energia",
            description: "Plataforma de financiamento coletivo para projetos de energia em comunidades. Sistema completo com checkout transparente Mercado Pago, notificações por email e gestão de campanhas.",
            tags: ["Node.js", "Mercado Pago", "Nodemailer", "MongoDB"],
        },
    ];

    return (
        <Container>
            <Title>Projetos</Title>
            <ProjectsGrid>
                {projectsData.map((project, index) => (
                    <ProjectCard key={index}>
                        <IconPlaceholder>
                            <CodeIcon>&lt;/&gt;</CodeIcon>
                        </IconPlaceholder>

                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectDescription>{project.description}</ProjectDescription>

                        <TagsContainer>
                            {project.tags.map((tag, idx) => (
                                <Tag key={idx}>{tag}</Tag>
                            ))}
                        </TagsContainer>
                    </ProjectCard>
                ))}
            </ProjectsGrid>
        </Container>
    );
}

const Container = styled.section`
    width: 100%;
    padding: 5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        padding: 3rem 1.5rem;
    }
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    font-family: 'Sdglitch', sans-serif;
    color: var(--accent);
    margin-bottom: 4rem;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 2rem;
        margin-bottom: 3rem;
    }
`;

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 2.5rem;
    max-width: 1200px;
    width: 100%;

    @media (max-width: 450px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const ProjectCard = styled.div`
    background: linear-gradient(135deg, var(--accent-card-bg) 0%, var(--accent-card-inner) 100%);
    border: 1px solid var(--footer-border);
    border-radius: 12px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-8px);
        border-color: var(--accent-border);
        box-shadow: 0 12px 40px var(--accent-shadow);
    }
`;

const IconPlaceholder = styled.div`
    width: 80px;
    height: 80px;
    background: var(--accent-card-inner);
    border: 1px solid var(--accent-border);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
`;

const CodeIcon = styled.span`
    font-size: 2rem;
    color: var(--accent);
    font-weight: 300;
`;

const ProjectTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    font-family: 'TechnoCharm', sans-serif;
    color: var(--accent);
    margin: 0;
`;

const ProjectDescription = styled.p`
    font-size: 0.95rem;
    line-height: 1.8;
    font-family: 'Inter', sans-serif;
    color: var(--text-secondary);
    margin: 0;
    flex: 1;
`;

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const Tag = styled.span`
    padding: 0.4rem 0.8rem;
    background: var(--accent-faint);
    border: 1px solid var(--accent-border);
    border-radius: 6px;
    font-size: 0.8rem;
    color: var(--accent);
    font-weight: 500;
`;
