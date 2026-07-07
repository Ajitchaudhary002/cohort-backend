import { useState, useRef } from 'react'
import '../style/createpost.scss'
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {

    const [caption, setCaption] = useState('')
    const postImageInputFieldRef = useRef(null)

    const { loading, handleCreatePost } = usePost()

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        const file = postImageInputFieldRef.current.files[0]
        console.log(file)
        await handleCreatePost(file, caption)
        navigate("/")
    }

    if (loading) {
        return <main><h1>Loading...</h1></main>
    }

    return (
        <main className="create-post-page">
            <h1>Create post</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label className="post-image-label" htmlFor="postImage">select image</label>
                    <input ref={postImageInputFieldRef}
                        hidden
                        type="file"
                        name="postImage"
                        id="postImage"
                    />
                    <input onInput={(e) => setCaption(e.target.value)}
                        value={caption}
                        type="text"
                        name="caption"
                        id="caption"
                        placeholder="Enter caption"
                    />
                    <button type="submit"
                        className="button primary">create post</button>
                </form>
            </div>
        </main>
    )
}

export default CreatePost
