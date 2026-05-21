/** Percorsi asset serviti da `public/` (copia da sito-leveleresidence). */
export function asset(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}
