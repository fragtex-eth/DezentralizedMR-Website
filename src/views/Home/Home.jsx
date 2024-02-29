import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "../../components/Header/header.jsx";
import Background from "../../components/background/background";
import Info from "../../components/info/info.jsx";
import CreatePopUp from "../../components/popups/CreatePopUp/createPopUp.jsx";
import AnswerPopUp from "../../components/popups/AnswerPopUp/answerPopUp.jsx";
import Discover from "../../components/discover/discover.jsx";
import { useState } from "react";

export default function Home() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header setCreateModalVisible={setCreateModalVisible} />,
      children: [
        {
          path: "",
          element: <Info />,
        },
        {
          path: "discover",
          element: <Discover />,
        },
      ],
    },
  ]);
  return (
    <Background>
      {createModalVisible && (
        <CreatePopUp setCreateModalVisible={setCreateModalVisible} />
      )}
      <RouterProvider router={router} />
    </Background>
  );
}
