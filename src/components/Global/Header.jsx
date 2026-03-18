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
                <NavLink to='about' href="#about">Sobre</NavLink>
                <NavLink to='skills' href="#skills">Skills</NavLink>
                <NavLink to='projects' href="#projects">Projetos</NavLink>
                <NavLink to='contact' href="#contact">Contato</NavLink>
                <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
                    {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
                </ThemeToggle>
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
    background: none;
    border: 1px solid var(--accent-border);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--accent);
    transition: all 0.3s ease;
    padding: 0;
    flex-shrink: 0;

    &:hover {
        background: var(--accent-hover-bg);
        border-color: var(--accent-border-hover);
        transform: rotate(20deg);
    }

    svg {
        color: var(--accent);
    }
`;
