// ----------------------------------------------------------------------
// The hasParams function checks if a given URL contains query parameters.
// It splits the URL at the ? character to isolate the query string.
// If a query string exists, it creates a URLSearchParams object and checks if the serialized query string has a length greater than zero.
// This function returns true if the URL has query parameters, otherwise false.

export const hasParams = (url: string): boolean => {
  const urlString = typeof url === 'string' ? url : String(url);
  const queryString = urlString.split('?')[1];
  return queryString ? new URLSearchParams(queryString).toString().length > 0 : false;
};
// ----------------------------------------------------------------------
// The removeLastSlash function removes the trailing slash from a given pathname, except if the pathname is just /.
// This function is useful for normalizing pathnames to avoid issues with trailing slashes.
export function removeLastSlash(pathname: string): string {
  /**
   * Remove last slash
   * [1]
   * @input  = '/dashboard/calendar/'
   * @output = '/dashboard/calendar'
   * [2]
   * @input  = '/dashboard/calendar'
   * @output = '/dashboard/calendar'
   */
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

// ----------------------------------------------------------------------
// The removeParams function removes query parameters from a given URL and returns the pathname without the trailing slash.
// It creates a URL object using the provided URL and the current window's origin.
// This function is useful for obtaining a clean pathname from a URL.
export function removeParams(url: string): string {
  try {
    const urlObj = new URL(url, window.location.origin);

    return removeLastSlash(urlObj.pathname);
  } catch (error) {
    return url;
  }
}

// ----------------------------------------------------------------------
// The isExternalLink function checks if a given URL is an external link (by checking if it starts with http).
// It is useful for distinguishing between internal and external links in a web application.
export function isExternalLink(url: string): boolean {
  const urlString = typeof url === 'string' ? url : String(url);
  return urlString.startsWith('http');
}


// In summary, these utility functions provide essential URL and pathname handling capabilities for a web application built with Node.js, npm, React, and TypeScript. The hasParams function checks for query parameters, the removeLastSlash function normalizes pathnames by removing trailing slashes, the removeParams function strips query parameters from URLs, and the isExternalLink function identifies external links. These functions enhance the robustness and maintainability of URL handling within the application.