// setting express
const express  = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs');

// use Model
const { Member ,
        Product ,
        Order,
        saveData
      } = require('../models/connect')

// use UUID
const { v4: generateUuid } = require('uuid');

//------------------------------- Login Register Logout -------------------------------

function isLogin(req,res,next){
    const user = req.session.user
    if(user){
        if(user.Role === 'User'){
            return res.json({ message : 'Role : User'});
        }else{
            return res.json({ message : 'Role : Admin'});
        }
    }else{
        return next()
    }
}

router.get('/register', isLogin, async (req,res) => {
    try{
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/register',async (req,res) =>{
    try{
        const { Role, Username, Email, FirstName, LastName, Sex, Phone, Password } = req.body;
        const normalizedEmail = Email.toLowerCase();
        const normalizedUsername = Username.toLowerCase();
        const UUID = generateUuid();
        const hashPassword = await bcrypt.hash(Password, 10);

        const existingMember = await Member.findOne({
            $or: [
                { Email: normalizedEmail },
                { Username: normalizedUsername }
            ]
        });

        if (existingMember) {
            return res.status(400).json({ 
                message: existingMember.Email === normalizedEmail
                    ? "Email already exists!!"
                    : "Username already exists!!"
            });
        }else{
            const data = new Member({
                Role,Username,
                Email: normalizedEmail,
                FirstName,LastName,Sex,Phone,
                Password: hashPassword,
                CartUser: UUID
            });
            const register = await saveData(data)
            if(register){
                return res.status(200).json({ message: 'Register success' });
            }else{
                return res.status(400).json({ message: 'Register Failed' });
            }
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.get('/login', isLogin, async (req,res) => {
    try{
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/login',async (req,res) => {
    try{
        const { Username , Password } = req.body
        if(!Username){ return res.status(400).json({ message : 'Username is required!!' }) }
        if(!Password){ return res.status(400).json({ message : 'Password is required!!' }) }
        const normalizedUsername = Username.toLowerCase();
        const existingMember = await Member.findOne({
            $or: [
                { Email: normalizedUsername },
                { Username: normalizedUsername }
            ]
        });
        if(existingMember){
            const passwordHash = existingMember.Password;
            const checkPassword = await bcrypt.compare(Password,passwordHash)
            if(checkPassword){
                req.session.user = {
                    Role : existingMember.Role,
                    Username : existingMember.Username,
                    Login : true,
                }
                return res.status(200).json({message : 'Login Successfully!!'})
            }else{
                return res.status(400).json({message : 'Invalid password!!'})
            }
        }else{
            return res.status(400).json({message : 'Username Or Email not found!!'})
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/logout', async (req, res) => {
    try{
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Error occurred while logging out");
            }
            return res.status(200).send("Logged out successfully");
        });
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.get('/navbar', async (req, res) => {
    try{
        const user = req.session
        res.status(200).json(user)
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})


//------------------------------------------------------ Admin ------------------------------------------------------

//------------------------------------------------------ User ------------------------------------------------------
router.get('/', async (req, res) => {
    try{
        
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

module.exports = router