document.getElementById('generateUsers').addEventListener('click', () => {
    fetch('http://localhost:5000/generate-users/100000')  // Ajusta la cantidad de usuarios si es necesario
        .then(response => response.json())
        .then(data => {
            // Conteo de dominios
            const domainCounts = {};
            data.forEach(user => {
                const domain = user.email.split('@')[1];
                if (domain in domainCounts) {
                    domainCounts[domain]++;
                } else {
                    domainCounts[domain] = 1;
                }
            });

            const domainDataPlot = [{
                x: Object.keys(domainCounts),
                y: Object.values(domainCounts),
                type: 'bar',
                name: 'Dominios'
            }];

            Plotly.newPlot('plotDomain', domainDataPlot);

            // Conteo de usuarios con contraseñas de más de 8 caracteres
            let longPasswordCount = 0;
            data.forEach(user => {
                if (user.password.length > 8) {
                    longPasswordCount++;
                }
            });

            const passwordDataPlot = [{
                x: ['Contraseñas > 8 caracteres', 'Contraseñas ≤ 8 caracteres'],
                y: [longPasswordCount, data.length - longPasswordCount],
                type: 'bar',
                name: 'Longitud de Contraseñas'
            }];

            Plotly.newPlot('plotUser', passwordDataPlot);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
