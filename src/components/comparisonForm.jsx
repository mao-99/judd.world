import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./comparisons.module.css";

export default function ComparisonForm({ allCrimes, allCounties, setComparisonObject1, setComparisonObject2, setComparisonObject3, setComparisonObject4}) {
    const [formData, setFormData] = useState({object1:{ age:"", race:"", county:"" }, object2:{ age:"", race:"", county: "" }, object3:{ age:"", race:"", county:"" }, object4:{age: "", race: "", county: ""}});
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !formData.object1.age &&
            !formData.object1.race &&
            !formData.object1.county &&
            !formData.object2.age &&
            !formData.object2.race &&
            !formData.object2.county &&
            !formData.object3.age &&
            !formData.object3.race &&
            !formData.object3.county &&
            !formData.object4.age &&
            !formData.object4.race &&
            !formData.object4.county
          ) {
            alert("Please select information for at least one object.");
            return;
          }
        setComparisonObject1(formData.object1);
        setComparisonObject2(formData.object2);
        setComparisonObject3(formData.object3);
        setComparisonObject4(formData.object4);
        navigate('/comparison/plot', {replace:true});
        console.log(formData);
    }
    const handleChange = (e) => {
        let {name, value} = e.target;
        let objectName = e.target.getAttribute('objectname');
        setFormData({...formData, [objectName]: {...formData[objectName], [name]: value}});
    }
    useEffect(() => {
        //console.log(formData);
    }, [formData])
    return (
        <>
            <div className={`${style.main}`}>
                <h1>Simple Average Comparisons</h1>
                <form className={`mb-3 ${style.form}`} onSubmit={handleSubmit}>
                    {/* Crime Section */}

                    <div className={`${style.formGroup}`}>
                        <h3 className={`${style.header}`}>1st Selection</h3>
                        <div className={`${style.demographicsInput}`}>
                            <div className={`${style.formInput} input-group input-group-lg`}>
                                <span className="input-group-text" id="inputGroup-sizing-lg">Age <em>(optional)</em></span>
                                <input type="number" className="form-control" aria-label="Sizing example input" value={formData.object1.age} aria-describedby="inputGroup-sizing-lg" name='age' onChange={handleChange}  objectname={'object1'}/>
                            </div>
                            <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.object1.county} aria-label="county select" onChange={handleChange} name='county'  objectname={'object1'}>
                                <option value="">Select County </option>
                                {allCounties.map((county, index) => {
                                    return (
                                        <option key={index} value={county}>{county}</option>
                                    )
                                })}
                            </select>
                            <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.object1.race} aria-label="crime section selec" onChange={handleChange} name='race'  objectname={'object1'}>
                                <option value="">Select Race</option>
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
                        </div>

                    </div>

                    <div className={`${style.formGroup}`}>
                        <h3 className={`${style.header}`}>2nd Selection</h3>
                        <div className={`${style.demographicsInput}`}>
                            <div className={`${style.formInput} input-group input-group-lg`}>
                                <span className="input-group-text" id="inputGroup-sizing-lg">Age <em>(optional)</em></span>
                                <input type="number" className="form-control" aria-label="Sizing example input" value={formData.object2.age} aria-describedby="inputGroup-sizing-lg" name='age' onChange={handleChange} objectname="object2"/>
                            </div>
                            <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.object2.county} aria-label="county select" onChange={handleChange} name='county' objectname={"object2"}>
                                <option value="">Select County </option>
                                {allCounties.map((county, index) => {
                                    return (
                                        <option key={index} value={county}>{county}</option>
                                    )
                                })}
                            </select>
                            <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.object2.race} aria-label="crime section selec" onChange={handleChange} name='race' objectname={"object2"}>
                                <option value="">Select Race</option>
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
                        </div>

                    </div>

                    <div className={`${style.formGroup}`}>
                        <h3 className={`${style.header}`}>3rd Selection</h3>
                        <div className={`${style.demographicsInput}`}>
                            <div className={`${style.formInput} input-group input-group-lg`}>
                                <span className="input-group-text" id="inputGroup-sizing-lg">Age <em>(optional)</em></span>
                                <input type="number" className="form-control" aria-label="Sizing example input" value={formData.object3.age} aria-describedby="inputGroup-sizing-lg" name='age' onChange={handleChange} objectname={"object3"}/>
                            </div>
                            <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.object3.county} aria-label="county select" onChange={handleChange} name='county' objectname={"object3"}>
                                <option value="">Select County </option>
                                {allCounties.map((county, index) => {
                                    return (
                                        <option key={index} value={county}>{county}</option>
                                    )
                                })}
                            </select>
                            <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.object3.race} aria-label="crime section selec" onChange={handleChange} name='race' objectname={"object3"}>
                                <option value="">Select Race</option>
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
                        </div>    
                    </div>

                    <div className={`${style.formGroup}`}>
                        <h3 className={`${style.header}`}>4th Selection</h3>
                        <div className={`${style.demographicsInput}`}>
                            <div className={`${style.formInput} input-group input-group-lg`}>
                                <span className="input-group-text" id="inputGroup-sizing-lg">Age <em>(optional)</em></span>
                                <input type="number" className="form-control" aria-label="Sizing example input" value={formData.object4.age} aria-describedby="inputGroup-sizing-lg" name='age' onChange={handleChange} objectname="object4"/>
                            </div>
                            <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.object4.county} aria-label="county select" onChange={handleChange} name='county' objectname="object4">
                                <option value="">Select County </option>
                                {allCounties.map((county, index) => {
                                    return (
                                        <option key={index} value={county}>{county}</option>
                                    )
                                })}
                            </select>
                            <select className={`form-select form-select-lg mb-3 ${style.formSelect}`} value={formData.object4.race} aria-label="crime section selec" onChange={handleChange} name='race' objectname="object4">
                                <option value="">Select Race</option>
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
                        </div>    
                    </div>

                    <div className={`${style.row}`}>
                        <button type='button' className={`btn btn-primary ${style.button}`} onClick={()=>{setFormData({object1:{crime1: "", degree1: "",crime2: "", degree2: "",crime3: "", degree3: "", crime4: "", degree4: "", age:"", race:"", county:""}, object2:{crime1: "", degree1: "",crime2: "", degree2: "",crime3: "", degree3: "", crime4: "", degree4: "", age:"", race:"", county: ""}, object3:{crime1: "", degree1: "",crime2: "", degree2: "",crime3: "", degree3: "", crime4: "", degree4: "", age:"", race:"", county:""}}); setSelectedCrimes([]); setSelectedDegrees([]); setCrimeAndDegreeMap({})}}>Clear</button>
                        <button type={`submit`} className={`btn btn-primary ${style.button}`}>Submit</button>
                    </div>
                </form>

            </div>
        </>
    )
}