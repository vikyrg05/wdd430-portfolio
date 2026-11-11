
export default function Loading() {
    return (
        <main className="animate-pulse space-y-6 py-6">
            <section className="space-y-4">
                <div className="h-10 w-2/3 rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
            </section>

            <section className="grid gap-6 mt-8 md:grid-cols-2">
                <div className="h-40 rounded-lg bg-slate-200" />
                <div className="h-40 rounded-lg bg-slate-200" />
            </section>
        </main>
    );
}
