# Notes For Navigation

## Main source to add urls
src > utils > axios.ts 
This file adds endpoints to the app.

### Confusion
It the mock-server app, they are using the more traditional /api/xxx but in the base app they are using axios.ts? I am not sure if this is just setup for demo  purposes or if they are showing two different ways of doing it. However, axios.ts does list the api/xxx endpoints so maybe they just didn't set this part up yet?
I just added the product endpoints to try to figure it out. 


## Routes
src > layouts > config-nav-dashboard.tsx
This file defines the navigation data for the dashboard.

src > layouts > config-nav-account.tsx
This file defines the navigation data for the account section.

src > layouts > config-nav-workspace.tsx
This file defines the navigation data for the workspaces section.

src > layouts > config-nav-main.tsx
This file defines the navigation data for the main section. This is the horizontal navigation menu that appears on the public landing page.

src > routes > paths.ts
This file defines the routes for the app.

The path object is the main source of truth for the application's routing.
It defines the structure of the application's URLs, including the root paths, general categories, and specific paths for different sections of the application.

The paths object is organized into categories, such as general pages, product-related paths, post-related paths, authentication paths, and dashboard paths.

Each category is further divided into specific paths, such as the root path for the general category, the root path for the product-related category, and the root path for the post-related category.

The paths object also includes placeholders for dynamic paths, such as the post path, which includes a dynamic parameter for the post title.

For example, to add a new path for a new page, you would add a new property to the paths object, such as:

```javascript
export const paths = {
  // ...
  newPage: '/new-page',
};
```

This would add a new path for the newPage property, which would be accessible at the URL /new-page.

Then add a folder in apps/dashboard/new-page and add the page.tsx file.
Then add a folder in apps/sections/new-page and add the view.tsx file.
Then add a route.ts file in apps/api/new-page and add the route.ts file.
In the route.ts file, add the GET method and the runtime property.


To add a dynamic path, you would use a template literal, such as:

```javascript
export const paths = {
  // ...
  post: {
    root: `/post`,
    details: (title: string) => `/post/${paramCase(title)}`,
    demo: { details: `/post/${paramCase(MOCK_TITLE)}` },
  },
};
```

This would add a new path for the post property, which includes a dynamic parameter for the post title. The dynamic parameter is defined using a template literal, which allows for dynamic values to be inserted into the path.

To creat a link to another page, you would use the `Link` component from the Next.js library, such as:

```javascript
import { paths } from 'src/routes/paths';

// ...

<Link href={paths.newPage} variant="outlined">
  New Page
</Link>
```

This would create a link to the newPage path, which would navigate to the new-page page.

