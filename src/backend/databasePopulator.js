import { promises as fs} from 'fs';
import os, { type } from 'os';
import {parse} from 'csv';
import { createClient } from '@supabase/supabase-js';
import { createObjectCsvWriter } from 'csv-writer';

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


const csvWriter = createObjectCsvWriter({
  path: 'dataScrap3.csv',
  header: [
    { id: 'din', title: 'din' },
    { id: 'firstName', title: 'firstName' },
    { id: 'lastName', title: 'lastName' },
    { id: 'dob', title: 'dob' },
    { id: 'age', title: 'age' },
    { id: 'race', title: 'race' },
    { id: 'multipleOffense', title: 'multipleOffense' },
    { id: 'crimeArray', title: 'crimeArray' },
    { id: 'degreeArray', title: 'degreeArray' },
    { id: 'status', title: 'status' },
    { id: 'prison', title: 'prison' },
    { id: 'county', title: 'county' },
    { id: 'aggMinSentence', title: 'aggMinSentence' },
    { id: 'aggMaxSentence', title: 'aggMaxSentence' },
    { id: 'incarcerationDate', title: 'incarcerationDate' },
    { id: 'sentenceStart', title: 'sentenceStart' },
    { id: 'releaseDate', title: 'releaseDate' },
    { id: 'sentenceDuration', title: 'sentenceDuration' },
    { id: 'classArray', title: 'classArray' },
  ],
})

