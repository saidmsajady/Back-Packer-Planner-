const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.get('/', tripController.trip_index);
router.post('/', tripController.trip_create_post);
router.get('/:id', tripController.trip_details);
router.delete('/:id', tripController.trip_delete);

module.exports = router;