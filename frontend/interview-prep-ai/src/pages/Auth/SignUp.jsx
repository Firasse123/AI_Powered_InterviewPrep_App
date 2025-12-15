import React from 'react'
import {useState} from "react"
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import {LuSparkles} from "react-icons/lu"
import { validateEmail } from '../../utils/helper';

const SignUp = ({setCurrentPage}) => {
  const [profilePic,setProfilePic]=useState(null);
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const [error,setError]=useState(null);
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    let profileImageUrl="";

    if(!fullName){
      setError("Please enter your full name.");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please create a password.");
      return;
    }
    setError("");

    //Sign Up API Call
    try{

    }
    catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("An unexpected error occurred. Please try again later.");
      }
    }

  }
  return (
    <div className="w-[90vw] md:w-[550px] p-8 md:p-10 flex flex-col justify-center bg-white rounded-2xl shadow-xl">
      {/* Header with icon */}
      <div className='flex items-center justify-center mb-6'>
        <div className='flex items-center gap-2 text-xs bg-amber-100 text-amber-600 font-semibold px-3 py-1.5 rounded-full border border-amber-300'>
          <LuSparkles className="text-sm"/>
          AI-Powered Platform
        </div>
      </div>

      <h3 className="text-2xl font-bold text-black text-center mb-2">Join Us Today</h3>
      <p className='text-sm text-slate-500 text-center mb-6'>
        Create your account and start your learning journey
      </p>

      <form onSubmit={handleSubmit}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
        
        <div className="space-y-1">
          <Input 
            value={fullName} 
            onChange={(e)=>setFullName(e.target.value)} 
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
          />

          <Input 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
          />

          <Input 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            label="Password"
            placeholder="Create a secure password"
            type="password"
          />
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-3 mt-4 mb-4'>
            <p className='text-red-600 text-sm'>{error}</p>
          </div>
        )}

        <button type='submit' className='btn-primary mt-2'>
          CREATE ACCOUNT
        </button>

        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-200'></div>
          </div>
          <div className='relative flex justify-center text-xs'>
            <span className='px-3 bg-white text-slate-500'>Already have an account?</span>
          </div>
        </div>

        <div className='text-center'>
          <button
            type="button"
            className='font-semibold text-primary hover:text-amber-600 transition-colors text-sm'
            onClick={()=>setCurrentPage("login")}
          >
            Sign in instead →
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUp