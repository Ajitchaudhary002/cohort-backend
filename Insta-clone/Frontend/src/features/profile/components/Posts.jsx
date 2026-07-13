
import { usePost } from "../../post/hook/usePost"
import { useAuth } from "../../auth/hooks/useAuth";
import "../styles/userinfo.scss"

const Posts = () => {

    const { feed } = usePost();
    const { user } = useAuth();

    if (!user) {
        return <p>loading...</p>
    }

    if (!feed) {
        return <p>loading...</p>
    }

    return (
        <div className="saved-posts-container">
            {feed.map((post, idx) => {
                if (post.user._id === user.id) {
                    return (
                        <div key={idx} className="saved-post">
                            <img src={post.imgUrl} alt="" />
                        </div>
                    )
                }
                return null
            })}
        </div>
    )
}

export default Posts
