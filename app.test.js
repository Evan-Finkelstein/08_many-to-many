const fs = require('fs');
const request = require('supertest');
const app = require('./index');
const Cocktail = require('./models/cocktails');
const Liquor = require('./models/liquors');
const pool = require('./lib/utils/pool');


describe('app tests', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    })
    afterAll(() => {
        return pool.end();
    });



    it('finds a cocktail by id via GET', async () => {
        await Promise.all([
            { type: 'vodka' },
            { type: 'cream' },

        ].map(liquor => Liquor.insert(liquor)));

        const cocktail = await Cocktail.insert({
            name: 'white russian',
            liquors: ['vodka', 'cream']
        });

        const response = await request(app)
            .get(`/cocktails/${cocktail.id}`);

        expect(response.body).toEqual({
            ...cocktail,
            liquors: ['vodka', 'cream']
        });
    });

    it('finds all cocktails', async () => {
        const cocktail = await Cocktail.insert({
            name: 'old fashioned',

        });
        const response = await request(app)
            .get('/cocktails');
        expect(response.body).toEqual([cocktail]);

    })

    it('updates an cocktail', async () => {
        const cocktail = await Cocktail.insert({
            name: 'beer',

        });
        const response = await request(app)
            .put(`/cocktails/${cocktail.id}`)
            .send({
                name: 'shot',

            })
        expect(response.body).toEqual({
            name: 'shot',
            id: cocktail.id,

        })



    });


    it('deletes an cocktail', async () => {
        const cocktail = await Cocktail.insert({
            name: 'shot',

        })
        const response = await request(app)
            .delete(`/cocktails/${cocktail.id}`);
        expect(response.body).toEqual(cocktail);
    });


    it('create an cocktail', async () => {


        const response = await request(app)
            .post('/cocktails')
            .send({
                name: 'G and T',


            });
        expect(response.body).toEqual({
            id: '1',
            name: 'G and T',

        })
    })

    it('create a liquor', async () => {


        const response = await request(app)
            .post('/liquors')
            .send({
                type: 'vodka',
            });
        expect(response.body).toEqual({
            id: '1',
            type: 'vodka',
        });
    });

    it('finds a liquor by id', async () => {

        const liquor = await Liquor.insert({
            type: 'beer',

        });
        const response = await request(app)
            .get(`/liquors/${liquor.id}`);
        expect(response.body).toEqual(liquor);

    });
    it('finds all liquors', async () => {

        const liquor = await Liquor.insert({
            type: 'vodka',

        });
        const response = await request(app)
            .get('/liquors');
        expect(response.body).toEqual([liquor]);

    });

    it('updates a liquor', async () => {

        const liquor = await Liquor.insert({
            type: 'vodka',

        });
        const response = await request(app)
            .put(`/liquors/${liquor.id}`)
            .send({
                type: 'beer',

            });
        expect(response.body).toEqual({
            type: 'beer',
            id: liquor.id,

        });



    });


    it('deletes a liquor', async () => {

        const liquor = await Liquor.insert({
            type: 'vodka',

        });

        const response = await request(app)
            .delete(`/liquors/${liquor.id}`);
        expect(response.body).toEqual(liquor);
    });
});



