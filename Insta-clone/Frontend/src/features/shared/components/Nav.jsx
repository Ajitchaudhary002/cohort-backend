import "../nav.scss"
import {useNavigate} from "react-router"

const Nav = () => {
    const navigate = useNavigate()

    return (
        <nav className='nav'>
            <h1>Insta</h1>
            <button onClick={()=> navigate('/create-post')}
                className='button primary'>
                new post
            </button>
        </nav>
    )
}

export default Nav
