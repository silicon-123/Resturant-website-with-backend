const express=require('express')
const router=express.Router()
const user=require('../models/users')
const { body, validationResult } = require('express-validator');
router.post("/CreateUser",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
],async(req,res)=>{
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try{
         await user.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            password:req.body.password
            
            
        })
        res.json({success:true});
    }
    catch(error){
        console.log(error)
        res.json({success:false});
    }
})

router.post("/loginUser",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],async(req,res)=>{
    let email=req.body.email;
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try{
        let userdata=  await user.findOne({email});
        if(!userdata){
            return res.status(400).json({ success, errors:" Try Login with correct credentials" })
        }
        
        if(req.body.password !== userdata.password){
            return res.status(400).json({ success, errors:" Try Login with correct credentials" })
        }
        return res.json({success:true});
    }
    catch(error){
        console.log(error)
        res.json({success:false});
    }
})
module.exports=router;