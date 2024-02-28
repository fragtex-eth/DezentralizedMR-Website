import "./discover.scss";
//TODO: Add variables for common used parameter, border size e.g.
import Card from "../common/card/card.jsx";

export default function Discover() {
  return (
    <section className="discover">
      <Card
        id="1"
        name="testsurvey"
        capital={15200000000000000223321}
        currentParticipants={8}
        maximumParticipants={23}
      />
      <Card
        id="2"
        name="testsurvey"
        capital={152223321}
        currentParticipants={8}
        maximumParticipants={23}
      />
      <Card
        id="3"
        name="testsurvey"
        capital={152223321}
        currentParticipants={8}
        maximumParticipants={23}
      />
      <Card
        id="4"
        name="testsurvey"
        capital={152223321}
        currentParticipants={8}
        maximumParticipants={23}
      />
    </section>
  );
}
