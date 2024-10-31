import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playground.css'
import ImageGallery from "react-image-gallery";

import { Map } from '../Common/Map'
import { useEffect, useState } from 'react'
import { AddImage } from '../Common/AddImage'
import { InfoCard } from '../Common/InfoCard';
import { Rating } from '../Common/Rating';
import Cookies from 'js-cookie';
import { ReactComponent as Pencil } from "../../static/icons/pencil.svg"
import { Link, useParams } from 'react-router-dom';

export const PlaygroundPage = () => {

    const { id } = useParams();
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
            if (data.image_links.length !== 0) {
                const newImages = data.image_links.map(image => ({ original: image }));
                setImagesForGallery(prevImages => [...prevImages, ...newImages]);
            }
        });

        await fetch(`https://kidsground.bg:8009/v1/comments/playground/${id}`).then(response => response.json()).then((data) => {
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
        await fetch(`https://kidsground.bg:8009/v1/comments/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get("user")}`
            },
            body: JSON.stringify({ text: comment, rating, playground_id: id })
        })
        window.location.reload();
    }

    const sendImages = async () => {

        const imagePayload = new FormData();

        if (photos) {
            Array.from(photos).forEach((photo) => {
                imagePayload.append("file", photo);
            })

        }

        if (imagePayload.entries()) {
            await fetch(`https://kidsground.bg:8009/v1/playgrounds/${id}/uploadImages`, {
                method: 'POST',
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
    if (playgroundInfo.is_new && (Cookies.get("username") !== playgroundInfo.username && Cookies.get("role") !== "ADMIN")) {
        return (<div className="page"><p>Тази площадка все още очаква одобрение</p></div>)
    } else {
        return (
            <div className="page">
                <div className="picture-slider">
                    {imagesForGallery && <ImageGallery items={imagesForGallery} />}
                </div>

                <div className="playground-content">
                    <AddImage onChangeImage={onChangeImage} confirmation={confirmation} sendPhotos={sendImages} noButtonEvent={noButtonEvent} />
                    <Link to={`/edit/${id}`} id="edit-playground">
                        <Pencil className="icon" />
                        <p>Промяна на информация</p>
                    </Link>
                    <InfoCard rating={playgroundInfo.rating} description={playgroundInfo.description} floorType={playgroundInfo.floor_type} ageGroups={playgroundInfo.age_groups} transport={playgroundInfo.transport} name={playgroundInfo.name} toys={playgroundInfo.toys} facilities={playgroundInfo.facilities} hasFence={playgroundInfo.hasFence} shadeType={playgroundInfo.shade_type} environment={playgroundInfo.environment} />
                    <div id="map" style={{ marginBottom: "20px" }}>
                        <Map currentPlaygroundCords={playgroundInfo.coordinates} onCoordinatesChange={() => { }} />
                    </div>
                    <div id="commentSectionWrapper">
                        <div id="commentSection">
                            <h1>Коментари</h1>
                            {comments && comments.map((comment) => (
                                <div className="comment">
                                    <div className='name-rating'>
                                        <p>{comment.username}</p>
                                        <p className="rating">{comment.rating} <svg
                                            className="star"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            width="25"
                                            height="25"
                                            style={{
                                                color: '#ffc107',
                                            }}><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.787 1.615 8.162-7.551-4.008L4.449 23.255 6.064 15.093 0 9.305l8.332-1.15z" /></svg></p>
                                    </div>
                                    {comment.text !== null && <p className="commentContent">{comment.text}</p>}
                                </div>
                            ))}
                            <label id="commentFieldLabel" for="comment">Оставете Рейтинг и Коментар: </label>
                            <Rating changeRating={handleRatingChange} />
                            <input id="commentField" type='textarea' onChange={handleCommentChange} name="comment" />
                            <button id="commentButton" disabled={rating === 0} onClick={handleCommentSubmit} type='submit'>Коментирай</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}