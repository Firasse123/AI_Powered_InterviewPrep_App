import React from 'react'
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import Input from '../../components/Inputs/Input'
import {validateEmail} from "../../utils/helper"
import {LuSparkles} from "react-icons/lu"

const Login = ({setCurrentPage}) => {
  const [email,setEmail] = useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const navigate = useNavigate();

  //Handle Login Form Sumbit
  const handleLogin=async(e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }
    if(!password){
      setError("Please enter your password.");
      return;
    }

    setError("");

    //Login API Call
    try{
      // TODO: Add your login API call here
      console.log("Login attempt with:", email);
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
    <div className='w-[90vw] md:w-[550px] p-8 md:p-10 flex flex-col justify-center bg-white rounded-2xl shadow-xl'>
      {/* Header with icon */}
      <div className='flex items-center justify-center mb-6'>
        <div className='flex items-center gap-2 text-xs bg-amber-100 text-amber-600 font-semibold px-3 py-1.5 rounded-full border border-amber-300'>
          <LuSparkles className="text-sm"/>
          AI-Powered Platform
        </div>
      </div>

      <h3 className="text-2xl font-bold text-black text-center mb-2">Welcome Back!</h3>
      <p className="text-sm text-slate-500 text-center mb-8">
        Please enter your details to continue learning
      </p>

      <form onSubmit={handleLogin} className='space-y-1'>
        <Input 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          label="Email Address" 
          placeholder="Enter your email address" 
          type="email"
        />
        
        <Input 
          value={password} 
          onChange={(target)=>setPassword(target.value)}
          label="Password" 
          placeholder="Enter your password" 
          type="password"
        />

        <div className='flex justify-end mb-4'>
          <button 
            type="button"
            className='text-xs text-primary hover:text-amber-600 font-medium transition-colors'
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-3 mb-4'>
            <p className='text-red-600 text-sm'>{error}</p>
          </div>
        )}

        <button type='submit' className='btn-primary mt-2'>
          LOGIN
        </button>

        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-200'></div>
          </div>
          <div className='relative flex justify-center text-xs'>
            <span className='px-3 bg-white text-slate-500'>New to our platform?</span>
          </div>
        </div>

        <div className='text-center'>
          <button
            type="button"
            className='font-semibold text-primary hover:text-amber-600 transition-colors text-sm'
            onClick={()=>{setCurrentPage("signup")}}
          >
            Create an account →
          </button>
        </div>
      </form>
    </div>
    
  )
}

export default Login
