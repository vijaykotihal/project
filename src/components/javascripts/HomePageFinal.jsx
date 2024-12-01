import React from 'react';
import UserApplicationStatus from "../javascripts/user-application-status";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from "../homepagecomponents/Banner";
import NavBar from '../homepagecomponents/NavBar';
import Footer from '../homepagecomponents/Footer';

const LandingPage = () => {
  return (
    <div style={{marginRight:"-2vw"}}>
      <style>
        {`
          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          ::-webkit-scrollbar-thumb {
            background: #116D6E;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #116D6E;
          }
        `}
      </style>
    
      <NavBar/>
      <Banner />
      <Footer />
    </div>
  );
};

export default LandingPage;
