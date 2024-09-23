// The provided code defines a React functional component named Section, which is designed to display a section of a webpage with a title, subtitle, image, and a list of methods (each represented by an icon and a link). This component uses Material-UI (MUI) for styling and theming, and it is written in TypeScript to ensure type safety.

import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

// ----------------------------------------------------------------------

// The SectionProps type is defined to specify the props that the Section component can accept. These props include optional title, method, imgUrl, subtitle, and methods properties, as well as a required layoutQuery property for responsive design. The methods property is an array of objects, each containing a path, icon, and label.

type SectionProps = BoxProps & {
  title?: string;
  method?: string;
  imgUrl?: string;
  subtitle?: string;
  layoutQuery: Breakpoint;
  methods?: {
    path: string;
    icon: string;
    label: string;
  }[];
};

// ----------------------------------------------------------------------

// The Section component itself is a functional component that takes SectionProps as its props. It uses the useTheme hook to access the theme object for styling purposes. The component returns a Box component that serves as the main container for the section. The Box component is styled with a background gradient, padding, width, and other styles. It also includes responsive styles that are applied when the viewport width matches the specified layoutQuery breakpoint.

export function Section({
  sx,
  method,
  layoutQuery,
  methods,
  title = 'Welcome Aboard!',
  imgUrl = `${CONFIG.assetsDir}/assets/illustrations/illustration-dashboard.webp`,
  subtitle = 'Empowering neurodiverse individuals with personalized care, dynamic interventions, and community support.',
  ...other
}: SectionProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: `0deg, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.92)}, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.92)}`,
          imgUrl: `${CONFIG.assetsDir}/assets/background/background-3-blur.webp`,
        }),
        px: 3,
        pb: 3,
        width: 1,
        maxWidth: 480,
        display: 'none',
        position: 'relative',
        pt: 'var(--layout-header-desktop-height)',
        [theme.breakpoints.up(layoutQuery)]: {
          gap: 8,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        },
        ...sx,
      }}
      {...other}
    >

{/* Inside the Box component, a div element contains a Typography component that displays the title prop, and another Typography component that displays the subtitle prop if it is provided. Below the div, another Box component is used to display an image, with the imgUrl prop as the source. */}

      <div>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>

        {subtitle && (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', mt: 2 }}>
            {subtitle}
          </Typography>
        )}
      </div>

      <Box
        component="img"
        alt="Dashboard illustration"
        src={imgUrl}
        sx={{ width: 1, aspectRatio: '4/3', objectFit: 'cover' }}
      />

{/* If the methods array and method prop are provided, a Box component with a ul element is rendered to display the list of methods. Each method is represented by a li element containing a Tooltip component that wraps a Link component. The Link component uses RouterLink for navigation and displays an icon image. If the current method does not match the method prop, the li element is styled to appear disabled. */}

      {!!methods?.length && method && (
        <Box component="ul" gap={2} display="flex">
          {methods.map((option) => {
            const selected = method === option.label.toLowerCase();

            return (
              <Box
                key={option.label}
                component="li"
                sx={{
                  ...(!selected && {
                    cursor: 'not-allowed',
                    filter: 'grayscale(1)',
                  }),
                }}
              >
                <Tooltip title={option.label} placement="top">
                  <Link
                    component={RouterLink}
                    href={option.path}
                    sx={{
                      ...(!selected && { pointerEvents: 'none' }),
                    }}
                  >
                    <Box
                      component="img"
                      alt={option.label}
                      src={option.icon}
                      sx={{ width: 32, height: 32 }}
                    />
                  </Link>
                </Tooltip>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

// In summary, the Section component is a versatile and responsive component designed to display a section of a webpage with a title, subtitle, image, and a list of methods. It leverages Material-UI's theming and styling capabilities to create a structured and visually appealing layout.