import chai from 'chai';
import chaiHttp from 'chai-http';
import {app} from '../../src/index.js';
import sinon from 'sinon';
import {jerseys} from '../../src/models/Jersey.js';
const { expect } = chai;


chai.use(chaiHttp);

describe("jerseyDataRoutes", () => {
    afterEach(() => {
      sinon.restore();
    });
  
    describe("GET /jersey/:id", () => {
      it("should return user details for a valid Id", async () => {
        const mockedJersey = new jerseys(1, "https://drive.google.com/uc?export=view&id=1WFPZvR8hCciiBo7oahgOQo4RwT16T68u", 
        "Manchester United", "Home Kit", "2023",
        "Like club, like city. Show your team's colors with pride in the Manchester United 23/24 Home Jersey. The jersey forms a cast iron link to Manchester's enduring influence around the globe. Taking design elements from a nearby Industrial Revolution-era bridge, it displays a repeating Lancashire Rose-inspired geometric pattern on the front. Sweat-wicking AEROREADY and lightweight team details make it ideal for the pitch — whether you're gearing up for an international match or your local 5-a-side.",
        "English Premier League",
        "https://premiumsoccer.com/products/manchester-united-23-24-home-jersey-ip1726?variant=40194965733510");
  
        sinon.stub(jerseys, "findById").resolves(mockedJersey);    
  
        const response = await chai
          .request(app)
          .get("/jersey/1")        
  
        expect(response.status).to.equal(200);
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
            id: 1,
            img: "https://drive.google.com/uc?export=view&id=1WFPZvR8hCciiBo7oahgOQo4RwT16T68u",
            team_name: "Manchester United",
            team_kit: "Home Kit",
            year: "2023",
            description: "Like club, like city. Show your team's colors with pride in the Manchester United 23/24 Home Jersey. The jersey forms a cast iron link to Manchester's enduring influence around the globe. Taking design elements from a nearby Industrial Revolution-era bridge, it displays a repeating Lancashire Rose-inspired geometric pattern on the front. Sweat-wicking AEROREADY and lightweight team details make it ideal for the pitch — whether you're gearing up for an international match or your local 5-a-side.",
            league_name: "English Premier League",
            purchase_link: "https://premiumsoccer.com/products/manchester-united-23-24-home-jersey-ip1726?variant=40194965733510"
        });
      });
    })
})