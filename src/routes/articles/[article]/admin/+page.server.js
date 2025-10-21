import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    if (!locals.authed) {
        throw redirect(302, '/admin-login');
    }

    return {};
};