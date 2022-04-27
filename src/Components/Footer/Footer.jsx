import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer data-testid="footer" className={ styles.footer }>
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" alt="drink icon" src={ drinkIcon } />
      </Link>
      <Link to="/explore">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Icone de explore"
        />
      </Link>
      <Link to="/foods">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="foods icon" />
      </Link>
    </footer>
  );
}

export default Footer;
