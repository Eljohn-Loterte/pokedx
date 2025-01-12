import React from 'react';

export default function Main({ searchTerm, setSearchTerm }) {

    return (
        <div className='header-home'>
        <div className="container">
            <div className="logo-wrapper">
            <img src="./src/assets/pokeball.svg" alt="pokeball.svg" />
            <h1>Pokedex</h1>
            </div>
            <div className='search-wrapper'>
                <div className='search'>
                    <img src="./src/assets/search.svg" alt="search-icon" />
                    <input
                    type="text"
                    className='search-input body3-fonts'
                    placeholder='Search'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>
        </div>
    );
}
