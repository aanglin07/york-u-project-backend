import chai from 'chai';
import chaiHttp from 'chai-http';
import {app} from '../../src/index.js';
import sinon from 'sinon';
import {User} from '../../src/models/User.js';
const { expect } = chai;

chai.use(chaiHttp);

describe("POST /register", () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it("should register a new user and return a 201 status", async () => {
      sinon.stub(User, "findByEmail").resolves(null);
      const saveStub = sinon.stub(User.prototype, "save").resolves();
  
      const response = await chai.request(app).post("/register").send({
        email: "dramsay_20@yahoo.com",
        password: "testing",
      });
  
      expect(response.status).to.equal(201);
      expect(saveStub.calledOnce).to.be.true;
      expect(response.text).to.equal("Created User: dramsay_20@yahoo.com");
    });

});
