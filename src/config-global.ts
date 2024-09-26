// This file defines a comprehensive configuration object, CONFIG, which holds various settings and credentials required for the application to function correctly

// The paths object is imported from src/routes/paths. This likely contains route definitions or path constants used throughout the application.
import { paths } from 'src/routes/paths';

// The packageJson import brings in the contents of the package.json file, allowing access to metadata such as the application's version.
import packageJson from '../package.json';

// ConfigType: bringing over from server app
// type ConfigType = {
//   basePath?: string;
//   appVersion: string;
//   cors: {
//     origins: string[];
//     methods: string[];
//   };
// };
// export const CONFIG: ConfigType = {
//   appVersion: packageJson.version,
//   basePath:
//     process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_API : process.env.DEV_API,
//   cors: {
//     /**
//      * [] = allow all origins
//      * ['http://localhost:8081', 'http://localhost:8082'] = allow only these origins
//      */
//     origins: [],
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   },
// };


// ----------------------------------------------------------------------
// The ConfigValue type defines the structure of the configuration object. It includes various properties such as appName, appVersion, serverUrl, and more.
export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  isStaticExport: boolean;
  // added cors from server config code-not sure it is correct placement?
  cors: {
    origins: string[];
    methods: string[];
  };
  JWT_SECRET: string;
  auth: {
    method: 'jwt' | 'amplify' | 'firebase' | 'supabase' | 'auth0';
    skip: boolean;
    redirectPath: string;
  };
  mapboxApiKey: string;
  firebase: {
    appId: string;
    apiKey: string;
    projectId: string;
    authDomain: string;
    storageBucket: string;
    measurementId: string;
    messagingSenderId: string;
  };
  amplify: { userPoolId: string; userPoolWebClientId: string; region: string };
  auth0: { clientId: string; domain: string; callbackUrl: string };
  supabase: { url: string; key: string };
};

// ----------------------------------------------------------------------
// The CONFIG object is an instance of the ConfigValue type, populated with actual values.
export const CONFIG: ConfigValue = {
  // appName is set to 'Minimal UI', and appVersion is dynamically set using the version from package.json.
  appName: 'Neureval',
  appVersion: packageJson.version,
  // Environment variables (process.env) are used to populate sensitive information and configuration details, ensuring they can be easily changed without modifying the codebase.
  serverUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  isStaticExport: JSON.parse(`${process.env.BUILD_STATIC_EXPORT}`),

  // integrating cors from server app
  cors: {
    /**
     * [] = allow all origins
     * ['http://localhost:8081', 'http://localhost:8082'] = allow only these origins
     */
    origins: [],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  },
  // JWT_Secret is set to the value of the JWT_SECRET environment variable.
  JWT_SECRET: process.env.JWT_SECRET ?? '',

  // The auth object specifies the authentication method (supabase), whether to skip authentication (skip: false), and the redirect path after login (redirectPath).
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'supabase',
    skip: false,
    redirectPath: paths.dashboard.root,
  },
  /**
   * Mapbox
   */
  mapboxApiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? '',
  /**
   * Firebase
   */
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID ?? '',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? '',
  },
  /**
   * Amplify
   */
  amplify: {
    userPoolId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_ID ?? '',
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID ?? '',
    region: process.env.NEXT_PUBLIC_AWS_AMPLIFY_REGION ?? '',
  },
  /**
   * Auth0
   */
  auth0: {
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? '',
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? '',
    callbackUrl: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL ?? '',
  },
  /**
   * Supabase
   */
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
};

// In summary, this TypeScript file defines a structured configuration object for a React project using Next.js. 
// It imports necessary paths and package information, defines a type for the configuration structure, 
// and then creates an instance of this configuration with values sourced from environment variables and the package.json file. 
// This approach ensures that the application's configuration is centralized, type-safe, and easily maintainable.