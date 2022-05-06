import React from 'react';
import { useHistory } from 'react-router';

function ProfileComponent() {
  const history = useHistory();
  const user = localStorage.getItem('user');
  const userObj = JSON.parse(user);
  const storage = localStorage;
  return (
    <main>
      { userObj && <p data-testid="profile-email">{userObj.email}</p> }
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => { history.push({ pathname: '/done-recipes' }); } }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => { history.push({ pathname: '/favorite-recipes' }); } }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          storage.clear();
          history.push({ pathname: '/' });
        } }
      >
        Logout
      </button>

    </main>
  );
}

export default ProfileComponent;
