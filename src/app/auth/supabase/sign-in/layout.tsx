import { AuthSplitLayout } from 'src/layouts/auth-split';

//This component is probably a higher-order component (HOC) or a context provider that ensures the wrapped content is only accessible to guest users. It might redirect authenticated users to a different part of the application.
import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthSplitLayout section={{ title: 'Welcome To Neureval' }}>{children}</AuthSplitLayout>
    </GuestGuard>
  );
}

// In summary, this Layout component is designed to provide a consistent layout for pages that are accessible to guest users. It uses the GuestGuard component to enforce access control and the AuthSplitLayout component to render a specific layout with a welcome message. The children prop allows any nested content to be rendered within this layout, making it a flexible and reusable component for various guest-accessible pages in the application.