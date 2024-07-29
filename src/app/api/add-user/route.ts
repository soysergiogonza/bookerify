import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    try {
        if (!id || !name || !email || !password) throw new Error('Something Missing');
        await sql`INSERT INTO users (id, name, email, password) VALUES (${id}, ${name},  ${email},  ${password});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    const users = await sql`SELECT * FROM users;`;
    return NextResponse.json({ users }, { status: 200 });
}
