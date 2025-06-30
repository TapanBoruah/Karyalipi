import React, { useState } from 'react'
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axiosUtils from "../lib/axios";

const RegisterPage = () => {
  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[fullname,setFullname]=useState("");

  const navigate=useNavigate;

  const handleSubmit=async(e)=>{
    if(!username.trim() || !fullname.trim() || !email.trim() || !password.trim()){
        e.preventDefault();

        toast.error("All fields are required");
    }

    try {
        await axiosUtils.post("/register",
            {
                username,
                fullname,
                email,
                password
            }
        );

        toast.success("Registered Successfully")
        navigate("/");

    } catch (error) {
        if(error.response.status===429){
            toast.error("Too many attempts")
        }else{
            toast.error("Something went wrong.. Try again after some time")
        }
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto py-5 px-4">
        <div className="max-w-xl mx-auto">
          <div className="card bg-bse-100">
                    <div className="card-body">
                        <h2 className="card-text text-center text-4xl mb-4">
                            Register 
                        </h2>
                        <form onSubmit={handleSubmit}>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">
                                        Full Name
                                    </span>
                                </label>
                                <input type="text"
                                    placeholder="Enter your Fullname"
                                    className="input input-bordered"
                                    value={fullname}
                                    onChange={(e)=>setFullname(e.target.value)}
                                    />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">
                                        Username
                                    </span>
                                </label>
                                <input type="text"
                                    placeholder="Enter Username"
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
                                    placeholder="Enter Your Email Id"
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
                                    placeholder="Set a Password"
                                    className="input input-bordered"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div> 
                            <div>
                              <p>Already registered?</p>
                            </div>
                            <div className="card-actions justify-between">
                                <Link to={"/login"}>
                                <button className="btn btn-primary">Back</button>
                                </Link>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div> 
                             
                        </form>
                    </div>
                </div>
        </div>

      </div>
    </div>
  )
}

export default RegisterPage
