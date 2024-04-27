import styles from './home.module.css'

export default function Home() {

    return (
        <>
            <div className={styles.home}>
                <div className={styles.header}>
                    <h1>Welcome to the Crewmate Auction</h1>
                </div>
                <div className={styles.caption}>
                    <h4>
                        <em>Here is where you can crate your own very set of crewmates before sending them off into space!</em>
                    </h4>
                </div>
                <div className={styles.images}>
                    <div className={styles.image}>
                        <img src="/crewmates.png" alt="A group picture of all crewmates." style={{maxWidth:'500px', maxHeight:'auto'}}/>
                    </div>
                    <div className={styles.image}>
                        <img src="/spaceship.jpg" alt="A picture of crewmates' spacecraft." style={{maxWidth:'500px', maxHeight:'auto'}}/>
                    </div>
                </div>
            </div>
        </>
    )
}