import React from 'react';

export default function Main({ searchTerm, setSearchTerm }) {

    return (
        <div className='header-home'>
        <div className="container">
            <div className="logo-wrapper">
            <img src="pokeball.svg" alt="pokeball.svg" />
            <h1>Pokedex</h1>
            </div>
            <div className='search-wrapper'>
                <div className='search'>
                    <img src="search.svg" alt="search-img" />
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
