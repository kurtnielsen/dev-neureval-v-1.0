'use client';

// The provided code defines a React component called RoleBasedGuard that is used to control access to certain parts of a web application based on the user's role. This component is particularly useful in applications where different users have different permissions and access levels.

import type { Theme, SxProps } from '@mui/material/styles';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export type RoleBasedGuardProp = {
  sx?: SxProps<Theme>;
  currentRole: string;
  // hasContent?: boolean: Optional flag to indicate if content should be displayed when access is denied.
  hasContent?: boolean;
  // acceptRoles: string[]: An array of roles that are allowed to access the content.
  acceptRoles: string[];
  // The content to be conditionally rendered based on the user's role.
  children: React.ReactNode;
};

export function RoleBasedGuard({
  sx,
  children,
  hasContent,
  currentRole,
  acceptRoles,
}: RoleBasedGuardProp) {
  // Role Check: The component first checks if the acceptRoles array is defined and if it does not include the currentRole. If the current role is not accepted, the component proceeds to render a "Permission denied" message.
  if (typeof acceptRoles !== 'undefined' && !acceptRoles.includes(currentRole)) {

    // Conditional Rendering: If the hasContent flag is set to true, the component renders a Container with a centered "Permission denied" message, an explanatory text, and a ForbiddenIllustration. The varBounce animation is applied to these elements using framer-motion.
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }
// Access Granted: If the currentRole is included in the acceptRoles array, the component renders its children, allowing access to the wrapped content.
  return <> {children} </>;
}

// In summary, the RoleBasedGuard component is a role-based access control mechanism for a React application. It checks the user's role against an array of accepted roles and conditionally renders either a "Permission denied" message or the wrapped content based on the user's role. This component helps in managing user permissions and ensuring that only authorized users can access certain parts of the application.