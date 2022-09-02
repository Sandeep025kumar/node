const { createData, logIn, updateData } = require('../controoler/controller');
const validation = require('../middleware/middleware');

const router = require('express').Router();

router.post('/create',createData)
router.post('/login',logIn)
router.put('/update/:id',validation,updateData)

module.exports = router;