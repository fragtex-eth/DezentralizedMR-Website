import "./modal.scss";
import { createPortal } from "react-dom";

const ModalInner = ({ children }) => {
  return <div className="modal">{children}</div>;
};
export function Modal(props) {
  return createPortal(ModalInner(props), document.querySelector("#modal"));
}
