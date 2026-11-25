import { auth } from '@/auth';
import { SignOutButton } from '@/components/sign-out-button';

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <h1 className="text-3xl font-bold text-[#3B2A22]">
                Dashboard
            </h1>

            <p className="mt-4 text-gray-600">
                Welcome, {session?.user?.name}!
            </p>

            <div className="mt-6">
                <SignOutButton />
            </div>
        </div>
    );
}