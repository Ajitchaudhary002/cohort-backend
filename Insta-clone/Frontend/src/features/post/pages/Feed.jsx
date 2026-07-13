import Post from '../components/Post'
import '../style/feed.scss'
import { usePost } from '../hook/usePost'
import { useAuth } from '../../auth/hooks/useAuth'
import { useEffect } from 'react'
import Nav from '../../shared/components/Nav'
// import { useNavigate } from 'react-router'

const Feed = () => {

    const { feed, handleGetFeed, loading, handleLikePost, handleUnLikePost, handleSavePost, handleUnSavePost } = usePost()
    const { user } = useAuth()
    // const navigate = useNavigate()

    useEffect(() => {
        handleGetFeed();
        console.log(user)
    }, [])

    if (loading || !feed) {
        return (<main>
            <h1>Feed is loading...</h1>
        </main>)
    }


    return (
        <main className='feed-page'>
            <Nav />
            <div className="feed">
                <div className="posts">
                    {feed.map((post) => {
                        return <Post key={post._id} user={post.user} post={post} loading={loading}
                            handleLikePost={handleLikePost} handleUnLikePost={handleUnLikePost}
                            handleSavePost={handleSavePost} handleUnSavePost={handleUnSavePost}
                        />
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed
