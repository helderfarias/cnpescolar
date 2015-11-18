var express = require('express');
var router = express.Router();

router.route('/tokens').get(function(req, res) {
    res.json([{
        "id": 1,
        "name": "Max",
        "band": "Maximum Pain",
        "instrument": "guitar"
    }]);
});

module.exports = router;
