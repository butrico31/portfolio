import styled from "styled-components";
import React from "react";
import { useTheme } from "../../context/ThemeContext";

function getExperience() {
    const start = new Date(2025, 6, 1); // Julho 2025
    const now = new Date();
    const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) {
        return { number: `${totalMonths}+`, label: 'Meses de Experiência' };
    } else if (months === 0) {
        return { number: `${years}+`, label: years === 1 ? 'Ano de Experiência' : 'Anos de Experiência' };
    } else {
        return { number: `${years}a ${months}m+`, label: 'de Experiência' };
    }
}

export default function About() {
    const exp = getExperience();
    const { isDark } = useTheme();
    const a08 = isDark ? 'rgba(168,85,247,0.8)' : 'rgba(37,99,235,0.8)';
    const aAnim1 = isDark
        ? 'rgba(168,85,247,0.6); rgba(168,85,247,1); rgba(168,85,247,0.6)'
        : 'rgba(37,99,235,0.6); rgba(37,99,235,1); rgba(37,99,235,0.6)';
    const aAnim2 = isDark
        ? 'rgba(126,58,242,0.6); rgba(126,58,242,1); rgba(126,58,242,0.6)'
        : 'rgba(29,78,216,0.6); rgba(29,78,216,1); rgba(29,78,216,0.6)';
    const stopColor1 = isDark ? 'rgba(168,85,247,0.6)' : 'rgba(37,99,235,0.6)';
    const stopColor2 = isDark ? 'rgba(126,58,242,0.6)' : 'rgba(29,78,216,0.6)';

    return (
        <AboutSection>
            <CircuitBackground>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={stopColor1}>
                                <animate attributeName="stop-color"
                                    values={aAnim1}
                                    dur="2s"
                                    repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" stopColor={stopColor2}>
                                <animate attributeName="stop-color"
                                    values={aAnim2}
                                    dur="2s"
                                    repeatCount="indefinite" />
                            </stop>
                        </linearGradient>
                    </defs>

                    <g className="top-left">
                        <path d="M 0,30 L 80,30 L 80,50 L 120,50" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <circle cx="80" cy="30" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="80" cy="50" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                        </circle>
                        <path d="M 30,0 L 30,80 L 50,80 L 50,120" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <circle cx="30" cy="80" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" begin="1s" repeatCount="indefinite"/>
                        </circle>
                    </g>

                    <g className="top-right">
                        <path d="M 100%,30 L calc(100% - 80px),30 L calc(100% - 80px),50 L calc(100% - 120px),50" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <circle cx="calc(100% - 80px)" cy="30" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="calc(100% - 80px)" cy="50" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                        </circle>
                        <path d="M calc(100% - 30px),0 L calc(100% - 30px),80 L calc(100% - 50px),80 L calc(100% - 50px),120" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <circle cx="calc(100% - 30px)" cy="80" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" begin="1s" repeatCount="indefinite"/>
                        </circle>
                    </g>

                    <g className="bottom-left">
                        <path d="M 0,calc(100% - 30px) L 80,calc(100% - 30px) L 80,calc(100% - 50px) L 120,calc(100% - 50px)" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <circle cx="80" cy="calc(100% - 30px)" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" begin="0.3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="80" cy="calc(100% - 50px)" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" begin="0.8s" repeatCount="indefinite"/>
                        </circle>
                        <path d="M 30,100% L 30,calc(100% - 80px) L 50,calc(100% - 80px) L 50,calc(100% - 120px)" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <circle cx="30" cy="calc(100% - 80px)" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" begin="1.3s" repeatCount="indefinite"/>
                        </circle>
                    </g>

                    <g className="bottom-right">
                        <path d="M 100%,calc(100% - 30px) L calc(100% - 80px),calc(100% - 30px) L calc(100% - 80px),calc(100% - 50px) L calc(100% - 120px),calc(100% - 50px)" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <circle cx="calc(100% - 80px)" cy="calc(100% - 30px)" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" begin="0.3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="calc(100% - 80px)" cy="calc(100% - 50px)" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" begin="0.8s" repeatCount="indefinite"/>
                        </circle>
                        <path d="M calc(100% - 30px),100% L calc(100% - 30px),calc(100% - 80px) L calc(100% - 50px),calc(100% - 80px) L calc(100% - 50px),calc(100% - 120px)" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <circle cx="calc(100% - 30px)" cy="calc(100% - 80px)" r="4" fill={a08}>
                            <animate attributeName="r" values="4;6;4" dur="2s" begin="1.3s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                </svg>
            </CircuitBackground>

            <Titulo>About Me</Titulo>

            <AboutParagraph>Desenvolvedor de Software Full Stack com experiência em desenvolvimento web e automações. Atuação
                em criação e integração de APIs REST, desenvolvimento de agentes de IA e sistemas escaláveis.
                Experiência com Node.js, Spring Boot, Docker, MongoDB e Vue.js, aplicando boas práticas para
                otimização e melhoria contínua de estruturas de projetos. Busco oportunidades que permitam aplicar
                meus conhecimentos técnicos, aperfeiçoar processos e contribuir para a evolução das soluções
                desenvolvidas.
            </AboutParagraph>
            <Row>
                <Card>
                    <CardNumber>{exp.number}</CardNumber>
                    <CardTitle>{exp.label}</CardTitle>
                </Card>
                <Card>
                    <CardNumber>5+</CardNumber>
                    <CardTitle>Projetos Concluídos</CardTitle>
                </Card>
                <Card>
                    <CardNumber>5</CardNumber>
                    <CardTitle>Tecnologias Conhecidas</CardTitle>
                </Card>
            </Row>
        </AboutSection>
    )
}

const AboutSection = styled.section`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 4rem 2rem;
    position: relative;
    overflow: hidden;

    @media (max-width: 768px) {
        padding: 3rem 1.5rem;
    }
`;

const CircuitBackground = styled.div`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.4;

    svg {
        width: 100%;
        height: 100%;

        path {
            filter: drop-shadow(0 0 4px rgba(168,85,247,0.4));
        }

        circle {
            filter: drop-shadow(0 0 6px rgba(168,85,247,0.6));
        }
    }
`;

const Titulo = styled.h2`
    font-size: 2.5rem;
    font-weight: 500;
    font-family: 'Sdglitch', sans-serif;
    color: var(--accent);
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const AboutParagraph = styled.p`
    font-size: 1rem;
    line-height: 1.8;
    font-family: 'Inter', sans-serif;
    text-align: center;
    width: 80%;
    max-width: 900px;
    color: var(--text-secondary);
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        width: 90%;
        font-size: 0.95rem;
    }
`;

const Row = styled.div`
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        gap: 1.5rem;
    }
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 150px;
`;

const CardNumber = styled.h3`
    font-size: 2rem;
    font-weight: 600;
    color: var(--accent);
    margin: 0;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const CardTitle = styled.h4`
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-secondary);
    margin: 0;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;
