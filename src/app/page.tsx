import VideoIntro from "@/components/VideoIntro/VideoIntro";
import IntroReveal from "@/components/IntroReveal/IntroReveal";
import About from "@/components/About/About";
import Projects from "@/components/Projects/Projects";
import StoryReel from "@/components/StoryReel/StoryReel";
import Experience from "@/components/Experience/Experience";
import Publications from "@/components/Publications/Publications";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <main>
      <VideoIntro />
      <IntroReveal />
      <About />
      <Projects />
      <StoryReel />
      <Experience />
      <Publications />
      <Contact />
    </main>
  );
}
