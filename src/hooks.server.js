import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export async function handle({ event, resolve }) {
    const token = event.cookies.get('jwt');
    
    if (token) {
        const payload = jwt.verify(token, JWT_SECRET);
        if (payload === 'true') event.locals.authed = true;
        else event.locals.authed = false;
    } else {
        event.locals.authed = false;
    }
    return await resolve(event);
}