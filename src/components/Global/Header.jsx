import styled from "styled-components";
import { Link } from "react-scroll";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

export default function Header() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <Nav>
            <Logo href="#hero">&lt;Butrico/&gt;</Logo>

            <Links_containers>
            <ThemeToggle
                    onClick={toggleTheme}
                    aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
                    aria-pressed={isDark}
                >
                    <ThemeTrack $isDark={isDark}>
                        <ThemeIcon $position="left" $isActive={!isDark}>
                            <FaSun size={12} />
                        </ThemeIcon>
                        <ThemeIcon $position="right" $isActive={isDark}>
                            <FaMoon size={12} />
                        </ThemeIcon>
                        <ThemeThumb $isDark={isDark}>
                            {isDark ? <FaMoon size={13} /> : <FaSun size={13} />}
                        </ThemeThumb>
                    </ThemeTrack>
                </ThemeToggle>
                <NavLink to='about' href="#about">Sobre</NavLink>
                <NavLink to='skills' href="#skills">Skills</NavLink>
                <NavLink to='projects' href="#projects">Projetos</NavLink>
                <NavLink to='contact' href="#contact">Contato</NavLink>
                
            </Links_containers>
        </Nav>
    )
}

const Links_containers = styled.div`
    display: flex;
    gap: 16px;
    padding: 10px 20px;
    border-radius: 20px;
    align-items: center;

    @media (max-width: 480px) {
        gap: 12px;
        padding: 8px 15px;
    }
`;

const Nav = styled.nav`
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    height: 75px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3rem;
    z-index: 1000;

    @media (max-width: 768px) {
        padding: 0 1.5rem;
        height: 65px;
    }

    @media (max-width: 480px) {
        padding: 0 1rem;
    }
`;

const Logo = styled.a`
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
    user-select: none;
    text-decoration: none;

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const NavLink = styled(Link)`
    color: var(--nav-text);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 3px;
    text-decoration: none;
    cursor: pointer;
    font-size: 1rem;
    font-family: inherit;
    transition: color 0.3s ease;

    &:hover {
        color: var(--accent);
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;

const ThemeToggle = styled.button`
    background: transparent;
    border: none;
    width: 64px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        transform: translateY(-1px);
    }

    &:focus-visible > div {
        box-shadow: 0 0 0 3px var(--accent-faint);
    }
`;

const ThemeTrack = styled.div`
    width: 62px;
    height: 32px;
    border-radius: 999px;
    border: 1px solid var(--accent-border);
    position: relative;
    overflow: hidden;
    background: ${props => props.$isDark
        ? "linear-gradient(120deg, rgba(20, 24, 38, 0.95) 0%, rgba(40, 45, 64, 0.95) 100%)"
        : "linear-gradient(120deg, rgba(245, 249, 255, 0.95) 0%, rgba(229, 238, 255, 0.95) 100%)"};
    transition: background 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.12);
`;

const ThemeIcon = styled.span`
    position: absolute;
    top: 50%;
    ${props => props.$position === "left" ? "left: 9px;" : "right: 9px;"}
    transform: translateY(-50%);
    color: var(--accent);
    opacity: ${props => props.$isActive ? 1 : 0.4};
    transition: opacity 0.25s ease;
    pointer-events: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const ThemeThumb = styled.span`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: ${props => props.$isDark ? "34px" : "2px"};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);
    box-shadow: 0 4px 12px var(--accent-shadow);
    transition: left 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
`;
