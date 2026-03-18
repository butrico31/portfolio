import styled from "styled-components";
import React from "react";

export default function Contact() {
    return (
        <Container>
            <Title>Vamos Trabalhar Juntos?</Title>
            <Description>
                Estou sempre aberto a novos desafios e oportunidades interessantes. Entre em
                contato e vamos criar algo incrível juntos!
            </Description>
            <ButtonGroup>
                <PrimaryButton href="https://wa.me/5519989751609" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                </PrimaryButton>
                <SecondaryButton href="https://www.linkedin.com/in/vinicius-butrico-de-freitas-82912a240/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </SecondaryButton>
            </ButtonGroup>
        </Container>
    );
}

const Container = styled.section`
    width: 100%;
    padding: 6rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: linear-gradient(
        180deg,
        transparent 0%,
        var(--bg-contact) 50%,
        transparent 100%
    );

    @media (max-width: 768px) {
        padding: 4rem 1.5rem;
    }
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    font-family: 'Neocrash', sans-serif;
    color: var(--accent);
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Description = styled.p`
    font-size: 1.1rem;
    line-height: 1.8;
    font-family: 'Inter', sans-serif;
    color: var(--text-secondary);
    max-width: 700px;
    margin-bottom: 2.5rem;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 2rem;
        width: 90%;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1.5rem;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        max-width: 300px;
        gap: 1rem;
    }
`;

const PrimaryButton = styled.a`
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    background: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px var(--accent-shadow);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px var(--accent-shadow-hover);
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 0.9rem 2rem;
    }
`;

const SecondaryButton = styled.a`
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    background: transparent;
    color: var(--text-color);
    border: 2px solid var(--accent-border);
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
        border-color: var(--accent-1);
        background: var(--accent-hover-bg);
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 0.9rem 2rem;
    }
`;
