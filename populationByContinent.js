fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const continents = {
            'Africa': [],
            'Americas': [],
            'Asia': [],
            'Europe': [],
            'Oceania': []
        };

        // Agrupar países por continente y recoger sus poblaciones
        data.forEach(country => {
            if (country.continents && country.continents[0] && continents[country.continents[0]]) {
                continents[country.continents[0]].push({
                    name: country.name.common,
                    population: country.population
                });
            }
        });

        const traces = Object.keys(continents).map(continent => {
            return {
                x: continents[continent].map(country => country.name),
                y: continents[continent].map(country => country.population),
                type: 'bar',
                name: continent
            };
        });

        const layout = {
            barmode: 'group',
            title: 'Población de Países por Continente',
            xaxis: {title: 'Países'},
            yaxis: {title: 'Población'}
        };

        Plotly.newPlot('populationPlot', traces, layout);
    })
    .catch(error => {
        console.error('Error al obtener los datos de los países:', error);
    });