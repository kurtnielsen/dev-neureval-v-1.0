// This file, typically named next.config.mjs, customizes various aspects of the Next.js build and runtime behavior. Let's break down the key components of this configuration:

// Type Annotation: This comment uses JSDoc to specify the type of the nextConfig object. It imports the NextConfig type from the next package, providing type checking and IntelliSense support in editors like Visual Studio Code.
/**
 * @type {import('next').NextConfig}
 */
// This constant defines whether the build should be a static export. It is set to 'false', meaning the project is not configured for static export by default. This value is used later in the configuration to conditionally set the output property.
const isStaticExport = 'false';

const nextConfig = {
  trailingSlash: true,
  
  // The env property allows you to define environment variables that will be available in both the server and client-side code. Here, BUILD_STATIC_EXPORT is set to the value of isStaticExport.
  env: {
    BUILD_STATIC_EXPORT: isStaticExport,
    DEV_API: 'http://localhost:7272',
  },

  // This section optimizes the import of Material-UI components and icons by transforming them into modular imports. This can help reduce the bundle size by only including the necessary parts of the library.
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },

  // The webpack function customizes the Webpack configuration used by Next.js. Here, it adds a rule to handle .svg files using @svgr/webpack, which allows SVGs to be imported as React components.
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // This conditional spread operator adds the output: 'export' property to the configuration if isStaticExport is set to 'true'. This enables static export mode in Next.js, which generates a static HTML export of the site.
  ...(isStaticExport === 'true' && {
    output: 'export',
  }),
};

export default nextConfig;

// In summary, this configuration file customizes various aspects of a Next.js project, including URL formatting, environment variables, import optimization for Material-UI, custom Webpack rules for SVGs, and conditional static export settings. These configurations help tailor the Next.js application to specific project requirements and optimize its performance.