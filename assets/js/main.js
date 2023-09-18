const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}


// Seletor do botão "Load More"

const loadMorButton = document.getElementById('loadMorButton');

// Seletor da janela pop-up e elementos de conteúdo
const popup = document.getElementById('pokemonPopup');
const popupName = document.getElementById('popupName');
const popupImage = document.getElementById('popupImage');
const popupAttack = document.getElementById('popupAttack');
const popupDefense = document.getElementById('popupDefense');
// Adicione mais elementos aqui, se necessário

// Seletor do botão de fechar a janela pop-up
const popupClose = document.getElementById('popupClose');

// Função para abrir a janela pop-up com os dados do Pokémon
function openPopup(pokemon) {
    popupName.textContent = pokemon.name;
    popupImage.src = pokemon.image;
    popupAttack.textContent = pokemon.attack;
    popupDefense.textContent = pokemon.defense;
    // Configure mais informações aqui, se necessário

    popup.style.display = 'block';
}

// Evento de clique em um Pokémon na lista para abrir a janela pop-up
document.getElementById('pokemonList').addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'LI') {
        const pokemonIndex = target.dataset.index;
        const pokemon = getPokemonByIndex(pokemonIndex); // Suponha que você tenha uma função getPokemonByIndex
        if (pokemon) {
            openPopup(pokemon);
        }
    }
});

// Evento de clique no botão de fechar a janela pop-up
popupClose.addEventListener('click', function () {
    popup.style.display = 'none';
});

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})