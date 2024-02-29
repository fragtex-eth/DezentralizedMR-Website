import Lines from "../../assets/lines.png";
import "./background.scss";
export default function Background({ children }) {
  return (
    <>
      <img src={Lines} alt="background lines" className="background-lines" />
      <div className="background-circleblur" />
      {children}
    </>
  );
}
