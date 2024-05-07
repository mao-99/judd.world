import csv
import datetime
import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import TimeoutException

url = 'https://nysdoccslookup.doccs.ny.gov/'
driver = webdriver.Chrome('/Users/macbook/Desktop/Stack/chromedriver')
driver.get(url)
WebDriverWait(driver, 20).until(ec.element_to_be_clickable((By.XPATH, '//*[@id="lst"]'))).send_keys('A')
driver.find_element(By.XPATH, "/html/body/app/div[1]/div/div[3]/div[3]/form/div[2]/div[2]/div/button[1]").click()

def links_scrawler():
    today = datetime.datetime.now()
    if WebDriverWait(driver, 2).until(ec.element_to_be_clickable((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[5]/table/tbody/tr/td/a'))):
        # print('me')
        n = 1
        while n < 11:
            WebDriverWait(driver, 2).until(ec.element_to_be_clickable((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[5]/table/tbody/tr[{}]/td[1]/a'.format(n)))).click()
            WebDriverWait(driver, 10).until(ec.presence_of_element_located((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[5]/div/h4')))
            lastName = WebDriverWait(driver,20).until(ec.visibility_of_element_located((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[1]/div/h3'))).text.split(', ')[0]
            try:
                firstName = WebDriverWait(driver,20).until(ec.visibility_of_element_located((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[1]/div/h3'))).text.split(', ')[1]
            except IndexError:
                firstName = ''
            dobInit = (WebDriverWait(driver, 20).until(ec.visibility_of_element_located((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[4]/div[2]'))).text).split('/')
            # print(dobInit)
            try:
                dob = datetime.date(int(dobInit[2]), int(dobInit[0]), int(dobInit[1]))
            except ValueError:
                dob = datetime.date(1111, 1, 1)
            age = driver.find_element(By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[4]/div[3]').text.split(' ')[0]
            race = WebDriverWait(driver, 20).until(ec.visibility_of_element_located((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[4]/div[1]'))).text
            crimeContainer = pd.read_html(driver.find_element(By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[4]/div').get_attribute('innerHTML'))
            # crimeContainer1 = pd.DataFrame(crimeContainer0)
            crime = pd.Series(crimeContainer[0].Class.values, index=crimeContainer[0].Crime).to_dict()
            # print(crime)
            status = WebDriverWait(driver, 20).until(ec.visibility_of_element_located((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[5]/div[2]'))).text
            prison = WebDriverWait(driver, 20).until(ec.visibility_of_element_located((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[6]/div[2]'))).text
            county = driver.find_element(By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[7]/div[2]').text
            incarcerationDate = driver.find_element(By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[8]/div[2]').text
            sentenceStart = driver.find_element(By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[9]/div[2]').text
            releaseDate = driver.find_element(By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[2]/div/span[2]').text
            aggMinSentence = driver.find_element(By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[7]/div[2]').text
            aggMaxSentence = driver.find_element(By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[8]/div[2]').text
            # lastName = driver.find_element(By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[1]/div/h3').text
            # firstName = driver.find_element(By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[1]/div/h3').text.split(', ')[1]
            # print(lastName)
            din = WebDriverWait(driver,20).until(ec.visibility_of_element_located((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[2]/div[1]/div[1]/div[2]'))).text[5:]
            data = [lastName,firstName, din, dob, age, crime, race, status, prison, county, incarcerationDate, sentenceStart, releaseDate, aggMinSentence, aggMaxSentence, today]
            WebDriverWait(driver, 5).until(ec.element_to_be_clickable((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[4]/div[1]/a'))).click()
            n += 1
    # print('not me')    
            with open('scrap.csv', mode='a', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(data)
            # time.sleep(5)
def pages_scrawler():
    n = 0
    while WebDriverWait(driver, 20).until(ec.presence_of_element_located((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[5]/table/tbody/tr[1]/td[2]'))).text < 'GARDINE, WAYNE':
        driver.find_element(By.XPATH, '/html/body/app/div[1]/div/div[3]/div[5]/p/a').click()
        n += 10
    print(n)
    #     if WebDriverWait(driver, 20).until(ec.presence_of_element_located((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[5]/table/tbody/tr/td'))).text == 'ADAMS, AKOYA L':
    #         print('me')
    while (WebDriverWait(driver, 20).until(ec.element_to_be_clickable((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[5]/p/a')))):
        links_scrawler()
        WebDriverWait(driver, 10).until(ec.element_to_be_clickable((By.XPATH, '/html/body/app/div[1]/div/div[3]/div[5]/p/a'))).click()
        
pages_scrawler()
    # headers = ['Last Name', 'First Name', 'DIN', 'Time This Data Was Logged']
    

    # print(today)
    
    
# links_scrawler()
