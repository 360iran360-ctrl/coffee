import Hero from '@/components/Hero';
import StoryCategories from '@/components/StoryCategories';
import ClipsReels from '@/components/ClipsReels';
import ReservationSection from '@/components/ReservationSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import SocialSection from '@/components/SocialSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="outer-frame">
        <StoryCategories />
        <ClipsReels />
        <ReservationSection />
        <AboutSection />
        <GallerySection />
        <SocialSection />
        <ContactSection />
      </div>
    </main>
  );
}
