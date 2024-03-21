import { NavMenu } from "@/components/layout/NavMenu";
import styles from "@/styles/header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavMenu />
      </div>
    </header>
  );
};

export default Header;
