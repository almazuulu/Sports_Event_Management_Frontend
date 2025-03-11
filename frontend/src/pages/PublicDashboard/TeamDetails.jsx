import styles from "../../../../frontend/src/pages/PublicDashboard/TeamDetails.module.css";
import { useParams } from "react-router-dom";
import team1 from "../../../../frontend/src/assets/images/image1.jpg";
import { useCallback, useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import Fixtures from "./Fixtures";
function TeamsdetailPage() {
    const { teamId } = useParams();
    const [teamdetails, setTeamdetails] = useState([]);
    const [players, setPlayers] = useState([]);
    const [fixtures, setFixtures] = useState([]);
    const [isFetchingPlayers, setIsFetchingPlayers] = useState(false);

    const [isFetchingTeam, setIsFetchingTeam] = useState(false);
    const [isFixtures, setIsFixtures] = useState(false);

    const [activeSection, setActiveSection] = useState("Overview");

    const fetchTeam = useCallback(async () => {
        setIsFetchingTeam(true);

        console.log(teamId)
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/teams/teams/${teamId}/`);
            const data = await response.json();
            const teamDetails = data.players;
            if (!response.ok) {
                return toast.error("Failed to fetch team data");
            }

            setTeamdetails(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsFetchingTeam(false);
        }
    }, [teamId]);

    const fetchPlayers = useCallback(async () => {
        setIsFetchingPlayers(true);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/teams/teams/${teamId}/players`);
            const data = await response.json();

            if (!response.ok) {
                return toast.error("Failed to fetch players");
            }
            setPlayers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsFetchingPlayers(false);
        }
    }, [teamId]);
    const fetchFixtures = useCallback(async () => {
        setIsFixtures(true);
        try {

            const response = await fetch(`http://127.0.0.1:8000/api/teams/teams/${teamId}/registrations/?status=approved`);
            const data = await response.json();
            console.log("fixtures data", data)
            if (!response.ok) {
                return toast.error("Failed to fetch team data");
            }

            setFixtures(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsFixtures(false);
        }
    }, [teamId]);
    useEffect(() => {
        fetchTeam();
        fetchPlayers();
        fetchFixtures();
    }, []);


    return (
        <div className={styles.container}>
            {/* Banner Section */}
            <div className={styles.banner}>
                <div className={styles.bannerContent}>
                    <div className={styles.left}>
                        <h1 className={styles.teamName}>Team {teamdetails.name}</h1>

                    </div>
                    <div className={styles.right}>
                        <img src={team1} alt="Team" className={styles.bannerImage} />
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className={styles.navMenu}>
                    {["Overview", "Squad", "Fixtures", "Results"].map((section) => (
                        <button
                            key={section}
                            className={activeSection === section ? styles.activeButton : ""}
                            onClick={() => setActiveSection(section)}
                        >
                            {section}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic Content Section */}
            <div className={styles.content}>
                {activeSection === "Overview" && (

                    <div>

                        <div className={styles.overview}>

                            <h2>Team {teamdetails.name}</h2>
                            <h3>Description : {teamdetails.description} </h3>
                            <h3>Contact Phone : {teamdetails.contact_phone} </h3>
                            <h3>Email : {teamdetails.contact_email} </h3>
                            <h3>Manager : {teamdetails?.manager?.first_name} {teamdetails?.manager?.last_name} </h3>

                        </div>

                    </div>
                )}
                {activeSection === "Squad" && (
                    <div className={styles.teamContainer}>


                        {isFetchingPlayers ? (
                            <p style={{ color: "#000", textAlign: "center" }}>Loading...</p>
                        ) : players?.length === 0 ? (
                            <p style={{ color: "#000", textAlign: "center" }} >No players available.</p>
                        ) : (
                            players?.map((player, index) => (
                                <PlayerCard key={index} player={player} />))
                        )}
                    </div>
                )}
                {activeSection === "Fixtures" && (
                    <div className={styles.fixtures}>

                        <Fixtures />
                    </div>
                )}
                {activeSection === "Results" && (
                    <div className={styles.results}>
                        <h3>Recent Results</h3>
                        <p>Results details will go here...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeamsdetailPage;
