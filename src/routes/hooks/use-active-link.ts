// usePathname is a custom hook that retrieves the current pathname.
import { usePathname } from './use-pathname';

// hasParams, removeParams, isExternalLink, and removeLastSlash are utility functions that help in manipulating and analyzing URLs.
import { hasParams, removeParams, isExternalLink, removeLastSlash } from '../utils';

// ----------------------------------------------------------------------
// The function takes two parameters: itemPath, which is the path to check, and deep, a boolean that defaults to true. The deep parameter indicates whether to perform a deep match.
// The current pathname is retrieved using usePathname and any trailing slash is removed using removeLastSlash.
// The hasParams function checks if itemPath contains query parameters.
export function useActiveLink(itemPath: string, deep: boolean = true): boolean {
  const pathname = removeLastSlash(usePathname());

  const pathHasParams = hasParams(itemPath);

  /* Start check */
  // It checks if itemPath starts with a # (indicating an anchor link) or if it is an external link using isExternalLink.
  // If either condition is true, the function returns false, indicating that the path is not active.
  const notValid = itemPath.startsWith('#') || isExternalLink(itemPath);

  if (notValid) {
    return false;
  }
  /* End check */

  /**
   * [1] Apply for Item has children or has params.
   */
  // The function then determines whether to perform a deep match:



  const isDeep = deep || pathHasParams;

  // console.info(isDeep ? '[deep]   :' : '[normal] :', itemPath, '-?-', pathname);
  if (isDeep) {
    /**
     * [1] Deep: default
     * @itemPath 			 = '/dashboard/user'
     * @match pathname = '/dashboard/user'
     * @match pathname = '/dashboard/user/list'
     * @match pathname = '/dashboard/user/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b15/edit'
     */
    const defaultActive = pathname.includes(itemPath);
// It checks if the current pathname includes itemPath (defaultActive).
    /**
     * [1] Deep: has params
     * @itemPath 			 = '/dashboard/test?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1'
     * @match pathname = '/dashboard/test'
     */
// It removes query parameters from itemPath using removeParams and checks if the resulting path matches the current pathname (hasParamsActive).
    const originItemPath = removeParams(itemPath);

// The function returns true if either defaultActive or hasParamsActive is true.
    const hasParamsActive = pathHasParams && originItemPath === pathname;

    return defaultActive || hasParamsActive;
  }

  /**
   * [1] Normal: active
   * @itemPath 			 = '/dashboard/calendar'
   * @match pathname = '/dashboard/calendar'
   */
  // If isDeep is false, the function performs a normal match: It simply checks if the current pathname is equal to itemPath.
  return pathname === itemPath;
}

// In summary, the useActiveLink function is a versatile hook for determining the active state of a navigation link. 
// It supports both deep and shallow matching, handles query parameters, and excludes invalid or external links. 
// This functionality is essential for creating dynamic and responsive navigation components in a React application.