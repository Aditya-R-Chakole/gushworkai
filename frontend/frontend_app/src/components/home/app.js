import React, { useState } from 'react'
import Registration from '../registration/app'
import Login from '../login/app'

import './style.css'

function Home(
    props
) {
  const [toggle, setToggle] = useState(0);
  return (
    <div className='homepage'>
        <div className='left'>
            <div className='top'>
                <>
                    <span className='title'>Recipe.AI</span>
                    <span className='discription'>Get Started</span>
                </>
            </div>
            <div className='bottom'>
              A Powerfull AI-Powered Process Builder Application....
            </div>
        </div>

        <div className='right'>
          <>
          {(toggle)?(
              <Login {...props} toggle={toggle} setToggle={setToggle} />
            ):(
              <Registration {...props} toggle={toggle} setToggle={setToggle} />
            )}
          </>
            
        </div>
    </div>
  )
}

export default Home