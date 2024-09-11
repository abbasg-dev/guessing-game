import { LineChart, Line, XAxis, YAxis } from "recharts";
import CountUp from "react-countup";
import { useSelector } from "react-redux";

const Graph = () => {
  // Select the generated value from the Redux store
  const generatedValue = useSelector(
    (state: any) => state.reduxStore.generatedValue
  );
  // Select the speed value from the Redux store
  const speedValue = useSelector((state: any) => state.reduxStore.speed);
  // Prepare data for the line chart
  const graphValue = [{ value: 0 }, { value: 0 }, { value: generatedValue }];

  /**
   * Calculates the animation speed based on the speed value from Redux state.
   * @returns {number} - The calculated animation duration in milliseconds.
   */
  function calcSpeed() {
    return 3000 + 1000 * speedValue;
  }
  return (
    <div className="col-12 mt-3">
      <div className="card-box graph-box">
        <div className="result">
          <CountUp
            start={0}
            end={generatedValue}
            redraw={false}
            duration={calcSpeed() / 1000}
            separator=" "
            decimals={2}
            decimal="."
            prefix=""
            suffix="x"
          />
        </div>
        <LineChart
          width={500}
          height={300}
          data={graphValue}
          key={Math.random()} // Ensures that the chart re-renders on data change
        >
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={3}
            stroke="#fb544e"
            dot={false}
            animationDuration={calcSpeed()}
            hide={generatedValue === 0}
          />
          <YAxis domain={[0, 10]} hide={true} />
          <XAxis dataKey="value" hide={true} />
        </LineChart>
      </div>
    </div>
  );
};
export default Graph;
