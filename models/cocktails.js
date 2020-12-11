
const pool = require('../lib/utils/pool.js');
// const Liquor = require('./liquors');

module.exports = class Cocktail {
    id;
    name;


    constructor(row) {
        this.id = String(row.id);
        this.name = row.name;

    }



    static async insert({ name, liquors = [] }) {
        const { rows } = await pool.query(
            'INSERT INTO cocktails (name) VALUES ($1) RETURNING *',
            [name]
        );

        await pool.query(
            `INSERT INTO cocktails_liquors (cocktails_id, liquors_id)
      SELECT ${rows[0].id}, id FROM liquors WHERE type = ANY($1::name[])`,
            [liquors]
        );

        return new Cocktail(rows[0]);
    }


    static async find() {
        const { rows } = await pool.query('SELECT * FROM cocktails');
        return rows.map(row => new Cocktail(row));
    }



    static async findById(id) {
        const { rows } = await pool.query(
            `SELECT
                    cocktails.*,
                    array_agg(liquors.type) AS liquors
                  FROM
                    cocktails_liquors
                  JOIN cocktails
                  ON cocktails_liquors.cocktails_id = cocktails.id
                  JOIN liquors
                  ON cocktails_liquors.liquors_id = liquors.id
                  WHERE cocktails.id=$1
                  GROUP BY cocktails.id`,
            [id]
        );

        if (!rows[0]) throw new Error(`No cocktail found for id ${id}`);

        return {
            ...new Cocktail(rows[0]),
            liquors: rows[0].liquors
        };
    }

    static async update(id, { name }) {
        const { rows } = await pool.query('UPDATE cocktails SET name=$1  WHERE id = $2 RETURNING *', [name, id]);
        return new Cocktail(rows[0]);
    }
    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM cocktails WHERE id=$1 RETURNING *', [id]
        );
        return new Cocktail(rows[0]);
    }
};

