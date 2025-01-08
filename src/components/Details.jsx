import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function Details() {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [flavorText, setFlavorText] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const MAX_POKEMONS = 13000;

  useEffect(() => {
    const pokemonID = parseInt(searchParams.get("id"), 10);

    if (isNaN(pokemonID) || pokemonID < 1 || pokemonID > MAX_POKEMONS) {
      navigate("/");
      return;
    }

    loadPokemon(pokemonID);
  }, [searchParams]);

  async function loadPokemon(id) {
    try {
      const [pokemon, pokemonSpecies] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
      ]);

      setCurrentPokemon(pokemon);
      setFlavorText(getEnglishFlavorText(pokemonSpecies));
    } catch (error) {
      console.error("An error occurred while fetching Pokémon data:", error);
    }
  }

  function getEnglishFlavorText(pokemonSpecies) {
    const entry = pokemonSpecies.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    return entry ? entry.flavor_text.replace(/\f/g, " ") : "No description available.";
  }

  function handleNavigate(newId) {
    navigate(`/details?id=${newId}`);
  }

  if (!currentPokemon) {
    return <p>Loading...</p>;
  }

  const { name, id, types, weight, height, abilities, stats } = currentPokemon;
  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  const mainType = types[0].type.name;
  const backgroundColor = typeColors[mainType] || "#fff";

  return (
    <main className="detail-main main" style={{ backgroundColor }}>
      <header className="header">
        <div className="header-wrapper">
          <div className="header-wrap">
            <Link to="/" className="back-btn-wrap">
              <img
                src={"backtoHome"}
                alt="back to home"
                className="back-btn"
                id="back-btn"
              />
            </Link>
            <div className="name-wrap">
              <h1 className="name">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
            </div>
          </div>
          <div className="pokemon-id-wrap">
            <p className="body2-fonts">#{String(id).padStart(3, "0")}</p>
          </div>
        </div>
      </header>
      <div className="featured-img">
        <button
          className="arrow left-arrow"
          id="leftArrow"
          disabled={id === 1}
          onClick={() => handleNavigate(id - 1)}
        >
          <img src="/src/assets/chevron_left.svg" alt="back" />
        </button>
        <div className="detail-img-wrapper">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={name}
          />
        </div>
        <button
          className="arrow right-arrow"
          id="rightArrow"
          disabled={id === MAX_POKEMONS}
          onClick={() => handleNavigate(id === 1025 ? 10001 : id + 1)}
        >
          <img src="./src/assets/chevron_right.svg" alt="forward" />
        </button>
      </div>
      <div className="detail-card-detail-wrapper">
        <div className="power-wrapper">
          {types.map(({ type }) => (
            <p key={type.name} className={`body3-fonts type ${type.name}`} style={{ backgroundColor }}>
              {type.name}
            </p>
          ))}
        </div>
        <p className="body2-fonts about-text">About</p>
        <div className="pokemon-detail-wrapper">
          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail">
              <img src="./src/assets/weight.svg" alt="weight" />
              <p className="body3-fonts weight">{weight / 10}kg</p>
            </div>
            <p className="caption-fonts">Weight</p>
          </div>
          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail">
              <img src="./src/assets/height.svg" alt="height" className="straighten" />
              <p className="body3-fonts height">{height / 10}m</p>
            </div>
            <p className="caption-fonts">Height</p>
          </div>
          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail move">
              {abilities.map(({ ability }) => (
                <p key={ability.name} className="body3-fonts">
                  {ability.name}
                </p>
              ))}
            </div>
            <p className="caption-fonts">Abilities</p>
          </div>
        </div>
        <p className="body3-fonts pokemon-description">{flavorText}</p>
        <p className="body2-fonts about-text">Base Stats</p>
        <div className="stats-wrapper">
          {stats.map(({ stat, base_stat }) => (
            <div key={stat.name} className="stats-wrap">
              <p className="body3-fonts stats">{stat.name.toUpperCase()}</p>
              <p className="body3-fonts">{base_stat}</p>
              <progress 
                className="progress-bar" 
                value={base_stat} 
                max="100" 
                style={{ 
                    backgroundColor: "#f3f3f3",
                    appearance: 'none',
                    borderRadius: '10px',
                }}
                data-type={mainType}
                />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
