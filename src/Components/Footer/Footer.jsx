import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import styles from './footer.module.css';

function Footer() {
  const { setRecipesByIng } = useContext(MyContext);
  return (
    <div className={ styles.footer_container }>
      <footer data-testid="footer" className={ styles.footer }>
        <div>
          <Link onClick={ () => setRecipesByIng([]) } to="/drinks">
            <img
              data-testid="drinks-bottom-btn"
              alt="drink icon"
              src={ drinkIcon }
            />
          </Link>
        </div>

        <div>
          <Link onClick={ () => setRecipesByIng([]) } to="/explore">
            <img
              data-testid="explore-bottom-btn"
              src={ exploreIcon }
              alt="Icone de explore"
            />
          </Link>
        </div>

        <div>
          <Link onClick={ () => setRecipesByIng([]) } to="/foods">
            <img
              data-testid="food-bottom-btn"
              src={ mealIcon }
              alt="foods icon"
            />
          </Link>
        </div>
      </footer>
    </div>

  );
}

export default Footer;
