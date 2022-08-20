import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavButtons from './NavButtons'

function AlbumView() {
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])

    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    return (
        console.log(albumData),
        <div>
            {albumData.length > 0 ? <h2>{albumData[0].collectionName}</h2> : <h2>Loading . . .</h2>}
            <NavButtons isAlbum={true} />
            {renderSongs}
        </div>
    )
}

export default AlbumView