// This file serves as a barrel file, which is a common pattern in TypeScript and JavaScript projects to re-export modules from a single entry point. 
// This approach simplifies the import statements in other parts of the application by consolidating multiple exports into a single file.
// This means that any functions, classes, constants, or other exports defined in these two modules will be available for import from the index.ts file.

export * from './supabase-sign-in-view';

export * from './supabase-sign-up-view';
