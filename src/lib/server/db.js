import mysql from 'mysql2/promise'
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } from '$env/static/private'

export const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: 'articles',
});