const { Router } = require('express');
const { Pokemon} = require('../db');
const controllers = require('../controllers/controllers');
const router = Router();

router.get('/', async(req,res) => {
    const { name } = req.query;
    try {
        if(name) {
            const pokemonEncontrado = await controllers.getNamePokemons(name);
            return res.json(pokemonEncontrado);
        }
        const allPokemon = await controllers.todosLosPokemons()
        res.json(allPokemon);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.get('/:id',async(req,res) => {
    const { id } = req.params;
    try {
        const infoPorId = await controllers.getPokemonId(id);
        res.json(infoPorId);

    } catch (error) {
        res.status(400).json(error.message);

    }
});

router.post('/',async(req,res) => {
   const body = req.body;
   try {
    const infoPoke = await controllers.pokeCreate(body);
    res.status(201).send(infoPoke);
   } catch (error) {
    res.status(404).send(error.message);
   } 
});


module.exports = router;