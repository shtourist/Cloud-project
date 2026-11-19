const pool = require('../config/database')

exports.signup = async (req,res) => {
    try {
        const {name,admin,pass} = req.body;
        const query = `INSERT INTO users (name,admin,password) VALUES ($1,$2,$3) RETURNING *`;
        const values = [name,admin,pass]
        const result = await pool.query(query,values)
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({message:error})
    }
};
exports.login = async (req,res) =>{
    try {
        const {name,pass} = req.body;
        const values = [name]
        const query = `SELECT name,password FROM users  WHERE name=$1 `;
        const result = await pool.query(query,values)
        if (result.rows.length === 0) {
            return res.status(401).json({message:'user not found'});
        }
        const correctpass = result.rows[0].password; 
        if (pass==correctpass){
            return res.status(200).json({message:"login succesful"});
        }
        return res.status(200).json({message:"incorrect pass"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}