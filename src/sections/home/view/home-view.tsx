'use client';
// The Stack component from Material-UI is imported for layout purpose
import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';
import { HomeFAQs } from '../home-faqs';
import { HomeZoneUI } from '../home-zone-ui';
import { HomeMinimal } from '../home-minimal';
import { HomePricing } from '../home-pricing';
import { HomeForDesigner } from '../home-for-designer';
import { HomeTestimonials } from '../home-testimonials';
import { HomeIntegrations } from '../home-integrations';
import { HomeAdvertisement } from '../home-advertisement';
import { HomeHugePackElements } from '../home-hugepack-elements';
import { HomeHighlightFeatures } from '../home-highlight-features';

// ----------------------------------------------------------------------
// https://mui.com/material-ui/customization/how-to-customize/#the-sx-prop
// ----------------------------------------------------------------------
export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
    {/* ScrollProgress component is used to display a linear progress bar at the top of the page, indicating the scroll progress. It is styled to be fixed at the top of the viewport. */}
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />
{/* provides a button that allows users to quickly scroll back to the top of the page. */}
      <BackToTop />

      {/* This component likely represents the hero section of the home page, which is typically the first section users see. */}
      <HomeHero />

      {/* The Stack component from Material-UI is used to layout the various sections of the home page. It is styled with a relative position and a background color that matches the default background. */}
      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>

      {/* These components are rendered inside the Stack component, ensuring they are laid out in a vertical stack. */}
        <HomeMinimal />

        <HomeHugePackElements />

        <HomeForDesigner />

        <HomeHighlightFeatures />

        <HomeIntegrations />

        <HomePricing />

        <HomeTestimonials />

        <HomeFAQs />

        <HomeZoneUI />

        <HomeAdvertisement />
      </Stack>
    </>
  );
}

//In summary, the HomeView component is a comprehensive React component that assembles various sections of the home page. It uses the useScrollProgress hook to track and display the scroll progress, and includes a BackToTop button for user convenience. The component leverages Material-UI's Stack component for layout and includes multiple custom components to build a rich and interactive home page. This modular approach ensures that each section of the home page is encapsulated in its own component, promoting reusability and maintainability.