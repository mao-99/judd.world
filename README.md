# judd.world

Mission: 

Judd aims to provide easy access to accurate and real local conviction and sentencing data, promoting transparency and accountability in the criminal justice system. By simplifying complex data, Judd enables individuals to understand the nuances of the system, identify biases and disparities, and make informed decisions.


Stack

    Data Collection and Scraping: Python, Selenium, Pandas
    Data Preprocessing and Processing: JavaScript, Excel
    Database and Data Storage: Supabase
    Web Stack: React, Node, Vite, Bootstrap
    Data Visualization: React-chartjs-2

Data Collection

Data was scraped from the New York State Department of Corrections and Community Supervision website using Python's Selenium package.

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


Features
Simple Average

    Calculate average sentence length for a specific profile based on age, race, county, crime type, and degree.

Simple Average Plots

    Select up to four crime types and corresponding degrees.
    Filter plots by age, county, or race.
    View average sentence lengths as histograms.

Simple Average Comparisons

    Select up to four demographic profiles (age, county, race).
    View average sentence lengths for crimes that match all selected profiles.
    Compare average sentences across different demographic profiles.

## Video Walkthrough

Here's a walkthrough of each feature:


Simple Average:
<img src='https://imgur.com/OPvAkyc.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

Simple Average Plot:
<img src='https://imgur.com/zVHNwsa.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

Simple Average Comparison: 
<img src='https://imgur.com/sRzEbSg.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

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
