import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../styles/header.module.css'

interface NavItem {
  label: string
  path: string
}

const Header = () => {
  const { asPath } = useRouter()

  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Posts', path: '/posts' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <ul>
          {navItems.map(({ label, path }) => (
            <li key={label}>
              <Link href={path} passHref>
                <a className={asPath === path ? 'active' : null}>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Header
