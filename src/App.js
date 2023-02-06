import "./App.css";
import Header from "./component/header/header";
import Main from "./component/main/main";
import Create from "./component/create/create";
import { useState } from "react";
function App() {
  const [display, setDisplay] = useState(false);
  return (
    <div className="App">
      <Header />
      <Main />
      {display ? <Create onShow={() => setDisplay(false)} /> : ""}
    </div>
  );
}

export default App;
