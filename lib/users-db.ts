import { sql } from '@vercel/postgres';
import type { User } from 'next-auth';

type UserWithPassword = User & {
    passwordHash: string;
};

export async function getUserByEmail(
    email: string
): Promise<UserWithPassword | null> {
    const { rows } = await sql`
        SELECT id, name, email, password_hash
        FROM users
        WHERE LOWER(email) = LOWER(${email})
        LIMIT 1
    `;

    const user = rows[0];

    if (!user) {
        return null;
    }

    return {
        id: String(user.id),
        name: user.name,
        email: user.email,
        passwordHash: user.password_hash,
    } as UserWithPassword;
}