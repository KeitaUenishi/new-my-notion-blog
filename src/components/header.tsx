import styles from '@/styles/header.module.css'
import { NavMenu } from '@/components/layout/NavMenu'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <NavMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
