from django.shortcuts import render
from bs4 import BeautifulSoup
from pprint import pprint
import requests
from django.http import JsonResponse
from .models import WeatherAverage
from django.views.decorators.csrf import csrf_exempt
import datetime

# crawling test
@csrf_exempt   
def weather(request):

    html = requests.get('https://search.naver.com/search.naver?query=%EB%82%A0%EC%94%A8#lnb')
    #pprint(html.text)

    soup = BeautifulSoup(html.text, 'html.parser')
    #print(soup)
    now_temp = soup.find('div', {'class': 'temperature_text'})
    lowest = soup.find('span', {'class': 'lowest'}).text
    highest = soup.find('span', {'class': 'highest'}).text
   
    now_temp = now_temp.get_text()
    now_temp = now_temp[6:]
    now_temp = now_temp[:-2]

    #highest = highest.get_text()
    highest = highest[4:]
    highest = highest[:-1]

    #lowest = lowest.get_text()
    lowest = lowest[4:]
    lowest = lowest[:-1]
    print("현재 기온 " +now_temp)
    print("최고 기온 :"+highest)
    print("최저 기온 : "+lowest)
    
    showtype = request.GET['temptype']

    if showtype=='avg':
        temp = now_temp
    elif showtype=='max':
        temp = highest
    elif showtype=='min':
        temp = lowest

    ob = WeatherAverage.objects.filter(temp_max__range=(int(temp)-1,int(temp)+1))
    
    l = []
    for i in range(len(ob)):
        l.append(ob[i].temp_date.strftime("%Y-%m-%d"))
     

    context = {showtype:temp, "date":l}
    print(context)
    return JsonResponse(context)

def weather_info(request):
    html = requests.get('https://search.naver.com/search.naver?query=%EB%82%A0%EC%94%A8#lnb')
    #pprint(html.text)

    soup = BeautifulSoup(html.text, 'html.parser')
    #print(soup)
    now_temp = soup.find('div', {'class': 'temperature_text'})
    lowest = soup.find('span', {'class': 'lowest'}).text
    highest = soup.find('span', {'class': 'highest'}).text
   
    now_temp = now_temp.get_text()
    now_temp = now_temp[6:]
    now_temp = now_temp[:-2]

    #highest = highest.get_text()
    highest = highest[4:]
    highest = highest[:-1]

    #lowest = lowest.get_text()
    lowest = lowest[4:]
    lowest = lowest[:-1]

    context = {
        "max":highest,
        "min":lowest,
        "avg":now_temp
    }
    return JsonResponse(context)