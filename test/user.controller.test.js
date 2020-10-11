const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const dotenv = require("dotenv");
const server = require("../server");
const config = require("../api/config/config");
const User = require("../api/models/user.model")

dotenv.config({
  path: process.env.PATH_ENVIRONMENT
});

chai.use(chaiHttp);

describe('GET, POST, DELETE, PUT /user: ', () => {

  it('should return status 200 - POST', async () => {
    const response = await chai.request(server)
      .post(`${config.PathApi}user`)
      .send({
        fullName: "Miguel Angel López Monzón",
        identificationDocument: 47878429,
        cellPhone: 977644214,
        email: "devmiguelopz@gmail.com"
      })
    expect(response.status).to.equal(200)
  });


  it('should return status 200 - PUT', async () => {
    const user = await User.findOne({ identificationDocument: 47878429 });
    const response = await chai.request(server)
      .put(`${config.PathApi}user/${user.id}`)
      .send({
        fullName: "Alexis Jordan López Monzón",
        identificationDocument: 47878429,
        cellPhone: 977644210,
        email: "alexis@gmail.com"
      })
    expect(response.status).to.equal(200)
  });


  it('should return status 200 - GET', async () => {
    const response = await chai.request(server)
      .get(`${config.PathApi}user`)
    expect(response.status).to.equal(200)
  });


  it('should return status 200 - GET:id', async () => {
    const user = await User.findOne({ identificationDocument: 47878429 });
    const response = await chai.request(server)
      .get(`${config.PathApi}user/${user.id}`)
    expect(response.status).to.equal(200)
  });


});
after(async () => {
  await User.deleteOne({ identificationDocument: 47878429 })
})
