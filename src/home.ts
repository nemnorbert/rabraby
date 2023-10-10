let weatherJSON;
const weatherAPI = () => {
    const lang = siteINFO.language || "en";
    const url = `https://api.weatherapi.com/v1/current.json?key=4f043957d881429198301911231010&q=Szentendre&aqi=no&lang=${lang}`;
    const widgetDIV: HTMLElement | null = document.querySelector('#homeWidget');

    // Az API-tól való adatok lekérdezése
    fetch(url)
    .then((response) => {
        if (response.status !== 200) {
            console.error(`Connection Error: ${response.status}`);
            return;
        }

        return response.json();
    })
    .then((data) => {
        weatherJSON = data.current;
        console.log(weatherJSON);

        if (widgetDIV !== null) {
            widgetDIV.innerHTML = `
                <img src="${weatherJSON.condition.icon}" alt="Weather logo, mini">
                <div class="title">Szentendre</div>
                <div>${weatherJSON.condition.text}</div>
                <div>${weatherJSON.temp_c} ℃</div>
                <div>(${weatherJSON.temp_f} °F)</div>`;
            widgetDIV.classList.add('widget');
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}
weatherAPI();