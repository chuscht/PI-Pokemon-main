import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";

export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const GET_ALL_IMG_TYPES = "GET_ALL_IMG_TYPES";

export const CREATED = "CREATED";
export const LOADING = "LOADING";
export const FETCH_POKEMON_SUCCESS = "FETCH_POKEMON_SUCCESS";
export const FETCH_POKEMON_START = "FETCH_POKEMON_START";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const SET_NEW_POKEMON = "SET_NEW_POKEMON";

// Filters actions
export const FILTERS_RESET = "FILTERS_RESET";
export const CHANGE_FILTERS = "CHANGE_FILTERS";

// NEW
export const NEW_RESET_ORDER = "NEW_RESET_ORDER";
export const NEW_CHANGE_ORDER = "NEW_CHANGE_ORDER";
export const NEW_CHANGE_PAGE = "NEW_CHANGE_PAGE";
export const NEW_FILTER_POKEMONS_BY_NAME = "NEW_FILTER_POKEMONS_BY_NAME";
export const NEW_GET_POKEMON_BY_ID = "NEW_GET_POKEMON_BY_ID";
export const NEW_POKEMONS_NOT_FOUND = "NEW_POKEMONS_NOT_FOUND";
export const NEW_CHANGE_FILTER = "NEW_CHANGE_FILTER";
export const NEW_RESET_FILTER = "NEW_RESET_FILTER";

export function getAllPokemons() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons`);
      // const response = await axios.get(`/pokemons`);
      dispatch({ type: GET_ALL_POKEMONS, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

export const fetchPokemonStart = () => ({
  type: "FETCH_POKEMON_START",
});

export const fetchPokemonSuccess = (pokemon) => ({
  type: "FETCH_POKEMON_SUCCESS",
  payload: pokemon,
});

export function getAllTypes() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/types`);
      dispatch({ type: GET_ALL_TYPES, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

export function createPokemon(pokemon) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://localhost:3001/pokemons`,
        pokemon
      );
      dispatch({ type: CREATE_POKEMON, payload: response.data });
      // return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

export function getAllImgTypes() {
  return async function (dispatch) {
    // buscando pokemon svg logos en internet, encontré las siguientes imagenes:
    const imgTypes = [
      {
        type: "normal",
        url: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg",
        color: "#919aa2",
      },
      {
        type: "fighting",
        url: "https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg",
        color: "#e0306a",
      },
      {
        type: "flying",
        url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg",
        color: "#89aae3",
      },
      {
        type: "poison",
        url: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg",
        color: "#b567ce",
      },
      {
        type: "ground",
        url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg",
        color: "#e87236",
      },
      {
        type: "rock",
        url: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg",
        color: "#c8b686",
      },
      {
        type: "bug",
        url: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg",
        color: "#83c300",
      },
      {
        type: "ghost",
        url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg",
        color: "#4c6ab2",
      },
      {
        type: "steel",
        url: "https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg",
        color: "#5a8ea2",
      },
      {
        type: "fire",
        url: "https://upload.wikimedia.org/wikipedia/commons/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg",
        color: "#ff9741",
      },
      {
        type: "water",
        url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg",
        color: "#3692dc",
      },
      {
        type: "grass",
        url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg",
        color: "#38bf4b",
      },
      {
        type: "electric",
        url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg",
        color: "#fbd100",
      },
      {
        type: "psychic",
        url: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg",
        color: "#ff6675",
      },
      {
        type: "ice",
        url: "https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg",
        color: "#4cd1c0",
      },
      {
        type: "dragon",
        url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg",
        color: "#006fc9",
      },
      {
        type: "dark",
        url: "https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg",
        color: "#5b5466",
      },
      {
        type: "fairy",
        url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg",
        color: "#fb89eb",
      },
      {
        type: "unknown",
        color: "#c6c69b",
      },
      {
        type: "shadow",
        color: "#3f3f3f",
      },
    ];
    dispatch({ type: GET_ALL_IMG_TYPES, payload: imgTypes });
  };
}

export function newResetOrder() {
  return {
    type: NEW_RESET_ORDER,
  };
}

export const newChangeOrder = (payload) => {
  return {
    type: NEW_CHANGE_ORDER,
    payload: payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: LOADING,
    payload: payload,
  };
};

export const newChangePage = (payload) => {
  return {
    type: NEW_CHANGE_PAGE,
    payload: payload,
  };
};

export const newFilterPokemonsByName = (payload) => {
  return {
    type: NEW_FILTER_POKEMONS_BY_NAME,
    payload: payload,
  };
};

export function newGetPokemonById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
      dispatch({
        type: NEW_GET_POKEMON_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: NEW_POKEMONS_NOT_FOUND });
    }
  };
}

export function newResetFilter() {
  return {
    type: NEW_RESET_FILTER,
  };
}

export function newChangeFilter(payload) {
  return {
    type: NEW_CHANGE_FILTER,
    payload,
  };
}
