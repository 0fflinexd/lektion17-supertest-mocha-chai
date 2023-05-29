import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import { createRandomUser } from '../helpers/user_helper';

//Config
dotenv.config();

//Request
const request = supertest('https://gorest.co.in/public-api/');
const token = process.env.USER_TOKEN;

// Mocha
describe('/users route', () => {
    it('GET /users', async () => {
        const res = await request.get('users');
        expect (res.body) .to.not.be.empty;
    });

    it('GET /users | query parameters - get active females', async () => {
        const url = `users?acces-token=${token}&gender=female&status=active`;
        const res = await request.get(url);
        //console.log(res.body.data);
        res.body.data.forEach((user)=> {    
            //console.log(user.gender);
            expect(user.gender).to.eq('female');
            expect(user.status).to.eq('active');
        });
    });

    it('POST /users', async () => {
        const data = createRandomUser();
        const res = await request
            .post('users')
            .set('Authorization', `Bearer ${token}`)
            .send(data);
            //console.log(res.body.data);
            expect(res.body.data).to.deep.include(data);
    });
});