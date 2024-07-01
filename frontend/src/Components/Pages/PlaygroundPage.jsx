import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playground.css'
import { ReactComponent as ChildIcon } from '../../static/icons/child-solid.svg'
import { ReactComponent as BusIcon } from '../../static/icons/bus-solid.svg'
import { ReactComponent as FenceIcon } from '../../static/icons/fence.svg'
import { ReactComponent as TreeIcon } from '../../static/icons/tree-solid.svg'
import { ReactComponent as ParkIcon } from '../../static/icons/tree-city-solid.svg'
import { ReactComponent as ParkingIcon } from '../../static/icons/square-parking-solid.svg'
import { ReactComponent as BikeIcon } from '../../static/icons/person-biking-solid.svg'
import ImageGallery from "react-image-gallery";

import { Map } from '../Common/Map'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { AddImage } from '../Common/AddImage'

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
                <div id="info-card">
                    <div className="playground-text">
                        <h1>Площадка "Дъга"</h1>
                        <div id="age" className="card">
                            <span><ChildIcon className="icon"/> деца между 3 и 6 години.</span>
                        </div>
                        <div id="playgroundLocation" className="card">
                            <span><ParkIcon className="icon"/>В парк или градинка</span>
                        </div>
                        <div id="shade" className="card">
                            <span><TreeIcon className="icon"/>Естествена сянка от дървета</span>
                        </div>
                        <div id="transport" className="card">
                            <span className="card">Транспорт</span> <br/>
                            <span className="card"><BusIcon className="icon"/>Автобус 15</span>
                            <span className="card"><ParkingIcon className="icon"/>Свободно паркиране</span>
                            <span className="card"><BikeIcon className="icon"/>Велоалея</span>
                        </div>
                        <div id="fence" className="card">
                            <span><FenceIcon id="fence-icon" className="icon" height="2.5vh" width = "2.5vw"/>Оградена</span>
                        </div>
                        <div id="description">
                            <p>Площадката има люлка, пързалка и катерушка. Съораженията са от пластмаса и без остри ръбове. Настилката е от мек гумен материал.</p>
                        </div>
                    </div>
                </div>
                <div id="map" style={{marginBottom: "20px"}}>
                        <Map onCoordinatesChange={() => {}}/>
                </div>
            </div>
        </div>
    )
}