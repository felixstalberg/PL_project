let data;

let showAllPlayers = false;


fetch("data/pl_data.json")
    .then(response => response.json())
    .then(jsonData => {

        data = jsonData;

        showPlayers("top_scorers");
        showTable();
    });


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


const homePage = document.getElementById("home-page");
const tablePage = document.getElementById("table-page");
const statsPage = document.getElementById("stats-page");

const tableButton = document.getElementById("table-button");
const statsButton = document.getElementById("stats-button");


function showPage(page) {

    homePage.style.display = "none";
    tablePage.style.display = "none";
    statsPage.style.display = "none";

    page.style.display = "block";

    window.scrollTo(0, 0);

}


tableButton.addEventListener("click", function () {

    showPage(tablePage);

    history.pushState({ page: "table" }, "", "#table");

});


statsButton.addEventListener("click", function () {

    showPage(statsPage);
    
    history.pushState({ page: "stats" }, "", "#stats");

});


window.addEventListener("popstate", function () {

    showPage(homePage);

});