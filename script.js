fetch("data/pl_data.json")
    .then(response => response.json())
    .then(data => {

        // Skytteliga
        showPlayers(
            data.top_scorers,
            "top-scorers",
            "goals_scored"
        );

        // Assistliga
        showPlayers(
            data.top_assists,
            "top-assists",
            "assists"
        );

        // Poängliga (mål + assist)
        showPlayers(
            data.top_goal_involvements,
            "goal-involvements",
            "goal_involvements"
        );

        // FPL-poängliga
        showPlayers(
            data.top_fpl_points,
            "fpl-points",
            "total_points"
        );
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