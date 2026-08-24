fetch("data/pl_data.json")
    .then(response => response.json())
    .then(data => {

        const topScorers = data.top_scorers;

        const container = document.getElementById("top-scorers");

        topScorers.forEach((player, index) => {

            const row = document.createElement("p");

            row.textContent =
                `${index + 1}. ${player.first_name} ${player.second_name} - ${player.goals_scored} mål`;

            container.appendChild(row);

        });

    });