
import { usePost } from "../../post/hook/usePost"
import { useAuth } from "../../auth/hooks/useAuth";
import "../styles/userinfo.scss"

const Posts = () => {

    const { feed } = usePost();
    const { user } = useAuth();
    console.log(feed)
    console.log(user)

    if (!user) {
        return <p>loading...</p>
    }

    if (!feed) {
        return <p>loading...</p>
    }

    return (
        <div className="post-container">
            {feed.map((post, idx) => {
                if (post.user._id == user.id) {
                    return <div key={idx}>
                        <img className="post"
                            src={post.imgUrl}
                            alt=""
                        />
                    </div>
                }
            })}
        </div>
    )
}

export default Posts
