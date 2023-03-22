import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LOADING, newGetPokemonById, setLoading } from "../redux/actions";
import "./style-css/Detail.css";

export default function NewDetail() {
  const dispatch = useDispatch();

  const newPokemonDetail = useSelector((state) => state.newPokemonDetail);
  const loading = useSelector((state) => state.loading);
  const { id } = useParams();

  useEffect(() => {
    dispatch(setLoading());
    dispatch(newGetPokemonById(id));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <h1 style={{ color: "white" }}>Loading</h1>
      ) : (
        <div className="detail-container">
          <div className="name-container">{newPokemonDetail.name}</div>
          <div className="detail-data">
            <div className="pokemon-properties">
              <ul>
                <li>Attack: {newPokemonDetail.attack}</li>
                <li>Defense: {newPokemonDetail.defense}</li>
                <li>Speed: {newPokemonDetail.speed}</li>
                <li>Height: {newPokemonDetail.height}</li>
                <li>Weight: {newPokemonDetail.weight}</li>
                <li>
                  Types:{" "}
                  {newPokemonDetail?.types?.map((type) => {
                    return <>{type}, </>;
                  })}
                </li>
              </ul>
            </div>
            <img src={newPokemonDetail.img} alt="" />
          </div>
        </div>
      )}
    </>
  );
}
