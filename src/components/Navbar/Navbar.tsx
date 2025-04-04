import { useState } from 'react';
import { Link } from 'react-router';
import logo from 'assets/logo.svg';
import Text from 'components/Text';
import Bug from 'components/icons/BugIcon';
import UserIcon from 'components/icons/UserIcon';
import { routes } from 'config/routes';
import styles from './navbar.module.scss';

const Navbar = () => {
  type SelectedNav = 'products' | 'categories' | 'about_us';

  const [selectedNav, setSelectedNav] = useState<SelectedNav>('products');

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <img src={logo} alt="" />
        <ul className={styles.navigation}>
          <li>
            <Link to={routes.products.create()}>
              <Text
                onClick={() => setSelectedNav('products')}
                view="p-18"
                color={selectedNav === 'products' ? 'accent' : 'primary'}
                weight={selectedNav === 'products' ? 'bold' : 'normal'}
                className={selectedNav === 'products' ? styles.selected : ''}
              >
                Products
              </Text>
            </Link>
          </li>
          <li>
            <Text
              onClick={() => setSelectedNav('categories')}
              view="p-18"
              color={selectedNav === 'categories' ? 'accent' : 'primary'}
              weight={selectedNav === 'categories' ? 'bold' : 'normal'}
              className={selectedNav === 'categories' ? styles.selected : ''}
            >
              Categories
            </Text>
          </li>
          <li>
            <Text
              onClick={() => setSelectedNav('about_us')}
              view="p-18"
              color={selectedNav === 'about_us' ? 'accent' : 'primary'}
              weight={selectedNav === 'about_us' ? 'bold' : 'normal'}
              className={selectedNav === 'about_us' ? styles.selected : ''}
            >
              About us
            </Text>
          </li>
        </ul>
        <ul className={styles.control}>
          <li>
            <Bug color="primary" width={30} height={30} viewBox='0 0 30 30' />
          </li>
          <li>
            <UserIcon color="primary" width={30} height={30} viewBox='0 0 30 30' />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
