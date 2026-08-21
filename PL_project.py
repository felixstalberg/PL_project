#PL project

import requests
import matplotlib as plt
import pandas as pd
import json

url = "https://fantasy.premierleague.com/api/bootstrap-static/"
response = requests.get(url)
data = response.json()

#print(data.keys()) #--> dict_keys(['chips', 'events', 'game_settings', 'game_config', 'phases', 'teams',
                                   #'total_players', 'element_stats', 'element_types', 'elements'])

#ta ut alla features som finns för spelarna
player_features = pd.DataFrame(data["elements"])

#ta ut alla features som finns för lagen
team_features = pd.DataFrame(data["teams"])

#print(player_features.columns.tolist())
#print(team_features.columns.tolist())


"Tabell"

#sortera team_features efter position
table = team_features.sort_values("position")

#skriv ut en tabell som innehåller namn, position, spelade matcher osv
#print(sorted_table_position[["position", "name", "played", "win", "draw", "loss", "points"]].to_string(index=False))


"Skytteliga (Topp 20)"
top_scorers = player_features.sort_values("goals_scored", ascending=False).head(20)

#skapa json-fil med topp 20
#top_scorers[["first_name", "second_name", "goals_scored"]].to_json("pl_data.json", orient="records")

#print(sorted_goals_scored[["first_name", "second_name", "goals_scored"]].to_string(index=False))

"Assistliga (Topp 20)"
top_assists = player_features.sort_values("assists", ascending=False).head(20)
#print(sorted_assists[["first_name", "second_name", "assists"]].to_string(index=False))

"Poängliga (Topp 20)"
player_features["goal_involvements"] = player_features["goals_scored"] + player_features["assists"]
top_goal_involvements = player_features.sort_values("goal_involvements", ascending=False).head(20)
#print(sorted_goal_involvements[["first_name", "second_name", "goals_scored", "assists", "goal_involvements"]].to_string(index=False))

"FPL - poängliga (Topp 20)"
top_fpl_points = player_features.sort_values("total_points", ascending=False).head(20)
#print(sorted_points[["first_name", "second_name", "total_points"]])

pl_data = {
    "top_scorers": top_scorers[
        ["first_name", "second_name", "goals_scored"]
    ].to_dict(orient="records"),

    "top_assists": top_assists[
        ["first_name", "second_name", "assists"]
    ].to_dict(orient="records"),

    "top_goal_involvements": top_goal_involvements[
        ["first_name", "second_name", "goals_scored", "assists", "goal_involvements"]
    ].to_dict(orient="records"),

    "top_fpl_points": top_fpl_points[
        ["first_name", "second_name", "total_points"]
    ].to_dict(orient="records")
}

with open("data/pl_data.json", "w", encoding="utf-8") as file: 
    json.dump(pl_data, file, ensure_ascii=False, indent=4)