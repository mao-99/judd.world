import { promises as fs} from 'fs';
import os, { type } from 'os';
import {parse} from 'csv';
import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.VITE_supabaseURL;
const supabaseKey = process.env.VITE_supabaseKey;
const supabase = createClient("https://mbyzugllucwkehrgjwhr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ieXp1Z2xsdWN3a2Vocmdqd2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MTg3MjgsImV4cCI6MjAyODk5NDcyOH0.r5yTEF7_NvsoGxsNxWmIFTUIxoj6G860tsECBBYhQBY");

function convertToMonths(timeString) {
  const matches = timeString.match(/(\d+) (\w+)/g);
  if (!matches) return 0;
  let months = 0;
  for (const match of matches) {
    const [value, unit] = match.split(' ');
    if (unit === 'Years') {
      months += parseInt(value) * 12;
    } else if (unit === 'Months') {
      months += parseInt(value);
    }
  }
  return months;
}

function parseSpecialObjects(obj) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (key.includes("'") || key === "nan") {
      // Adjust the property name to make it valid JSON
      const newKey = key.replace("'", "").replace("nan", "null");
      newObj[newKey] = obj[key];
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

function getMonthDistance(date1, date2) {

  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();

  const yearDifference = year2 - year1;
  const monthDifference = month2 - month1;

  const totalMonthDifference = (yearDifference * 12) + monthDifference;

  return totalMonthDifference;
}

async function readAndParseCSV(){
  try{
    
    const content = await fs.readFile('../assets/scrap.csv');
    const specialPattern = /^{\s*"[^"]*"(?:\s*,\s*"[^"]*")*\s*}$/;

    const records = parse(content, (error, records) => {
      if (error){
        console.error("Error: ", error);
      }
      else {
        //console.log(records[0])
        //Things needed: din, first, last, dob, age, race, multipleOffense, crimes, degrees
        //status, prison, county, aggMinSentence, aggMaxSentence, incarcerationDate, sentenceStart
        //releaseDate, sentenceDuration, classes
        let count = 0;
        records.forEach((record) => {
          if (count >= 337244){
            return;
          }
          console.log(count);
          // console.log(record)
          // console.log(typeof(record))
          count++;
          // if (count >= 5){
          //   return;
          // }
          var [lastName, firstName, din, dob, age, crime, race, status, prison, county, incarcerationDate, sentenceStart, releaseDate, aggMinSentence, aggMaxSentence, ...remaining] = record;
          // //console.log(releaseDate);
          dob = new Date(dob);
          // // console.log("This is the new date: ", newDate);
          // // console.log("--------------------------------");
          // // console.log("This is me cleaning up the crimes and degrees: ");
          // //Remove nan key value pairs if seen
          // console.log("Number 1",crime);
          // console.log("Number 2", typeof(crime));
          // let crimes = "{}"
          let preprocessedCrimes = crime.replace(/, nan: nan/g, '');
          //Replace single quotes with double quotes for JSON parsing
          preprocessedCrimes = preprocessedCrimes.replace(/'/g, '"');
          let crimes = JSON.parse(preprocessedCrimes);
          // console.log("These are the crimes: ", crimes)
          // console.log(typeof(crimes))
          var allCrimes = [];
          var allDegrees = [];
          var allClasses = [];
          let multiple;
          let sentenceDuration;
          Object.entries(crimes).map(([aCrime, value])=>{
            //Extract the degree from the end of the initial crime string
            let degree = aCrime.slice(-3);
            //console.log(degree);
            allDegrees.push(degree);
            //console.log(aCrime.slice(0, -4))
            //Reassign the crime to not include the degree
            aCrime = aCrime.slice(0, -4)
            allCrimes.push(aCrime);
            //Extracting the crime class
            //console.log(value);
            allClasses.push(value);
            allClasses.length > 1 ? multiple = true : multiple = false;
          })
          //console.log("The length of all crimes", allCrimes.length);
          //console.log(multiple);
          //console.log(aggMaxSentence);
          //console.log(aggMinSentence);
          //console.log(typeof(aggMaxSentence));
          aggMaxSentence = convertToMonths(aggMaxSentence);
          aggMinSentence = convertToMonths(aggMinSentence);
          // console.log("Number 3", typeof(incarcerationDate));
          incarcerationDate = new Date(incarcerationDate);
          sentenceStart = new Date(sentenceStart)
          let nullReleaseDate = new Date('1111-01-01');
          // // console.log("This is the date: ", defaultReleaseDate)
          // // console.log(typeof(defaultReleaseDate));
          // // console.log("This is the date: ", incarcerationDate)
          // // console.log("This is the type: ", typeof(incarcerationDate))
          // // console.log("This is the date: ", sentenceStart)
          // // console.log("This is the type: ", typeof(sentenceStart))
  
  
          // // console.log(allCrimes);
          // // console.log(allDegrees);
          // // console.log(allClasses);
          // // console.log(status);
          // // console.log(status === 'RELEASED');
          const dateRegex = /^(\d{1,2}\/\d{1,2}\/\d{2})/;
          const dateMatch = releaseDate.match(dateRegex);
          if (dateMatch) {
            const dateString = dateMatch[1]; // Extract the date string
            const dateObject = new Date(dateString); // Create a Date object
            //console.log(dateObject); // Output: Date object representing 10/31/19
            releaseDate = dateObject
          } else{
            releaseDate = nullReleaseDate;
          }
          status === 'RELEASED' ? releaseDate = releaseDate : releaseDate = nullReleaseDate;
          // console.log(releaseDate);
          // console.log(sentenceStart);
          status === 'RELEASED' ? sentenceDuration = getMonthDistance(sentenceStart, releaseDate instanceof Date ? releaseDate : nullReleaseDate) : sentenceDuration = 0;
          const crimesJSON = JSON.stringify(allCrimes);
          const degreesJSON = JSON.stringify(allDegrees);
          const classesJSON = JSON.stringify(allClasses);
          let entry = { din, firstName, lastName, dob, age, race, 'multipleOffense': multiple, 'crime(s)': crimesJSON, 'degree(s)': degreesJSON, status, prison, county, aggMinSentence, aggMaxSentence, incarcerationDate, sentenceStart, releaseDate, sentenceDuration, 'class(es)': classesJSON }
          // console.log(entry);
          const insertEntry = async (e) => {
            const {data, error} = await supabase.from("convictionData").insert([entry]);
            if (error) {
              console.error('Error: ', error);
              return;
            }
          }
          insertEntry();
          // count++;
          //console.log(records)
          // console.log(record);
          // console.log(typeof(record));
          
        })
      }
    });

    //console.log(records);
  }
  catch(error){
    console.error("Error: ", error);
  }
}

readAndParseCSV();
