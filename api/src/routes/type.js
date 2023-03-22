const { Router }= require('express');
const { Type } = require('../db');
const { getTypes } = require('../controllers/controllers');
const router = Router();

router.get('/', async(req,res) => {
    try {
        const tipoDePoke = await getTypes();
        res.json(tipoDePoke);
    } catch (error) {
        res.status(400).json(error.message);
    }
});
module.exports = router;