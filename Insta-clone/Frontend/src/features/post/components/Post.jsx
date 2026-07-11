
const Post = ({ user, post, handleLikePost, handleUnLikePost, handleSavePost, handleUnSavePost }) => {

    return (
        <div className="post">

            <div className="user">
                <div className="image-wrapper">
                    <img src={user.profileImage} alt="" />
                </div>
                <p>{user.username}</p>
            </div>

            <img src={post.imgUrl} alt="" />

            <div className="icons">
                <div className="left">
                    <button><svg
                        className={post.isLiked ? 'liked' : ''}
                        onClick={() => post.isLiked ? handleUnLikePost(post._id) : handleLikePost(post._id)}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={post.isLiked ? '#ff0000' : 'none'} stroke={post.isLiked ? '#ff0000' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: post.isLiked ? '#ff0000' : '#f5f5f5' }}><path d="M12 20.5s-7.2-4.7-7.2-10.6A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 7.2 3.7c0 5.9-7.2 10.6-7.2 10.6Z"></path></svg></button>

                    <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6.5a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 19 6.5v8.5a2.5 2.5 0 0 1-4.1 1.9L12 14.2l-2.9 2.7A2.5 2.5 0 0 1 5 15v-8.5Z"></path></svg></button>
                    <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5.5 16 8.5l-6.5 3"></path><path d="M16 8.5H8"></path><path d="M7 15.5a2.5 2.5 0 0 0 2.5 2.5h5A2.5 2.5 0 0 0 17 15.5v-4"></path></svg></button>
                </div>

                <div className="right">
                    <button>
                        <svg
                            className={post.isSaved ? 'save' : ''}
                            onClick={() => post.isSaved ? handleUnSavePost(post._id) : handleSavePost(post._id)}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={post.isSaved ? '#ffffff' : 'none'} stroke={post.isSaved ? '#ffff' : '#ffffff'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: post.isSaved ? '#ffffff' : '#ffffff' }}><path d="M6 4.25a1.75 1.75 0 0 1 1.75-1.75h8.5A1.75 1.75 0 0 1 18 4.25v15.2l-6-3.8-6 3.8V4.25Z"></path></svg></button>
                </div>
            </div>

            <div className="bottom">
                <p>{post.caption}</p>
            </div>


        </div>
    )
}

export default Post
