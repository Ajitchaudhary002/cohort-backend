import Post from '../components/Post'
import '../style/feed.scss'
import { usePost } from '../hook/usePost'
import { useEffect } from 'react'

const Feed = () => {

    const { feed, handleGetFeed, loading } = usePost()

    useEffect(() => {
        handleGetFeed();
    }, [])


    if (loading || !feed) {
        return (<main>
            <h1>Feed is loading...</h1>
        </main>)
    }

    return (
        <main className='feed-page'>
            <div className="feed">
                <div className="posts">
                    {feed.map((post, index) => {
                        return <Post  key={index}
                         user={post.user} post={post} loading={loading} />
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed
