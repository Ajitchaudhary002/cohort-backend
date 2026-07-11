import "../nav.scss"
import { useNavigate } from "react-router"

const Nav = () => {
    const navigate = useNavigate()

    return (
        <nav className='nav'>
            <button onClick={() => navigate('/create-post')}
                className='button primary'>
                new post
            </button>
            <h1>Instagram</h1>

            <div className="profile-nav"
                onClick={() => navigate('/profile')}>
                <img src="https://images.unsplash.com/photo-1783615693285-83b2017529b5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>

        </nav>
    )
}

export default Nav
