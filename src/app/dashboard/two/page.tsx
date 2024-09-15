import { CONFIG } from 'src/config-global';
import { BlankView } from 'src/sections/blank/view';
import CreatePost from './crud-component';

// ----------------------------------------------------------------------

export const metadata = { title: `Page two | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <main className="h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-gray-200 p-8 rounder-lg shadow-md w-96">
          <CreatePost />;
        </div>
        <BlankView title="Page three" />
      </main>
    </>
  );
}
