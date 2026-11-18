
'use client';

import { useActionState } from 'react';
import { createProject, type State } from '@/app/lib/actions';

const initialState: State = {
    message: null,
    errors: {},
};

const currentYear = new Date().getFullYear();

export default function CreateProjectForm() {
    const [state, formAction, isPending] = useActionState(
        createProject,
        initialState
    );

    return (
        <form action={formAction} className="space-y-5">
            <div>
                <label htmlFor="title" className="block mb-2 font-medium">
                    Project Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    minLength={2}
                    aria-describedby="title-error"
                    className="w-full border rounded-lg p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B2A22] focus-visible:ring-offset-2"
                />
                <div id="title-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.title?.map((error) => (
                        <p className="mt-2 text-sm text-red-600" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block mb-2 font-medium">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    minLength={10}
                    rows={4}
                    aria-describedby="description-error"
                    className="w-full border rounded-lg p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B2A22] focus-visible:ring-offset-2"
                />
                <div id="description-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.description?.map((error) => (
                        <p className="mt-2 text-sm text-red-600" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="technologies" className="block mb-2 font-medium">
                    Technologies (separated by commas)
                </label>
                <input
                    id="technologies"
                    name="technologies"
                    type="text"
                    required
                    minLength={2}
                    placeholder="React, TypeScript, Next.js"
                    aria-describedby="technologies-error"
                    className="w-full border rounded-lg p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B2A22] focus-visible:ring-offset-2"
                />
                <div id="technologies-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.technologies?.map((error) => (
                        <p className="mt-2 text-sm text-red-600" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="yearCompleted" className="block mb-2 font-medium">
                    Year Completed
                </label>
                <input
                    id="yearCompleted"
                    name="yearCompleted"
                    type="number"
                    required
                    min={2000}
                    max={currentYear}
                    aria-describedby="yearCompleted-error"
                    className="w-full border rounded-lg p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B2A22] focus-visible:ring-offset-2"
                />
                <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.yearCompleted?.map((error) => (
                        <p className="mt-2 text-sm text-red-600" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="type" className="block mb-2 font-medium">
                    Project Type
                </label>
                <select
                    id="type"
                    name="type"
                    required
                    aria-describedby="type-error"
                    className="w-full border rounded-lg p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B2A22] focus-visible:ring-offset-2"
                >
                    <option value="school">School</option>
                    <option value="opensource">Open Source</option>
                </select>
                <div id="type-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.type?.map((error) => (
                        <p className="mt-2 text-sm text-red-600" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="link" className="block mb-2 font-medium">
                    Project Link (optional)
                </label>
                <input
                    id="link"
                    name="link"
                    type="url"
                    aria-describedby="link-error"
                    className="w-full border rounded-lg p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B2A22] focus-visible:ring-offset-2"
                />
                <div id="link-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.link?.map((error) => (
                        <p className="mt-2 text-sm text-red-600" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div aria-live="polite" aria-atomic="true">
                {state.message && (
                    <p className="text-sm text-red-600">{state.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="bg-[#3B2A22] text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B2A22] focus-visible:ring-offset-2"
            >
                {isPending ? 'Creating...' : 'Create Project'}
            </button>
        </form>
    );
}
