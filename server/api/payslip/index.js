const controller = require('./payslip.controller');

module.exports = (express) => {

  const router = express.Router();

  router.post('/', controller.create);

  return router;

};
