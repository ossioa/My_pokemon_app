import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderPokemon from './HeaderPokemon';
import './PokemonList.css';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // State to control visibility of pop-up

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
                setPokemonList(response.data.results);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setSelectedPokemon(null);
    };

    const handlePokemonSelect = async (pokemonName) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            setSelectedPokemon(response.data);
            setShowPopup(true); // Show pop-up when a Pokemon is selected
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Close pop-up
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Filter Pokemon list based on search term
    const filteredPokemonList = pokemonList.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchTerm);
    });

    return (
        <div>
            <HeaderPokemon
                title="Pokemon List"
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                pokemonDetails={selectedPokemon}
            />
            <ul>
                {filteredPokemonList.map((pokemon, index) => (
                    <li key={pokemon.name} onClick={() => handlePokemonSelect(pokemon.name)}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png`} alt={pokemon.name} />
                        {pokemon.name}
                    </li>
                ))}
            </ul>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        {selectedPokemon && (
                            <div>
                                <h2>{selectedPokemon.name}</h2>
                                {/* Display Pokemon details here */}
                                <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
                                {/* Add other details as needed */}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonList;
