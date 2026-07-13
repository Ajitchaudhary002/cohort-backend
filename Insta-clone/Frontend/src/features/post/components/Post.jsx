
const Post = ({ user, post, handleLikePost, handleUnLikePost, handleSavePost, handleUnSavePost }) => {

    return (
        <div className="post">

            <div className="user">
                <div className="image-wrapper">
                    <img src={user.profileImage} alt="" />
                </div>
                <p>{user.username}</p>
            </div>

            <img className="post-image" src={post.imgUrl} alt="" />

            <div className="icons">
                <div className="left">
                    <button onClick={() => post.isLiked ? handleUnLikePost(post._id) : handleLikePost(post._id)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={post.isLiked ? '#ff0000' : 'none'}
                            stroke={post.isLiked ? '#ff0000' : '#ffffff'}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ color: post.isLiked ? '#ff0000' : '#ffffff' }}>
                            <path d="M12 20.5s-7.2-4.7-7.2-10.6A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 7.2 3.7c0 5.9-7.2 10.6-7.2 10.6Z"></path>
                        </svg>
                    </button>

                    <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z"></path></svg></button>
                    <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z"></path></svg></button>
                </div>

                <div className="right">
                    <button>
                        <svg
                            className={post.isSaved ? 'save' : ''}
                            onClick={() => post.isSaved ? handleUnSavePost(post._id) : handleSavePost(post._id)}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill={post.isSaved ? '#ffffff' : 'none'}
                            stroke={post.isSaved ? '#ffffff' : '#ffffff'}
                            strokeWidth={post.isSaved ? '0' : '1.8'}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ color: '#ffffff' }}>
                            <path d="M6 4.25a1.75 1.75 0 0 1 1.75-1.75h8.5A1.75 1.75 0 0 1 18 4.25v15.2l-6-3.8-6 3.8V4.25Z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="bottom">
                <p>{post.caption}</p>
            </div>


        </div >
    )
}

export default Post
