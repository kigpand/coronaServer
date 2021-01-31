const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();
const TodayCorona = async () => {
    let response;
    try {
      const updateTime = new Date().getHours();
      let today;
      const year = new Date().getFullYear();
      const month = new Date().getMonth()+1;

      if(updateTime >= 0 && updateTime < 10){
        const day = new Date().getDate()-1;
        today = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
      }
      else{
        const day = new Date().getDate();
        today = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
      }

        const headerurl = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson';
        const serviceKey = process.env.SERVICE_KEY;
        let queryParams = '?' + encodeURIComponent('ServiceKey') + `=${serviceKey}`; /* Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
        queryParams += '&' + encodeURIComponent('startCreateDt') + `=${today}`; /* */
        queryParams += '&' + encodeURIComponent('endCreateDt') + `=${today}`; /* */

        const url = headerurl+queryParams;
        response = await axios.get(url);
    } catch (e) {
      console.log(e);
    }
    return response;
  };

  const YesterdayCorona = async () =>{
    let response;
    try {
      const updateTime = new Date().getHours();
      let today;
      const year = new Date().getFullYear();
      const month = new Date().getMonth()+1;

      if(updateTime >= 0 && updateTime < 10){
        const day = new Date().getDate()-2;
        today = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
      }
      else{
        const day = new Date().getDate()-1;
        today = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
      }

        const headerurl = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson';
        const serviceKey = process.env.SERVICE_KEY;
        let queryParams = '?' + encodeURIComponent('ServiceKey') + `=${serviceKey}`; /* Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
        queryParams += '&' + encodeURIComponent('startCreateDt') + `=${today}`; /* */
        queryParams += '&' + encodeURIComponent('endCreateDt') + `=${today}`; /* */

        const url = headerurl+queryParams;
        response = await axios.get(url);
    } catch (e) {
      console.log(e);
    }
    return response;
  }
  
  const DetailCorona = async () => {
    let response;
    try {
      const updateTime = new Date().getHours();
      let today;
      let startday;
      const year = new Date().getFullYear();
      const month = new Date().getMonth()+1;

      if(updateTime > 0 && updateTime < 10){
        const day = new Date().getDate()-1;
        const start = new Date().getDate()-8;
        today = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
        startday = year+(("00"+month.toString()).slice(-2))+(("00"+start.toString()).slice(-2));
      }
      else{
        const day = new Date().getDate();
        const start = new Date().getDate()-7;
        today = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
        startday = year+(("00"+month.toString()).slice(-2))+(("00"+start.toString()).slice(-2));
      }
        const headerurl = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
        const serviceKey = process.env.SERVICE_KEY;
        let queryParams = '?' + encodeURIComponent('ServiceKey') + `=${serviceKey}`; /* Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
        queryParams += '&' + encodeURIComponent('startCreateDt') + `=${startday}`; /* */
        queryParams += '&' + encodeURIComponent('endCreateDt') + `=${today}`; /* */

        
        const url = headerurl+queryParams;
        response = await axios.get(url);
    } catch (e) {
      console.log(e);
    }
    return response;
  };


router.get('/', ( req, res, next)=>{
    TodayCorona().then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response.data.response.body);
      });
});

router.get('/yesterday',( req, res, next)=>{
  YesterdayCorona().then((response) =>{
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json(response.data.response.body);
  });
});


router.get('/detail',(req, res, next)=>{
    DetailCorona().then((response) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json(response.data.response.body);
    });
})

module.exports = router;