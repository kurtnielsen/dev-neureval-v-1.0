// The provided code snippet is a TypeScript file that defines the navigation structure for a dashboard in a React application. It imports necessary modules and components, defines a set of icons, and exports a navigation data structure that organizes the dashboard's navigation items into different sections.

// ----------------------------------------------------------------------
// The paths object is imported from the src/routes/paths module, which contains the URL paths for the dashboard.
import { paths } from 'src/routes/paths';

// The CONFIG object is imported from src/config-global, which likely contains global configuration settings for the application.
import { CONFIG } from 'src/config-global';

// The Label, Iconify, and SvgColor components are imported from their respective modules in the src/components directory. These components are used to render labels, icons, and SVG images in the navigation items.
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

// The icon function takes an icon name as a parameter and returns an SvgColor component with the source set to the corresponding SVG file in the assets directory.
const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

// The ICONS object maps icon names to their corresponding SvgColor components. This object is used to easily reference icons in the navigation items.
const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  googleCalendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------
// The navData array defines the structure of the navigation menu. It is divided into three main sections: Overview, Management, and Misc.
// Each section contains a subheader and an array of items. Each item represents a navigation link and includes properties such as title
// This data structure is used to render the navigation menu, allowing users to navigate through different sections of the dashboard.
export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      { title: 'App', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: 'Ecommerce', path: paths.dashboard.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'Analytics', path: paths.dashboard.general.analytics, icon: ICONS.analytics },
      { title: 'Banking', path: paths.dashboard.general.banking, icon: ICONS.banking },
      { title: 'Booking', path: paths.dashboard.general.booking, icon: ICONS.booking },
      { title: 'File', path: paths.dashboard.general.file, icon: ICONS.file },
      { title: 'Course', path: paths.dashboard.general.course, icon: ICONS.course },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'User',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Profile', path: paths.dashboard.user.root },
          { title: 'Cards', path: paths.dashboard.user.cards },
          { title: 'List', path: paths.dashboard.user.list },
          { title: 'Create', path: paths.dashboard.user.new },
          { title: 'Edit', path: paths.dashboard.user.edit },
          { title: 'Account', path: paths.dashboard.user.account },
        ],
      },
      {
        title: 'Product',
        path: paths.dashboard.product.root,
        icon: ICONS.product,
        children: [
          { title: 'List', path: paths.dashboard.product.root },
          { title: 'Details', path: paths.dashboard.product.details },
          { title: 'Create', path: paths.dashboard.product.new },
          { title: 'Edit', path: paths.dashboard.product.edit },
        ],
      },
      {
        title: 'Order',
        path: paths.dashboard.order.root,
        icon: ICONS.order,
        children: [
          { title: 'List', path: paths.dashboard.order.root },
          { title: 'Details', path: paths.dashboard.order.details },
        ],
      },
      {
        title: 'Invoice',
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'List', path: paths.dashboard.invoice.root },
          { title: 'Details', path: paths.dashboard.invoice.details },
          { title: 'Create', path: paths.dashboard.invoice.new },
          { title: 'Edit', path: paths.dashboard.invoice.edit },
        ],
      },
      {
        title: 'Blog',
        path: paths.dashboard.post.root,
        icon: ICONS.blog,
        children: [
          { title: 'List', path: paths.dashboard.post.root },
          { title: 'Details', path: paths.dashboard.post.details },
          { title: 'Create', path: paths.dashboard.post.new },
          { title: 'Edit', path: paths.dashboard.post.edit },
        ],
      },
      {
        title: 'Job',
        path: paths.dashboard.job.root,
        icon: ICONS.job,
        children: [
          { title: 'List', path: paths.dashboard.job.root },
          { title: 'Details', path: paths.dashboard.job.details },
          { title: 'Create', path: paths.dashboard.job.new },
          { title: 'Edit', path: paths.dashboard.job.edit },
        ],
      },
      {
        title: 'Tour',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'List', path: paths.dashboard.tour.root },
          { title: 'Details', path: paths.dashboard.tour.details },
          { title: 'Create', path: paths.dashboard.tour.new },
          { title: 'Edit', path: paths.dashboard.tour.edit },
        ],
      },
      { title: 'File manager', path: paths.dashboard.fileManager, icon: ICONS.folder },
      {
        title: 'Mail',
        path: paths.dashboard.mail,
        icon: ICONS.mail,
        info: (
          <Label color="error" variant="inverted">
            +32
          </Label>
        ),
      },
      { title: 'Chat', path: paths.dashboard.chat, icon: ICONS.chat },
      { title: 'Calendar', path: paths.dashboard.calendar, icon: ICONS.calendar },
      { title: 'GoogleCalendar', path: paths.dashboard.googleCalendar, icon: ICONS.googleCalendar },
      { title: 'Kanban', path: paths.dashboard.kanban, icon: ICONS.kanban },
    ],
  },
  /**
   * Item State
   */
  {
    subheader: 'Misc',
    items: [
      {
        // default roles : All roles can see this entry.
        // roles: ['user'] Only users can see this item.
        // roles: ['admin'] Only admin can see this item.
        // roles: ['admin', 'manager'] Only admin/manager can see this item.
        // Reference from 'src/guards/RoleBasedGuard'.
        title: 'Permission',
        path: paths.dashboard.permission,
        icon: ICONS.lock,
        roles: ['admin', 'manager'],
        caption: 'Only admin can see this item',
      },
      {
        title: 'Level',
        path: '#/dashboard/menu_level',
        icon: ICONS.menuItem,
        children: [
          {
            title: 'Level 1a',
            path: '#/dashboard/menu_level/menu_level_1a',
            children: [
              {
                title: 'Level 2a',
                path: '#/dashboard/menu_level/menu_level_1a/menu_level_2a',
              },
              {
                title: 'Level 2b',
                path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b',
                children: [
                  {
                    title: 'Level 3a',
                    path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a',
                  },
                  {
                    title: 'Level 3b',
                    path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b',
                  },
                ],
              },
            ],
          },
          { title: 'Level 1b', path: '#/dashboard/menu_level/menu_level_1b' },
        ],
      },
      {
        title: 'Disabled',
        path: '#disabled',
        icon: ICONS.disabled,
        disabled: true,
      },
      {
        title: 'Label',
        path: '#label',
        icon: ICONS.label,
        info: (
          <Label
            color="info"
            variant="inverted"
            startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}
          >
            NEW
          </Label>
        ),
      },
      {
        title: 'Caption',
        path: '#caption',
        icon: ICONS.menuItem,
        caption:
          'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
      },
      {
        title: 'Params',
        path: '/dashboard/params?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        icon: ICONS.parameter,
      },
      {
        title: 'External link',
        path: 'https://www.google.com/',
        icon: ICONS.external,
        info: <Iconify width={18} icon="prime:external-link" />,
      },
      { title: 'Blank', path: paths.dashboard.blank, icon: ICONS.blank },
    ],
  },
];

// Explanation
// The navData constant is exported, making it available for import in other parts of the application. This array contains objects that define the structure and content of the navigation menu.
// The first object in the navData array represents the "Overview" section of the navigation menu. This section is identified by the subheader property set to 'Overview'.
// The items array within the "Overview" section contains individual navigation items. Each item is an object with the following properties:
// = title: A string representing the name of the navigation item, such as 'App', 'Ecommerce', 'Analytics', etc.
// = path: A string representing the URL path to which the navigation item points. These paths are derived from the paths object, specifically from paths.dashboard and its nested properties.
// = icon: An icon representing the navigation item visually. These icons are referenced from the ICONS object, which presumably contains various icon definitions.

// In summary, this code snippet defines a portion of the navigation data for a React dashboard application. The navData array contains sections, each with a subheader and a list of navigation items. Each navigation item includes a title, a path, and an icon. This structure allows the application to dynamically render a navigation menu based on the defined data, providing a consistent and organized way for users to navigate through different sections of the dashboard.
