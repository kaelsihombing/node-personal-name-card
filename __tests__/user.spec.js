const server = require('../src/server.js')
const chai = require('chai');
const chaiHttp = require('chai-http');
const {
   expect
} = chai;

chai.use(chaiHttp);

describe('~USER API UNIT TESTING~', function () {
   //===================REGISTER====================
   context('POST /api/v1/users', function () {
      it('Should create new user', function () {

         chai.request(server)
            .get('/')
            .end(function (err, res) {
               expect(res.status).to.equal(200);
            })
      })
   })
})