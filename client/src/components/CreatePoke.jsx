
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getAllTypes } from '../redux/actions';
import './style-css/CreatePoke.css'



export default function NewCreatePoke() {
    const [newPokemon, setNewPokemon] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        img: '',
        type: [],
    });

    const [errors, setErrors] = useState({
        initial: true
    });

    const dispatch = useDispatch()

    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state.pokemons)


    const validate = (input, pokemons) => {
        let errors = {};
        //*Name
        if (!input.name) {
            errors.name = 'Name is required';
        } else if (!/^[a-zA-Z0-9\s]*$/.test(input.name)) {
            errors.name = 'Invalid name';
        } else if (input.name.length < 2) {
            errors.name = 'Few characters';
        } else if (input.name.length > 14) {
            errors.name = 'Many characters';
        } else if (pokemons) {
            const pokemonFind = pokemons?.find(
                (pokemon) => pokemon.name.toLowerCase() === input.name.toLowerCase()
            );
            pokemonFind && (errors.name = 'The pokemon name already exists');
        }

        //*Hp
        if (!input.hp) {
            errors.hp = 'Hp is required';
        } else if (input.hp.length > 4) {
            errors.hp = 'Max four characters';
        } else if (input.hp < 0) {
            errors.hp = 'Only positive numbers';
        }

        //*Attack
        if (!input.attack) {
            errors.attack = 'Attack is required';
        } else if (input.attack.length > 4) {
            errors.attack = 'Max four characters';
        } else if (input.attack < 0) {
            errors.attack = 'Only positive numbers';
        }

        //*Defense
        if (!input.defense) {
            errors.defense = 'Defense is required';
        } else if (input.defense.length > 4) {
            errors.defense = 'Max four characters';
        } else if (input.defense < 0) {
            errors.defense = 'Only positive numbers';
        }

        //*Speed
        if (!input.speed) {
            errors.speed = 'Speed is required';
        } else if (input.speed.length > 4) {
            errors.speed = 'Max four characters';
        } else if (input.speed < 0) {
            errors.speed = 'Only positive numbers';
        }

        //*Height
        if (!input.height) {
            errors.height = 'Height is required';
        } else if (input.height.length > 4) {
            errors.height = 'Max four characters';
        } else if (input.height < 0) {
            errors.height = 'Only positive numbers';
        }
        //*Weight
        if (!input.weight) {
            errors.weight = 'weight is required';
        } else if (input.weight.length > 4) {
            errors.weight = 'Max four characters';
        } else if (input.weight < 0) {
            errors.weight = 'Only positive numbers';
        }
        //*Type
        if (input.type.length === 0) errors.type = 'Select at least one type';
        //*Img
        if (input.img) {
            if (!/(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png|webp)/.test(input.img))
                errors.img = 'Invalid URL';
        }

        return errors;
    }

    const handleChange = (e) => {
        setNewPokemon({ ...newPokemon, [e.target.name]: e.target.value })
        validate(newPokemon, pokemons)
    }
    const clearForm = (e) => {
        e.preventDefault()
        setNewPokemon({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            img: '',
            type: [],
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPokemon(newPokemon));
        alert(`Pokemon ${newPokemon.name} created successfully`);
        setNewPokemon({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            img: '',
            type: [],
        });
    }

    useEffect(() => {
        dispatch(getAllTypes())
    }, [dispatch])

    return (
        <div className='new-create-poke'>
            <div className="form-container">
                <form className='form' onSubmit={handleSubmit}>
                    <h2>Create Pokemon</h2>
                    <div className="inputs-container">
                        <div className="all-props-container">
                            {/* Name */}
                            <div className="prop-container">
                                <input
                                    type='text'
                                    placeholder='Name'
                                    onChange={handleChange}
                                    value={newPokemon.name}
                                    name='name'
                                    id='name'
                                    // autoComplete='off'
                                    required
                                />
                            </div>
                            {/* HP */}
                            <div className="prop-container">
                                <input
                                    type='number'
                                    placeholder='HP'
                                    onChange={handleChange}
                                    value={newPokemon.hp}
                                    name='hp'
                                    id='hp'
                                    // autoComplete='off'
                                    required
                                />
                            </div>
                            {/* attack */}
                            <div className="prop-container">
                                <input
                                    type='number'
                                    placeholder='Attack'
                                    onChange={handleChange}
                                    value={newPokemon.attack}
                                    name='attack'
                                    id='attack'
                                    // autoComplete='off'
                                    required
                                />
                            </div>
                            {/* defense */}
                            <div className="prop-container">
                                <input
                                    type='number'
                                    placeholder='Defense'
                                    onChange={handleChange}
                                    value={newPokemon.defense}
                                    name='defense'
                                    id='defense'
                                    // autoComplete='off'
                                    required
                                />
                            </div>
                            {/* speed */}
                            <div className="prop-container">
                                <input
                                    type='number'
                                    placeholder='Speed'
                                    onChange={handleChange}
                                    value={newPokemon.speed}
                                    name='speed'
                                    id='speed'
                                    // autoComplete='off'
                                    required
                                />
                            </div>
                            {/* height */}
                            <div className="prop-container">
                                <input
                                    type='number'
                                    placeholder='Height'
                                    onChange={handleChange}
                                    value={newPokemon.height}
                                    name='height'
                                    id='height'
                                    // autoComplete='off'
                                    required
                                />
                            </div>
                            {/* weight */}
                            <div className="prop-container">
                                <input
                                    type='number'
                                    placeholder='Weight'
                                    onChange={handleChange}
                                    value={newPokemon.weight}
                                    name='weight'
                                    id='weight'
                                    // autoComplete='off'
                                    required
                                />
                            </div>
                            {/* img */}
                            <div className="prop-container">
                                <input
                                    type='text'
                                    placeholder='Image(URL)'
                                    onChange={handleChange}
                                    value={newPokemon.img}
                                    name='img'
                                    id='img'
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <div className="types-and-buttons">
                            {/* type */}
                            <div className="prop-container">
                                <select
                                    name="type"
                                    id="type"
                                    onChange={handleChange}
                                    menuPlacement="top"
                                >
                                    {types?.map(type => {
                                        return (
                                            <option>{type.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="buttons-container">
                                <button
                                    className='btn-clear'
                                    onClick={clearForm}
                                >
                                    Clear
                                </button>
                                <button
                                    type='submit'
                                    //disabled={Object.values(errors).length === 0 ? false : true}
                                   
                                    enabled={Object.values(errors).length == 0 ? true : false}  
                                    
                                >
                                    Create
                                </button>
                            </div>
                        </div>



                    </div>


                </form>
            </div>
        </div>
    )
}
