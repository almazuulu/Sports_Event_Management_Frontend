import classes from "./AssignmentDetails.module.css";
import Header from "../../components/Header";
import ViewButton from "../../components/Button/ViewButton";
import NormalButton from "../../components/Button/NormalButton";
import CreateButton from "../../components/Button/CreateButton";

function AssignmentDetailsPage() {
  return (
    <>
      <div className={classes.container}>
        {/* <Header title={"Game Information"} /> */}
        <div className={classes.card}>
          <p>Game Information</p>
          <hr className="horizontalLine" />
          <div className={classes.gameHeader}>
            <div className={classes.gameMeta}>
              <p className={classes.gameTitle}>Football Semi-Final</p>
              <p className={classes.gameSubtitle}>
                Annual Sports Tournament 2025
              </p>
            </div>
            <div className={classes.gameTime}>
              <p>March 10, 2025 &nbsp;|&nbsp; </p>
              <p>14:00 - 16:00 &nbsp;|&nbsp;</p>
              <p>Main Stadium</p>
            </div>
            <div className={classes.liveIndicator}>
              <div className={classes.pulse}></div>
              LIVE
            </div>
            <div className={classes.gameTeams}>
              <div className={classes.team}>
                <div className={classes.teamLogo}>E</div>
                <div className={classes.teamName}>Eagles</div>
                <div className={classes.teamDesignation}>Home</div>
              </div>
              <div className={classes.scoreDisplay}>
                <div className={classes.scores}>
                  <div className={classes.score}>2</div>
                  <div className={classes.scoreSeperator}>:</div>
                  <div className={classes.score}>2</div>
                </div>
                <div className={classes.matchTime}>75:12</div>
              </div>
              <div className={classes.team}>
                <div className={classes.teamLogo}>F</div>
                <div className={classes.teamName}>Falcon</div>
                <div className={classes.teamDesignation}>Away</div>
              </div>
            </div>

            <div className={classes.addEventSection}>
              <div className={classes.sectionTitle}>Add Scoring Event</div>
              <div className={classes.formRow}>
                <div className={classes.formGroup}>
                  <label>Team</label>
                  <select className={classes.formControl} id="">
                    <option value="eagles">Eagles (Home)</option>
                    <option value="falcons">Falcons (Away)</option>
                  </select>
                </div>
                <div className={classes.formGroup}>
                  <label>Event Type</label>
                  <select id="event-type" className={classes.formControl}>
                    <option value="goal">Goal</option>
                    <option value="own-goal">Own Goal</option>
                    <option value="penalty">Penalty</option>
                    <option value="free-kick">Free Kick</option>
                    <option value="yellow-card">Yellow Card</option>
                    <option value="red-card">Red Card</option>
                  </select>
                </div>
                <div className={classes.formGroup}>
                  <label htmlFor="event-minute">Minute</label>
                  <input
                    type="number"
                    id="event-minute"
                    className={classes.formControl}
                    value="75"
                  />
                </div>
              </div>
              <div className={classes.formRow}>
                <div className={classes.formGroup}>
                  <label htmlFor="event-player">Player</label>
                  <select id="event-player" className={classes.formControl}>
                    <option value="">-- Select Player --</option>
                    <option value="1">Michael Johnson (#10)</option>
                    <option value="2">David Smith (#7)</option>
                    <option value="3">Robert Davis (#9)</option>
                    <option value="4">John Wilson (#4)</option>
                    <option value="5">Mark Taylor (#1)</option>
                  </select>
                </div>
                <div className={classes.formGroup}>
                  <label htmlFor="event-assist">Assisted By (Optional)</label>
                  <select id="event-assist" className={classes.formControl}>
                    <option value="">-- None --</option>
                    <option value="1">Michael Johnson (#10)</option>
                    <option value="2">David Smith (#7)</option>
                    <option value="3">Robert Davis (#9)</option>
                    <option value="4">John Wilson (#4)</option>
                    <option value="5">Mark Taylor (#1)</option>
                  </select>
                </div>
                <div className={classes.formGroup}>
                  <label htmlFor="event-points">Points</label>
                  <input
                    type="number"
                    id="event-points"
                    className={classes.formControl}
                    value="1"
                  />
                </div>
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="event-description">
                  Description (Optional)
                </label>
                <textarea
                  id="event-description"
                  className={classes.formControl}
                  placeholder="Add details about this scoring event..."
                ></textarea>
              </div>
              <div className={classes.formActions}>
                <NormalButton>Clear</NormalButton>
                <ViewButton>Add Event</ViewButton>
              </div>
            </div>
          </div>
          <div>
            <div className={classes.sectionTitle}>Scoring Events</div>
            <ul className={classes.eventList}>
              <li className={classes.scoreEvent}>
                <div className={classes.eventTime}>15'</div>
                <div className={classes.eventTeam}>Eagles</div>
                <div className={classes.eventInfo}>
                  <div className={classes.eventPlayer}>Michael Johnson</div>
                  <div className={classes.eventDetails}>
                    Assisted by David Smith
                  </div>
                </div>
                <div className={classes.eventType}>
                  <span className="event-badge event-goal">Goal</span>
                </div>
                {/* <div className="event-actions">
                  <i className="fas fa-times btn-icon"></i>
                </div> */}
              </li>
              <li className={classes.scoreEvent}>
                <div className={classes.eventTime}>15'</div>
                <div className={classes.eventTeam}>Eagles</div>
                <div className={classes.eventInfo}>
                  <div className={classes.eventPlayer}>Michael Johnson</div>
                  <div className={classes.eventDetails}>
                    Assisted by David Smith
                  </div>
                </div>
                <div className={classes.eventType}>
                  <span className="event-badge event-goal">Goal</span>
                </div>
                {/* <div className="event-actions">
                  <i className="fas fa-times btn-icon"></i>
                </div> */}
              </li>
              <li className={classes.scoreEvent}>
                <div className={classes.eventTime}>15'</div>
                <div className={classes.eventTeam}>Eagles</div>
                <div className={classes.eventInfo}>
                  <div className={classes.eventPlayer}>Michael Johnson</div>
                  <div className={classes.eventDetails}>
                    Assisted by David Smith
                  </div>
                </div>
                <div className={classes.eventType}>
                  <span className="event-badge event-goal">Goal</span>
                </div>
                {/* <div className="event-actions">
                  <i className="fas fa-times btn-icon"></i>
                </div> */}
              </li>
            </ul>
          </div>
          <div className={classes.gameCompletion}>
            <p className={classes.warningText}>
              Warning: Completing a game will finalize the score and submit it
              for verification.
            </p>
            <CreateButton>Complete Game</CreateButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignmentDetailsPage;
