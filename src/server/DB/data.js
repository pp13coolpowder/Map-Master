const {Pool} = require('pg')
require('dotenv').config();
const pool = new Pool({
    connectionString: process.env.DBConnLink + "?sslmode=require",
});
exports.data = async () => {
    try {
        const client = await pool.connect();
        console.log("Database connected");
        client.release();
    }
    catch (err) {
        console.log(err)
    }
}
exports.queryMariadb = async (req, values) => {
    try {
        const conn = await pool.connect();
        const rows = await conn.query(req, values);
        conn.release()
        return rows.rows
    } catch (err) {
        throw err;
    }
}

