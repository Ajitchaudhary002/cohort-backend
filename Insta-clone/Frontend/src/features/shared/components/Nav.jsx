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
            <h1>Insta</h1>
            <h1
                onClick={() => navigate('/profile')}>
                profile
            </h1>
        </nav>
    )
}

export default Nav
