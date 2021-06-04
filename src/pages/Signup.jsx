import React from "react";
import FormSignup from "../components/Forms/FormSignup";
import NavMain from "../components/NavMain";
import Footer from "../components/Footer";


const Signup = (props) => {
  return (
    <div>
      <NavMain />
      <FormSignup />
      <Footer />
    </div>
  );
};

export default Signup;
