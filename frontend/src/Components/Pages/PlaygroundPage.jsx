import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playground.css'
import ImageGallery from "react-image-gallery";

import { Map } from '../Common/Map'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddImage } from '../Common/AddImage'
import { InfoCard } from '../Common/InfoCard';

export const PlaygroundPage = () => {

    const id = useParams();
    const [photos, setPhotos] = useState([]);
    const [playgroundInfo, setPlaygroundInfo] = useState({})
    const [imagesForGallery, setImagesForGallery] = ([]);

    const fetchPlayground = async () => {
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/${id}`).then(response => response.json).then(data => setPlaygroundInfo(data));  
        playgroundInfo.image_links.forEach(image => {
            setImagesForGallery(...imagesForGallery, {original: image}) 
        });
    }

    useEffect(() => {
        fetchPlayground()
            window.scrollTo(0, 0)
    }, [])

    const onChangeImage = (event) => {
        for(let i = 0; i < event.target.files.length; ++i) {
            setPhotos([...photos, event.target.files[i]]);
        }
    }

    return(
        <div className="page">
            <div className="picture-slider">
                <ImageGallery items={imagesForGallery}/>
            </div>

            <div className="playground-content">
                <AddImage onChangeImage={onChangeImage}/>
                <InfoCard />
                <div id="map" style={{marginBottom: "20px"}}>
                        <Map currentCoordinates={playgroundInfo.coordinates} onCoordinatesChange={() => {}}/>
                </div>
            </div>
        </div>
    )
}