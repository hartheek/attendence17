import logo from './logo.svg';
import './App.css';
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from'axios';
import React,{useState,state} from 'react'
// import {internalIpV6, internalIpV4} from 'internal-ip';
import { ClientJS } from 'clientjs';


import date from 'date-and-time';

// Used to detect whether the users browser is an mobile browser

  ///<summary>Detecting whether the browser is a mobile browser or desktop browser</summary>
  ///<returns>A boolean value indicating whether the browser is a mobile browser or not</returns>


  // alternative


function App() {
  

  // nothing found.. assume desktop

  const [data, setData] = useState({
    name: "",
    bannerid: "" 

  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile']; 
  for (var i in mobile) if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return (alert("usage of mobile is prohibited"));
  else{
    continue;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(await internalIpV6());
    

    let latitude = null;
    let longitude = null;

    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    } catch (error) {
        if (error.code === error.PERMISSION_DENIED) {
            alert("Please allow location access to use this feature.");
            return;
        }
    }
  
      
    const client = new ClientJS()
    const sessionid=client.getFingerprint();
    console.log(client.getFingerprint())
    const now = new Date();
    const formattedDate = date.format(now, 'YYYY/MM/DD');
    const formattedTime = date.format(now, 'HH:mm:ss');
    
    const apiUrl = 'https://attendence17.onrender.com';
    const apiKey = 'rnd_3FlomSrwAd79aIrLT1GtypCV5yqf';

    axios.post(`${apiUrl}`, {...data, sessionid,formattedDate,formattedTime,latitude,longitude},  {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }}).then((res) => {

    if(res.data=="location"){
      alert("you are caught because of wrong location")
    }
    else if(res.data=="forbidden"){
      alert("you are caught because you are not connected ")

    }
    else if(res.data=="data inserted"){
      alert("good submitted your attendance")

    }
    else{
      alert("you are caught and not allowed")
    }
      });
  };

  return(
    <Container className="h-100">
  <Row className="h-100 d-flex justify-content-center align-items-center">
    <Col md={10} lg={8} xl={6}>
      <Card className="shadow">
        <Card.Body>
          <h2 className="fw-bold mb-4 text-uppercase text-center">Attendance</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor='name' className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="Enter full name" name='name' value={data.name} onChange={handleChange}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="bannerid" className="form-label">Banner ID</label>
              <input type="text" className="form-control" placeholder="Enter your banner id" name='bannerid' value={data.bannerid} onChange={handleChange}></input>
            </div>
            <div className="text-center">
              <button className='btn btn-primary' type='submit'>Submit</button>
            </div>
          </form>
          
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>


)
}

export default App;
