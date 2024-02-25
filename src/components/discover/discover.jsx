import "./discover.scss";
//TODO: Add variables for common used paramter, border size e.g.
import Card from "../common/card/card.jsx";

export default function Discover() {
  return (
    <section className="discover">
      <Card id='1' name='testsurvey' capital={152223321}
        currentParticipants={8} maximumParticipants={23} />
    </section>
  );
}
