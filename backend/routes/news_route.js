const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req,res) => {
    try {
        const result = await pool.query('SELECT ann_id,ann_name,ann_desc from announcments');
        res.status(200).json(result.rows);
    } catch (error){
        console.error(error.message);
        res.status(500).json({message:'Internal server error'});
    }
})

router.post('/', async (req,res) => {
    try {
        const {ann_name,ann_desc}=req.body || {};
        if (typeof ann_name !== 'string' || !ann_name.trim() ||
            typeof ann_desc !== 'string' || !ann_desc.trim()) {
            return res.status(400).json({
                message: 'Name and description are required'
            });
        }
        const query = `
            INSERT INTO announcments (ann_name,ann_desc)
            VALUES ($1,$2)
            RETURNING ann_id,ann_name,ann_desc
        `;
        const result = await pool.query(query,[ann_name.trim(),ann_desc.trim()]);
        res.status(201).json({
            message: 'Announcement created',
            announcement: result.rows[0]
        });
    } catch (error){
        console.error(error.message);
        res.status(500).json({message:'Internal server error'});
    }
})

router.delete('/:ann_id', async (req,res) => {
    try {
        const { ann_id } = req.params;
        if (!ann_id || ann_id.length > 128) {
            return res.status(400).json({message:'A valid announcement ID is required'});
        }

        const result = await pool.query(
            'DELETE FROM announcments WHERE ann_id = $1 RETURNING ann_id',
            [ann_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({message:'Announcement not found'});
        }

        return res.status(200).json({
            message:'Announcement deleted',
            ann_id:result.rows[0].ann_id
        });
    } catch (error){
        console.error(error.message);
        res.status(500).json({message:'Internal server error'});
    }
});

module.exports = router;