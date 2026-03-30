
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Recommendations from '@/sections/Recommendations';
import Diagnostic from '@/sections/Diagnostic';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Recommendations />
      <Diagnostic />
    </main>
  );
}
