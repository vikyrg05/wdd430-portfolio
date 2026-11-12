
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({
    totalPages,
}: {
    totalPages: number;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Math.max(
        1,
        Number(searchParams.get('page')) || 1
    );

    function createPageURL(pageNumber: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    }

    return (
        <div className="flex justify-center gap-4 mt-8">
            <Link
                href={createPageURL(currentPage - 1)}
                aria-disabled={currentPage <= 1}
                className={`rounded-lg border px-4 py-2 ${currentPage <= 1
                    ? 'pointer-events-none opacity-50'
                    : 'hover:bg-gray-100'
                    }`}
                tabIndex={currentPage <= 1 ? -1 : undefined}
            >
                Previous
            </Link>

            <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
            </span>

            <Link
                href={createPageURL(currentPage + 1)}
                aria-disabled={currentPage >= totalPages}
                className={`rounded-lg border px-4 py-2 ${currentPage >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'hover:bg-gray-100'
                    }`}
                tabIndex={currentPage >= totalPages ? -1 : undefined}
            >
                Next
            </Link>
        </div>
    );
}
