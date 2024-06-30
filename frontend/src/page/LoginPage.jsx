import {useState, useContext} from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {

    const {submitLogin} = useContext(AuthContext)

  return (
    <div>
      <form action="" onSubmit={submitLogin}>
        <div>
            <div>
                <label htmlFor="">Username</label>
                <input type="text" name='username' placeholder='Enter Your username' />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password" name='password' placeholder='Enter Your password' />
            </div>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
