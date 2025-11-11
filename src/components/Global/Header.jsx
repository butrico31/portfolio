import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";

export default function Header() {
    return createPortal(
        <Nav>
            <Logo>&lt;Butrico/&gt;</Logo>
            
            <Links_containers>
                <Link to='/oi'>Home</Link>
                <Link to='/contato'>Contato</Link>
            </Links_containers>
        </Nav>,
        document.body
    )
}

const Links_containers = styled.div`
    display: flex;
    gap: 16px;
    padding: 10px 20px;
    border-radius: 20px;
    
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

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, rgba(168,85,247,1) 0%, rgba(126,58,242,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
    user-select: none;
    
    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const Link = styled(NavLink)`
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 3px;
    transition: color 0.3s ease;
    
    &:hover {
        color: rgba(168,85,247,0.95);
    }
    
    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;
