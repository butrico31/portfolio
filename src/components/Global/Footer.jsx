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
                    © 2025 Vinicius Butrico. Desenvolvido com React, Gsap e Styled-Components.
                </Copyright>
            </Content>
        </Container>
    );
}

const Container = styled.footer`
    width: 100%;
    padding: 2rem;
    background: rgba(10, 10, 11, 0.8);
    border-top: 1px solid rgba(168,85,247,0.2);
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
    color: rgba(230, 230, 230, 0.7);
    transition: all 0.3s ease;
    
    &:hover {
        color: rgba(168,85,247,0.95);
        transform: translateY(-3px);
    }
`;

const Copyright = styled.p`
    font-size: 0.95rem;
    color: rgba(230, 230, 230, 0.6);
    text-align: center;
    
    @media (max-width: 768px) {
        font-size: 0.85rem;
    }
`;
