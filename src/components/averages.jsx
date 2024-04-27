import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../App';
import style from './averages.module.css';
import { set } from 'lodash';
export default function Averages({allCrimes, crimesAndDegrees, setCrimesAndDegrees}) {

    const [formData, setFormData] = useState({crime1:'', crime2:'', crime3:'', crime4:'', degree1:'', degree2:'', degree3:'', degree4:'', filter:''});
    const navigate =  useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.filter === "") { formData.filter = "age"; }
        navigate(`/averages/plot/${formData.filter}`)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    useEffect(() => {
        const testCrimeAndDegreeMap = {};
        for (let i = 0; i < 4; i++){
            if (formData[`crime${i+1}`] !== ""){
                if (formData[`degree${i+1}`] === ""){
                    testCrimeAndDegreeMap[formData[`crime${i+1}`]] = "1ST";
                    
                }
                else{
                    testCrimeAndDegreeMap[formData[`crime${i+1}`]] = formData[`degree${i+1}`];               }
            }
        }
        //console.log("This is the testCrimeAndDegreeMap: ", testCrimeAndDegreeMap);
        setCrimesAndDegrees(testCrimeAndDegreeMap);
    }, [formData])

    return (
        <>
            <div className={`${style.main}`}>
                <h1>Average Sentences</h1>
                <form className={`mb-3 ${style.form}`} onSubmit={handleSubmit}>

                {/* Crime Section */}
                <h2>Crime(s) Selection</h2>
                <p><em>Note that unspecified degree(s) will be defaulted to 1ST</em></p>
                <p><em>Note that an unspecified filter will default to AGE</em></p>

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
                    <div className={`${style.formInput} input-group input-group-lg`}>
                        <h3>Select Filter</h3>
                        <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.filter} aria-label="crime section select" name='filter' onChange={handleChange}>
                            <option value="">Select Filter</option>
                            <option value="age">Age</option>
                            <option value="county">County</option>
                            <option value="race">Race</option>
                    </select>
                    </div>
                </div>

                {/* Crime checkboxes with state management and pagination */}
                {/* <div className={`${style.crimeDiv}`}>
                    {crimesForPage.map((crime, index) => {
                        return (
                        <div className={`${style.crime}`} key={index}>
                            <input
                            type="checkbox"
                            className="btn-check"
                            id={`btn-check-${index}`}
                            autoComplete="off"
                            value={crime}
                            checked={selectedCrimes.includes(crime)}
                            onChange={() => {
                                const updatedCrimes = [...selectedCrimes];
                                if (updatedCrimes.includes(crime)) {
                                updatedCrimes.splice(updatedCrimes.indexOf(crime), 1);
                                } else {
                                updatedCrimes.push(crime);
                                }
                                setSelectedCrimes(updatedCrimes);
                            }}
                            />
                            <label className="btn" htmlFor={`btn-check-${index}`}>{crime}</label>
                        </div>
                        );
                    })}
                </div> */}
                {/* Pagination buttons */}
                {/* <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a className={`page-link btn btn-primary`} onClick={() => handlePageChange(currentPage - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <a className={`page-link btn btn-primary`} onClick={() => handlePageChange(currentPage + 1)}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav> */}
                <div className={`${style.row}`}>
                    <button type='button' className={`btn btn-primary ${style.button}`} onClick={()=>{setFormData({age:'', race:'', county:'', crime1:'', crime2:'', crime3:'', crime4:'', degree1:'', degree2:'', degree3:'', degree4:''}); setSelectedCrimes([]); setSelectedDegrees([]); setCrimeAndDegreeMap({})}}>Clear</button>
                    <button type={`submit`} className={`btn btn-primary ${style.button}`}>Submit</button>
                </div>
                </form>

            </div>
        </>
    )
}

 {/* Crime checkboxes with state management and pagination */}
                            {/* <div className={`${style.crimeDiv}`}>
                                {crimesForPage.map((crime, index) => {
                                    return (
                                    <div className={`${style.crime}`} key={index}>
                                        <input
                                        type="checkbox"
                                        className="btn-check"
                                        id={`btn-check-${index}`}
                                        autoComplete="off"
                                        value={crime}
                                        checked={selectedCrimes.includes(crime)}
                                        onChange={() => {
                                            const updatedCrimes = [...selectedCrimes];
                                            if (updatedCrimes.includes(crime)) {
                                            updatedCrimes.splice(updatedCrimes.indexOf(crime), 1);
                                            } else {
                                            updatedCrimes.push(crime);
                                            }
                                            setSelectedCrimes(updatedCrimes);
                                        }}
                                        />
                                        <label className="btn" htmlFor={`btn-check-${index}`}>{crime}</label>
                                    </div>
                                    );
                                })}
                            </div> */}
                            {/* Pagination buttons */}
                            {/* <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <a className={`page-link btn btn-primary`} onClick={() => handlePageChange(currentPage - 1)}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                    </li>
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <a className={`page-link btn btn-primary`} onClick={() => handlePageChange(currentPage + 1)}>
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                    </li>
                                </ul>
                            </nav> */}