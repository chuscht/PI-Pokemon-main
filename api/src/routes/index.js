const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRoutes = require('./pokemons')
const typeRoutes = require('./type')

const router = Router();


router.use('/pokemons' ,pokemonsRoutes);
router.use('/types',typeRoutes)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
