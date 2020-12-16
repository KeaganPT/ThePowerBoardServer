const express = require('express');
const router = express.Router();

router.get('/testboy', function(req, res)
{
    res.send('HEY you!')
})

module.exports = router