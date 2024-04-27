import styles from './home.module.css'

export default function Home() {

    return (
        <>
            <div className={styles.home}>
                <div className={styles.header}>
                    <h1>Welcome to the Judd.world</h1>
                </div>
                <div className={styles.caption}>
                    <h4>
                        <em>Easy Access To New York's Conviction Data</em>
                    </h4>
                </div>
                <div className={styles.images}>
                    <div className={styles.image}>
                        <img src="/chartGraphic.png" alt="A group picture of all crewmates." style={{maxWidth:'500px', maxHeight:'auto'}}/>
                    </div>
                </div>
            </div>
        </>
    )
}