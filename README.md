# judd.world

Built by: Mubarak Odufade

This web app presents statistical information on New York State's conviction data. It was built using scraped conviction data from New York State's Department of Corrections and Community Supervision official website (https://nysdoccslookup.doccs.ny.gov/), and the data presented is real and was scraped circa 2022, thus some of the ages might be off by a year or two. 

Data Collection Phase: 
The data was scraped using Python's selenium library, and was normalized using Pandas. I scraped the data, cleaned it up and normalized it using pandas and wrote it into a csv file using a Python library. The scripts I used for this, as well as the csv file, are available at this repository link: https://github.com/mao-99/NYS-DOCCS-Data-Scraper 
I also have the scripts in the backend folder of this repository, the scripts can be found at : ./src/backend/datascraperWithSelenium.py and ./src/backend/csvCleaner.py

Data Cleaning and Preprocessing:
After scraping the data into the csv file, I built a Supabase table with all the columns and the attributes each column would have. This is the schema of the table: 


| column_name       | data_type                | character_maximum_length |
| ----------------- | ------------------------ | ------------------------ |
| id                | bigint                   |                          |
| din               | character varying        |                          |
| firstName         | text                     |                          |
| lastName          | text                     |                          |
| dob               | date                     |                          |
| age               | smallint                 |                          |
| race              | character varying        |                          |
| multipleOffense   | boolean                  |                          |
| crimeArray        | jsonb                    |                          |
| degreeArray       | jsonb                    |                          |
| status            | character varying        |                          |
| prison            | character varying        |                          |
| county            | character varying        |                          |
| aggMinSentence    | smallint                 |                          |
| aggMaxSentence    | smallint                 |                          |
| incarcerationDate | date                     |                          |
| sentenceStart     | date                     |                          |
| releaseDate       | date                     |                          |
| sentenceDuration  | smallint                 |                          |
| created_at        | timestamp with time zone |                          |
| classArray        | jsonb                    |                          |


In order to populate my table with the data, I needed to further clean up the csv file in order to be able to import the data directly into the supabase table by importing it. So I wrote a JS script to parse through the initial csv file and seperate them into each table column, and to further clean up the rows with incorrect/inconsistent data. After processing each line, I added them to dataScrap.csv
The script and the second csv file can be found at: ./src/backend/databasePopulator.js and ./src/backend/dataScrap.csv respectively.


Database Population:

After getting the csv file in the right format for the supabase table, I imported the csv file into supabase and populated my supabase table with all 337,244 entries. 

NOTE:

Due to supabase restrictions, I am unable to get all 337,244 entries once and so the visualized data is only a portion of the entire database, presenting data on only 10000 convictions at a time.


Time spent: 6 hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **A create form allows users to add new cremates**
- [X] **Users can name the crewmate and set the crewmate's attributes by clicking on one of several values**
- [X] **The site displays a summary page of all the user's added crewmates**
- [X] **A previously created crewmate can be updated from the crewmate list**
- [X] **A previously created crewmate can be deleted from the crewmate list**
- [X] **Each crewmate has a direct, unique link to an info page about them**

The following **optional** features are implemented:

- [ ] A crewmate can be given a category upon creation which restricts their attributes
- [ ] The site displays summary statistics about a user's crew on their crew page 
- [ ] The site displays a custom "success" metric about a user's crew which changes the look of the crewmate list

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://imgur.com/uMKfOsa.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


GIF created with ScreenToGif(https://www.screentogif.com/) for Windows

## License

    Copyright 2024 Mubarak Odufade

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
