import React, { useState, useEffect } from "react";
import Main from './components/main';
import PokemonList from './components/PokemonList';
import Details from "./components/Details";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

function App() {

  const MAX_POKEMON = 13000;
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("number");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`) // Fetch Pokémon data on component mount
      .then((response) => response.json())
      .then((data) => {
        setAllPokemons(data.results);
        setFilteredPokemons(data.results); // Initialize filteredPokemons with allPokemons
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const filtered = allPokemons.filter((pokemon) => {
      
      const pokemonId = pokemon.url.split("/")[6];
      const isNumber = !isNaN(lowerSearchTerm) && lowerSearchTerm.trim() !== "";

      if (isNumber) {
        return pokemonId.startsWith(lowerSearchTerm);
      } else {
        return pokemon.name.toLowerCase().startsWith(lowerSearchTerm);   
      }
    });

    setFilteredPokemons(filtered);
  }, [searchTerm, filterType, allPokemons]);

  const handlePokemonClick = async (id) => {
    try {
      const success = await fetchPokemonDataBeforeRedirect(id);
      if (success) {
        window.location.href = `./src/pages/details${id}`;
      }
    } catch (error) {
      console.error("Error handling Pokémon click:", error);
    }
  };

  const fetchPokemonDataBeforeRedirect = async (id) => {
    try {
      await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
      ]);
      return true;
    } catch (error) {
      console.error("Failed to fetch Pokémon data before redirect:", error);
      return false;
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
            <Main
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            />
            <PokemonList
              pokemons={filteredPokemons}
              loading={loading}
              onPokemonClick={handlePokemonClick}
            />
          </>
          }/>
          <Route path="/details" element={ <Details/> }/>
        </Routes>
      </Router>
    </>
  )
}

export default App
