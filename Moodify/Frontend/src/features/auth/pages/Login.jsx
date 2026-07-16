import { Link } from 'react-router'
import '../style/login.scss'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
    const navigate = useNavigate()

    const { loading, handleLogin } = useAuth()
    console.log(loading)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e) {    
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/')
    }

    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>

                    <input onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter Email"
                    />
                    <input onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="text"
                        placeholder="Enter Password"
                    />

                    <button className="button">Submit</button>
                </form>
                <p>Don't have an account ? <Link to='/register'>Register here</Link> </p>
            </div>
        </main>
    )
}

export default Login
