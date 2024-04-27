import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from './plot.module.css'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

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
}



export default function Plot({crimesAndDegrees, setCrimesAndDegrees, database}) {
    let params = useParams();
    let filter = params.filter;
    const [plotFilter, setPlotFilter] = useState(filter);
    const [showAgeRanges, setShowAgeRanges] = useState(false);
    const [selectedAgeRange, setSelectedAgeRange] = useState('1');
    const [filteredData, setFilteredData] = useState([]);
    const [plotObject, setPlotObject] = useState({});
    const [plotLabels, setPlotLabels] = useState([]);
    const [plotData, setPlotData] = useState({});
    const [showPlot, setShowPlot] = useState(false);


    const selectedCrimes = Object.keys(crimesAndDegrees).sort();
    const selectedDegrees = [];
    
    let ageRanges = ['1', '3', '5', '7', '10'];
    let multipleOffense = selectedCrimes.length > 1 ? true : false;

    selectedCrimes.forEach((crime) => {
        selectedDegrees.push(crimesAndDegrees[crime]);
    })
    
    const handleFilterChange = (e) =>  {
        setPlotFilter(e.target.value);
;
    }

    const handleAgeRangeChange = (e) => {
        setSelectedAgeRange(e.target.value);
    }

    //This useEffect is used to update the filteredData state variable when database changes
    useEffect(() => {
        let testFilteredData = database.filter((entry) => {
            let entrySortedCrimes = entry.crimeArray.sort();
            let entrySortedDegrees = entry.degreeArray.sort();
            return ( JSON.stringify(entrySortedCrimes) === JSON.stringify(selectedCrimes) && JSON.stringify(entrySortedDegrees) === JSON.stringify(selectedDegrees));
        })
        setFilteredData(testFilteredData);
    }, [])

    //This useEffect is used to update the age ranges when the plotFilter changes
    useEffect(() => {
        if (plotFilter === 'age') {
            setShowAgeRanges(true);
        }else{
            setShowAgeRanges(false);
        }
    }, [plotFilter])


    //This useEffect is used to update the plotObject when the filteredData changes
    useEffect(() => {
        if (plotFilter === 'age') {
            if (selectedAgeRange === '1'){
                const updatedPlotObject = {}
                filteredData.map((entry) => {
                    let age = entry.age;
                    let sentenceDuration = entry.sentenceDuration;
                    if (age in updatedPlotObject){
                        updatedPlotObject[age].push(sentenceDuration);
                    }
                    else{
                        updatedPlotObject[age] = [sentenceDuration];
                    }
                })
                setPlotObject(updatedPlotObject);
            }
            else if (selectedAgeRange === '3'){
                const updatedPlotObject = {'18-20':[], '21-23':[], '24-26':[], '27-29':[], '30-32':[], '33-35':[], '36-38':[], '39-41':[], '42-44':[], '45-47':[], '48-50':[], '51-53':[], '54-56':[], '57-59':[], '60-62':[], '63-65':[], '66-68':[], '69-71':[], '72-74':[], '75-77':[], '>77':[]};
                filteredData.map((entry) => {
                    let age = entry.age;
                    let sentenceDuration = entry.sentenceDuration;
                    if (age >= 18 && age <= 20){
                        updatedPlotObject['18-20'].push(sentenceDuration);
                    }
                    else if (age >= 21 && age <= 23){
                        updatedPlotObject['21-23'].push(sentenceDuration);
                    }
                    else if (age >= 24 && age <= 26){
                        updatedPlotObject['24-26'].push(sentenceDuration);
                    }
                    else if (age >= 27 && age <= 29){
                        updatedPlotObject['27-29'].push(sentenceDuration);
                    }
                    else if (age >= 30 && age <= 32){
                        updatedPlotObject['30-32'].push(sentenceDuration);
                    }
                    else if (age >= 33 && age <= 35){
                        updatedPlotObject['33-35'].push(sentenceDuration);
                    }
                    else if (age >= 36 && age <= 38){
                        updatedPlotObject['36-38'].push(sentenceDuration);
                    }
                    else if (age >= 39 && age <= 41){
                        updatedPlotObject['39-41'].push(sentenceDuration);
                    }
                    else if (age >= 42 && age <= 44){
                        updatedPlotObject['42-44'].push(sentenceDuration);
                    }
                    else if (age >= 45 && age <= 47){
                        updatedPlotObject['45-47'].push(sentenceDuration);
                    }
                    else if (age >= 48 && age <= 50){
                        updatedPlotObject['48-50'].push(sentenceDuration);
                    }
                    else if (age >= 51 && age <= 53){
                        updatedPlotObject['51-53'].push(sentenceDuration);
                    }
                    else if (age >= 54 && age <= 56){
                        updatedPlotObject['54-56'].push(sentenceDuration);
                    }
                    else if (age >= 57 && age <= 59){
                        updatedPlotObject['57-59'].push(sentenceDuration);
                    }
                    else if (age >= 60 && age <= 62){
                        updatedPlotObject['60-62'].push(sentenceDuration);
                    }
                    else if (age >= 63 && age <= 65){
                        updatedPlotObject['63-65'].push(sentenceDuration);
                    }
                    else if (age >= 66 && age <= 68){
                        updatedPlotObject['66-68'].push(sentenceDuration);
                    }
                    else if (age >= 69 && age <= 71){
                        updatedPlotObject['69-71'].push(sentenceDuration);
                    }
                    else if (age >= 72 && age <= 74){
                        updatedPlotObject['72-74'].push(sentenceDuration);
                    }
                    else if (age >= 75 && age <= 77){
                        updatedPlotObject['75-77'].push(sentenceDuration);
                    }
                    else if (age > 77){
                        updatedPlotObject['>77'].push(sentenceDuration);
                    }
                })
                setPlotObject(updatedPlotObject);
            }
            else if (selectedAgeRange === '5'){
                const updatedPlotObject = {'18-22':[], '23-27':[], '28-32':[], '33-37':[], '38-42':[], '43-47':[], '48-52':[], '53-57':[], '58-62':[], '63-67':[], '68-72':[], '73-77':[], '>77':[]};
                filteredData.map((entry) => {
                    let age = entry.age;
                    let sentenceDuration = entry.sentenceDuration;
                    if (age >= 18 && age <= 22){
                        updatedPlotObject['18-22'].push(sentenceDuration);
                    }
                    else if (age >= 23 && age <= 27){
                        updatedPlotObject['23-27'].push(sentenceDuration);
                    }
                    else if (age >= 28 && age <= 32){
                        updatedPlotObject['28-32'].push(sentenceDuration);
                    }
                    else if (age >= 33 && age <= 37){
                        updatedPlotObject['33-37'].push(sentenceDuration);
                    }
                    else if (age >= 38 && age <= 42){
                        updatedPlotObject['38-42'].push(sentenceDuration);
                    }
                    else if (age >= 43 && age <= 47){
                        updatedPlotObject['43-47'].push(sentenceDuration);
                    }
                    else if (age >= 48 && age <= 52){
                        updatedPlotObject['48-52'].push(sentenceDuration);
                    }
                    else if (age >= 53 && age <= 57){
                        updatedPlotObject['53-57'].push(sentenceDuration);
                    }
                    else if (age >= 58 && age <= 62){
                        updatedPlotObject['58-62'].push(sentenceDuration);
                    }
                    else if (age >= 63 && age <= 67){
                        updatedPlotObject['63-67'].push(sentenceDuration);
                    }
                    else if (age >= 68 && age <= 72){
                        updatedPlotObject['68-72'].push(sentenceDuration);
                    }
                    else if (age >= 73 && age <= 77){
                        updatedPlotObject['73-77'].push(sentenceDuration);
                    }
                    else if (age > 77){
                        updatedPlotObject['>77'].push(sentenceDuration);
                    }
                })
                setPlotObject(updatedPlotObject);
            }
            else if (selectedAgeRange === '7'){
                const updatedPlotObject = {'18-24':[], '25-31':[], '32-38':[], '39-45':[], '46-52':[], '53-59':[], '60-66':[], '67-73':[], '74-80':[], '>80':[]};
                filteredData.map((entry) => {
                    let age = entry.age;
                    let sentenceDuration = entry.sentenceDuration;
                    if (age >= 18 && age <= 24){
                        updatedPlotObject['18-24'].push(sentenceDuration);
                    }
                    else if (age >= 25 && age <= 31){
                        updatedPlotObject['25-31'].push(sentenceDuration);
                    }
                    else if (age >= 32 && age <= 38){
                        updatedPlotObject['32-38'].push(sentenceDuration);
                    }
                    else if (age >= 39 && age <= 45){
                        updatedPlotObject['39-45'].push(sentenceDuration);
                    }
                    else if (age >= 46 && age <= 52){
                        updatedPlotObject['46-52'].push(sentenceDuration);
                    }
                    else if (age >= 53 && age <= 59){
                        updatedPlotObject['53-59'].push(sentenceDuration);
                    }
                    else if (age >= 60 && age <= 66){
                        updatedPlotObject['60-66'].push(sentenceDuration);
                    }
                    else if (age >= 67 && age <= 73){
                        updatedPlotObject['67-73'].push(sentenceDuration);
                    }
                    else if (age >= 74 && age <= 80){
                        updatedPlotObject['74-80'].push(sentenceDuration);
                    }
                    else if (age > 80){
                        updatedPlotObject['>80'].push(sentenceDuration);
                    }
                })
                setPlotObject(updatedPlotObject);
            }
            else if (selectedAgeRange === '10'){
                const updatedPlotObject = {'18-27':[], '28-37':[], '38-47':[], '48-57':[], '58-67':[], '68-77':[], '>77':[]};
                filteredData.map((entry) => {
                    let age = entry.age;
                    let sentenceDuration = entry.sentenceDuration;
                    if (age >= 18 && age <= 27){
                        updatedPlotObject['18-27'].push(sentenceDuration);
                    }
                    else if (age >= 28 && age <= 37){
                        updatedPlotObject['28-37'].push(sentenceDuration);
                    }
                    else if (age >= 38 && age <= 47){
                        updatedPlotObject['38-47'].push(sentenceDuration);
                    }
                    else if (age >= 48 && age <= 57){
                        updatedPlotObject['48-57'].push(sentenceDuration);
                    }
                    else if (age >= 58 && age <= 67){
                        updatedPlotObject['58-67'].push(sentenceDuration);
                    }
                    else if (age >= 68 && age <= 77){
                        updatedPlotObject['68-77'].push(sentenceDuration);
                    }
                    else if (age > 77){
                        updatedPlotObject['>77'].push(sentenceDuration);
                    }
                })
                setPlotObject(updatedPlotObject);
            }
        }
        else if (plotFilter === 'county') {
            const updatedPlotObject = {};
            filteredData.map((entry) => {
                let county = entry.county;
                let sentenceDuration = entry.sentenceDuration;
                if (county in updatedPlotObject){
                    updatedPlotObject[county].push(sentenceDuration);
                }
                else{
                    updatedPlotObject[county] = [sentenceDuration];
                }
            })
            setPlotObject(updatedPlotObject);
        }
        else if (plotFilter === 'race'){
            const updatedPlotObject = {};
            filteredData.map((entry) => {
                let race = entry.race;
                let sentenceDuration = entry.sentenceDuration;
                if (race in updatedPlotObject){
                    updatedPlotObject[race].push(sentenceDuration);
                }
                else{
                    updatedPlotObject[race] = [sentenceDuration];
                }
            })
            setPlotObject(updatedPlotObject);
        }
    }, [filteredData, selectedAgeRange, plotFilter])

    //This useEffect is used to update the plotLabels and plotData when the plotObject changes
    useEffect(() => {
        let myPlotLabels = Object.keys(plotObject);
        let finalPlotData = [];
        let plotArrays = Object.values(plotObject);
        plotArrays.map((plotArray) => {
            let sum = 0;
            plotArray.map((value) => {
                sum += value;
            })
            let average = parseInt(sum/plotArray.length);
            if (isNaN(average)){
                finalPlotData.push(0);
            }
            else{
                finalPlotData.push(average);
            }
        })
        setPlotLabels(myPlotLabels);
        setPlotData({labels: myPlotLabels, datasets:[{label: 'Average Sentence Duration', data: finalPlotData, backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1}]})
        plotLabels.length > 0 ? setShowPlot(true) : setShowPlot(false);
    }, [plotObject])

    return (
        <>
            <div className={`${style.main}`}>
                <div className={`${style.filterDiv}`}>
                    <h3 className={`${style.filterLabel}`}>Select Filter: </h3>
                    <button className={`${style.button} ${plotFilter === 'age' ? style.selected : ""}`} value='age' onClick={handleFilterChange}>Age</button>
                    <button className={`${style.button} ${plotFilter === 'county' ? style.selected : ""}`} value='county' onClick={handleFilterChange}>County</button>
                    <button className={`${style.button} ${plotFilter === 'race' ? style.selected : ""}`} value='race' onClick={handleFilterChange}>Race</button>
                </div>

                {showAgeRanges && 
                    <div className={`${style.ageRangeDiv}`}>
                        <h3 className={`${style.ageRangeLabel}`}>Age Ranges: </h3>
                        {ageRanges.map((ageRange) => {
                            return <button className={`${style.ageRangeButton} ${selectedAgeRange === ageRange ? style.selected : ""}`} key={ageRange} value={ageRange} onClick={handleAgeRangeChange}>{ageRange}</button>
                        })}
                    </div>
                }
                <div className={`${style.crimesDiv}`}>
                    <h4 className={`${style.crimesDivHeader}`}>Selected crime(s) and degree(s): </h4>
                    { 
                        selectedCrimes.map((crime) => (
                        <div key={crime} className={`${style.crimeDiv}`}>
                            {crime}  ||  {crimesAndDegrees[crime]}
                        </div>
                        ))
                    }
                </div>
                {
                    showPlot && 
                    <Bar data={plotData} options={options}/>
                }
            </div>
        </>
    )
}