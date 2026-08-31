let data;

let showAllPlayers = false;

const gameweekSelect = document.getElementById("gameweek-select");
const matchesList = document.getElementById("matches-list");

// Hämta data från JSON-filen
fetch("data/pl_data.json")
    .then(response => response.json())
    .then(jsonData => {

        data = jsonData;

        showPlayers("top_scorers");
        showTable();

        // Skapa GW-alternativen automatiskt
        const gameweeks = [...new Set(data.matches.map(match => match.gameweek))];

        gameweeks.forEach((gameweek) => {

            const option = document.createElement("option");

            option.value = gameweek;
            option.textContent = `GW ${gameweek}`;

            gameweekSelect.appendChild(option);

        });

        showMatches(1);
    });


// =========================
// STATISTIK
// =========================

const select = document.getElementById("stat-select");

select.addEventListener("change", function () {

    showAllPlayers = false;

    showPlayers(this.value);

});


function showPlayers(statType) {

    const players = data[statType];

    const playerList = document.getElementById("player-list");
    const statName = document.getElementById("stat-name");
    const showMoreButton = document.getElementById("show-more-button");

    playerList.innerHTML = "";


    let stat;

    if (statType === "top_scorers") {
        stat = "goals_scored";
        statName.textContent = "Mål";
    }

    else if (statType === "top_assists") {
        stat = "assists";
        statName.textContent = "Assist";
    }

    else if (statType === "top_goal_involvements") {
        stat = "goal_involvements";
        statName.textContent = "Poäng";
    }

    else if (statType === "top_fpl_points") {
        stat = "total_points";
        statName.textContent = "Poäng";
    }


    const playersToShow = showAllPlayers
        ? players.slice(0, 20)
        : players.slice(0, 10);


    playersToShow.forEach((player, index) => {

        const row = document.createElement("div");

        row.classList.add("player-row");

        row.innerHTML = `
            <span>${index + 1}</span>
            <span>${player.first_name} ${player.second_name}</span>
            <span>${player[stat]}</span>
        `;

        playerList.appendChild(row);

    });


    if (showAllPlayers) {
        showMoreButton.style.display = "none";
    }

    else {
        showMoreButton.style.display = "block";
    }
}


const showMoreButton = document.getElementById("show-more-button");

showMoreButton.addEventListener("click", function () {

    showAllPlayers = true;

    showPlayers(select.value);

});


// =========================
// TABELL
// =========================

function showTable() {

    const table = data.table;

    const tableList = document.getElementById("table-list");

    tableList.innerHTML = "";

    table.forEach((team) => {

        const row = document.createElement("div");

        row.classList.add("table-row");

        row.innerHTML = `
            <span>${team.position}</span>
            <span>${team.name}</span>
        `;

        tableList.appendChild(row);

    });

}


// =========================
// MATCHER
// =========================

function showMatches(gameweek) {

    const matches = data.matches.filter(
        match => match.gameweek == gameweek
    );

    matchesList.innerHTML = "";


    matches.forEach((match) => {

        const row = document.createElement("div");

        row.classList.add("match-row");

        row.innerHTML = `
            <span>${match.home_team}</span>
            <strong>${match.home_score} - ${match.away_score}</strong>
            <span>${match.away_team}</span>
        `;

        matchesList.appendChild(row);

    });

}


gameweekSelect.addEventListener("change", function () {

    showMatches(this.value);

});


// =========================
// SIDOR
// =========================

const homePage = document.getElementById("home-page");
const tablePage = document.getElementById("table-page");
const statsPage = document.getElementById("stats-page");
const matchesPage = document.getElementById("matches-page");
const analysisPage = document.getElementById("analysis-page");


const tableButton = document.getElementById("table-button");
const statsButton = document.getElementById("stats-button");
const matchesButton = document.getElementById("matches-button");
const analysisButton = document.getElementById("analysis-button");


function showPage(page) {

    homePage.style.display = "none";
    tablePage.style.display = "none";
    statsPage.style.display = "none";
    matchesPage.style.display = "none";
    analysisPage.style.display = "none";

    page.style.display = "block";

    window.scrollTo(0, 0);

}


// =========================
// NAVIGATION
// =========================

tableButton.addEventListener("click", function () {

    showPage(tablePage);

    history.pushState({ page: "table" }, "", "#table");

});


statsButton.addEventListener("click", function () {

    showAllPlayers = false;

    select.value = "top_scorers";

    showPlayers("top_scorers");

    showPage(statsPage);

    history.pushState({ page: "stats" }, "", "#stats");

});


matchesButton.addEventListener("click", function () {

    gameweekSelect.value = "1";

    showMatches(1);

    showPage(matchesPage);

    history.pushState({ page: "matches" }, "", "#matches");

});


analysisButton.addEventListener("click", function () {

    showPage(analysisPage);

    history.pushState({ page: "analysis" }, "", "#analysis");

});


window.addEventListener("popstate", function () {

    showPage(homePage);

});