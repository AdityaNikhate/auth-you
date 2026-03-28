import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {backendUrl, setUserData, setIsLoggedIn, getUserData, userData} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
  console.log("Updated userData:", userData);
}, [userData]);

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true)
    try {
      console.log(backendUrl)
      if(isCreateAccount){
        // register API
        const response = await axios.post(`${backendUrl}/register`, {name, email, password})
        if(response.status === 201){
          navigate("/")
          setUserData(true)
          toast.success("User Created")
        }
      }else{
        // login API
        const response = await axios.post(`${backendUrl}/login`,{email, password})
        if(response.status === 200){
          console.log(response)
          navigate("/")
          setUserData(true)
          await getUserData()
          console.log("Data Got",userData)
          toast.success("User logedin")
          setIsLoggedIn(true)
        }else{
          toast.error("Login failed")
        }
      }
    } catch (error) {
      toast.error("Fail submitting information.")
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
      style={{background:"linear-gradient(90deg, #6a5af9, #8268f9)", border:"none"}}
    >
        <div style={{position:"absolute", top:"20px", left:"30px", display:"flex",alignItems:"center"}}>
          <Link to="/" style={{
            display:"flex",
            gap:"5",
            alignItems:"center",
            fontWeight: 500,
            fontSize: "24px",
            textDecoration:"none"
          }}>
            <img src={assets.logo} alt="logo" width={82} height={30} />
            {/* <span className='fw-bold fs-4 text-light'>Auth-You</span> */}
          </Link>
        </div>

        <div className="card p-4" style={{maxWidth:"400px", width:"100%"}}>
          <h2 className='text-center mb-4'>
            {isCreateAccount?"Create Account":"Login"}
          </h2>

           <form onSubmit={onSubmitHandler}>
            {
              isCreateAccount && (
                <div className="mb-3">
                  <label htmlFor="fullName" className='form-label'>Full Name</label>
                  <input type="text" id='fullName' className='form-control' placeholder='Enter fullname' required onChange={(e)=> setName(e.target.value)} value={name}/>
                </div>
              )
            }
            <div className="mb-3">
              <label htmlFor="email" className='form-label'>Email Id</label>
              <input type="text" id='email' className='form-control' placeholder='Enter email' required onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className='form-label'>Password</label>
              <input type="password" id='password' className='form-control' placeholder='*******' required onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <Link to={"/reset-password"} className="text-decoration-name">
                Forgot password?
              </Link>
            </div>

            <button type='submit' className="btn btn-primary w-100" disabled={loading}>
              {loading?"Loading...":isCreateAccount?"Sign Up":"Login"}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="mb-0">
              {
                isCreateAccount?
                (<>
                Already have an account? 
                <span className="text-decoration-underline link-offset-1" style={{cursor:"pointer"}} onClick={()=>setIsCreateAccount(false)}>
                Login here
                </span>
                </>):
                (
                  <>
                  Don't have an account?
                  <span className="text-decoration-underline link-offset-1" style={{cursor:"pointer"}} onClick={()=>setIsCreateAccount(true)}>
                  Create account here
                  </span>
                  </>
                )
              }
            </p>
          </div>
        </div>
    </div>
  )
}

export default Login
