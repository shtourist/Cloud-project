const express = require('express');
const app = express();
const port = 3000
const authrouter = require('./routes/authRoutes');
const deprouter = require('./routes/dep_route');
const newsrouter = require('./routes/news_route');

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hello from node");
});

app.use('/signup',authrouter);
app.use('/login',authrouter);

app.use('/deps',deprouter);
app.use('/news',newsrouter);
app.use('/news',newsrouter);

app.listen(port,()=>{
    console.log('server runing on port',port)
})