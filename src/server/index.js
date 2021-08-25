const fs = require('fs');
const csv = require('csv-parser');
const {
    totalMatchesPlayedPerYear,
    noOfMatchesWonPerTeamPerYear,
    extraRunsConcededPerTeam2016,
    top10EconomicalBowlers2015
} = require('./ipl');
const deliveries = [];
const matches = [];

fs.createReadStream('src/data/deliveries.csv')
    .pipe(csv())
    .on('data', (data) => deliveries.push(data))
    .on('end', () => {
        fs.createReadStream('src/data/matches.csv')
            .pipe(csv())
            .on('data', (data) => matches.push(data))
            .on('end', () => {
                const matchesPerYear = totalMatchesPlayedPerYear(matches);
                const matchesWonPerTeamPerYear = noOfMatchesWonPerTeamPerYear(matches);
                const extraRunsPerTeam2016 = extraRunsConcededPerTeam2016(deliveries, matches);
                const topTenEconomicalBowlers2015 = top10EconomicalBowlers2015(deliveries, matches);

                //This function is used to send data to the respective JSON output files.
                function sendOutputData(file, data) {
                    const error = (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    };
                    const jsonData = JSON.stringify(data, null, 8);
                    fs.writeFile(file, jsonData, error);
                }

                sendOutputData('src/public/output/matchesPerYear.json', matchesPerYear);
                sendOutputData('src/public/output/matchesWonPerTeamPerYear.json', matchesWonPerTeamPerYear);
                sendOutputData('src/public/output/extraRunsPerTeam2016.json', extraRunsPerTeam2016);
                sendOutputData('src/public/output/top10EconomicalBowlers2015.json', topTenEconomicalBowlers2015);
            });
    });
