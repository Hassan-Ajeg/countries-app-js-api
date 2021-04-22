const searchInput = document.getElementById('search');
const results = document.getElementById('results');

let countries;
let searchTerm = '';


// API REQUEST

const fetchCountries = async () => {
    countries = await fetch(
        'https://restcountries.eu/rest/v2/all?fields=name;population;flag').then(response => response.json());
};

const showCountries = async () => {
    await fetchCountries();

    results.innerHTML = (
        countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(country => (
                `
                <li class="country-item">
                <img class="country-flag" src="${country.flag}" />
                <h3 class="country-name">${country.name}</h3>
                <div class="country-info">
                    <h2 class="country-population">${numberWithSpaces(country.population)}</h2>
                    <h5 class="country-population-text">Habitants</h5>
                </div>
                </li>
            `
        )).join('')

    );
};

showCountries();

//input setup

searchInput.addEventListener('input', (event) => {
    searchTerm = event.target.value;
    showCountries();
})

//fonction pour séparer les miliers
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}