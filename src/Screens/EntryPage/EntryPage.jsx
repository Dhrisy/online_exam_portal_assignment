import React from 'react';
import "./EntryPage.scss"
import { Link } from 'react-router-dom';
import Image from "../../assets/calculating.jpg";


function EntryPage() {
  return (
    <div className='entryPage-container'>
     <div className="content">
     <h2>WELCOME</h2>
      <h3>You can start your exam by clicking on the below button</h3>
      <img 
      src={Image} alt="calculating"/>

     </div>
        <Link to="/question"
        ><div className='start-btn'>START EXAM</div></Link>

        {/* <button>START EXAM</button> */}
     
    </div>
  );
}

export default EntryPage;