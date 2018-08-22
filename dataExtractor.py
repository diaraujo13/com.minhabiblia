import requests
from bs4 import BeautifulSoup

r = requests.get("https://www.bibliaonline.com.br/acf/index")
firstPage = BeautifulSoup(r.text)

