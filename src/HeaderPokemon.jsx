import React from 'react';

const HeaderPokemon = ({ title, searchTerm, onSearchChange, pokemonDetails }) => {
    return (
        <div>
            <h1 className='header-title'>{title}</h1>
            <input
                type="text"
                placeholder="Rechercher un Pokémon"
                value={searchTerm}
                onChange={onSearchChange}
            />
            {pokemonDetails && (
                <div>
                    <h2>Détails du Pokémon - {pokemonDetails.name}</h2>
                    <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
                    <p>Types: {pokemonDetails.types.map(type => type.type.name).join(', ')}</p>
                    <p>Height: {pokemonDetails.height}</p>
                    <p>Weight: {pokemonDetails.weight}</p>
                    <p>Abilities: {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}</p>
                    <p>Base Experience: {pokemonDetails.base_experience}</p>
                    {/* Add more details here */}
                </div>
            )}
        </div>
    );
};

export default HeaderPokemon;
