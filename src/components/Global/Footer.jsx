import styled from "styled-components";
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <Container>
            <Content>
                <SocialLinks>
                    <SocialLink href="https://github.com/butrico31" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={24} />
                    </SocialLink>
                    <SocialLink href="https://www.linkedin.com/in/vinicius-butrico-de-freitas-82912a240/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={24} />
                    </SocialLink>
                </SocialLinks>

                <Copyright>
                    © {new Date().getFullYear()} Vinicius Butrico. Desenvolvido com React, Gsap e Styled-Components.
                </Copyright>
            </Content>
        </Container>
    );
}

const Container = styled.footer`
    width: 100%;
    padding: 2rem;
    background: var(--bg-footer);
    border-top: 1px solid var(--footer-border);
`;

const Content = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
        padding: 0 1rem;
    }
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 2rem;

    @media (max-width: 480px) {
        gap: 1.5rem;
    }
`;

const SocialLink = styled.a`
    color: var(--text-secondary);
    transition: all 0.3s ease;

    &:hover {
        color: var(--accent);
        transform: translateY(-3px);
    }
`;

const Copyright = styled.p`
    font-size: 0.95rem;
    font-family: 'Inter', sans-serif;
    color: var(--text-muted);
    text-align: center;

    @media (max-width: 768px) {
        font-size: 0.85rem;
    }
`;
