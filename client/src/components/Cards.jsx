import "./style-css/Cards.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllImgTypes, getAllPokemons, setLoading } from "../redux/actions";
import Order from "./Order";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";

import Card from "./Card";

export default function Cards() {
  const dispatch = useDispatch();

  // Cada vez que cambie newOrder, se renderiza NewCard nuevamente
  // Si no traigo el state newOrder, el ordenamiento no se va a ver reflejado en NewCard.
  const newOrder = useSelector((state) => state.newOrder); // NO BORRAR!!
  const newCurrentPage = useSelector((state) => state.newCurrentPage);
  const newPokemonsOrdered = useSelector((state) => state.newPokemonsOrdered);
  const newPokemonsFiltered = useSelector((state) => state.newPokemonsFiltered);
  const newPokemonsPerPage = useSelector((state) => state.newPokemonsPerPage);
  const pokemons = useSelector((state) => state.pokemons);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getAllPokemons());

    dispatch(getAllImgTypes());
  }, [dispatch]);

  const lastPokeOfPage = newCurrentPage * newPokemonsPerPage;
  const firstPokeOfPage = lastPokeOfPage - newPokemonsPerPage;

  // Estos son los pokemons que vamos a renderizar por pagina
  let currentPokemons = [];

  // Vemos si es que han sido filtrados
  if (newPokemonsFiltered !== pokemons) {
    // Tambien vemos si han sido ordenados
    if (newPokemonsFiltered !== newPokemonsOrdered) {
      // newPokemonsOrdered son los ordenados luego de haber sido filtrados (ver reducer case NEW_CHANGE_ORDER)
      currentPokemons = newPokemonsOrdered.slice(
        firstPokeOfPage,
        lastPokeOfPage
      );
    }
    currentPokemons = newPokemonsFiltered.slice(
      firstPokeOfPage,
      lastPokeOfPage
    );
    // Ya sabiendo que no estan filtrados, vemos si por lo menos han sido ordenados
  } else if (newPokemonsOrdered !== pokemons) {
    currentPokemons = newPokemonsOrdered.slice(firstPokeOfPage, lastPokeOfPage);
  }
  // Si no han sido filtrados ni ordenados, hacer el slice del estado 'pokemons' (ver reducer)
  else {
    currentPokemons = pokemons.slice(firstPokeOfPage, lastPokeOfPage);
  }

  return (
    <>
      {loading ? (
        <h1 style={{ color: "white" }}>Loading</h1>
      ) : (
        <div className="home-container">
          <SearchBar />
          <Order />
          <div className="paginated-container">
            <Paginated />
          </div>
          <div className="prueba-container">
            {currentPokemons[0] ? (
              currentPokemons.map((pokemon) => {
                return <Card pokemon={pokemon} />;
              })
            ) : (
              <h1>pokemons not found</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
}
