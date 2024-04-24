const express= require('express');
const cors= require('cors');
const requestIp= require('request-ip');
const NodeGeocoder = require('node-geocoder');
const date = require('date-and-time');
require("dotenv").config();
const PORT=8000;

const {Pool} = require('pg');
const {pool}=require('./database')
const app= express();
const axios= require('axios')

app.use(cors());
app.use(cors({ origin: 'attendence17.vercel.app' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);

app.use((req,res,next)=>{
    function checkip(ip, ip2) {
        var ip = ip.split('.').slice(0, 3);
        var ip2 = ip2.split('.').slice(0, 3);
    
        return ip.join('.')=== ip2.join('.');
    }
    var ip1= req.ip;
    var ip='165.134.212';
    var ip2='165.134.212.81'
    if(checkip(ip1,ip2)==true){
        console.log('yes')
        console.log(ip1)
        next()
    }else{
        res.status(403).send('forbidden'+ ip1)
    }
    
    
          
    const getLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };
    
    // Function to check if the current location is within the expected range
})
app.post("/", async(req, res) => {
    try{
    const longitude= req.body.longitude
    const latitude=req.body.latitude
    if(38.6351275 < latitude && latitude < 38.6353075 && -90.2330823 < longitude && longitude < -90.2310000){
        const fullname =req.body.name
        const bannerid=req.body.bannerid
        const sessionid=req.body.sessionid
        const now = new Date();
        const formattedDate = date.format(now, 'YYYY/MM/DD');
        const formattedTime = date.format(now, 'HH:mm:ss');

        const inserting='INSERT INTO students(sessionid, fullname, bannerid, PresentDate, time) VALUES($1, $2, $3, $4,$5)'
        await pool.query(inserting,[sessionid, fullname, bannerid, formattedDate, formattedTime])
        await res.send("data inserted")
        
    }
    else{
        console.log("hello")
        res.send("location")
    }
    }
    catch(err){
        console.error("error",err);
        res.send("you are caught")
    }
    
});


app.listen(process.env.PORT|| PORT);
