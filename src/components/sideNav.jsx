import styles from './sidenav.module.css';
import { Link } from 'react-router-dom';
export default function SideNav(){

    return (
        <>
            <div className={styles.sideNav}>
                <Link to='/'  className={styles.navLink}>Home</Link>
                <Link to='/simple'  className={styles.navLink}>Simple Lookup</Link>
                <Link to='/averages'  className={styles.navLink}>Average Sentences</Link>
            </div>
        </>
    )
}