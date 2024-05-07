import styles from './sidenav.module.css';
import { Link } from 'react-router-dom';
export default function SideNav(){

    return (
        <>
            <div className={styles.sideNav}>
                <Link to='/'  className={styles.navLink}>Home</Link>
                <Link to='/simple'  className={styles.navLink}>Simple Averages</Link>
                <Link to='/averages'  className={styles.navLink}>Simple Average Plots</Link>
                <Link to='/comparison/form'  className={styles.navLink}>Simple Average Comparisons</Link>
            </div>
        </>
    )
}