const poke_container = document.getElementById('poke_container')

const pokemons_number = 150;

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

// Sets color as key when looking for types?//
const main_types = Object.keys(colors);

// Gets Pokemon Data //
const getPokemon = async id => {
   //URL//
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;// Pass in id //

    // fetches the data from the url//
    const getPokemonData = await fetch(apiUrl);
    // makes the data usable?//
    const pokemon = await getPokemonData.json();
    // pushs data to the pokemon cards //
    console.log(pokemon);
    createPokemonCard(pokemon);
}

// Pulls all 150 Pokemon //
const catchThemAll = async () => {
    for(let i=1; i<pokemons_number; i++){
        await getPokemon(i)
    }
}

catchThemAll();

// Makes the Pokemon cards //
function createPokemonCard(pokemon) {
    const makeDiv = document.createElement('div');
    //give the div a class //
    makeDiv.classList.add('pokemon');

    // inner HTML of the div (pokemon card) //
    // gets the type of pokemon //
    const poke_types = pokemon.types.map(element => element.type.name);
    // loops over the color array? //
    const type = main_types.find(type => poke_types.indexOf(type) > -1 )
    // makes the first letter upper case and the joins the rest as lower case //
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

    //Output for card //
    const pokemonCardInnerHTML = `
    <div class="img-container">
      <img src ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">  
    </div>
    <div class="info">
        <span class="number">${pokemon.id}</span>
        <span class="name">${name}</span>
        <small class="type"> Type: <span>${type}</span> </small>
    </div>
    `;

    // sets it as the inner HTML
    makeDiv.innerHTML = pokemonCardInnerHTML;

    //append the created pokemon card to poke container //
    poke_container.appendChild(makeDiv)
}


