import React from 'react';

import FormSignin from '../components/Forms/FormSignin';
import NavMain from '../components/NavMain';
import Footer from '../components/Footer';

const Signin = () => {
  return (
    <div>
      <NavMain />
      <FormSignin />
      <Footer />
    </div>
  );
};

export default Signin;
