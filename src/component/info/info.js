import "./info.css";
import cube from "../../assets/cube.png";

export default function Info({setMainScreen}) {
  return (
    <div className="infocontent">
      <div className="content">
        <h1>Make the move now... </h1>
        <p className="pmain">
          Unleash the potential of decentralized market research. With our
          platform, you can participate in surveys, share your opinions, and
          receive rewards for your contributions.
        </p>
        <button className="startbtn" onClick={()=>setMainScreen(1)}>Try now</button>
      </div>
      <div className="leftside"></div>
      <div
        className="rightside"
        style={{ backgroundImage: `url(${cube})` }}
      ></div>
    </div>
  );
}
