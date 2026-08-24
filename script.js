fetch("data/pl_data.json")
    .then(response => response.json())
    .then(data => {

        console.log(data);

        showPlayers(data.top_scorers, "top-scorers", "goals_scored");
        showPlayers(data.top_assists, "top-assists", "assists");
        showPlayers(data.top_goal_involvements, "goal-involvements", "goal_involvements");
        showPlayers(data.top_fpl_points, "fpl-points", "total_points");
    })
    .catch(error => {
        console.error("FEL:", error);
    });


function showPlayers(players, elementId, stat) {

    const container = document.getElementById(elementId);

    players.forEach((player, index) => {

        const row = document.createElement("p");

        row.textContent =
            `${index + 1}. ${player.first_name} ${player.second_name} - ${player[stat]}`;

        container.appendChild(row);
    });
}