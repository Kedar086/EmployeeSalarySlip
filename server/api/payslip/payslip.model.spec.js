const app = require('../../app');
const request = require('supertest');
const assert = require('assert');
const should = require('should');

describe('POST /api/payslip', () => {
  const data = {
    fname: 'Kedar', 
    lname: 'Gadre',
    salary: 56000,
    srate: 9,
    date: '2018-06-01',
  };

  it('should respond with JSON array', (done) => {
    request(app)
      .post('/api/payslip')
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
  it('should produces a correct payslip', (done) => {
    request(app)
      .post('/api/payslip')
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.deepEqual(res.body, [ {
          fullName: 'Kedar Gadre',
          period: 'June 1, 2018-June 30, 2018',
          gross: 4667,
          tax: 812,
          net: 3855,
          super: 420,
        } ]);
        done();
      });
  });
  it('should produces error if salary <= 0', (done) => {
    const data = {
      fname: 'Kedar',
      lname: 'Gadre',
      salary: -56000,
      srate: 9,
      date: '2018-06-01',
    };

    request(app)
      .post('/api/payslip')
      .send(data)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.deepEqual(res.body, {
          success: false,
          message: 'Invalid salary, should not be less then zero',
        });
        done();
      });
  });
});
