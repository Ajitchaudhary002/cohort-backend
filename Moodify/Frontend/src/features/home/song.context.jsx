import { createContext, useState } from "react";

 const SongContext = createContext();
 export {SongContext}

export const SongContextProvider = ({ children }) => {
    
    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/Lordaizen02/cohort-2/moodify/songs/Heartbreak_Disco_iZqJJEAzc.mp3",
        "posterUrl": "https://ik.imagekit.io/Lordaizen02/cohort/moodify/posters/Heartbreak_Disco_X9tXlgG4F.jpeg",
        "title": "Heartbreak Disco",
        "mood": "happy",
    })

    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
            {children}
        </SongContext.Provider>
    )
}