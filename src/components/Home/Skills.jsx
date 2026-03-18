import styled from "styled-components";
import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Skills() {
    const { isDark } = useTheme();
    const waveColor1 = isDark ? 'rgba(168,85,247,0.2)' : 'rgba(37,99,235,0.2)';
    const waveColor2 = isDark ? 'rgba(168,85,247,1)' : 'rgba(37,99,235,1)';
    const waveAnim = isDark
        ? 'rgba(168,85,247,0.2); rgba(168,85,247,1); rgba(168,85,247,0.2)'
        : 'rgba(37,99,235,0.2); rgba(37,99,235,1); rgba(37,99,235,0.2)';

    return (
        <div className={'flex flex-col items-center'}>
            <Title>Hard Skills</Title>

            <WaveSVG viewBox="0 0 800 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={waveColor1}>
                            <animate attributeName="stop-color"
                                values={waveAnim}
                                dur="3s"
                                repeatCount="indefinite" />
                        </stop>
                        <stop offset="50%" stopColor={waveColor2}>
                            <animate attributeName="offset"
                                values="0.3; 0.5; 0.7; 0.5; 0.3"
                                dur="3s"
                                repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor={waveColor1}>
                            <animate attributeName="stop-color"
                                values={waveAnim}
                                dur="3s"
                                repeatCount="indefinite" />
                        </stop>
                    </linearGradient>
                </defs>
                <path
                    d="M 0,50 Q 100,20 200,50 T 400,50 Q 500,80 600,50 T 800,50"
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </WaveSVG>

            <CardContainer>
                <Card>
                    <CardTitle>Back-end</CardTitle>
                    <CardList>
                        <li>Node.js</li>
                        <li>Express.js</li>
                        <li>Spring Boot</li>
                        <li>REST APIs</li>
                    </CardList>
                </Card>
                <Card>
                    <CardTitle>Front-end</CardTitle>
                    <CardList>
                        <li>React</li>
                        <li>Vue.js</li>
                        <li>HTML5</li>
                        <li>CSS</li>
                    </CardList>
                </Card>
                <Card>
                    <CardTitle>DevOps</CardTitle>
                    <CardList>
                        <li>Docker</li>
                        <li>Git</li>
                        <li>AWS EC2</li>
                    </CardList>
                </Card>
            </CardContainer>
        </div>
    )
}

const CardContainer = styled.section`
    width: 100vw;
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        gap: 1.5rem;
        padding: 1.5rem;
    }
`;

const Card = styled.div`
    background: transparent;
    border: 1px solid var(--accent-border);
    border-radius: 10px;
    padding: 1.5rem;
    width: 300px;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 300px;
    transition: all 0.3s ease;

    &:hover {
        border-color: var(--accent-border-hover);
        transform: translateY(-5px);
        box-shadow: 0 8px 25px var(--accent-faint);
    }

    @media (max-width: 768px) {
        width: 100%;
        max-width: 350px;
    }
`;

const CardList = styled.ul`
    list-style-type: circle;
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.8;
    font-family: 'Inter', sans-serif;
    align-self: flex-start;
    margin-left: 30px;
`;

const CardTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-family: 'TechnoCharm', sans-serif;
    color: var(--accent);
`;

const Title = styled.h2`
    font-size: 2rem;
    margin-bottom: 2rem;
    font-family: 'Sdglitch', sans-serif;
    color: var(--accent);

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const WaveSVG = styled.svg`
    width: 100%;
    max-width: 800px;
    height: 100px;
    margin: 2rem 0;
    overflow: visible;

    path {
        filter: drop-shadow(0 0 8px var(--accent-glow));
    }
`
