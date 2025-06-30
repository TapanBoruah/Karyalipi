import Note from "../model/note.js";
import { User } from "../model/user.js";


export async function generateAccessRefreshToken(id) {
    try {
        const user=await User.findById(id)
        const accessToken=User.generateAccessToken(user._id)
        const refreshToken=User.generateRefreshToken(user._id)

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
        
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

export async function registerUser(req,res){
    try {
        const{username,email,password,fullname}=req.body
        if(
            [username,email,password,fullname].some((fields)=>
            fields.trim()==="")
        ){
            return res.status(400).json({message:"All fields are required.."})
        }

        const existedUser=await User.findOne({
            $or:[{username},{email}]
        })

        if(existedUser){
            return res.status(400).json({message:"User exits already"})
        }

        const user=await User.create({
            username:username.toLowerCase(),
            fullname,
            email,
            password,
        })

        const createdUser=await User.findById(user._id).select("-password -refreshToken")

        if(!createdUser){
            return res.status(500).json({message:"Something went wrong"})
        }

        return(res.status(200).json({message:"User Registered Successfully"}));


    } catch (error) {
        return res.status(500).json({message:"Internal server error!"})
    }
}

export async function loginUser(req,res) {
    try {
        const{username,email,password}=req.body
        if([username,email,password].some((fields)=>fields.trim()==="")){
            return res.status(400).json({message:"All fields required"})
        }

        const user=await User.findOne({
            $or:[{email},{username}]
        })
        if(!user){
            return res.status(400).json({message:"User doesn't exist"})
        }

        const isPasswordCorrect=await user.isPasswordCorrect(password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Password Incorrect"})
        }

        const {refreshToken,accessToken}=await generateAccessRefreshToken(user._id)

        const loggedUser=await User.findById(user._id).select("-password -refreshToken")

        const options={
            httpOnly:true,
            secure:false
        }

        return res.status(200)
        .cookie("refreshToken",refreshToken,options)
        .cookie("accessToken",accessToken,options)
        .json({user:loggedUser,accessToken,refreshToken,message:"User Logged In Successfully"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}


export async function getAllNotes(req,res){
    try {
        const notes=await Note.find().sort({createdAt:-1}); //display newest first
        return res.status(200).json(notes)
        
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export async function getNoteById(req,res) {
    try {
        const noteById=await Note.findById(req.params.id);
        if(!noteById){
           return res.status(400).json({message:"No note find of given id"})
        }

        return res.status(200).json(noteById);

    } catch (error) {
       return res.status(500).json({message:"Internal Server Error"})
    }
}

 

export async function createNotes(req,res){
     try {
        const {title,content}=req.body;

        if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized" });
        }

        console.log(title,content)
        const note=new Note({
            title,
            content,
            user:req.user._id})

        const savedNote=await note.save()
        return res.status(200).json(savedNote);
        
     } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'});
     }
}

export async function updateNotes(req,res){
     try {
        const {title,content}=req.body
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true,})
        if(!updatedNote){
            return res.status(400).json({message:"No updated notes"});
        }

        return res.status(200).json(updatedNote)
     } catch (error) {
        return res.status(500).json({message:'Internal Server Error'});
     }
}

export async function deleteNotes(req,res){
     try {
        const deletedNote=await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(400).json({message:"No deleted notes"});
        

        return res.status(200).json(deletedNote);
     } catch (error) {
        return res.status(500).json({message:'Internal Server Error'});
     }
}