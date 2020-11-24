const express = require('express');
const clubstableController = require('../controllers/clubstableController')

const router = express.Router();

router.get('/clubstable', clubstableController.getClubs)
router.post('/clubstable', clubstableController.createClub)
router.delete('/clubstable', clubstableController.deleteClub)
router.put('/clubstable', clubstableController.modifiedClub)

module.exports = router;