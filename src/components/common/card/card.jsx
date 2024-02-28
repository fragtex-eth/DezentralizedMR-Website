import "./card.scss";
import PlaceholderImage1 from "../../../assets/surveybg1.jpeg";
import PlaceholderImage2 from "../../../assets/surveybg2.jpg";
import PlaceholderImage3 from "../../../assets/surveybg3.jpg";
import PlaceholderImage4 from "../../../assets/surveybg4.jpg";
import PlaceholderImage5 from "../../../assets/surveybg5.jpg";
export default function Card({
  key,
  index,
  name,
  image,
  capital,
  currentParticipants,
  maximumParticipants,
  survey,
  question,
}) {
  const placeholerImages = [
    PlaceholderImage1,
    PlaceholderImage2,
    PlaceholderImage3,
    PlaceholderImage4,
    PlaceholderImage5,
  ];
  return (
    <div className="card" key={key}>
      <div
        className="card-image"
        style={{
          backgroundImage: image
            ? image
            : `url(${placeholerImages[index % placeholerImages.length]})`,
        }}
      >
        <div className="card-image-bottom">
          <button
            className="card-image-bottom-btn"
            onClick={() => console.log("participate")}
          >
            Participate
          </button>
          <span className="card-image-bottom-payout">
            ~{capital / parseInt(maximumParticipants) / 1e19} ETH
          </span>
        </div>
      </div>

      <div className="card-bottom">
        <p>{name}</p>
        <p className="card-bottom-participants">
          {" "}
          <span className="card-bottom-participants-current">
            {currentParticipants}
          </span>
          / {maximumParticipants}
        </p>
      </div>
      <div className="card-progress">
        <progress max={maximumParticipants} value={currentParticipants} />
      </div>
    </div>
  );
}
