import { CONFIG } from 'src/config-global';

import { GoogleCalendarView } from 'src/sections/google-calendar/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Google Calendar | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <GoogleCalendarView />; 
}
