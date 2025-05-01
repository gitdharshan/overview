const express = require('express');
const { check } = require('express-validator');
const UpdatedRoutes = require('../controllers/UpdateController');

const router = express.Router();

router.get('/:pid', UpdatedRoutes.getDetailsById);

router.get('/user/:uid', UpdatedRoutes.getDetailsByUserId);

router.post(
  '/',
  [
    check('place').not().isEmpty(),
    check('message').not().isEmpty(),
    check('contact').not().isEmpty(),
   
  ],
  UpdatedRoutes.createDetails
);

router.put(
  '/:pid',
  [
    check('place').not().isEmpty(),
    check('address').not().isEmpty(),
  ],UpdatedRoutes.updateDetails
)
router.delete('/:pid',UpdatedRoutes.deleteDetails)

module.exports = router;
