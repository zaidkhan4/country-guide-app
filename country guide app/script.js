const countryinput = document.getElementById('countryinput'),
    search = document.getElementById('search'),
    search_result = document.getElementById('search_result'),
    flag = document.getElementById('flag'),
    name = document.getElementById('name'),
    capital = document.getElementById('capital'),
    continent = document.getElementById('continent'),
    population = document.getElementById('population'),
    currency = document.getElementById('currency'),
    currencyshort = document.getElementById('currencyshort'),
    language = document.getElementById('language');

search.addEventListener("click", () => {
    let countryname = countryinput.value.trim();
    let finalurl = `https://restcountries.com/v3.1/name/${countryname}?fullText=true`;

    fetch(finalurl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json();
        })
        .then((data) => {
            search_result.style.display = 'block';

            let countryData = data[0];
            flag.src = countryData.flags.svg;
            name.innerHTML = countryData.name.common;
            capital.innerHTML = countryData.capital ? countryData.capital.join(', ') : 'N/A';
            continent.innerHTML = countryData.continents.join(', ');
            population.innerHTML = countryData.population.toLocaleString();
            currency.innerHTML = countryData.currencies[Object.keys(countryData.currencies)[0]].name;
            currencyshort.innerHTML = Object.keys(countryData.currencies)[0];
            language.innerHTML = Object.values(countryData.languages).join(', ');
        })
        .catch((error) => {
            console.error("Error:", error);
            search_result.style.display = 'none';
            alert("Country not found. Please check the country name and try again.");
        });
});
