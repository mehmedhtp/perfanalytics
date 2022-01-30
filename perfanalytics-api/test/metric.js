let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");
let should = chai.should();

let ttfbTimeExamples = [11.233, 0.4342333, 11.233, 0.99];

const testData = ({ date, ttfbTime = ttfbTimeExamples[0] }) => ({
  url: "http://www.test1.com",
  date,
  fcpTime: 122.44,
  ttfbTime,
  domLoadTime: 43.33,
  windowLoadTime: 0.055,
  scriptResourceLoadTime: 0.123,
  cssResourceLoadTime: 22.22,
  imgResourceLoadTime: 0.444,
  linkResourceLoadTime: 32.11,
  httpResourceLoadTime: 1.2,
  fetchResourceLoadTime: 0.09,
});

chai.use(chaiHttp);

describe("METRIC", () => {
  /********************* POST 3 METRICS FOR 3 DIFF TIME AND TEST GET RESULTS FOR THE LAST HALF HOUR  */
  describe("/GET METRIC", () => {
    it("SHOULD GET ALL METRICS FOR THE LAST HALF HOUR", (done) => {
      let currentDateTime = new Date();
      let previousDateTime = new Date().setHours(
        currentDateTime.getHours() - 1
      );
      let laterDateTime = new Date().setHours(currentDateTime.getHours() + 1);
      chai
        .request(app)
        .post("/metric")
        .set("Content-Type", "application/json")
        .send(
          testData({
            date: previousDateTime.toString(),
            ttfbTime: ttfbTimeExamples[1],
          })
        )
        .end((err, res) => {
          res.should.have.status(200);
        });
      chai
        .request(app)
        .post("/metric")
        .set("Content-Type", "application/json")
        .send(
          testData({
            date: currentDateTime.toString(),
          })
        )
        .end((err, res) => {
          res.should.have.status(200);
        });
      chai
        .request(app)
        .post("/metric")
        .set("Content-Type", "application/json")
        .send(
          testData({
            date: laterDateTime.toString(),
            ttfbTime: ttfbTimeExamples[2],
          })
        )
        .end((err, res) => {
          res.should.have.status(200);
        });

      // Test the result
      chai
        .request(app)
        .get("/metric")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.least(1);
          res.body[res.body.length - 1].ttfbTime.should.be.eq(
            ttfbTimeExamples[0]
          );
          res.body.forEach((metric) => {
            metric.date.should.be.not.eq(ttfbTimeExamples[1]);
            metric.date.should.be.not.eq(ttfbTimeExamples[2]);
          });
          done();
        });
    });
  });

  /********************* POST METRICS AND TEST GET RESULTS FOR CREATED OBJ  */
  describe("/POST METRIC", () => {
    it("SHOULD RETURN CREATED METRIC OBJ", (done) => {
      let data = testData({ date: new Date().toString() });
      chai
        .request(app)
        .post("/metric")
        .set("Content-Type", "application/json")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.data.url.should.be.eq(data.url);
          res.body.data.fcpTime.should.be.eq(data.fcpTime);
          res.body.data.ttfbTime.should.be.eq(data.ttfbTime);
          res.body.data.domLoadTime.should.be.eq(data.domLoadTime);
          done();
        });
    });
    it("SHOULD RETURN 500 FOR INVALID METRIC OBJ", (done) => {
      let data = { myTestProp: 32323 };
      chai
        .request(app)
        .post("/metric")
        .set("Content-Type", "application/json")
        .send(data)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
