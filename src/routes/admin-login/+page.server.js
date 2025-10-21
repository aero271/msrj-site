import { ADMIN_KEY, JWT_SECRET } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { randomBytes, createHash } from 'crypto'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
};

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const password = data.get('password');
        if (createHash('sha256').update(password).digest('hex') !== ADMIN_KEY)
            return fail(401, { success: false, message: 'Incorrect Password' });

        const token = jwt.sign('true', JWT_SECRET);
        cookies.set('jwt', token, {
            httpOnly: true,
            //secure: true,
            sameSite: 'strict',
            maxAge: 3600 * 24, //one day
            path: '/',
        });
        throw redirect(302, '/admin');
    }
}