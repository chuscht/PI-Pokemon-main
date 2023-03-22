import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { newChangePage, setLoading } from "../redux/actions";
import "./style-css/Paginated.css";

export default function NewPaginated() {
  const dispatch = useDispatch();

  const newPokemonsOrdered = useSelector((state) => state.newPokemonsOrdered);
  const newPokemonsPerPage = useSelector((state) => state.newPokemonsPerPage);
  const loading = useSelector((state) => state.loading);
  // la cantidad de paginas
  const amountOfPages = Math.ceil(
    newPokemonsOrdered.length / newPokemonsPerPage
  );

  const numberButtons = [];

  for (let i = 1; i <= amountOfPages; i++) {
    numberButtons.push(i);
  }

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(setLoading());
    dispatch(newChangePage(e.target.value));
  };

  return (
    <>
      <div className="paginated-container">
        {numberButtons.map((button) => {
          return (
            <button onClick={handleClick} value={button}>
              {button}
            </button>
          );
        })}
      </div>
    </>
  );
}
