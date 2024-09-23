'use client';

//--------------------------------------------------------------------------------------------------
// The provided code defines a React functional component named AuthSplitLayout, which is designed to create a split layout for authentication pages. This component leverages Material-UI (MUI) for styling and theming, and it is written in TypeScript to ensure type safety.

// The Theme, SxProps, and Breakpoint types are imported to define the types for the component's props.
import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

// The Box, Link, and Alert components from MUI are used for layout and UI elements. 
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

//Additionally, various local modules such as paths, RouterLink, CONFIG, Logo, Section, Main, Content, HeaderSection, LayoutSection, and SettingsButton are imported to be used within the layout.
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';

import { Logo } from 'src/components/logo';

import { Section } from './section';
import { Main, Content } from './main';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { SettingsButton } from '../components/settings-button';

// ----------------------------------------------------------------------

// The AuthSplitLayoutProps type is defined to specify the props that the AuthSplitLayout component can accept. These props include optional sx for custom styles, children for nested components, an optional header object for header-specific styles, and an optional section object for section-specific details such as title, image URL, and subtitle.

export type AuthSplitLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  section?: {
    title?: string;
    imgUrl?: string;
    subtitle?: string;
  };
};

// ----------------------------------------------------------------------

// The AuthSplitLayout component itself is a functional component that takes AuthSplitLayoutProps as its props. It defines a layoutQuery constant set to the 'md' breakpoint, which is used to determine responsive behavior.

export function AuthSplitLayout({ sx, section, children, header }: AuthSplitLayoutProps) {
  const layoutQuery: Breakpoint = 'md';

// The component returns a LayoutSection component, which serves as the main container for the layout. The headerSection prop of LayoutSection is populated with a HeaderSection component that includes various slots for different areas of the header. The topArea slot contains an Alert component, the leftArea slot contains the Logo component, and the rightArea slot contains a Box component with a help link and a settings button.

  return (
    <LayoutSection
      headerSection={
        /** **************************************
         * Header
         *************************************** */
        <HeaderSection
          disableElevation
          layoutQuery={layoutQuery}
          slotProps={{ container: { maxWidth: false } }}
          sx={{ position: { [layoutQuery]: 'fixed' }, ...header?.sx }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                {/* -- Logo -- */}
                <Logo />
              </>
            ),
            rightArea: (
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                {/* -- Help link -- */}
                <Link
                  href={paths.faqs}
                  component={RouterLink}
                  color="inherit"
                  sx={{ typography: 'subtitle2' }}
                >
                  Need help?
                </Link>
                {/* -- Settings button -- */}
                <SettingsButton />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       * The footerSection prop is set to null, indicating that there is no footer in this layout. 
       *************************************** */

      footerSection={null}

      /** **************************************
       * Style
       * The cssVars prop is used to define a CSS variable for the content width, and the sx prop allows for additional custom styles to be applied.
       *************************************** */

      cssVars={{ '--layout-auth-content-width': '420px' }}
      sx={sx}
    >
      {/* -- Within the LayoutSection, the Main component is used to structure the main content area. The Section component is used to display the section-specific details such as title, image URL, subtitle, and authentication methods. The Content component is used to render the nested children components passed to AuthSplitLayout.-- */}      
      <Main layoutQuery={layoutQuery}>
        <Section
          title={section?.title}
          layoutQuery={layoutQuery}
          imgUrl={section?.imgUrl}
          method={CONFIG.auth.method}
          subtitle={section?.subtitle}
          methods={[
            {
              label: 'Jwt',
              path: paths.auth.jwt.signIn,
              icon: `${CONFIG.assetsDir}/assets/icons/platforms/ic-jwt.svg`,
            },
            {
              label: 'Firebase',
              path: paths.auth.firebase.signIn,
              icon: `${CONFIG.assetsDir}/assets/icons/platforms/ic-firebase.svg`,
            },
            {
              label: 'Amplify',
              path: paths.auth.amplify.signIn,
              icon: `${CONFIG.assetsDir}/assets/icons/platforms/ic-amplify.svg`,
            },
            {
              label: 'Auth0',
              path: paths.auth.auth0.signIn,
              icon: `${CONFIG.assetsDir}/assets/icons/platforms/ic-auth0.svg`,
            },
            {
              label: 'Supabase',
              path: paths.auth.supabase.signIn,
              icon: `${CONFIG.assetsDir}/assets/icons/platforms/ic-supabase.svg`,
            },
          ]}
        />
        <Content layoutQuery={layoutQuery}>{children}</Content>
      </Main>
    </LayoutSection>
  );
}

// In summary, the AuthSplitLayout component is a flexible and responsive layout component designed for authentication pages. It leverages Material-UI's theming and styling capabilities to create a structured and consistent layout, ensuring a good user experience across different devices.