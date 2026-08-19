#PL project

import requests
import matplotlib as plt
import pandas as pd

url = "https://fantasy.premierleague.com/api/bootstrap-static/"
response = requests.get(url)
data = response.json()

print(data)