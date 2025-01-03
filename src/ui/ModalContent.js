import styles from "./ModalContent.module.css";
export default function ModalContent({ isStart, dispatch, children }) {
  return (
    <div className={`${styles.modalContent} w-3/4`}>
      <button
        className={styles.modalClose}
        onClick={() => {
          isStart
            ? dispatch({ type: "startGame" })
            : dispatch({ type: "goBack" });
        }}
      >
        x
      </button>
      {children}
    </div>
  );
}
