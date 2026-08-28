let data;


fetch("data/pl_data.json")
    .then(response => response.json())
    .then(jsonData => {

        data = jsonData;

        showPlayers("top_scorers");
        showTable();
    });


const select = document.getElementById("stat-select");

select.addEventListener("change", function () {

    showPlayers(this.value);

});


function showPlayers(statType) {

    const players = data[statType];

    const playerList = document.getElementById("player-list");
    const statName = document.getElementById("stat-name");

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


    players.forEach((player, index) => {

        const row = document.createElement("div");

        row.classList.add("player-row");

        row.innerHTML = `
            <span>${index + 1}</span>
            <span>${player.first_name} ${player.second_name}</span>
            <span>${player[stat]}</span>
        `;

        playerList.appendChild(row);

    });
}


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

const statsButton = document.getElementById("stats-button");
const homePage = document.getElementById("home-page");
const statsPage = document.getElementById("stats-page");

statsButton.addEventListener("click", function () {

    homePage.style.display = "none";
    statsPage.style.display = "block";

});