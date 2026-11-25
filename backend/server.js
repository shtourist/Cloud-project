const express = require('express');
const app = express();
const port = 5000
const authrouter = require('./routes/authRoutes');
const deprouter = require('./routes/dep_route');
const newsrouter = require('./routes/news_route');
const cors = require('cors');

app.use(cors({
    origin:'http://localhost:3000'
}));

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hello from node");
});

app.use('/auth',authrouter);

app.use('/deps',deprouter);
app.use('/news',newsrouter);


app.listen(port,()=>{
    console.log('backend runing on port',port)
})