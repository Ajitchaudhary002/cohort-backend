import { useState } from "react"
import { getSaved } from "../services/profile.api"
import { useEffect } from "react"
import '../styles/userinfo.scss'

const Saved = () => {

    const [saved, setSaved] = useState([])

    useEffect(() => {
        const fetchSaved = async () => {
            const data = await getSaved();
            setSaved(data.savedPosts);
        };

        fetchSaved();
    }, [])

    return (
        <div className="saved-posts-container">
            {
                saved.map((postData, idx) => {
                  return <div key={idx} className="saved-post">
                        <img src={postData.post.imgUrl} alt="" />
                    </div>
                })
            }
        </div>
    )
}

export default Saved
