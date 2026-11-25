const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req,res) => {
    try {
        const result = await pool.query('SELECT dep_name,dep_desc from department');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message:'Internal server error'});
    }
}) 
module.exports = router;