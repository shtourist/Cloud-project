const express = require('express');
const app = express();
const port = 3000
const authrouter = require('./routes/authRoutes');
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hello from node");
});

app.post('/signup',authrouter);
app.get('/login',authrouter);

app.listen(port,()=>{
    console.log('server runing on port',port)
})