import { NavLink } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef(null);
    const particlesRef = useRef([]);
    const [particles, setParticles] = React.useState([]);
    const [text, setText] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [loopNum, setLoopNum] = React.useState(0);
    const [typingSpeed, setTypingSpeed] = React.useState(150);

    const phrases = [
        'React Student',
        'Vue.js Enthusiast',
        'Node.js Developer',
        'Full Stack Developer'
    ];

    // Generate random particles based on screen size
    const generateParticles = () => {
        const width = window.innerWidth;
        // Responsive: more particles on wider screens
        const count = width < 768 ? 8 : width < 1200 ? 12 : 18;
        
        const newParticles = [];
        for (let i = 0; i < count; i++) {
            newParticles.push({
                left: `${5 + Math.random() * 90}%`,
                startTop: `${10 + Math.random() * 80}%`, // spread across entire screen: 10-90%
                w: 8, // fixed width as per your preference
                h: 40 + Math.random() * 80, // random height 40-120px
                move: -150 - Math.random() * 150, // random movement -150 to -300
                scroll: 220 + Math.random() * 180, // random scroll length 220-400
            });
        }
        return newParticles;
    };

    useEffect(() => {
        // Generate particles on mount
        setParticles(generateParticles());

        // Regenerate on window resize
        const handleResize = () => {
            setParticles(generateParticles());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (particles.length === 0) return;

        ScrollTrigger.getAll().forEach(t => t.kill());

        particlesRef.current.forEach((el, i) => {
            const p = particles[i];
            if (!el || !p) return;

            gsap.set(el, { 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                yPercent: 0,
                force3D: true,
                willChange: 'transform, width, height'
            });

            const scrollLen = p.scroll ?? 300;

            gsap.fromTo(
                el,
                { width: 8, height: 8, borderRadius: '50%', yPercent: 0 },
                {
                    width: 8,
                    height: p.h,
                    borderRadius: '999px',
                    yPercent: p.move,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: `top top`,
                        end: `+=${scrollLen}`,
                        scrub: 1,
                        invalidateOnRefresh: true
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [particles]);

    // Typing effect
    useEffect(() => {
        const handleTyping = () => {
            const currentIndex = loopNum % phrases.length;
            const fullText = phrases[currentIndex];

            setText(
                isDeleting
                    ? fullText.substring(0, text.length - 1)
                    : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 75 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return (
        <Container ref={containerRef}>
            <ParticlesWrapper aria-hidden="true">
                {particles.map((p, idx) => (
                    <Particle
                        key={idx}
                        ref={el => (particlesRef.current[idx] = el)}
                        style={{ left: p.left, top: p.startTop }}
                    />
                ))}
            </ParticlesWrapper>

            <ContentWrapper>
                <Greeting>Olá, sou <Name>Vinícius Butrico</Name></Greeting>
                <TypewriterWrapper>
                    <TypewriterText>{text}</TypewriterText>
                    <Cursor>|</Cursor>
                </TypewriterWrapper>
                <Description>
                    Desenvolvedor apaixonado por criar soluções digitais inovadoras. Especializado em
                    Vue.js, Node.js, Java e tecnologias modernas para web.
                </Description>
                <ButtonGroup>
                    <PrimaryButton as="a" href="https://github.com/butrico31" target="_blank" rel="noopener noreferrer">Ver GitHub</PrimaryButton>
                    <SecondaryButton as="a" href="/Curriculo_Vinicius_Butrico_ATS.pdf" target="_blank" rel="noopener noreferrer">Baixar CV</SecondaryButton>
                </ButtonGroup>
            </ContentWrapper>
        </Container>
    )
}

const Container = styled.section`
    position: relative;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(
        180deg,
        #0a0a0b 0%,
        #1a1b1e 50%,
        #2a2b2e 100%
    );
`

const ParticlesWrapper = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
`;

const Particle = styled.div`
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(180deg, rgba(168,85,247,0.95) 0%, rgba(126,58,242,0.95) 100%);
    box-shadow: 0 6px 18px rgba(126,58,242,0.4);
    opacity: 0.95;
    will-change: transform, width, height;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 2;
    max-width: 900px;
    padding: 0 2rem;
    gap: 1.5rem;
`;

const Greeting = styled.h2`
    font-size: 2.5rem;
    font-weight: 400;
    color: var(--text-color);
    margin: 0;
    
    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const Name = styled.span`
    font-weight: 700;
    font-family: 'Neocrash', sans-serif;
    background: linear-gradient(135deg, #6c13be 0%, rgba(126,58,242,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const TypewriterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 4rem;
    gap: 0.25rem;
`;

const TypewriterText = styled.h1`
    font-size: 2.2rem;
    font-weight: lighter;
    font-family: 'TechnoCharm', sans-serif;
    color: var(--text-color);
    margin: 0;
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const Cursor = styled.span`
    font-size: 2.2rem;
    font-weight: 300;
    color: rgba(168,85,247,0.95);
    animation: blink 1s infinite;
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const Description = styled.p`
    font-size: 1.2rem;
    line-height: 1.8;
    font-family: 'Inter', sans-serif;
    color: rgba(230, 230, 230, 0.8);
    max-width: 700px;
    margin: 0;
    
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        gap: 1rem;
    }
`;

const PrimaryButton = styled(NavLink)`
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    background: linear-gradient(135deg, rgba(168,85,247,1) 0%, rgba(126,58,242,1) 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(168,85,247,0.3);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(168,85,247,0.4);
    }
    
    @media (max-width: 768px) {
        width: 100%;
        padding: 0.9rem 2rem;
    }
`;

const SecondaryButton = styled(NavLink)`
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    background: transparent;
    color: var(--text-color);
    border: 2px solid rgba(168,85,247,0.5);
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
        border-color: rgba(168,85,247,1);
        background: rgba(168,85,247,0.1);
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        width: 100%;
        padding: 0.9rem 2rem;
    }
`;
