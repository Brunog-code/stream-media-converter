import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.logo}>
          <span className={styles.logo_first}>STREAM </span>TEST
        </h1>

        <nav>
          <ul className={styles.container_link}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Audio
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/video"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Video
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
