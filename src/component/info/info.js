import "./info.css";
import cube from "../../assets/cube.png";

export default function Info() {
  return (
    <div className="infocontent">
      <div className="content">
        <h1>Make the move now... </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Ligula cursus ac magna eget
          netus netus euismod in. Fermentum id vulputate porttitor accumsan.
          Facilisis turpis at aliquam ut.
        </p>
        <button className="startbtn">Try now</button>
      </div>
      <div className="leftside"></div>
      <div
        className="rightside"
        style={{ backgroundImage: `url(${cube})` }}
      ></div>
    </div>
  );
}
