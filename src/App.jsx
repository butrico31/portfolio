import styled, { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyle } from './styles/GlobalStyle'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { ParticleField } from './components/motion/ParticleField'
import { TopBar } from './components/layout/TopBar'
import { StatusBar } from './components/layout/StatusBar'
import { Intro } from './components/sections/Intro'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Education } from './components/sections/Education'
import { Contact } from './components/sections/Contact'

const Main = styled.main`
  position: relative;
  z-index: 1;
`

export default function App() {
  useSmoothScroll()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ParticleField
        spread="document"
        color="rgba(168,85,247,"
        dotOpacity={0.9}
        lineOpacity={0.22}
        dotSize={2.6}
        glow={7}
        density={0.00013}
        link={155}
        zIndex={0}
      />
      <TopBar />
      <Main>
        <Intro />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </Main>
      <StatusBar />
    </ThemeProvider>
  )
}
