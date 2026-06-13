import { Suspense } from 'react';
import SearchPage from './search-content';

export default function Search() {
  return (
    <Suspense fallback={<div className="flex min-h-[40vh] items-center justify-center">Searching...</div>}>
      <SearchPage />
    </Suspense>
  );
}
