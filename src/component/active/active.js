import "./active.css";
import surveybg1 from "../../assets/surveybg1.jpeg";
import surveybg2 from "../../assets/surveybg2.jpg";
import surveybg3 from "../../assets/surveybg3.jpg";
import surveybg4 from "../../assets/surveybg4.jpg";
import surveybg5 from "../../assets/surveybg5.jpg";

export default function Active() {
  const bg = [surveybg1, surveybg2, surveybg3, surveybg4, surveybg5];
  const activeSurveys = [
    {
      id: "1",
      address: "0xad4cb06582d71158c2b7bccdcd30d77997b220bd",
      name: "Survey 1",
      maxparticipants: "12",
      logo: "",
      image: surveybg1,
    },
    {
      id: "2",
      address: "0xad4cb06582d71158c2b7bccdcd30d77997b220bd",
      name: "Survey 2",
      maxparticipants: "14",
      logo: "",
      image: surveybg2,
    },
    {
      id: "3",
      address: "0xad4cb06582d71158c2b7bccdcd30d77997b220bd",
      name: "Survey 3",
      maxparticipants: "100",
      logo: "",
      image: surveybg3,
    },
    {
      id: "4",
      address: "0xad4cb06582d71158c2b7bccdcd30d77997b220bd",
      name: "Survey 3",
      maxparticipants: "100",
      logo: "",
      image: surveybg4,
    },
  ];

  return (
    <div className="activecontent">
      <div className="surveys">
        {activeSurveys.map((survey) => {
          return (
            <div className="singleelement" id={survey.id}>
              <div
                className="surveypreview"
                style={{ backgroundImage: `url(${survey.image})` }}
              >
                <div className="filter">
                  <div className="belowimg">
                    <button className="btnparticipate">Participate</button>
                    <span className="approxpayout">~0.002 ETH</span>
                  </div>
                </div>
              </div>

              <div className="displayinfo">
                <p>{survey.name}</p>
                <p className="participated">
                  {" "}
                  <span className="highlight">0 </span>/{" "}
                  {survey.maxparticipants}
                </p>
              </div>
              <div className="divprog">
                <progress max="100" value="20" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
