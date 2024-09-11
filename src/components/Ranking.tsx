import { useSelector } from "react-redux";

const Ranking = () => {
  // Retrieve ranking and animationShow state from Redux store
  let ranking = useSelector((state: any) => state.reduxStore.usersRanking);
  let animationShow = useSelector((state: any) => state.reduxStore.animShow);

  // Create a copy of the ranking array to avoid mutating the original array
  let arr = [...ranking];
  return (
    <div className="col-12 col-md-6">
      <div className="card-title">📊 Ranking</div>

      <div className="card-box ranking-box">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {arr
              .sort((a, b) => b.score - a.score)
              .map((user, index) => (
                <tr
                  key={user.id}
                  className={
                    user.name === "You" && !animationShow && user.score !== 0
                      ? "my-result"
                      : ""
                  }
                >
                  <td>{index + 1}</td>
                  <td>{animationShow || user.score === 0 ? "-" : user.name}</td>
                  <td>
                    {animationShow || user.score === 0 ? "-" : user.score}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Ranking;
