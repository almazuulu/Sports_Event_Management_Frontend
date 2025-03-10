import styles from "../../../../frontend/src/pages/PublicDashboard/TeamDetails.module.css";
import { useParams } from "react-router-dom";  
import team1 from "../../../../frontend/src/assets/images/image1.jpg";
import { useCallback, useEffect, useState } from "react";
function TeamsdetailPage() {
    const { teamId } = useParams();
     const [teamdetails, setTeamdetails] = useState([]);
    const [activeSection, setActiveSection] = useState("Overview");
 const fetchTeam = useCallback(async () => {
        console.log(teamId)
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/teams/teams/${teamId}/`);
            const data = await response.json();
    console.log(data)
          if (!response.ok) {
            return toast.error("Failed to fetch team data");
          }
    
          setTeamdetails(data);
        } catch (error) {
          console.error(error);
        }
      }, [teamId]);

      useEffect(() => {
        fetchTeam();
      }, []);
    const team = {
        name: "Arsenal",
        logo: "/assets/arsenal.png",
        bannerImage: "/assets/arsenal-banner.jpg",
        founded: "1886",
        stadium: "Emirates Stadium, London",
        capacity: "60,704",
        website: "https://www.arsenal.com",
        shop: "https://shop.arsenal.com",
        tickets: "https://www.arsenal.com/tickets",
        latestNews: [
          { image: "/assets/news1.jpg" },
          { image: "/assets/news2.jpg" },
          { image: "/assets/news3.jpg" },
          { image: "/assets/news4.jpg" },
        ],
    };

    return (
        <div className={styles.container}>
            {/* Banner Section */}
            <div className={styles.banner}>
                <div className={styles.bannerContent}>
                    <div className={styles.left}>
                        <h1 className={styles.teamName}>{team.name}</h1>
                        <p className={styles.info}>
                            Est {team.founded} · {team.stadium}, Capacity: {team.capacity}
                        </p>
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
                      {/* <h3>Manager : {teamdetails.manager.first_name} {teamdetails.manager.last_name} </h3> */}
                      
                    </div>
                    
                    </div>
                )}
                {activeSection === "Squad" && (
                    <div className={styles.squad}>
                        <h3>{team.name} Squad</h3>
                        <p>Squad details will go here...</p>
                    </div>
                )}
                {activeSection === "Fixtures" && (
                    <div className={styles.fixtures}>
                        <h3>Upcoming Fixtures</h3>
                        <p>Fixture details will go here...</p>
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
