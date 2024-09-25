import 'src/global.css';

// ----------------------------------------------------------------------
// The provided code defines a root layout component for a React application using TypeScript. This component sets up various global configurations and providers to ensure a consistent and well-structured application

import type { Viewport } from 'next';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';
import { LocalizationProvider } from 'src/locales';
import { detectLanguage } from 'src/locales/server';
import { schemeConfig } from 'src/theme/scheme-config';
import { I18nProvider } from 'src/locales/i18n-provider';
import { ThemeProvider } from 'src/theme/theme-provider';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { CheckoutProvider } from 'src/sections/checkout/context';

import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';
import { AuthProvider as Auth0AuthProvider } from 'src/auth/context/auth0';
import { AuthProvider as AmplifyAuthProvider } from 'src/auth/context/amplify';
import { AuthProvider as SupabaseAuthProvider } from 'src/auth/context/supabase';
import { AuthProvider as FirebaseAuthProvider } from 'src/auth/context/firebase';

// ----------------------------------------------------------------------
// The code defines a constant AuthProvider based on the authentication method specified in the configuration:

const AuthProvider =
  (CONFIG.auth.method === 'amplify' && AmplifyAuthProvider) ||
  (CONFIG.auth.method === 'firebase' && FirebaseAuthProvider) ||
  (CONFIG.auth.method === 'jwt' && JwtAuthProvider) ||
  (CONFIG.auth.method === 'auth0' && Auth0AuthProvider) ||
  SupabaseAuthProvider;

  // These settings configure the viewport for responsive design and set the favicon for the application.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata = {
  icons: [
    {
      rel: 'icon',
      url: `${CONFIG.assetsDir}/favicon.ico`,
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

// The RootLayout component is defined as an asynchronous function:
// The component uses the detectLanguage function to determine the user's language, falling back to English if the language cannot be detected.
// The component returns an HTML structure with the detected language set in the lang attribute of the <html> tag 
// InitColorSchemeScript: This script initializes the color scheme based on the configuration.
// Providers: The component wraps its children with several providers, including I18nProvider, LocalizationProvider, AuthProvider, SettingsProvider, ThemeProvider, MotionLazy, and CheckoutProvider. These providers set up localization, authentication, theming, animations, and checkout context for the application.
// Components: The component includes Snackbar, ProgressBar, and SettingsDrawer components to provide global UI elements.
export default async function RootLayout({ children }: Props) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  return (
    <html lang={lang ?? 'en'} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          defaultMode={schemeConfig.defaultMode}
          modeStorageKey={schemeConfig.modeStorageKey}
        />

<I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
          <LocalizationProvider>
            <AuthProvider>
              <SettingsProvider settings={defaultSettings}>
                <ThemeProvider>
                  <MotionLazy>
                    <CheckoutProvider>
                      <Snackbar />
                      <ProgressBar />
                      <SettingsDrawer />
                      {children}
                    </CheckoutProvider>
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </AuthProvider>
          </LocalizationProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

// In summary, the RootLayout component sets up the global layout for a React application using TypeScript. It includes theming, localization, authentication, and other global settings. The component ensures a consistent and well-structured application by wrapping its children with various providers and initializing necessary scripts and components. This approach helps maintain a clean and organized codebase while providing a robust foundation for the application.