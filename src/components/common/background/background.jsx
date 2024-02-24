import Lines from "../../../assets/lines.png";
import "./background.scss";
export default function Background({ children }) {
  return (
    <>
      {children}
      <img src={Lines} className="background-lines" />
      <div className="background-circleblur" />
    </>
  );
}
