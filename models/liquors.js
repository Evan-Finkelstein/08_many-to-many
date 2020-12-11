
const pool = require('../lib/utils/pool.js')


module.exports = class Liquor {
    id;
    type;


    constructor(row) {
        this.id = String(row.id);
        this.type = row.type;

    }

    static async insert({ type }) {
        const { rows } = await pool.query(
            'INSERT INTO liquors (type) VALUES ($1) RETURNING *',
            [type]
        );
        return new Liquor(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM liquors');
        return rows.map(row => new Liquor(row));
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM liquors WHERE id=$1', [id]);
        if (!rows[0]) throw new Error(`No Liquor with id ${id}`);
        return new Liquor(rows[0]);
    }

    static async update(id, { type }) {
        const { rows } = await pool.query('UPDATE liquors SET type=$1 WHERE id = $2 RETURNING *', [type, id]);
        return new Liquor(rows[0]);
    }
    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM liquors WHERE id=$1 RETURNING *', [id]
        );
        return new Liquor(rows[0]);
    }
};
