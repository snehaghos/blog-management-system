// ...existing code...
import React from "react";
import Carousal from "../../../components/Carousal/Carousal";
import Feature from "../../../components/Features/Feature";
import CTA from "../../../components/Cta/CTA";
import Footer from "../../../components/Footer/Footer";
import { Navbar } from "../../../components/Navbar/Navbar";
import Description from "../../../components/Description/Description";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        
        <Carousal />
        <main>
          <Description/>
          <Feature />
          <CTA />
        </main>
       
      </div>
    </>
  );
};

export default Home;
