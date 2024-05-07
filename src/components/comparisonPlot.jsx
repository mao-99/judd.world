import style from "./comparisons.module.css"
import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import CPlot from "./cPlot";
import { indexOf, set } from "lodash";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Sentence Durations - in months',
      },
    },
    maintainAspectRatio: false,
}


export default function ComparisonPlot({ database, object1, object2, object3, object4, allCrimes }) {
    const [object1Label, setObject1Label] = useState(
        (object1.age ? object1.age + ", " : "") +
        (object1.county ? object1.county + ", " : "") +
        (object1.race ? object1.race : "")
      );
      const [object2Label, setObject2Label] = useState(
        (object2.age ? object2.age + ", " : "") +
        (object2.county ? object2.county + ", " : "") +
        (object2.race ? object2.race : "")
      );
      
      const [object3Label, setObject3Label] = useState(
        (object3.age ? object3.age + ", " : "") +
        (object3.county ? object3.county + ", " : "") +
        (object3.race ? object3.race : "")
      );
      
      const [object4Label, setObject4Label] = useState(
        (object4.age ? object4.age + ", " : "") +
        (object4.county ? object4.county + ", " : "") +
        (object4.race ? object4.race : "")
      );
    const [plotData, setPlotData] = useState([]);
    const [showPlot, setShowPlot] = useState(false);
    let plotObject = {}

    //Helper Functions:

    const average = (array) => {
        let sum = 0;
        array.map((element) => {
            sum += element;
        })
        return Math.floor(sum/array.length);
    }

    const handleInputs = () => {
        if (object1.age === ""){
            object1.age = null;
        }
        if (object1.race === ""){
            object1.race = null;
        }
        if (object1.county === ""){
            object1.county = null;
        }

        //Formatting object2 before filtering database
        if (object2.age === ""){
            object2.age = null;
        }
        if (object2.race === ""){
            object2.race = null;
        }
        if (object2.county === ""){
            object2.county = null;
        }

        //Formatting object3 before filtering database
        if (object3.age === ""){
            object3.age = null;
        }
        if (object3.race === ""){
            object3.race = null;
        }
        if (object3.county === ""){
            object3.county = null;
        }

        //Formatting object4 before filtering database
        if (object4.age === ""){
            object4.age = null;
        }
        if (object4.race === ""){
            object4.race = null;
        }
        if (object4.county === ""){
            object4.county = null;
        }    
    }

    //Rehandling Object1
    const rehandleObject1 = () => {
        let filteredData = []
        filteredData = database;
        if (object1.age !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.age === parseInt(object1.age);
            })
        }
        if (object1.county !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.county === object1.county;
            })
        }
        if (object1.race !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.race === object1.race;
            })
        }
        //console.log("This is me handling object 1: ", filteredData);
        if (object1.age === null && object1.county === null && object1.race === null){
            filteredData = [];
        }
        let test = {};
        filteredData.map((entry) => {
            let entryCrimes = entry.crimeArray;
            let entryDegrees = entry.degreeArray;
            let key = JSON.stringify(entryCrimes) + ' ' + JSON.stringify(entryDegrees.sort());
            if (key in test){
                test[key].sentenceDuration.push(entry.sentenceDuration);   
            }
            else{
                test[key] = {sentenceDuration: [entry.sentenceDuration], degrees: entryDegrees};
            }
        })
        return test;
    }

    //Rehandling Object2
    const rehandleObject2 = () => {
        let filteredData = []
        filteredData = database;
        if (object2.age !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.age === parseInt(object2.age);
            })
        }
        if (object2.county !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.county === object2.county;
            })
        }
        if (object2.race !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.race === object2.race;
            })
        }
        //console.log("This is me handling object 2: ", filteredData);
        if (object2.age === null && object2.county === null && object2.race === null){
            filteredData = [];
        }
        let test = {};
        filteredData.map((entry) => {
            let entryCrimes = entry.crimeArray;
            let entryDegrees = entry.degreeArray;
            let key = JSON.stringify(entryCrimes) + ' ' + JSON.stringify(entryDegrees.sort());
            if (key in test){
                test[key].sentenceDuration.push(entry.sentenceDuration);   
            }
            else{
                test[key] = {sentenceDuration: [entry.sentenceDuration], degrees: entryDegrees};
            }
        })
        return test;
    }

    //Rehandling Object3
    const rehandleObject3 = () => {
        let filteredData = []
        filteredData = database;
        if (object3.age !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.age === parseInt(object3.age);
            })
        }
        if (object3.county !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.county === object3.county;
            })
        }
        if (object3.race !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.race === object3.race;
            })
        }
        //console.log("This is me handling object 3: ", filteredData);
        if (object3.age === null && object3.county === null && object3.race === null){
            filteredData = [];
        }
        let test = {};
        filteredData.map((entry) => {
            let entryCrimes = entry.crimeArray;
            let entryDegrees = entry.degreeArray;
            let key = JSON.stringify(entryCrimes) + ' ' + JSON.stringify(entryDegrees.sort());
            if (key in test){
                test[key].sentenceDuration.push(entry.sentenceDuration);   
            }
            else{
                test[key] = {sentenceDuration: [entry.sentenceDuration], degrees: entryDegrees};
            }
        })
        return test;
    }

    //Rehandling Object4
    const rehandleObject4 = () => {
        let filteredData = []
        filteredData = database;
        if (object4.age !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.age === parseInt(object4.age);
            })
        }
        if (object4.county !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.county === object4.county;
            })
        }
        if (object4.race !== null){
            filteredData = filteredData.filter((entry) => {
                return entry.race === object4.race;
            })
        }
        //console.log("This is me handling object 4: ", filteredData);
        if (object4.age === null && object4.county === null && object4.race === null){
            filteredData = [];
        }
        let test = {};
        filteredData.map((entry) => {
            let entryCrimes = entry.crimeArray;
            let entryDegrees = entry.degreeArray;
            let key = JSON.stringify(entryCrimes) + ' ' + JSON.stringify(entryDegrees.sort());
            if (key in test){
                test[key].sentenceDuration.push(entry.sentenceDuration);   
            }
            else{
                test[key] = {sentenceDuration: [entry.sentenceDuration], degrees: entryDegrees};
            }
        })
        return test;
    }


    // //Handling object 1
    // const handleObject1 = () => {
    //     if (object1.age !== null && object1.county === null && object1.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return entry.age === parseInt(object1.age);
    //         })
    //         // console.log("This is test: ", test);
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if ((JSON.stringify(crimes) in test2)){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         //console.log("This is test2: ", test2);
    //         //setObject1Data(test2)
    //         return test2;
    //     }
    //     else if (object1.age === null && object1.county === null && object1.race === null){
    //         //setObject1Data({});
    //         return {};
    //     }
    //     else if (object1.age !== null && object1.county !== null && object1.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object1.county) && (entry.age === parseInt(object1.age)));
    //         })
    //         let test2 = {};
    //         //console.log("This is the test data, it should house db entries that have the same county and age: ", test)
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             //console.log("These are the degrees: ", entry.degreeArray)
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject1Data(test2)
    //     }
    //     else if (object1.age !== null && object1.county !== null && object1.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object1.county) && (entry.age === parseInt(object1.age)) && (entry.race === object1.race));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject1Data(test2)
    //     }
    //     else if (object1.age === null && object1.county === null && object1.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return (entry.race === object1.race);
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject1Data(test2)
    //     }
    //     else if (object1.age === null && object1.county !== null && object1.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return (entry.county === object1.county);
    //         })
    //         console.log("This is the test and it should contain the raw initially filtered data: ", test)
    //         let test2 = {};
    //         let filteredData = test.map((entry) => {
    //             const sortedCrimes = entry.crimeArray.sort();
    //             const sortedDegrees = sortedCrimes.map((crime) => {
    //               return entry.degreeArray[entry.crimeArray.indexOf(crime)];
    //             });
    //             const key = JSON.stringify(sortedCrimes);
    //             if (key in test2) {
    //               test2[key].sentenceDuration.push(entry.sentenceDuration);
    //             } else {
    //               test2[key] = { sentenceDuration: [entry.sentenceDuration], degrees: sortedDegrees };
    //             }
    //             return test2;
    //           }, {});
    //         // test.map((entry) => {
    //         //     let crimes = entry.crimeArray;
    //         //     let degrees = [];
    //         //     crimes.map((crime) => {
    //         //         degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //         //     })
    //         //     crimes = crimes.sort();
    //         //     if (JSON.stringify(crimes) in test2){
    //         //         test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //         //     }
    //         //     else{
    //         //         test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //         //     }
    //         // })
    //         console.log("This is the test2, and it shows the data after the second filtering process: ", test2)
    //         return test2;
    //         // setObject1Data(test2)
    //     }
    //     else if (object1.age === null && object1.county !== null && object1.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object1.county) && (entry.race === object1.race));
    //         })
    //         //console.log("This is the test: ", test)
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         //console.log("This is the test2: ", test2)
    //         return test2;
    //         // setObject1Data(test2)
    //     }
    //     else if (object1.age !== null && object1.county === null && object1.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.age === parseInt(object1.age) && (entry.race === object1.race)));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject1Data(test2)
    //     }    
    // }
    // //Handling object 2
    // const handleObject2 = () => {
    //     if (object2.age !== null && object2.county === null && object2.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return entry.age === parseInt(object2.age);
    //         })
    //         //console.log("This is test: ", test);
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         //console.log("This is test2: ", test2);
    //         return test2;
    //         // setObject2Data(test2)
    //     }
    //     else if (object2.age === null && object2.county === null && object2.race === null){
    //         // setObject2Data({});
    //         return {};
    //     }
    //     else if (object2.age !== null && object2.county !== null && object2.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object2.county) && (entry.age === parseInt(object2.age)));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject2Data(test2)
    //     }
    //     else if (object2.age !== null && object2.county !== null && object2.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object2.county) && (entry.age === parseInt(object2.age)) && (entry.race === object2.race));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject2Data(test2)
    //     }
    //     else if (object2.age === null && object2.county === null && object2.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return (entry.race === object2.race);
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject2Data(test2)
    //     }
    //     else if (object2.age === null && object2.county !== null && object2.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return (entry.county === object2.county);
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject2Data(test2)
    //     }
    //     else if (object2.age === null && object2.county !== null && object2.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object2.county) && (entry.race === object2.race));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject2Data(test2)
    //     }
    //     else if (object2.age !== null && object2.county === null && object2.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.age === parseInt(object2.age) && (entry.race === object2.race)));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject2Data(test2)
    //     }    
    // }
    // //Handling object 3
    // const handleObject3 = () => {
    //     if (object3.age !== null && object3.county === null && object3.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return entry.age === parseInt(object3.age);
    //         })
    //         //console.log("This is test: ", test);
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         //console.log("This is test2: ", test2);
    //         return test2;
    //         // setObject3Data(test2);
    //     }
    //     else if (object3.age === null && object3.county === null && object3.race === null){
    //         setObject3Data({});
    //         return {};
    //     }
    //     else if (object3.age !== null && object3.county !== null && object3.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object3.county) && (entry.age === parseInt(object3.age)));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject3Data(test2);
    //     }
    //     else if (object3.age !== null && object3.county !== null && object3.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object3.county) && (entry.age === parseInt(object3.age)) && (entry.race === object3.race));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject3Data(test2);
    //     }
    //     else if (object3.age === null && object3.county === null && object3.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return (entry.race === object3.race);
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject3Data(test2);
    //     }
    //     else if (object3.age === null && object3.county !== null && object3.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return (entry.county === object3.county);
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject3Data(test2);
    //     }
    //     else if (object3.age === null && object3.county !== null && object3.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object3.county) && (entry.race === object3.race));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject3Data(test2);
    //     }
    //     else if (object3.age !== null && object3.county === null && object3.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.age === parseInt(object3.age) && (entry.race === object3.race)));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject3Data(test2);
    //     }    
    // }
    // //Handling object 4
    // const handleObject4 = () => {
    //     if (object4.age !== null && object4.county === null && object4.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return entry.age === parseInt(object4.age);
    //         })
    //         //console.log("This is test: ", test);
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         //console.log("This is test2: ", test2);
    //         return test2;
    //         // setObject4Data(test2);
    //     }
    //     else if (object4.age === null && object4.county === null && object4.race === null){
    //         // setObject4Data({});
    //         return {};
    //     }
    //     else if (object4.age !== null && object4.county !== null && object4.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object4.county) && (entry.age === parseInt(object4.age)));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject4Data(test2);
    //     }
    //     else if (object4.age !== null && object4.county !== null && object4.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object4.county) && (entry.age === parseInt(object4.age)) && (entry.race === object4.race));
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject4Data(test2);
    //     }
    //     else if (object4.age === null && object4.county === null && object4.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return (entry.race === object4.race);
    //         })
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
            
    //         return test2;
    //         // setObject4Data(test2);
    //     }
    //     else if (object4.age === null && object4.county !== null && object4.race === null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return (entry.county === object4.county);
    //         })
    //         console.log("This is the test: ", test);
    //         let test2 = {};
    //         test.forEach((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2 ){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //             // return test2[JSON.stringify(crimes)];
    //         })
    //         console.log("This is the test2: ", test2)
    //         return test2;
    //         // setObject4Data(test2);
    //     }
    //     else if (object4.age === null && object4.county !== null && object4.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.county === object4.county) && (entry.race === object4.race));
    //         })
    //         console.log("This is the test: ", test)
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject4Data(test2);
    //     }
    //     else if (object4.age !== null && object4.county === null && object4.race !== null){
    //         let test = {};
    //         test = database.filter((entry) => {
    //             return ((entry.age === parseInt(object4.age) && (entry.race === object4.race)));
    //         })
            
    //         let test2 = {};
    //         test.map((entry) => {
    //             let crimes = entry.crimeArray;
    //             let degrees = [];
    //             crimes.map((crime) => {
    //                 degrees.push(entry.degreeArray[crimes.indexOf(crime)])
    //             })
    //             crimes = crimes.sort();
    //             if (JSON.stringify(crimes) in test2){
    //                 if (degrees.join() === test2[JSON.stringify(crimes)].degrees.join()){
    //                     test2[JSON.stringify(crimes)].sentenceDuration.push(entry.sentenceDuration);
    //                 }
    //             }
    //             else{
    //                 test2[JSON.stringify(crimes)] = {sentenceDuration: [entry.sentenceDuration], degrees: degrees};
    //             }
    //         })
    //         return test2;
    //         // setObject4Data(test2);
    //     }    
    // }



    useEffect(() => {

        
        handleInputs();
        
        
        const object1Data = rehandleObject1();
        const object2Data = rehandleObject2();
        const object3Data = rehandleObject3();
        const object4Data = rehandleObject4();



        // console.log("This is object one data: ", object1Data);
        // console.log("This is object two data: ", object2Data);
        // console.log("This is object three data: ", object3Data);
        // console.log("This is object four data: ", object4Data);

        
        let allObjects = {};
        if (Object.keys(object1Data).length !== 0){
            allObjects = {...allObjects, object1: object1Data};
        }
        if (Object.keys(object2Data).length !== 0){
            allObjects = {...allObjects, object2: object2Data};
        }
        if (Object.keys(object3Data).length !== 0){
            allObjects = {...allObjects, object3: object3Data};
        }
        if (Object.keys(object4Data).length !== 0){
            allObjects = {...allObjects, object4: object4Data};
        }
        // console.log("These are the lengths: ", Object.keys(object1Data).length, Object.keys(object2Data).length, Object.keys(object3Data).length, Object.keys(object4Data).length);
        // console.log("This is all objects: ", allObjects);
        //This is me trying to match mutual objects based on their degrees
        let myObject = {};
        Object.entries(allObjects).forEach(([key, value]) => {
            // console.log("This is the key: ", key);
            // console.log("This is the value: ", value);
            //The key is the object_ number
            //The value is the object where the keys are the crime arrays and the values of each key is an object of sentenceDuration and degrees
            Object.entries(value).forEach(([valueKey, valueValue]) => {
                //console.log("This is the value key: ", valueKey);
                //console.log("This is the value value: ", valueValue);
                let crimeAndDegreeKey = `${valueKey} || ${valueValue.degrees.join()}`;
                //console.log("This is the crime and degree key: ", crimeAndDegreeKey);
                if (crimeAndDegreeKey in myObject){
                    myObject[crimeAndDegreeKey].push(valueValue);
                }
                else{
                    myObject[crimeAndDegreeKey] = [valueValue];
                }
            })
        })
        let mutualObjectss = {};
        // console.log("This is my object: ", myObject);
        let objects = Object.keys(allObjects);
        let mutualObjects = {};
        objects.forEach((object) => {
            let keys = Object.keys(allObjects[object]);
            keys.forEach((key) => {
              let remainingObjects = Object.entries(allObjects).filter(([k, v]) => {
                return k !== object;
              })
              if (remainingObjects.every(([k, v]) => {
                return (v[key]) && (v[key].degrees.sort().join() === allObjects[object][key].degrees.sort().join());
              })) {
                if (!mutualObjects[key]){
                  mutualObjects[key] = {};
                }
                mutualObjects[key][object] = allObjects[object][key];
                
              }
            })
          })
        // console.log("This is the mutual objects: ", mutualObjects);
        //This is me calculating the averages for each value in the mutual objects
        let finalObject = {};
        Object.entries(mutualObjects).forEach(([key, value]) => {
            // console.log("This is the key: ", key);
            // console.log("This is the value: ", value);
            let nestedObject = {};
            let values = Object.entries(value).map(([k,v]) => {
                // console.log("This is the key: ", k);
                // console.log("This is the value: ", v);
                nestedObject[k] = average(v.sentenceDuration);
            })
            finalObject[key] = nestedObject;
            //console.log("This is the nested object: ", nestedObject);
        })
        console.log("This is the final object: ", finalObject);

        let labels = []
        let finalObject1 = {label: "", data: [], backgroundColor: 'rgba(235, 64, 52, 0.4)'};
        let finalObject2 = {label: "", data: [], backgroundColor: 'rgba(52, 235, 107, 0.4)'};
        let finalObject3 = {label: "", data: [], backgroundColor: 'rgba(217, 235, 52, 0.4)'};
        let finalObject4 = {label: "", data: [], backgroundColor: 'rgba(52, 110, 235, 0.4)'};
        const data = Object.entries(finalObject).map(([key, value]) => {
            // console.log("This is a key from mapping the final plot object: ", key);
            // console.log("This is a value from mapping the final plot object: ", value);
            const cleanedKey = key.replace(/[\[\]"]+/g, ''); // remove square brackets and quotes
            finalObject1.label = object1Label;
            finalObject1.data.push(value.object1);
            finalObject2.label = object2Label;
            finalObject2.data.push(value.object2);
            finalObject3.label = object3Label;
            finalObject3.data.push(value.object3);
            finalObject4.label = object4Label;
            finalObject4.data.push(value.object4);
            const cleanedValue = Object.values(value);
            //console.log(key)
            let labelDegrees = "";
            // console.log(value)
            if ('object1' in mutualObjects[key]){
                //console.log(mutualObjects[key]['object1'].degrees.join())
                labelDegrees = mutualObjects[key]['object1'].degrees.join();
            }
            else if ('object2' in value){
                //console.log(mutualObjects[key]['object2'].degrees.join())
                labelDegrees = mutualObjects[key]['object2'].degrees.join();
            }
            else if ('object3' in value){
                //console.log(mutualObjects[key]['object3'].degrees.join())
                labelDegrees = mutualObjects[key]['object3'].degrees.join();
            }
            else if ('object4' in value){
                // console.log(mutualObjects[key]['object4'].degrees.join())
                labelDegrees = mutualObjects[key]['object4'].degrees.join();
            }
            labels.push(`${cleanedKey}`);
            return {
              label: cleanedKey,
              data: cleanedValue,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            }
          });
        const finalPlotObject = {labels: labels, datasets: [finalObject1, finalObject2, finalObject3, finalObject4]};
        console.log("This is the final plot object: ", finalPlotObject);
        plotObject = finalPlotObject;
        setPlotData(finalPlotObject);
        setShowPlot(true);
    }, [])


    return (
        <>
            <div className={`${style.main}`}>
                { setShowPlot && (
                    <div className={`${style.plot}`} >
                        <CPlot plotdata={plotData} options={options} showplot={showPlot} className={style.chart}/>
                    </div>
                        
                )}
            </div>
        </>
    )   
}