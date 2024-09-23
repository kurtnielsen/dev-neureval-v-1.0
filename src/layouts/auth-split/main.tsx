// First, the necessary types and components are imported from Material-UI. The BoxProps type is imported to extend the props for the Main and Content components, and the Breakpoint type is used to define responsive breakpoints. The Box component from Material-UI is used as a container, and the useTheme hook is used to access the theme object. Additionally, layoutClasses is imported from a local module to apply custom CSS classes.
import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { layoutClasses } from 'src/layouts/classes';

// ----------------------------------------------------------------------
// The MainProps type is defined to extend BoxProps and include an additional layoutQuery property of type Breakpoint. This type is used to type the props for the Main and Content components.

type MainProps = BoxProps & {
  layoutQuery: Breakpoint;
};

// ----------------------------------------------------------------------
// The Main component is a functional component that takes MainProps as its props. It uses the useTheme hook to access the theme object. The component returns a Box component with a main HTML element as its root. 
// The Box component is styled to be flexible and responsive. It initially sets the flexDirection to column, but changes it to row when the screen size matches the specified layoutQuery breakpoint. The sx prop allows for additional custom styles to be applied.

export function Main({ sx, children, layoutQuery, ...other }: MainProps) {
  const theme = useTheme();

  return (
    <Box
      component="main"
      className={layoutClasses.main}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        [theme.breakpoints.up(layoutQuery)]: {
          flexDirection: 'row',
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------
// Similarly, the Content component is a functional component that also takes MainProps as its props. It uses the useTheme hook to access the theme object. The component defines a renderContent variable that contains a Box component styled to be a flexible column with a maximum width. 
// The Content component returns a Box component styled to be flexible and centered. The padding (p) is adjusted based on the screen size, using the layoutQuery breakpoint to determine the padding values. The renderContent variable is rendered inside this Box.

export function Content({ sx, children, layoutQuery, ...other }: MainProps) {
  const theme = useTheme();

  const renderContent = (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 'var(--layout-auth-content-width)',
      }}
    >
      {children}
    </Box>
  );

  return (
    <Box
      className={layoutClasses.content}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        flexDirection: 'column',
        p: theme.spacing(3, 2, 10, 2),
        [theme.breakpoints.up(layoutQuery)]: {
          justifyContent: 'center',
          p: theme.spacing(10, 2, 10, 2),
        },
        ...sx,
      }}
      {...other}
    >
      {renderContent}
    </Box>
  );
}
//In summary, the Main and Content components are designed to be flexible and responsive layout components that adapt to different screen sizes using Material-UI's theming and styling capabilities. They provide a structured way to organize content within a layout, ensuring consistency and responsiveness across different devices.
