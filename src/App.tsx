import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/experience/Experience";
import { Hero } from "./components/hero/Hero";
import { Nav } from "./components/Nav";
import { Process } from "./components/Process";
import { Projects } from "./components/projects/Projects";
import { Skills } from "./components/Skills";
import { useRevealObserver } from "./hooks/useRevealObserver";

export function App() {
  useRevealObserver();

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="conteudo">
        <Hero />
        <Projects />
        <Process />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
    </>
  );
}
