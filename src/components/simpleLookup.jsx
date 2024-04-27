import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './simpleLookup.module.css';

export default function SimpleLookup({ allCrimes, database }){
    const [selectedCrimes, setSelectedCrimes] = useState([]);
    const [selectedDegrees, setSelectedDegrees] = useState([]);
    const [crimeAndDegreeMap, setCrimeAndDegreeMap] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [degree, setDegree] = useState('1ST');
    const [formData, setFormData] = useState({age:0, race:'', county:'', crime1:'', crime2:'', crime3:'', crime4:'', degree1:'', degree2:'', degree3:'', degree4:''});


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let [age, race, county] = [formData.age, formData.race, formData.county];
        let multipleOffense = Object.keys(crimeAndDegreeMap).length > 1 ? true : false;

        age = parseInt(age);
        race = race.toUpperCase();
        county = county.toUpperCase();
        if (age === 0) {
            age = null;
        }
        if (degree === "Select a degree"){
            degree = null;
        }
        if (race === ""){
            race = null;
        }
        if (county === ""){
            county = null;
        }


        console.log("This is the age", age);
        console.log("This is the race: ", race);
        console.log("This is the county: ", county);
        console.log("This is the multiple offense: ", multipleOffense);
        let crimesFromMap = Object.keys(crimeAndDegreeMap).slice().sort();
        let equivalentDegrees = [];
        crimesFromMap.forEach((crime) => {
            equivalentDegrees.push(crimeAndDegreeMap[crime]);
        })

        let degreesFromMap = Object.values(crimeAndDegreeMap);
       
        const getData = async() => {
            if (age === null && race === null && county === null){
                const filteredData = database.filter((obj) => {
                    const sortedCrimes = obj.crimeArray.slice().sort();
                    const sortedDegrees = obj.degreeArray.slice().sort();
                    return (JSON.stringify(sortedCrimes) === JSON.stringify(crimesFromMap.sort()) &&
                    JSON.stringify(sortedDegrees) === JSON.stringify(equivalentDegrees.sort()));
                })
                return filteredData;
            }
            if (age === null && race === null && county !== null){
                const filteredData = database.filter((obj) => {
                    const sortedCrimes = obj.crimeArray.slice().sort();
                    const sortedDegrees = obj.degreeArray.slice().sort();
                    return ( (obj.multipleOffense === multipleOffense) && (obj.county === county) && (JSON.stringify(sortedCrimes) === JSON.stringify(crimesFromMap.sort()) &&
                    JSON.stringify(sortedDegrees) === JSON.stringify(equivalentDegrees.sort())));
                })

                return filteredData;
            }
            if (age === null && race !== null && county === null){
                const filteredData = database.filter((obj) => {
                    const sortedCrimes = obj.crimeArray.slice().sort();
                    const sortedDegrees = obj.degreeArray.slice().sort();
                    return ((obj.race === race) && (obj.multipleOffense === multipleOffense) &&(JSON.stringify(sortedCrimes) === JSON.stringify(crimesFromMap.sort()) &&
                    JSON.stringify(sortedDegrees) === JSON.stringify(equivalentDegrees.sort())));
                })

                return filteredData;
            }
            if (age === null && race !== null && county !== null){
                const filteredData = database.filter((obj) => {
                    const sortedCrimes = obj.crimeArray.slice().sort();
                    const sortedDegrees = obj.degreeArray.slice().sort();
                    return ( (obj.race === race) && (obj.multipleOffense === multipleOffense) &&(JSON.stringify(sortedCrimes) === JSON.stringify(crimesFromMap.sort()) &&
                    JSON.stringify(sortedDegrees) === JSON.stringify(equivalentDegrees.sort())));
                })

                return filteredData;
            }
            if (age !== null && race === null && county === null){
                const filteredData = database.filter((obj) => {
                    const sortedCrimes = obj.crimeArray.slice().sort();
                    const sortedDegrees = obj.degreeArray.slice().sort();
                    return ( (obj.age === age) && (obj.multipleOffense === multipleOffense) &&( JSON.stringify(sortedCrimes) === JSON.stringify(crimesFromMap.sort()) &&
                    JSON.stringify(sortedDegrees) === JSON.stringify(equivalentDegrees.sort())));
                })

                return filteredData;
            }
            if (age !== null && race !== null && county === null){
                const filteredData = database.filter((obj) => {
                    const sortedCrimes = obj.crimeArray.slice().sort();
                    const sortedDegrees = obj.degreeArray.slice().sort();
                    return ( (obj.age === age) && (obj.race === race) && (obj.multipleOffense === multipleOffense) &&(JSON.stringify(sortedCrimes) === JSON.stringify(crimesFromMap.sort()) &&
                    JSON.stringify(sortedDegrees) === JSON.stringify(equivalentDegrees.sort())));
                })

                return filteredData;
            }
            if (age !== null && race === null && county !== null){
                const filteredData = database.filter((obj) => {
                    const sortedCrimes = obj.crimeArray.slice().sort();
                    const sortedDegrees = obj.degreeArray.slice().sort();
                    return ((obj.county === county) && (boj.age === age)  && (obj.multipleOffense === multipleOffense) &&(JSON.stringify(sortedCrimes) === JSON.stringify(crimesFromMap.sort()) &&
                    JSON.stringify(sortedDegrees) === JSON.stringify(equivalentDegrees.sort())));
                })
                if (error){
                    console.error("Error: ", error);
                }
                return filteredData;
            }
            if (age !== null && race !== null && county !== null){
                const filteredData = database.filter((obj) => {
                    const sortedCrimes = obj.crimeArray.slice().sort();
                    const sortedDegrees = obj.degreeArray.slice().sort();
                    return ( (obj.age === age) && (obj.county === county) && (obj.race === race) && (obj.multipleOffense === multipleOffense) &&(JSON.stringify(sortedCrimes) === JSON.stringify(crimesFromMap.sort()) &&
                    JSON.stringify(sortedDegrees) === JSON.stringify(equivalentDegrees.sort())));
                })
                if (error){
                    console.error("Error: ", error);
                }
                return filteredData;
            }
        }
        const getAverageSentenceDuration = async() => {
            let queriedData = await getData();
            console.log("This is the queried data from simple lookup: ", queriedData);
            let averageSentenceDuration = 0;
            for (let i = 0; i < queriedData.length; i++){
                averageSentenceDuration += queriedData[i].sentenceDuration;
            }
            averageSentenceDuration /= queriedData.length;
            averageSentenceDuration = Math.round(averageSentenceDuration);
            return averageSentenceDuration;
        }
        setIsLoading(true);
        getAverageSentenceDuration().then((result) => {
            setIsLoading(false);
            navigate(`/simpleResults/${result}`);
        });
    }
    useEffect(() => {
        let [crime1, crime2, crime3, crime4, degree1, degree2, degree3, degree4] = [formData.crime1, formData.crime2, formData.crime3, formData.crime4, formData.degree1, formData.degree2, formData.degree3, formData.degree4];
        let crimeArray = [crime1, crime2, crime3, crime4];
        let degreeArray = [degree1, degree2, degree3, degree4];
        setSelectedCrimes(crimeArray);
        setSelectedDegrees(degreeArray);
        const testCrimeAndDegreeMap = {};
        for (let i = 0; i < 4; i++){
            if (formData[`crime${i+1}`] !== ""){
                if (formData[`degree${i+1}`] === ""){
                    testCrimeAndDegreeMap[formData[`crime${i+1}`]] = "1ST";
                    
                }
                else{
                    testCrimeAndDegreeMap[formData[`crime${i+1}`]] = formData[`degree${i+1}`];
                }
            }
        }
        setCrimeAndDegreeMap(testCrimeAndDegreeMap);

    }, [formData])


    return (
        <>
            {isLoading ? 
                (   
                    <div className={`${style.main}`}>
                        <div className={`${style.loadingDiv}`}>
                            <img src="\loading.gif" alt="" className={`${style.loadingImage}`}/>
                        </div>
                    </div>
                ) : 

                (
                    <div className={`${style.main}`}>
                        <h1>Simple Lookup</h1>
                        <form className={`mb-3 ${style.form}`} onSubmit={handleSubmit}>

                            {/* Demographics Section */}
                            <h2>Demographics Section</h2>

                            <div className={`${style.row}`}>
                                <div className={`${style.formInput} input-group input-group-lg`}>
                                    <span className="input-group-text" id="inputGroup-sizing-lg">Age <em>(optional)</em></span>
                                    <input type="number" className="form-control" aria-label="Sizing example input" value={formData.age} aria-describedby="inputGroup-sizing-lg" name='age' onChange={handleChange}/>
                                </div>
                                <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.race} aria-label="crime section selec" onChange={handleChange} name='race'>
                                    <option value="">Select a Race</option>
                                    <option value="ASIAN">ASIAN</option>
                                    <option value="BLACK">BLACK</option>
                                    <option value="HISPANIC">HISPANIC</option>
                                    <option value="NATIVE AM">NATIVE AMERICAN</option>
                                    <option value="WHITE">WHITE</option>
                                    <option value="OTHER">OTHER</option>
                                    <option value="UNKNOWN">UNKNOWN</option>
                                    <option value="ASIAN/HISPANIC">ASIAN/HISPANIC</option>
                                    <option value="BLACK/HISPANIC">BLACK/HISPANIC</option>
                                    <option value="NATIVE AM/HISPANIC">NATIVE AMERICAN/HISPANIC</option>
                                    <option value="WHITE/HISPANIC">WHITE/HISPANIC</option> 
                                </select>
                                <div className={`${style.formInput} input-group input-group-lg`}>
                                    <span className="input-group-text" id="inputGroup-sizing-lg">County <em>(optional)</em></span>
                                    <input type="text" className="form-control" value={formData.county} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" name='county' onChange={handleChange}/>
                                </div>
                            </div>
                            {/* Crime Section */}
                            <h2>Crime Section</h2>

                            <div className={`${style.row}`}>
                                <div className={`${style.formInput} input-group input-group-lg`}>
                                    <h3>Crime 1</h3>
                                    <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.crime1} aria-label="crime section select" name='crime1' onChange={handleChange}>
                                        <option value="">Select Crime(s)</option>
                                        {allCrimes.map((crime, index) => {
                                            return (
                                                <option key={index} value={crime}>{crime}</option>
                                            )
                                        })}
                                    </select>
                                    <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.degree1} aria-label="crime section select" name='degree1' onChange={handleChange}>
                                        <option value="">Select a Degree</option>
                                        <option value="1ST">1ST</option>
                                        <option value="2ND">2ND</option>
                                        <option value="3RD">3RD</option>
                                        <option value="4TH">4TH</option>
                                        <option value="5TH">5TH</option>
                                        <option value="6TH">6TH</option>
                                    </select>
                                </div>
                                <div className={`${style.formInput} input-group input-group-lg`}>
                                    <h3>Crime 2 (optional)</h3>
                                    <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.crime2} aria-label="crime section select" name='crime2' onChange={handleChange}>
                                        <option value="">Select Crime(s)</option>
                                        {allCrimes.map((crime, index) => {
                                            return (
                                                <option key={index} value={crime}>{crime}</option>
                                            )
                                        })}
                                    </select>
                                    <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.degree2} aria-label="crime section select" name='degree2' onChange={handleChange}>
                                        <option value="">Select a Degree</option>
                                        <option value="1ST">1ST</option>
                                        <option value="2ND">2ND</option>
                                        <option value="3RD">3RD</option>
                                        <option value="4TH">4TH</option>
                                        <option value="5TH">5TH</option>
                                        <option value="6TH">6TH</option>
                                    </select>
                                </div>
                                <div className={`${style.formInput} input-group input-group-lg`}>
                                    <h3>Crime 3 (optional)</h3>
                                    <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.crime3} aria-label="crime section select" name='crime3' onChange={handleChange}>
                                        <option value="">Select Crime(s)</option>
                                        {allCrimes.map((crime, index) => {
                                            return (
                                                <option key={index} value={crime}>{crime}</option>
                                            )
                                        })}
                                    </select>
                                    <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.degree3} aria-label="crime section select" onChange={handleChange} name='degree3'>
                                        <option value="">Select a Degree</option>
                                        <option value="1ST">1ST</option>
                                        <option value="2ND">2ND</option>
                                        <option value="3RD">3RD</option>
                                        <option value="4TH">4TH</option>
                                        <option value="5TH">5TH</option>
                                        <option value="6TH">6TH</option>
                                    </select>
                                </div>
                                <div className={`${style.formInput} input-group input-group-lg`}>
                                    <h3>Crime 4 (optional)</h3>
                                    <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.crime4} aria-label="crime section select" name='crime4' onChange={handleChange}>
                                        <option value="">Select Crime(s)</option>
                                        {allCrimes.map((crime, index) => {
                                            return (
                                                <option key={index} value={crime}>{crime}</option>
                                            )
                                        })}
                                    </select>
                                    <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.degree4} aria-label="crime section select" onChange={handleChange} name='degree4'>
                                        <option value="">Select a Degree</option>
                                        <option value="1ST">1ST</option>
                                        <option value="2ND">2ND</option>
                                        <option value="3RD">3RD</option>
                                        <option value="4TH">4TH</option>
                                        <option value="5TH">5TH</option>
                                        <option value="6TH">6TH</option>
                                    </select>
                                </div>
                            </div>

                            <div className={`${style.row}`}>
                                <button type='button' className={`btn btn-primary ${style.button}`} onClick={()=>{setFormData({age:'', race:'', county:'', crime1:'', crime2:'', crime3:'', crime4:'', degree1:'', degree2:'', degree3:'', degree4:''}); setSelectedCrimes([]); setSelectedDegrees([]); setCrimeAndDegreeMap({})}}>Clear</button>
                                <button type={`submit`} className={`btn btn-primary ${style.button}`}>Submit</button>
                            </div>
                        </form>
                    </div>
                )
        }
        </>
    )
}