export * from './use-active-link';
//

export { useParams } from './use-params';

export { useRouter } from './use-router';

export { usePathname } from './use-pathname';

export { useSearchParams } from './use-search-params';

// In summary, the index.ts file serves as an aggregator for various hooks used in the project. 
// By re-exporting these hooks, it simplifies the import process in other parts of the application. 
// Instead of importing each hook individually from its respective file, you can import them all from this single index.ts file. 
// This practice enhances code organization and maintainability, especially in larger projects that involve multiple modules and utilities.