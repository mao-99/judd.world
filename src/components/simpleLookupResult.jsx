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
                    <Link to='/' className={`${style.navLink} btn ${style.button}`}>Home</Link>
                    <Link to='/simple' className={`${style.navLink} btn ${style.button}`}>Go Back</Link>
                </div>

            </div>
        </>
    )
}