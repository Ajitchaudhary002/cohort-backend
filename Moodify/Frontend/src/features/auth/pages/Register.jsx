import { Link } from 'react-router'
import '../style/register.scss'

import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router'



const Register = () => {

  const navigate = useNavigate()

  const { loading, handleRegister } = useAuth()
  console.log(loading)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate('/')
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

          <input onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder='Enter Username'
          />
          <input onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
          />
          <input onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Enter Password"
          />
          <button className="button">Submit</button>
        </form>
        <p>Already have an account ? <Link to='/Login'>Login here</Link> </p>
      </div>
    </main>
  )
}

export default Register
