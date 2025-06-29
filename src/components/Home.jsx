import React from "react";
import Header from "./Header";
import RecentActivity from "./RecentActivity";
import Mission from "./Mission";
import Objectives from "./Objectives";
import Gallery from "./Gallery";
import Footer from "./Footer";
import Crowdfunding from "./CrowdFunding";

function Home() {
    return (
      <>
        <img src="https://raw.githubusercontent.com/hitenj/SarvathSiddhi/f31b7ef8b0ec097b24de1c5a0adea29efacac663/Blue%20Hand%20Drawn%20Crayon%20School%20Program%20Presentation_20250510_191853_0000.png"
             alt="Sarvarth Siddhi Banner" style={{margin: '4px 0 0 0', width: '100%', height:'220px'}} />
        <RecentActivity />
        <Mission />
        <Objectives />
        <Crowdfunding preview={true} />
        <Gallery />
      </>
    );
  }
  
  export default Home;