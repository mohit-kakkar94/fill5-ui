import { createPortal } from "react-dom";
import Overlay from "./Overlay";
import ModalContent from "./ModalContent";

export default function Modal({ isStart, dispatch, children }) {
  return createPortal(
    <Overlay>
      <ModalContent isStart={isStart} dispatch={dispatch}>
        {children}
      </ModalContent>
    </Overlay>,
    document.body
  );
}
