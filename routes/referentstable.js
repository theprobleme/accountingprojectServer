const express = require('express');
const referentstableController = require('../controllers/referentstableController')

const router = express.Router();

router.get('/referentstable', referentstableController.getReferents)

// router.post('/clubstable', referenttableController.createClub)
// router.delete('/clubstable', referenttableController.deleteClub)
// router.put('/clubstable', referenttableController.modifiedClub)

module.exports = router;