import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playground.css'
import ImageGallery from "react-image-gallery";

import { Map } from '../Common/Map'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddImage } from '../Common/AddImage'
import { InfoCard } from '../Common/InfoCard';
import { Rating } from '../Common/Rating';

export const PlaygroundPage = () => {

    const {id} = useParams();
    const [photos, setPhotos] = useState([]);
    const [playgroundInfo, setPlaygroundInfo] = useState({})
    const [imagesForGallery, setImagesForGallery] = ([]);

    const fetchPlayground = async () => {
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/${id}`).then(response => response.json()).then(data => setPlaygroundInfo(data)); 
        if(playgroundInfo.image_links) {
            playgroundInfo.image_links.forEach(image => {
                setImagesForGallery(...imagesForGallery, {original: image}) 
                console.log(imagesForGallery);
            });
        }
        
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
                {imagesForGallery && <ImageGallery items={imagesForGallery}/>}
            </div>

            <div className="playground-content">
                <AddImage onChangeImage={onChangeImage}/>
                <InfoCard ageGroup={playgroundInfo.age_group} name={playgroundInfo.name} toys={playgroundInfo.toys} facilities={playgroundInfo.facilities} hasFence={playgroundInfo.hasFence} shadeType={playgroundInfo.shade_type} environment={playgroundInfo.environment}/>
                <div id="map" style={{marginBottom: "20px"}}>
                        <Map currentPlaygroundCords={playgroundInfo.coordinates} onCoordinatesChange={() => {}}/>
                </div>
                <div id="commentSectionWrapper">
                    <div id="commentSection">
                        <h1>Коментари</h1>
                        <div className="comment">
                            <p>danny</p>
                            <p className="commentContent">Страхотна площадка всеки ден водя приятелката ми, която е на 6 да си играе тук, Даниел - 24г.</p>
                        </div>
                        <label id="commentFieldLabel" for="comment">Оставете Рейтинг и Коментар: </label>
                        <Rating />
                        <input id="commentField" type='textarea' name="comment"/>
                        <button id="commentButton" type='submit'>Коментирай</button>
                    </div>
                </div>
            </div>
        </div>
    )
}