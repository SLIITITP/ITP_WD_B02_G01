const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { getCus, setCus, updateCus, deleteCus } = require('../controllers/CustomerController');

router.route('/').post(setCus).get(getCus);
router.route('/:id').put(updateCus).delete(deleteCus);

module.exports = router;