const readAndParseCSV = async () => {
  //This is the final data as an array of objects
  let final = [];
  try{
    
    const content = await fs.readFile('../assets/scrap.csv');
    const specialPattern = /^{\s*"[^"]*"(?:\s*,\s*"[^"]*")*\s*}$/;

    const records = parse(content, (error, records) => {
      if (error){
        console.error("Error: ", error);
      }
      else {
        console.log(records.length);
        console.log(typeof(records));
        Object.entries(records).forEach((key, value) => {
          //console.log("Key: ", key, "Value: ", value);
          let [lastName, firstName, din, dob, age, crime, race, status, prison, county, incarcerationDate, sentenceStart, releaseDate, aggMinSentence, aggMaxSentence, ...remaining] = key[1];
          // console.log("This is the last name: ", lastName);
          // console.log("This is the first name: ", firstName);
          // console.log("This is the din: ", din);
          // console.log("This is the dob: ", dob);
          // console.log("This is the age: ", age);
          // console.log("This is the crime: ", crime);
          // console.log("This is the race: ", race);
          // console.log("This is the status: ", status);
          // console.log("This is the prison: ", prison);
          // console.log("This is the county: ", county);
          // console.log("This is the incarceration date: ", incarcerationDate);
          // console.log("This is the sentence start: ", sentenceStart);
          // console.log("This is the release date: ", releaseDate);
          // console.log("This is the aggregate min sentence: ", aggMinSentence);
          // const sentenceDuration = getMonthDistance(new Date(sentenceStart), new Date(releaseDate));
          // console.log("This is the sentence duration: ", sentenceDuration);
          dob = new Date(dob).toISOString().split('T')[0] + ' 00:00:00';
          age = parseInt(age);
          if (isNaN(age)) {
            console.error(`Invalid age value: ${age}`);
            // Skip over the entry
            age = null; // or return; or break; depending on your loop structure

          }
          if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(incarcerationDate)) {
            incarcerationDate = new Date(incarcerationDate).toISOString().split('T')[0] + ' 00:00:00';
          } else {
            // Handle invalid date value
            console.error(`Invalid date value: ${incarcerationDate}`);
            incarcerationDate = null; // or some default value
          }
          sentenceStart = new Date(sentenceStart).toISOString().split('T')[0] + ' 00:00:00';

          //This removes the nan: nan from the crime column
          let preprocessedCrimes = crime.replace(/, nan: nan/g, '');

          //This replaces single quotes with double quotes for JSON parsing
          preprocessedCrimes = preprocessedCrimes.replace(/'/g, '"');

          //This creates a json object from the preprocessed string
          let crimes = JSON.parse(preprocessedCrimes);
          // console.log("This is the json crime after processing and before seperation: ", crimes);
          // console.log("This is the type of crime: ", typeof(crimes));

          //This seperates the crimes json object into an array of crimes, an array of degrees, and an array of classes
          let crimeArray = [], degreeArray = [], classArray = [];
          Object.entries(crimes).map(([key, value]) =>{
            let degree = key.slice(-3);
            let crime = key.slice(0, -4);
            let classType = value;
            degreeArray.push(degree);
            crimeArray.push(crime);
            classArray.push(classType);
            allCrimes.add(crime);
            return {crime, degree, classType};
          })

          // This is a test of the previous seperation
          // console.log("This is the crime array: ", crimeArray);
          // console.log("This is the degree array: ", degreeArray);
          // console.log("This is the class array: ", classArray);

          //This uses the length of the crime array to determine if there are multiple crimes committed
          let multiple = false;
          crimeArray.length > 1 ? multiple = true : multiple = false;

          //This is used to convert the aggregate sentences to months, from their initial string formats
          aggMaxSentence = convertToMonths(aggMaxSentence);
          aggMinSentence = convertToMonths(aggMinSentence);
          // console.log("This is the aggregate min sentence: ", aggMinSentence);
          // console.log("This is the aggregate max sentence: ", aggMaxSentence);
          // console.log("This is the type of aggregate min sentence: ", typeof(aggMinSentence));
          // console.log("This is the type of aggregate max sentence: ", typeof(aggMaxSentence));

          //This is used to calculate the sentence duration in months by parsing the release date of each record using regex
          const nullReleaseDate = null; //Create a null date object used to specify that a convict is still in prison or their release date is unknown
          const dateRegex = /^(\d{1,2}\/\d{1,2}\/\d{2})/; // Regular expression to match the date string in the format MM/DD/YY
          const dateMatch = releaseDate.match(dateRegex); // Match the date string with the regular expression
          if (dateMatch) {
            const dateString = dateMatch[1]; // Extract the date string
            const dateObject = new Date(dateString); // Create a Date object
            //console.log(dateObject); // Output: Date object
            releaseDate = dateObject.toISOString().split('T')[0] + ' 00:00:00';; // Set the release date to the date object
          } else{
            releaseDate = null;
          }

          //Check if a convict is released, if released then set the release date to the date of release, else set the release date to the null date object
          status === 'RELEASED' ? releaseDate = releaseDate : releaseDate = nullReleaseDate;
          //console.log("This is the release date: ", releaseDate);

          //This is used to set the sentence duration of the convict in months. If the convict is still in prison, the sentence duration is set to 0
          let sentenceDuration;
          status === 'RELEASED' ? sentenceDuration = getMonthDistance(new Date(sentenceStart), new Date(releaseDate)) : sentenceDuration = 0;
          //console.log("This is the sentence duration: ", sentenceDuration);

          //This is used to convert the crime array, degree array, and class array to a JSON string formats
          crimeArray = JSON.stringify(crimeArray);
          degreeArray = JSON.stringify(degreeArray);
          classArray = JSON.stringify(classArray);

          //This is used to create an object that will be written to the csv file
          const entry = {
            din,
            firstName,
            lastName,
            dob,
            age,
            race,
            'multipleOffense': multiple,
            crimeArray,
            degreeArray,
            status,
            prison,
            county,
            aggMinSentence,
            aggMaxSentence,
            incarcerationDate,
            sentenceStart,
            releaseDate,
            sentenceDuration,
            classArray,
          };
          //console.log(entry);
          // console.log("This is the crime array: ", crimeArray);
          // console.log("This is the degree array: ", degreeArray);
          // console.log("This is the class array: ", classArray);

          final.push(entry);
        })
        console.log("This is the length of the final data: ", final.length);
        csvWriter.writeRecords(final).then(() => console.log('The CSV file was written successfully'));
        return final;
    
      }
    });
    
    //console.log(records);
    return final;
  }
  catch(error){
    console.error("Error: ", error);
  }
}

const updateFinal = async () =>{
  const finalData = await readAndParseCSV();
  //console.log("This is the length of final data: ", finalData.length);
  return finalData;
}

// const finalData = await updateFinal();
//console.log("This is the length of final data outside updateFinal: ", finalData.length);

console.log()