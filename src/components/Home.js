import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="box">
        <h1>Bring The Flavors Of The Savannah Into Your kitchen Today</h1>
        <button className="btn">Shop Now!</button>
      </div>
      <div class="grid-container-element">
        <div class="manWithTray">Grid Column 1</div>
        <div class="grid-child-element-green">Grid Column 2</div>
      </div>
    </>
  );
};

export default Home;
