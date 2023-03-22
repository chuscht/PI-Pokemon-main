import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_ALL_IMG_TYPES,
  CREATE_POKEMON,
  NEW_RESET_ORDER,
  NEW_CHANGE_ORDER,
  NEW_CHANGE_PAGE,
  NEW_FILTER_POKEMONS_BY_NAME,
  NEW_GET_POKEMON_BY_ID,
  NEW_CHANGE_FILTER,
  NEW_RESET_FILTER,
  LOADING,
  FETCH_POKEMON_START,
  FETCH_POKEMON_SUCCESS,
} from "../actions/index.js";
import {
  sortAttackAsc,
  sortAttackDesc,
  sortNameAndAttackAsc,
  sortNameAndAttackDesc,
  sortNameAsc,
  sortNameAscAndAttackDesc,
  sortNameDesc,
  sortNameDescAndAttackAsc,
} from "./controllers-reducer.js";

const initialState = {
  pokemons: [],
  pokemonsFiltered: [],
  pokeDetail: {},
  types: [],
  imgTypes: [],
  loading: false,
  newPokemon: false,
  filters: {},

  newFilter: {
    type: "",
  },
  newOrder: {
    ascName: false,
    descName: false,
    ascAttack: false,
    descAttack: false,
  },
  newPokemonsFiltered: [],
  newPokemonsOrdered: [],
  newCurrentPage: 1,
  newPokemonsPerPage: 12,
  newPokemonDetail: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      // Si ha habido algun ordenamiento, no modificamos aquí newPokemonsOrdered
      for (let prop in state.newOrder) {
        if (state.newOrder[prop] === true) {
          return {
            ...state,
            pokemons: action.payload,
            loading: false,
          };
        }
      }

      // Si ha habido algun filtrado, no modificamos aquí newPokemonsFiltered
      for (let filter in state.newFilter) {
        if (state.newFilter[filter]) {
          return {
            ...state,
            pokemons: action.payload,
            loading: false,
          };
        }
      }

      // Inicialmente, tanto 'newPokemonsFiltered' como 'newPokemonsOrdered' tienen lo mismo que 'pokemons'
      return {
        ...state,
        pokemons: action.payload,
        newPokemonsOrdered: action.payload,
        newPokemonsFiltered: action.payload,
        loading: false,
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case "FETCH_POKEMON_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_POKEMON_SUCCESS":
      return {
        ...state,
        pokemon: action.payload,
        loading: false,
      };

    case GET_ALL_IMG_TYPES:
      return {
        ...state,
        imgTypes: action.payload,
      };

    case CREATE_POKEMON:
      return {
        ...state,
        newPokemon: true,
      };

    // queremos hacer un form que envie todos los datos de ordenamiento
    case NEW_RESET_ORDER:
      return {
        ...state,
        newFilter: action.payload,
      };

    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case NEW_CHANGE_ORDER:
      /*  
			Primero filtramos los pokemons del estado 'pokemons' y los guardamos en 'newPokemonsFiltered'
			(en caso de que no haya filtro, newPokemonsFiltered va a tener lo mismo que pokemons).

			Despues ordenamos 'newPokemonsFiltered' y los guardamos en 'newPokemonsOrdered'.
			Finalmente, usamos 'newPokemonsOrdered' para hacer el paginado y renderizar los pokemons.
			*/

      if (action.payload.ascAttack && action.payload.ascName) {
        return {
          ...state,
          newOrder: action.payload,
          newPokemonsOrdered: sortNameAndAttackAsc(state.newPokemonsFiltered),
        };
      }

      if (action.payload.ascAttack && action.payload.descName) {
        return {
          ...state,
          newOrder: action.payload,
          newPokemonsOrdered: sortNameDescAndAttackAsc(
            state.newPokemonsFiltered
          ),
        };
      }

      if (action.payload.descAttack && action.payload.ascName) {
        return {
          ...state,
          newOrder: action.payload,
          newPokemonsOrdered: sortNameAscAndAttackDesc(
            state.newPokemonsFiltered
          ),
        };
      }

      if (action.payload.descAttack && action.payload.descName) {
        return {
          ...state,
          newOrder: action.payload,
          newPokemonsOrdered: sortNameAndAttackDesc(state.newPokemonsFiltered),
        };
      }

      if (action.payload.ascAttack) {
        return {
          ...state,
          newOrder: action.payload,
          newPokemonsOrdered: sortAttackAsc(state.newPokemonsFiltered),
        };
      }

      if (action.payload.descAttack) {
        return {
          ...state,
          newOrder: action.payload,
          newPokemonsOrdered: sortAttackDesc(state.newPokemonsFiltered),
        };
      }

      if (action.payload.ascName) {
        return {
          ...state,
          newOrder: action.payload,
          newPokemonsOrdered: sortNameAsc(state.newPokemonsFiltered),
        };
      }

      if (action.payload.descName) {
        return {
          ...state,
          newOrder: action.payload,
          newPokemonsOrdered: sortNameDesc(state.newPokemonsFiltered),
        };
      }

      return {
        ...state,
        newPokemonsOrdered: state.newPokemonsFiltered,
      };
    case NEW_CHANGE_PAGE:
      return {
        ...state,
        newCurrentPage: action.payload,
        loading: action.payload,
      };
    case NEW_FILTER_POKEMONS_BY_NAME:
      if (action.payload === "") {
        return {
          ...state,
          newCurrentPage: 1,
          newPokemonsOrdered: state.pokemons,
        };
      }

      return {
        ...state,
        newCurrentPage: 1,
        newPokemonsFiltered: state.pokemons.filter((poke) => {
          // let aux = poke.name.slice(0, action.payload.length)

          // return aux.toLowerCase() === action.payload.toLowerCase()
          return poke.name.toLowerCase() === action.payload.toLowerCase();
        }),
      };
    case NEW_GET_POKEMON_BY_ID:
      return {
        ...state,
        newPokemonDetail: action.payload,
      };
    case NEW_RESET_FILTER:
      return {
        ...state,
        newFilter: {
          type: "",
        },
      };
    case NEW_CHANGE_FILTER:
      return {
        ...state,
        newFilter: action.payload,
        newPokemonsFiltered: state.pokemons.filter((pokemon) =>
          pokemon.types.includes(action.payload.type)
        ),
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
