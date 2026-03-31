
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Recommendations from '@/sections/Recommendations';
import Diagnostic from '@/sections/Diagnostic';
import Contact from '@/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Recommendations />
      <Diagnostic />
      <Contact />
    </main>
  );
}
