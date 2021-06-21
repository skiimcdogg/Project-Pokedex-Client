import React from 'react';

import './../styles/userDetail.css';
import defaultLogo from './../styles/images/pokeball-logo-3.png';

function UserDetail(props) {
  const { avatar, pseudo, region, email } = props.user;

  return (
    <div className="all-details">
      <h1>Welcome to your profile {pseudo} !</h1>
      {avatar === '' ? (
        <img className="img-profile" src={defaultLogo} alt="profile" />
      ) : (
        <img className="img-profile" src={avatar} alt="profile" />
      )}
      <h3>Region: {region}</h3>
      <p>Your email: {email}</p>
    </div>
  );
}

export default UserDetail;
