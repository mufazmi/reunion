let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../build/app");
let expect = chai.expect;
chai.use(chaiHttp);

describe('User APIs', async () => { 
    let token = "";
    let userId = "";

    describe('POST /api/authenticate',  () => { 
        it('should authenticate the user and return token', async () => {
            const res = await chai.request(app)
                .post('/api/authenticate')
                .send({
                    email: 'jhon@doe.com',
                    password: 'pass1234'
                });
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('accessToken');
            token = res.body.token;
            expect(res.body).to.have.property('userId');
            userId = res.body.userId;
        }, { timeout: 5000 })
    });

});