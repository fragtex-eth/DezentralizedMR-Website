import "./card.scss";

export default function Card({
  id,
  name,
  image,
  capital,
  currentParticipants,
  maximumParticipants,
  survey,
  question,
}) {
  return (
    <div className="card" key={id}>
      <div
        className="surveypreview"
        style={{
          backgroundImage: image ? `url(${bg[id % bg.length]})` : image,
        }}
      >
        <div className="filter">
          <div className="belowimg">
            <button
              className="participate-btn"
              onClick={() => console.log("participate")}
            >
              Participate
            </button>
            <span className="approxpayout">
              ~{capital / parseInt(maximumParticipants) / 1e19} ETH
            </span>
          </div>
        </div>
      </div>

      <div className="displayinfo">
        <p>{name}</p>
        <p className="participated">
          {" "}
          <span className="highlight">{currentParticipants}</span>/{" "}
          {maximumParticipants}
        </p>
      </div>
      <div className="divprog">
        <progress max={maximumParticipants} value={currentParticipants} />
      </div>
    </div>
  );
}
