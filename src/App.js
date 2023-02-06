import "./App.css";
import Header from "./component/header/header";
import Main from "./component/main/main";
import Create from "./component/create/create";
import Answer from "./component/answer/answer";
import AnswerFinished from "./component/answerfinshed/answerfinished";
import Review from "./component/review/review";
import { useState } from "react";
function App() {
  const [create, setCreate] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [review, setReview] = useState(false);
  const [mainscreen, setMainScreen] = useState(0);
  return (
    <div className="App">
      <Header setMainScreen={setMainScreen} />
      <Main
        mainscreen={mainscreen}
        setMainScreen={setMainScreen}
        setCreate={setCreate}
        setReview={setReview}
      />
      {create ? <Create onShow={() => setCreate(false)} /> : ""}
      {answer ? <Answer onShow={() => setAnswer(false)} /> : ""}
      {review ? <Review onShow={() => setReview(false)} /> : ""}
      {/* <AnswerFinished /> */}
      {/* <Review /> */}
    </div>
  );
}

export default App;
