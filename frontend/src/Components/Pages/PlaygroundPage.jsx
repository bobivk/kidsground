import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playground.css'
import ImageGallery from "react-image-gallery";

import { Map } from '../Common/Map'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddImage } from '../Common/AddImage'
import { InfoCard } from '../Common/InfoCard';
import { Rating } from '../Common/Rating';
import Cookies from 'js-cookie';

export const PlaygroundPage = () => {

    const {id} = useParams();
    const [photos, setPhotos] = useState([]);
    const [playgroundInfo, setPlaygroundInfo] = useState({});
    const [imagesForGallery, setImagesForGallery] = useState([]);
    const [confirmation, setConfirmation] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const fetchPlayground = async () => {
       
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/${id}`).then(response => response.json()).then((data) => {
            setPlaygroundInfo(data);
            if(data.image_links.length !== 0) {
                const newImages = data.image_links.map(image => ({original: image}));
                setImagesForGallery(prevImages => [...prevImages, ...newImages]);
            }
        });

        await fetch(`https://kidsground.bg:8009/v1/comments`).then(response => response.json()).then((data) => {
            setComments(data);
        })
        
    }

    useEffect(() => {
        fetchPlayground()
        window.scrollTo(0, 0)
    }, [])

    const onChangeImage = (event) => {
        event.preventDefault();
        setConfirmation(true);
        setPhotos(event.target.files)
    }

    const handleRatingChange = (stars) => {
        setRating(stars)
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        await fetch (`https://kidsground.bg:8009/v1/comments/add`, {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get("user")}`
            },
            body: {comment, rating}
        })
    }

    const sendImages = async () => {

        const imagePayload = new FormData();

        if(photos) {
            Array.from(photos).forEach((photo) => {
                imagePayload.append("file", photo);
            })
            
        }
       
        if(imagePayload.entries()) {
            await fetch (`https://kidsground.bg:8009/v1/playgrounds/${id}/uploadImages`, {
                method:'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get("user")}`
                },
                body: imagePayload
            })
        }
        window.location.reload();
    }

    const noButtonEvent = () => {
        setConfirmation(false)
        setPhotos([])
    }

    return(
        <div className="page">
            <div className="picture-slider">
                {imagesForGallery && <ImageGallery items={imagesForGallery}/>}
            </div>

            <div className="playground-content">
                <AddImage onChangeImage={onChangeImage} confirmation={confirmation} sendPhotos={sendImages} noButtonEvent={noButtonEvent}/>
                <InfoCard description={playgroundInfo.description} floorType = {playgroundInfo.floor_type} ageGroup={playgroundInfo.age_group} transport={playgroundInfo.transport} name={playgroundInfo.name} toys={playgroundInfo.toys} facilities={playgroundInfo.facilities} hasFence={playgroundInfo.hasFence} shadeType={playgroundInfo.shade_type} environment={playgroundInfo.environment} />
                <div id="map" style={{marginBottom: "20px"}}>
                        <Map currentPlaygroundCords={playgroundInfo.coordinates} onCoordinatesChange={() => {}}/>
                </div>
                <div id="commentSectionWrapper">
                    <div id="commentSection">
                        <h1>Коментари</h1>
                        {/* {comments && comments.map((comment) => {
                            <div className="comment">
                            <p>danny</p>
                            <p className="commentContent">Страхотна площадка всеки ден водя приятелката ми, която е на 6 да си играе тук, Даниел - 24г.</p>
                            </div>
                        })} */}
                        <label id="commentFieldLabel" for="comment">Оставете Рейтинг и Коментар: </label>
                        <Rating changeRating={handleRatingChange} />
                        <input id="commentField" type='textarea' onChange={handleCommentChange} name="comment"/>
                        <button id="commentButton" onClick={handleCommentSubmit} type='submit'>Коментирай</button>
                    </div>
                </div>
            </div>
        </div>
    )
}