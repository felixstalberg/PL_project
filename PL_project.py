import requests
import matplotlib as plt
import pandas as pd
import json

#API för statistik
url = "https://fantasy.premierleague.com/api/bootstrap-static/"
response = requests.get(url)
data = response.json()

#API för matchstatistik
fixtures_url = "https://fantasy.premierleague.com/api/fixtures/"
fixtures_response = requests.get(fixtures_url)
fixtures = fixtures_response.json()

#print(data.keys()) #--> dict_keys(['chips', 'events', 'game_settings', 'game_config', 'phases', 'teams',
                                   #'total_players', 'element_stats', 'element_types', 'elements'])

#ta ut alla features som finns för spelarna
player_features = pd.DataFrame(data["elements"])

#ta ut alla features som finns för lagen
team_features = pd.DataFrame(data["teams"])

"#Matcher"
fixtures_df = pd.DataFrame(fixtures)

matches = fixtures_df[["event", "team_h", "team_a", "team_h_score", "team_a_score"]].copy()

matches = matches.rename(columns={"event": "gameweek"})

home_teams = team_features[["id", "name"]].rename(
    columns={"id": "team_h", "name": "home_team"}
)

away_teams = team_features[["id", "name"]].rename(
    columns={"id": "team_a", "name": "away_team"}
)
#ersätt team_h/team_a (id) till riktiga namn mha merge
matches = matches.merge(home_teams, on="team_h")
matches = matches.merge(away_teams, on="team_a")

matches = matches.drop(columns=["team_h", "team_a"])

"Tabell"
table = team_features.sort_values("position") #sortera team_features efter position

"Skytteliga (Topp 20)"
top_scorers = player_features.sort_values("goals_scored", ascending=False).head(20)

"Assistliga (Topp 20)"
top_assists = player_features.sort_values("assists", ascending=False).head(20)

"Poängliga (Topp 20)"
player_features["goal_involvements"] = player_features["goals_scored"] + player_features["assists"]
top_goal_involvements = player_features.sort_values("goal_involvements", ascending=False).head(20)

"FPL - poängliga (Topp 20)"
top_fpl_points = player_features.sort_values("total_points", ascending=False).head(20)

#skapa json fil med topp 20 för de olika "ligorna"
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
    ].to_dict(orient="records"),

    "table": table[["position", "name"]
    ].to_dict(orient="records"),

    "matches": matches.to_dict(orient="records")
}

with open("data/pl_data.json", "w", encoding="utf-8") as file: 
    json.dump(pl_data, file, ensure_ascii=False, indent=4)