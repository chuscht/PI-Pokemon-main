import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  getAllTypes,
  newChangeOrder,
  newChangeFilter,
  newResetOrder,
  newResetFilter,
  setLoading,
} from "../redux/actions";

export default function NewOrder() {
  const dispatch = useDispatch();

  const newOrder = useSelector((state) => state.newOrder);
  const types = useSelector((state) => state.types);

  const newFilter = useSelector((state) => state.newFilter);

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]); // newOrder, newFilter

  // Cambiamos la variable 'newOrder' de redux, y en funcion a esta variable se actualiza newPokemonsOrdered
  const handleChangeAttack = (e) => {
    switch (e.target.value) {
      case "nameAscendent":
        dispatch(
          newChangeOrder({
            ...newOrder,
            ascName: true,
            descName: false,
          })
        );
        break;
      case "nameDescendent":
        dispatch(
          newChangeOrder({
            ...newOrder,
            ascName: false,
            descName: true,
          })
        );
        break;
      case "nameDefault":
        dispatch(newResetOrder());
        dispatch(getAllPokemons());
        break;
      default:
        return dispatch(
          newChangeOrder({
            ...newOrder,
          })
        );
    }
  };

  const handleChangeName = (e) => {
    switch (e.target.value) {
      case "nameAscendent":
        dispatch(
          newChangeOrder({
            ...newOrder,
            ascName: true,
            descName: false,
          })
        );
        break;
      case "nameDescendent":
        dispatch(
          newChangeOrder({
            ...newOrder,
            ascName: false,
            descName: true,
          })
        );
        break;
      case "nameDefault":
        dispatch(newResetOrder());
        dispatch(getAllPokemons());
        break;
      default:
        return dispatch(
          newChangeOrder({
            ...newOrder,
          })
        );
    }
  };

  const handleChangeType = (e) => {
    dispatch(newChangeFilter);
    // Los pokemons a renderizar finalmente siempre vienen de la variable newPokemonsOrdered
  };

  const handleResetAll = (e) => {
    e.preventDefault();
    //dispatch(setLoading(true));
    dispatch(newResetOrder());
    dispatch(newResetFilter());
    dispatch(getAllPokemons());
  };

  return (
    <div>
      <form>
        <select
          defaultValue={"default"}
          name={"name"}
          id={"name"}
          onChange={handleChangeName}
          style={{
            textDecoration: "none",
            margin: "5px",
            borderRadius: "10px",
            border: "solid 1px white",
            boxShadow:
              "inset 0 0 8px hsl(278, 92%, 32%) , 0 0 8px hsl(278, 92%, 34%)",
          }}
        >
          <option value="nameDefault">Order By Name</option>
          <option value="nameAscendent">A - Z</option>
          <option value="nameDescendent">Z - A</option>
        </select>
        <select
          defaultValue={"default"}
          name={"type"}
          id={"type"}
          onChange={handleChangeType}
          style={{
            textDecoration: "none",
            margin: "5px",
            borderRadius: "10px",
            border: "solid 1px white",
            boxShadow:
              "inset 0 0 8px hsl(278, 92%, 32%) , 0 0 8px hsl(278, 92%, 34%)",
          }}
        >
          <option value="default">All Types</option>
          {types?.map((type) => {
            return <option value={type.name}>{type.name}</option>;
          })}
        </select>
      </form>
      <button
        onClick={handleResetAll}
        style={{
          textDecoration: "none",
          margin: "5px",
          borderRadius: "10px",
          border: "solid 1px white",
          boxShadow:
            "inset 0 0 8px hsl(278, 92%, 32%) , 0 0 8px hsl(278, 92%, 34%)",
        }}
      >
        Reset
      </button>
      {console.log(types.name)}
    </div>
  );
}
