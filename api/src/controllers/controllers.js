const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { Router } = require('express');
const ulr40 = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0';
const router = Router();

const getPokemonsApi = async () => {
	try {
        //const arrPoke = [];
        const pokemonsApi = await axios.get(ulr40)
        const apiInfo = await pokemonsApi.data.results.map( el =>  {return axios.get(el.url);});
        //console.log(apiInfo)
        const dataPromise = await Promise.all(apiInfo)
        //console.log(dataPromise)
        const pokeData = dataPromise.map(el => el.data);
        const pokeMap= pokeData.map(el => {
			return {
				id: el.id,
				name: el.name,
				hp: el.stats[0].base_stat,
				attack: el.stats[1].base_stat,
				defense: el.stats[2].base_stat,
				speed: el.stats[5].base_stat,
				height: el.height,
				weight: el.weight,
				img: el.sprites.other.home.front_default,
				imgShiny: el.sprites.other.home.front_shiny,
				types: el.types.map((el) => el.type.name),
			};
		})
return pokeMap;
//console.log(pokeMap)

        //console.log(pokemonsApi)

    } catch (error) {
        console.log(error)
    }
};

const getDbInfo = async () => {
	return await Pokemon.findAll({
		include:{
			model:Type,
			attributes:['name'],
			through:{
				attributes:[],
			}
		}
	})
};

const todosLosPokemons = async() =>{
	const deApi = await getPokemonsApi();
	const deDb = await getDbInfo();

	const todaLaData = [...deApi, ...deDb]

	return todaLaData;
};

const getNamePokemons = async (name) => {
	const allPokemons = await getPokemonsApi();

	let pokemonEncontrado = allPokemons.filter(el => el.name.toLowerCase() === name.toLowerCase());

	if(!pokemonEncontrado.length) {
		throw new Error(`El pokemon ${name} no a sido encontrado`);
	}
	return pokemonEncontrado;
};

const getPokemonId = async (id) => {
	const pokemons = await getPokemonsApi();
	const pokemonXId = pokemons.find(el => el.id === parseInt(id) )

	if(!pokemonXId)

	throw new Error(`Uupss el pokemon de id: ${id} no existe!!`);
//console.log(pokemonXId)
	return pokemonXId
};

//getPokemonId(1) 

const typesInDb = async () => {
	try {
		const apiTypes = await axios.get('https://pokeapi.co/api/v2/type');

		await apiTypes.data.results.map((type) => {
			Type.findOrCreate({
				// Observar que type es un objeto, con la propiedad
				where: {
					name: type.name,
				},
			});
		});
	} catch (error) {
		console.log(error, 'typesInDb');
	}
};

// getTypes te devuelve los types desde la api
const getTypes = async () => {
	const dbTypes = await Type.findAll();

	if (!dbTypes.length) throw new Error(`No se encontraros tipos`);

	return dbTypes;
};

// pokeCheckName se usa en la funcion pokeCreate
const pokeValidateName = async (name) => {
	const allPokemons = await todosLosPokemons();

	const pokemonFind = allPokemons.find(
		pokemon => pokemon.name.toLowerCase() === name.toLowerCase()
	);

	if (pokemonFind) {
		throw new Error(
			`No se pueden crear el pokemon ${name} debido a que ya existe un pokemon con ese nombre`
		);
	}	
};

const pokeCreate = async (body) => {
	const { name, hp, attack, defense, speed, height, weight, img, type } = body;

	if (
		!name ||
		!hp ||
		!attack ||
		!defense ||
		!speed ||
		!height ||
		!weight 
		// type.length === 0
	) { throw new Error('Faltan datos')};

	await pokeValidateName(name);

	// La api tiene en total 1154 pokemones
	let pokedex = 1154;

	// Los datos integer del body llegan como string en realidad. Les hago parseInt por eso.
	let newPokemon = await Pokemon.create({
		name: name.toLowerCase(),
		pokedex: ++pokedex,
		hp: parseInt(hp),
		attack: parseInt(attack),
		defense: parseInt(defense),
		speed: parseInt(speed),
		height: parseInt(height),
		weight: parseInt(weight),
		img: img
			? img
			: 'https://assets.pokemon.com/static2/_ui/img/og-default-image.jpeg',
	});

	const pokeType = await Type.findAll({
		where: {
			name: type,
		},
	});

	// stringify para que se loguee mas lindo
	// console.log("pokeType: \n", JSON.stringify(pokeType, null, 2));

	await newPokemon.addType(pokeType);

	return await Pokemon.findByPk(newPokemon.id, {
		include: {
			model: Type,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});
};

module.exports = {
	getPokemonsApi,
	getDbInfo,
	todosLosPokemons,
	getNamePokemons,
	getPokemonId,
	getPokemonId,
	typesInDb,
	getTypes,

	pokeCreate,
};




///////////////////////////////////////////////////////////////////////////////////////////



