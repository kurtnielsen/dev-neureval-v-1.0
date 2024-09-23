// This import statement brings in the HomeView component from the src/sections/home/view module. The HomeView component is likely a React component that defines the main view or content for the home section of the application.
import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Neureval: Nueropsychological Evaluation Platform',
  description:
    'Empowering neurodiverse individuals and their families through personalized assessments, dynamic interventions, and an interactive community of support',
};

export default function Page() {
  return <HomeView />;
}

// In summary, the provided code defines a Page component that renders the HomeView component. It also includes metadata for the page, which is useful for SEO and social media sharing. By organizing the code in this way, the application becomes more modular and easier to maintain. The use of TypeScript ensures type safety and improves the developer experience.