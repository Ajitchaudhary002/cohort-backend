import { getFeed, createPost, likePost, unLikePost, savePost, unSavePost } from '../services/post.api'
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {

    const context = useContext(PostContext);

    const { loading, setLoading, post, feed, setFeed } = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts.reverse())
        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)

        const data = await createPost(imageFile, caption)
        setFeed([data.post, ...feed])

        setLoading(false)

    }

    const handleLikePost = async (postId) => {
        await likePost(postId)
        await handleGetFeed()
    }
    const handleUnLikePost = async (postId) => {
        await unLikePost(postId)
        await handleGetFeed()

    }

    const handleSavePost = async (postId) => {
        await savePost(postId)
        await handleGetFeed()
    }

    const handleUnSavePost = async (postId) => {
        await unSavePost(postId)
        await handleGetFeed()
    }

    useEffect(() => {
        handleGetFeed()
    }, [])


    return { loading, post, feed, handleGetFeed, handleCreatePost, handleLikePost, handleUnLikePost, handleSavePost, handleUnSavePost }
}

