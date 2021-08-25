// This function used to count the number of matches played per year for all the years in IPL.
function totalMatchesPlayedPerYear(matches) {
    let results = {};

    matches.forEach(match => {
        const season=match.season;
        if (season in results){
            results[season] += 1;
        }
        else{
            results[season] = 1;
        }
    });
    return results;
}

//This function used to count the number of matches won per team per year in IPL.
function noOfMatchesWonPerTeamPerYear(matches) {
    let results = {};
    let matchesWonPerTeam = {};

    matches.forEach((match) => {
        if (!results.hasOwnProperty(match.season)) {
            matchesWonPerTeam = {};
        } else {
            if (!matchesWonPerTeam.hasOwnProperty(match.winner)) {
                matchesWonPerTeam[match.winner] = 1;
            } else {
                matchesWonPerTeam[match.winner] += 1;
            }
        }
        results[match.season] = matchesWonPerTeam;
    });
    return results;
}

//This function used to count the extra runs conceded per team in the year 2016.
function extraRunsConcededPerTeam2016(deliveries, matches) {
    let results = {};
    let seasonDetails = [];

    seasonDetails = matches.filter(match => match.season == 2016);
    seasonDetails.forEach((matchId)=>{
        deliveries.forEach((delivery) => {
            if (delivery.match_id == matchId.id) {
                if (!results.hasOwnProperty(delivery.bowling_team)) {
                    results[delivery.bowling_team] = Number(delivery.extra_runs);
                } else {
                    results[delivery.bowling_team] += Number(delivery.extra_runs);
                }
            }
        });
    });

    return results;
}

//This function used to get the top 10 economical bowlers in the year 2015.
function top10EconomicalBowlers2015(deliveries, matches) {
    let results = {};
    let economyOfBowler = {};
    let ball = {};
    let seasonDetails = [];

    seasonDetails = matches.filter(match => match.season == 2015);
    seasonDetails.forEach((matchId)=>{
        deliveries.forEach((delivery)=>{ 
            let wideBall = delivery.wide_runs;
            let noBall = delivery.noball_runs;

            if (delivery.match_id == matchId.id) {
                if (!economyOfBowler.hasOwnProperty(delivery.bowler)) {
                    economyOfBowler[delivery.bowler] = Number(delivery.total_runs);
                } else {
                    economyOfBowler[delivery.bowler] += Number(delivery.total_runs);
                }

                if (!ball.hasOwnProperty(delivery.bowler)) {
                    if (wideBall == 0 && noBall == 0) {
                        ball[delivery.bowler] = 1;
                    } else {
                        ball[delivery.bowler] = 0;
                    }
                } else {
                    if (wideBall == 0 && noBall == 0) {
                        ball[delivery.bowler] += 1;
                    }
                }
            }
        });
    });

    let sortedEconomy = ball;

    Object.keys(sortedEconomy).map(key => {
        sortedEconomy[key] = ((economyOfBowler[key] * 6) / sortedEconomy[key]).toFixed(2);
    });
    // In sorting the below line puts all the NaN values in order after sorting
    sortedEconomy = Object.fromEntries(Object.entries(sortedEconomy).sort((x, y) => x[1] - y[1]));    
    results = Object.keys(sortedEconomy).slice(0, 10).reduce((result, key) => {
        result[key] = sortedEconomy[key];
        return result;
    }, {});
    return results;
}

module.exports = {
    totalMatchesPlayedPerYear,
    noOfMatchesWonPerTeamPerYear,
    extraRunsConcededPerTeam2016,
    top10EconomicalBowlers2015,
};

