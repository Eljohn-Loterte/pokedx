import React from 'react';
import { Link } from 'react-router-dom';

export default function PokemonList({ pokemons, loading, onPokemonClick }) {
  return (
    <div className="poke-list-container">
      <div className='pokemon-list'>
        <div className="container">
          <div className="list-wrapper">
            {loading ? (
              <div className='loading-container' >
                <p>Loading...</p>
              </div>
            ) : pokemons.length > 0 ? (
              pokemons.map((pokemon) => {
                const pokemonId = pokemon.url.split("/")[6];
                return (
                  <Link to={`/details?id=${pokemonId}`}
                    key={pokemonId}
                    className="list-item"
                  >
                    <div className="number-wrap">
                      <p className="caption-fonts">#{pokemonId}</p>
                    </div>
                    <div className="image-wrap">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                        alt={pokemon.name}
                      />
                    </div>
                    <div className="name-wrap">
                      <p className="body3-fonts">{pokemon.name}</p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p id='not-found-message'>Pokemon Not Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}