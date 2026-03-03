import React from 'react'
import { assets } from '../assets'
import { useNavigate } from 'react-router-dom'

const Menubar = () => {
  const navigate = useNavigate();
  return (
    <nav className='navbar bg-white px-5 py-4 d-flex justify-context-between align-items-center'>
      <div className='d-flex align-items-center gap-2 '>
        <img src={assets.logo} alt="logo" width={82} height={30} />
        {/* <span className='fw-bold fs-4 text-dark'>Auth-You</span> */}
      </div>

      <div className="btn btn-outline-dark rounded-pill px-3" onClick={()=>navigate('/login')}>
        Login <i className="bi bi-arrow-right ms-2">
          
        </i>
      </div>
    </nav>
  )
}

export default Menubar
