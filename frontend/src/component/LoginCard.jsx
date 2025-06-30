import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axiosUtils from '../lib/axios';

const LoginCard = ({setisLoggedIn}) => {

    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if(!username.trim() || !email.trim() || !password.trim()){
            toast.error("All fields are required")
            return;
        }

        try {
            await axiosUtils.post("/login",
                {
                    username,
                    email,
                    password
                }
            )
            toast.success("Logged In Succesfully")

            localStorage.setItem("isLoggedIn","true")
            setisLoggedIn(true);
            navigate("/")
        } catch (error) {
            if(error.response.status===429){
                toast.error("Too many attempts")
            }else{
                toast.error("Failed ...!!")
            }
        }
             
    }

  return (
        <div className="container mx-auto px-4 py-5">
            <div className="max-w-xl mx-auto">
                <div className="card bg-bse-100">
                    <div className="card-body">
                        <h2 className="card-text text-center text-3xl mb-4">
                            Log In
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">
                                        Username
                                    </span>
                                </label>
                                <input type="text"
                                    placeholder="Enter Your Username"
                                    className="input input-bordered"
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                    />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">
                                        Email
                                    </span>
                                </label>
                                <input type="text"
                                    placeholder="Enter your Email"
                                    className="input input-bordered"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">
                                        Password
                                    </span>
                                </label>
                                <input type="password"
                                    placeholder="Enter Your Password"
                                    className="input input-bordered"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div> 

                            <div className="card-actions">
                                <p className="text justify-start">New User? <Link to={"/register"} className="text-cyan-400 underline">Register here</Link></p>
                                <button type="submit" className="btn btn-primary">Log In</button>
                                 
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default LoginCard

