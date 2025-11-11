import Header from "../components/Global/Header.jsx";
import About from "../components/Home/About.jsx";
import Hero from "../components/Home/Hero.jsx";
import Skills from "../components/Home/Skills.jsx";
import CodeDisplay from "../components/Home/CodeDisplay.jsx";
import Projects from "../components/Home/Projects.jsx";
import Contact from "../components/Home/Contact.jsx";
import Footer from "../components/Global/Footer.jsx";

export default function Home() {

    return (
        <div>
            <Header />
            <Hero />
            <About />
            <Skills />
            <CodeDisplay />
            <Projects />
            <Contact />
            <Footer />
        </div>
    )
}