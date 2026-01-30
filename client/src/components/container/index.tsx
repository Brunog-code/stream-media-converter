import type { ReactNode } from "react";
import styles from "./style.module.css";

export function Container({ children }: { children: ReactNode }) {
  return <section className={styles.container}>{children}</section>;
}
