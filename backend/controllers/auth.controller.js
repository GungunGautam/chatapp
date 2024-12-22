import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async(req,res) =>{
    try{
        const{fullname,username,password,confirmpassword,gender} = req.body;
        if(password !== confirmpassword){
            return res.status(400).json({error: "Passwords dont match"});
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"Username already exists"});
        }

        //hash password here
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilepic: gender ==="male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
        //Generate jwt token
        
        
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                fullname:newUser.fullname,
                username: newUser.username,
                profilepic: newUser.profilepic
            });
        }else{
            res.status(400).json({error:"invalid user data"});
        }

    }catch(error){
        console.log("error in signup controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const login = (req,res) =>{
    console.log("login user");
}

export const logout = (req,res) =>{
    console.log("logout user");
}