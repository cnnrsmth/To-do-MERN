/* controller file to manage the logic for routes relating to user authentication*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schemas = require('../models/schemas');
const mongoose = require('mongoose')

//register user. hash the password for db storage (security& privacy)
async function register(req, res) {
  try {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const register = await new Schemas.Registrations({
      email: req.body.email,
      password: hash,
    }).save();
    res.send({ message: 'User registered' });
  } catch (error) {
    console.log(error);
    res.send({ message: 'User not registered', error });
  }
}

//login user. create jwt, and send jwt to front end, for storage in local storage
async function login(req, res) {
    try {
        const { email , password } = req.body
        const user = await Schemas.Registrations.findOne({ email : email })
        if (!user) return res.status(400).send({ message: "User not found" });
        const dbPassword = user.password
        const match = await bcrypt.compare(password, dbPassword)
        if (!match) return res.status(400).send({ message: "Password is incorrect" });
        const accessToken = jwt.sign({ user }, "secretkey");
        res.send({ accessToken })
    } catch (error){
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = { register, login };