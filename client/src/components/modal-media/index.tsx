import { MdClose } from "react-icons/md";
import styles from "./styles.module.css";
import { useRef, type MouseEvent } from "react";

interface IModalMediaProps {
  audioUrl: string;
  setShowModal: (value: boolean) => void;
}

export function ModalMedia({ audioUrl, setShowModal }: IModalMediaProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setShowModal(false);
    }
  };

  return (
    <section className={styles.container} onClick={handleClick}>
      <div className={styles.container_media} ref={ref}>
        <button
          onClick={() => setShowModal(false)}
          className={styles.btn_close}
          aria-label="Fechar modal"
        >
          <MdClose size={24} />
        </button>
        <audio controls autoPlay src={audioUrl}></audio>
      </div>
    </section>
  );
}
