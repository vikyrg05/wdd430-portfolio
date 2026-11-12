
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function ProjectSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        push(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative mt-6">
            <input
                type="search"
                placeholder="Search projects..."
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none"
            />
        </div>
    );
}
