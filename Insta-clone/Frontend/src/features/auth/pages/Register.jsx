import { Link } from "react-router"
import '../style/form.scss'
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { handleRegister } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault();

        handleRegister(username, email, password)
            .then(res => {
                console.log(res)
            })
    }

    return (
        <div>
            <main>
                <div className="form-container">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input onInput={(e) => { setUsername(e.target.value) }}
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                        />

                        <input onInput={(e) => { setEmail(e.target.value) }}
                            type="text"
                            name="email"
                            placeholder="Enter Email"
                        />

                        <input onInput={(e) => { setPassword(e.target.value) }}
                            type="password"
                            name="password"
                            placeholder="Create Password"
                        />

                        <button type="submit">Register</button>
                    </form>
                    <p>
                        Already have account?
                        <Link className="toggleAuthForm" to='/login'>
                            login
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default Register
