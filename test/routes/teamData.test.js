import chai from 'chai';
import chaiHttp from 'chai-http';
import {app} from '../../src/index.js';
import sinon from 'sinon';
import {teams} from '../../src/models/Team.js';
const { expect } = chai;


chai.use(chaiHttp);

describe("POST /teams", () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it("should add a team and return a 201 status", async () => {
      sinon.stub(teams, "findByTeamName").resolves(null);
      const saveStub = sinon.stub(teams.prototype, "teamsave").resolves();
  
      const response = await chai.request(app).post("/teams").send({
        team_name: "Chelsea",
      });
  
      expect(response.status).to.equal(201);
      expect(saveStub.calledOnce).to.be.true;
      expect(response.text).to.equal("Added new team: Chelsea");
    });

});