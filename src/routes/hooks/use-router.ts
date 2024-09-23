export { useRouter } from 'next/navigation';

// Benefits of Re-exporting
// Simplified Imports: By re-exporting useRouter, you can import it from a centralized location in your project. This reduces the need to remember the exact path of the next/navigation package every time you need to use the hook.
// Encapsulation: Re-exporting can encapsulate third-party dependencies. If you ever decide to switch from next/navigation to another routing library, you only need to update the import path in this file, rather than in every file where useRouter is used.
// Consistency: It ensures that all parts of your application are using the same version of the useRouter hook, which can help prevent bugs and inconsistencies.