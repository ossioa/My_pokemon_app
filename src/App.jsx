import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Utilisez "Router" plutôt que "BrowserRouter"
import PokemonList from './PokemonList';
import HeaderPokemon from './HeaderPokemon';

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route exact path="/" element={<PokemonList />} /> 
        <Route path="/pokemon/:pokemonId" element={<HeaderPokemon />} /> 
      </Routes>
    </Router>
  );
};

export default App; 
