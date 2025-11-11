import { lazy, Suspense } from "react";
import Header from "../components/Global/Header.jsx";
import Hero from "../components/Home/Hero.jsx";

const About = lazy(() => import("../components/Home/About.jsx"));
const Skills = lazy(() => import("../components/Home/Skills.jsx"));
const CodeDisplay = lazy(() => import("../components/Home/CodeDisplay.jsx"));
const Projects = lazy(() => import("../components/Home/Projects.jsx"));
const Contact = lazy(() => import("../components/Home/Contact.jsx"));
const Footer = lazy(() => import("../components/Global/Footer.jsx"));

export default function Home() {
    return (
        <div>
            <Header />
            <div id="hero">
                <Hero />
            </div>
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <div id="about">
                    <About />
                </div>
                <div id="skills">
                    <Skills />
                    <CodeDisplay />
                </div>
                <div id="projects">
                    <Projects />
                </div>
                <div id="contact">
                    <Contact />
                </div>
                <Footer />
            </Suspense>
        </div>
    )
}