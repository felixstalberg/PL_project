#PL project

import requests
import matplotlib as plt
import pandas as pd

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
sorted_table_position = team_features.sort_values("position")

#skriv ut en tabell som innehåller namn, position, spelade matcher osv
#print(sorted_table_position[["position", "name", "played", "win", "draw", "loss", "points"]].to_string(index=False))


"Skytteliga"
sorted_goals_scored = player_features.sort_values("goals_scored", ascending=False)
#print(sorted_goals_scored[["first_name", "second_name", "goals_scored"]].to_string(index=False))

"Assistliga"
sorted_assists = player_features.sort_values("assists", ascending=False)
#print(sorted_assists[["first_name", "second_name", "assists"]].to_string(index=False))

"Poängliga"
player_features["goal_involvements"] = player_features["goals_scored"] + player_features["assists"]
sorted_goal_involvements = player_features.sort_values("goal_involvements", ascending=False)
print(sorted_goal_involvements[["first_name", "second_name", "goals_scored", "assists", "goal_involvements"]].to_string(index=False))

"FPL - poängliga"
sorted_points = player_features.sort_values("total_points", ascending=False)
#print(sorted_points[["first_name", "second_name", "total_points"]])