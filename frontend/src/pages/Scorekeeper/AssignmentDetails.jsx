import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "./AssignmentDetails.module.css";
import ViewButton from "../../components/Button/ViewButton";
import NormalButton from "../../components/Button/NormalButton";
import CreateButton from "../../components/Button/CreateButton";
import { fetchWithAuth } from "../../utils/FetchClient";
import { formatToShortDate, formatToTimeOnly } from "../../utils/helpers";
import { toast } from "react-toastify";
import Modal from "../../components/UI/Modal";
import CancelButton from "../../components/Button/CancelButton";

function AssignmentDetailsPage() {
  const { gameId, scoreId } = useParams();
  const [gameInfo, setGameInfo] = useState({});
  const [gameScore, setGameScore] = useState({});
  const [time, setTime] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [scoringEvents, setScoringEvents] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const [formState, setFormState] = useState({
    team: "",
    event_type: "",
    minute: 0,
    player: "",
    assisted_by: "",
    points: 1,
    period: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClear = () => {
    setFormState({
      team: "",
      event_type: "",
      minute: 0,
      player: "",
      assisted_by: "",
      points: 1,
      period: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");
      const mins = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      return `${hrs}:${mins}:${secs}`;
    };

    const formToSubmit = {
      ...formState,
      score: scoreId,
      time_occurred: formatTime(time),
    };

    try {
      const res = await fetchWithAuth("/api/scores/score-details/", {
        method: "POST",
        body: JSON.stringify(formToSubmit),
      });

      if (!res.ok) return toast.error("Failed to submit scoring event!");

      toast.success("New scoring event added!");
      handleClear();
      fetchGameScore();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGameDetails = useCallback(async () => {
    try {
      const res = await fetchWithAuth(`/api/games/games/${gameId}/`);
      const data = await res.json();
      setGameInfo(data);
    } catch (error) {
      console.error(error);
    }
  }, [gameId]);

  const fetchGameScore = useCallback(async () => {
    try {
      const res = await fetchWithAuth(`/api/scores/scores?game=${gameId}`);
      const data = await res.json();
      setGameScore(data.results[0]);
      setScoringEvents(data.results[0].score_details);
    } catch (error) {
      console.error(error);
    }
  }, [gameId]);

  useEffect(() => {
    let interval;
    if (isTimeRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimeRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStart = () => {
    setTime(0);
    setIsTimeRunning(true);
  };

  const handlePause = () => {
    setIsTimeRunning(false);
  };

  const handleResume = () => {
    setIsTimeRunning(true);
  };

  const handleReset = () => {
    setTime(0);
    setIsTimeRunning(false);
  };

  const handleCompleteGame = () => {
    setIsCompleted(true);
  };

  const confirmComplete = async () => {
    try {
      const res = await fetchWithAuth(`/api/scores/scores/${scoreId}/`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "completed",
        }),
      });

      if (!res.ok) return toast.error("Failed to complete the game!");

      await fetchWithAuth(`/api/games/games/${gameId}/update-status/`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "completed",
        }),
      });

      toast.success("Game completed!");
      setIsCompleted(false);
      fetchGameScore();
      fetchGameDetails();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGameScore();
    fetchGameDetails();
  }, [fetchGameScore, fetchGameDetails]);

  useEffect(() => {
    if (formState.team) {
      const gameTeam = gameInfo.teams.find(
        (team) => team.team === formState.team
      );
      if (gameTeam) {
        setTeamPlayers(gameTeam.players);
      }
    }
  }, [formState.team, gameInfo.teams]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <p>Game Information</p>
          <hr className="horizontalLine" />
          <div className={classes.gameHeader}>
            <div className={classes.gameMeta}>
              <p className={classes.gameTitle}>{gameInfo.name}</p>
              <p className={classes.gameSubtitle}>
                {gameInfo.sport_event_name}
              </p>
            </div>
            <div className={classes.gameTime}>
              <p>{formatToShortDate(gameInfo.start_datetime)} &nbsp;|&nbsp; </p>
              <p>
                {formatToTimeOnly(gameInfo.start_datetime)} -{" "}
                {formatToTimeOnly(gameInfo.end_datetime)} &nbsp;|&nbsp;
              </p>
              <p>{gameInfo.location}</p>
            </div>
            {gameScore.status === "in_progress" && (
              <div className={classes.liveIndicator}>
                <div className={classes.pulse}></div>
                LIVE
              </div>
            )}
            <div className={classes.gameTeams}>
              <div className={classes.team}>
                <div className={classes.teamLogo}>H</div>
                <div className={classes.teamName}>{gameScore.team1_name}</div>
                <div className={classes.teamDesignation}>Home</div>
              </div>
              <div className={classes.scoreDisplay}>
                <div className={classes.scores}>
                  <div className={classes.score}>
                    {gameScore.final_score_team1}
                  </div>
                  <div className={classes.scoreSeperator}>:</div>
                  <div className={classes.score}>
                    {gameScore.final_score_team2}
                  </div>
                </div>
                <div className={classes.matchTime}>{formatTime(time)}</div>
              </div>
              <div className={classes.team}>
                <div className={classes.teamLogo}>A</div>
                <div className={classes.teamName}>{gameScore.team2_name}</div>
                <div className={classes.teamDesignation}>Away</div>
              </div>
            </div>

            <div className={classes.timerControls}>
              {!isTimeRunning &&
                time === 0 &&
                gameScore.status === "in_progress" && (
                  <CreateButton onClick={handleStart}>Start</CreateButton>
                )}
              {isTimeRunning && time > 0 && (
                <ViewButton onClick={handlePause}>Pause</ViewButton>
              )}
              {!isTimeRunning && time > 0 && (
                <ViewButton onClick={handleResume}>Resume</ViewButton>
              )}
              {time > 0 && (
                <NormalButton onClick={handleReset}>Reset</NormalButton>
              )}
            </div>
            {gameScore.status === "in_progress" && (
              <div className={classes.addEventSection}>
                <div className={classes.sectionTitle}>Add Scoring Event</div>
                <div className={classes.formRow}>
                  <div className={classes.formGroup}>
                    <label>Team</label>
                    <select
                      className={classes.formControl}
                      id="team"
                      value={formState.team}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Team --</option>
                      <option value={gameScore.team1}>
                        {gameScore.team1_name}
                      </option>
                      <option value={gameScore.team2}>
                        {gameScore.team2_name}
                      </option>
                    </select>
                  </div>
                  <div className={classes.formGroup}>
                    <label>Event Type</label>
                    <select
                      id="event_type"
                      className={classes.formControl}
                      value={formState.event_type}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Event Type --</option>
                      <option value="goal">Goal</option>
                      <option value="assist">Assist</option>
                      <option value="own_goal">Own Goal</option>
                      <option value="penalty">Penalty</option>
                      <option value="free_kick">Free Kick</option>
                      <option value="basket">Basket</option>
                      <option value="point">Point</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className={classes.formGroup}>
                    <label>Minute</label>
                    <input
                      type="number"
                      id="minute"
                      className={classes.formControl}
                      value={formState.minute}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classes.formRow}>
                  <div className={classes.formGroup}>
                    <label>Player</label>
                    <select
                      id="player"
                      className={classes.formControl}
                      value={formState.player}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Player --</option>
                      {teamPlayers.map((player) => (
                        <option key={player.player} value={player.player}>
                          {player.name} (#{player.jersey_number})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={classes.formGroup}>
                    <label>Assisted By (Optional)</label>
                    <select
                      id="assisted_by"
                      className={classes.formControl}
                      value={formState.assisted_by}
                      onChange={handleChange}
                    >
                      <option value="">-- None --</option>
                      {teamPlayers.map((player) => (
                        <option key={player.player} value={player.player}>
                          {player.name} (#{player.jersey_number})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={classes.formGroup}>
                    <label>Points</label>
                    <input
                      type="number"
                      id="points"
                      className={classes.formControl}
                      value={formState.points}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classes.formRow}>
                  <div className={classes.formGroup}>
                    <label>Period</label>
                    <input
                      type="text"
                      id="period"
                      placeholder="First half"
                      className={classes.formControl}
                      value={formState.period}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classes.formGroup}>
                  <label>Description (Optional)</label>
                  <textarea
                    id="description"
                    className={classes.formControl}
                    placeholder="Add details about this scoring event..."
                    value={formState.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className={classes.formActions}>
                  <NormalButton onClick={handleClear}>Clear</NormalButton>
                  <ViewButton onClick={handleSubmit}>Add Event</ViewButton>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className={classes.sectionTitle}>Scoring Events</div>
            <ul className={classes.eventList}>
              {scoringEvents.map((event) => (
                <li key={event.id} className={classes.scoreEvent}>
                  <div className={classes.eventTime}>{event.minute}'</div>
                  <div className={classes.eventTeam}>{event.team_name}</div>
                  <div className={classes.eventInfo}>
                    <div className={classes.eventPlayer}>
                      {event.player_name}
                    </div>
                    {event.assisted_by_name && (
                      <div className={classes.eventDetails}>
                        Assisted by {event.assisted_by_name}
                      </div>
                    )}
                  </div>
                  <div className={classes.eventType}>
                    <span>{event.event_type}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {gameScore.status === "in_progress" && (
            <div className={classes.gameCompletion}>
              <p className={classes.warningText}>
                Warning: Completing a game will finalize the score and submit it
                for verification.
              </p>
              <CreateButton onClick={handleCompleteGame}>
                Complete Game
              </CreateButton>
            </div>
          )}
        </div>
      </div>

      {/* COMPLETE GAME MODAL */}
      <Modal
        className={classes.modalContainer}
        open={isCompleted}
        onClose={() => setIsCompleted(false)}
      >
        <p>Are you sure you want to complete this match?</p>
        <CreateButton style={{ marginRight: "10px" }} onClick={confirmComplete}>
          Yes, Complete
        </CreateButton>
        <CancelButton onClick={() => setIsCompleted(false)}>
          Cancel
        </CancelButton>
      </Modal>
    </>
  );
}

export default AssignmentDetailsPage;
