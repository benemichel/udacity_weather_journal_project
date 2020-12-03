const server = require('../server.js')
const request = require('supertest');

const chai = require('chai');
const expect = chai.expect;

const chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('GET routes', () => {
    console.log('start test suite');
    it('/journal', async (done) => {
        await chai.request(server).get('/journals/0')
            .end( (err, res) => {
                console.log(res);
                expect(res).to.have.status(200);
                done();
            })
        done();
    });

})