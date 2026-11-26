const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const authrouter = require('./routes/authRoutes');
const deprouter = require('./routes/dep_route');
const newsrouter = require('./routes/news_route');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
    res.send("University of Boumerdes Backend API is running successfully");
});

app.use('/auth', authrouter);
app.use('/deps', deprouter);
app.use('/news', newsrouter);

app.listen(port, () => {
    console.log('Backend running on port', port);
});
