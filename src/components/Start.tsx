import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  generateVal,
  speedStateVal,
  animStateVal,
  updateBalanceVal,
  setUsersRanking,
} from "../store";
const Start = () => {
  const dispatch = useDispatch();
  let [speedValue, setSpeedValue] = useState(0);
  let [generatedValue, setGeneratedValue] = useState(random(1, 9, 2));
  let [pointsValue, setPointsValue] = useState(50);
  let [multiplierValue, setMultiplierValue] = useState(1.0);
  let [autoplayersValue, setAutoplayersValue] = useState([]);

  // Import global values from Redux store
  const animationShow = useSelector((state: any) => state.reduxStore.animShow);
  const userBalance = useSelector((state: any) => state.reduxStore.balance);

  interface players {
    id: number;
    name: string;
    point: any;
    multiplier: any;
    score: number;
  }
  /**
   * Generates a random number between min and max with a fixed decimal place.
   * @param min - Minimum value
   * @param max - Maximum value
   * @param decimal - Number of decimal places
   * @returns A random number within the specified range
   */
  function random(min: number, max: number, decimal: number) {
    return Number((Math.random() * (max - min + 1) + min).toFixed(decimal));
  }
  // Initialize autoplayers and set ranking on component mount
  useEffect(() => {
    let autoplayersGuess: any = [];
    for (let i = 0; i < 5; i++) {
      let data: players = {
        id: i,
        name: i === 0 ? "You" : `CPU ${i}`,
        point: "-",
        multiplier: "-",
        score: 0,
      };
      autoplayersGuess.push(data);
    }
    setAutoplayersValue(autoplayersGuess);
    dispatch(setUsersRanking(autoplayersGuess));
  }, []);
  // Generates data for autoplayers including the user and 4 CPU players.
  function generateAutoplayers() {
    let autoplayersGuess: any = [];
    const data: players = {
      id: 0,
      name: "You",
      point: pointsValue,
      multiplier: multiplierValue,
      score: Math.round(pointsValue * multiplierValue),
    };
    autoplayersGuess.push(data);
    // Generate guesses for 4 CPU players
    for (let i = 0; i < 4; i++) {
      let p: number = random(1, 700, 0),
        m: number = random(1, 4, 2);
      autoplayersGuess.push({
        id: i + 1,
        name: `CPU ${i + 1}`,
        point: p,
        multiplier: m,
        score: Math.round(p * m),
      });
    }
    setAutoplayersValue(autoplayersGuess);
    dispatch(setUsersRanking(autoplayersGuess));
  }
  // Handles the start logic including checking user balance, generating values, and updating balance.
  const startFunction = () => {
    if (0 > userBalance) {
      toast("Not enough points to start", {
        duration: 4000,
        style: {},
        className: "",
        icon: "⚠️",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      return false;
    }
    setGeneratedValue(random(1, 9, 2));
    dispatch(speedStateVal(speedValue));
    generateAutoplayers();
    dispatch(generateVal(generatedValue));
    dispatch(updateBalanceVal(userBalance - pointsValue));
    // Update balance after drawing the chart
    setTimeout(updateBalance, 3000 + 1000 * speedValue);
  };
  // Updates the user's balance based on the result of the game.
  function updateBalance() {
    // Remove disable from start button
    dispatch(animStateVal(false));
    if (generatedValue === multiplierValue) {
      dispatch(updateBalanceVal(userBalance + pointsValue));
    } else {
      dispatch(updateBalanceVal(userBalance - pointsValue));
    }
  }
  // Decreases the points value by 25 if above the minimum limit.
  const pointsMinus = () => {
    if (pointsValue > 25) setPointsValue(pointsValue - 25);
  };
  // Increases the points value by 25 if the user balance allows.
  const pointsPlus = () => {
    if (userBalance >= pointsValue + 25) setPointsValue(pointsValue + 25);
  };
  // Decreases the multiplier value by 0.25 if above the minimum limit.
  const multiplierMinus = () => {
    if (multiplierValue >= 1.25) setMultiplierValue(multiplierValue - 0.25);
  };
  // Increases the multiplier value by 0.25 if below the maximum limit.
  const multiplierPlus = () => {
    if (10 >= multiplierValue + 0.25)
      setMultiplierValue(multiplierValue + 0.25);
  };
  return (
    <div className="start-section">
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          <div className="card-box info-box toggle">
            <div className="toggle-title">Points</div>
            <div className="toggle-menu">
              <div className="toggle-minus option" onClick={pointsMinus}>
                ▼
              </div>
              <input
                type="number"
                className="toggle-input"
                min="0"
                max={userBalance}
                step="25"
                onChange={(e: any) => setPointsValue(e.target.value)}
                value={pointsValue}
              />
              <button className="toggle-plus option" onClick={pointsPlus}>
                ▲
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card-box info-box toggle">
            <div className="toggle-title">Multiplier</div>
            <div className="toggle-menu">
              <div className="toggle-minus option" onClick={multiplierMinus}>
                ▼
              </div>
              <input
                type="number"
                className="toggle-input"
                min="1"
                max="10"
                step="0.25"
                onChange={(e: any) => setMultiplierValue(e.target.value)}
                value={multiplierValue}
              />
              <button className="toggle-plus option" onClick={multiplierPlus}>
                ▲
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary start-button"
        onClick={startFunction}
        disabled={animationShow}
      >
        {animationShow ? "Started" : "Start"}
      </button>
      <div className="card-title mt-3">🏆 Current round</div>
      <div className="card-box round-box">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Point</th>
              <th>Multiplier</th>
            </tr>
          </thead>
          <tbody>
            {autoplayersValue.map((user: any, index: number) => (
              <tr key={user.id} className={index === 0 ? "my-result" : ""}>
                <td>{user.name}</td>
                <td>{user.point}</td>
                <td>{user.multiplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-title mt-3">⌛ Speed</div>
      <div className="card-box speed-box">
        <input
          type="range"
          className="speed"
          min="1"
          max="5"
          step="1"
          onChange={(e: any) => setSpeedValue(e.target.value)}
          value={speedValue}
        />
        <div className="speed-values">
          <div className={speedValue >= 1 ? "selected" : ""}>1x</div>
          <div className={speedValue >= 2 ? "selected" : ""}>2x</div>
          <div className={speedValue >= 3 ? "selected" : ""}>3x</div>
          <div className={speedValue >= 4 ? "selected" : ""}>4x</div>
          <div className={speedValue >= 5 ? "selected" : ""}>5x</div>
        </div>
      </div>
    </div>
  );
};
export default Start;
