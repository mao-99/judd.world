import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import style from './simpleLookup.module.css';
export default function SimpleLookupResult(){
    let params = useParams();
    let result = params.result;
    if (result === 'NaN'){
        result = 0;
    }
    return (
        <>
            <div className={`${style.main}`}>
                <div className={`${style.result}`}>
                    <h3>Average Sentence</h3>
                    <p>The average sentence for the selected crimes(s): </p>
                    <p>{result}</p>
                </div>
                <div className={`${style.row}`}>
                    <button className={style.navLink}><Link to='/'>Home</Link></button>
                    <button className={style.navLink}><Link to='/simple'>Go Back</Link></button>
                </div>

            </div>
        </>
    )
}