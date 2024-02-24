import cube from "../../assets/cube.png";
import "./info.scss";
export default function Info() {
  return (
    <section className="info">
      <div className="info-content">
        <h1>Make the move now...</h1>
        <p>
          Unleash the potential of decentralized market research. With our
          platform, you can participate in surveys, share your opinions, and
          receive rewards for your contributions.
        </p>
        <button
          className="violet-btn"
          style={{ width: "7rem" }}
          onClick={() => console.log("mainscreen")}
        >
          Try now
        </button>
      </div>
      <div className="info-right" style={{ backgroundImage: `url(${cube})` }} />
    </section>
  );
}
