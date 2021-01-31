const express = require('express');
const cors = require('cors');
const app = express();
const coronaRouter = require('./routers/corona');

app.set('port',3001);
app.use(cors());


app.use('/',coronaRouter);

app.use((req,res,next)=>{
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next)=>{
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err: {};
  res.status(err.status || 500).render('error');
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
})