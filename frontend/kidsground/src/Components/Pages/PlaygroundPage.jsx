import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playground.css'
import { ReactComponent as ChildIcon } from '../../static/icons/child-solid.svg'
import { ReactComponent as BusIcon } from '../../static/icons/bus-solid.svg'
import { ReactComponent as FenceIcon } from '../../static/icons/fence.svg'
import { ReactComponent as TreeIcon } from '../../static/icons/tree-solid.svg'
import { ReactComponent as ParkIcon } from '../../static/icons/tree-city-solid.svg'
import { ReactComponent as ParkingIcon } from '../../static/icons/square-parking-solid.svg'
import { ReactComponent as BikeIcon } from '../../static/icons/person-biking-solid.svg'

import { Map } from '../Common/Map'

export const PlaygroundPage = () => {
    return(
        <div class="page">
            <div class="picture-slider">
                <img class="playground-picture" src="./pictures/stefan_genev.png"/>
            </div>

            <div class="playground-content">
                <div class="upload-btn-wrapper">
                    <button class="btn"></button>
                    <input type="file" name="myfile" accept="image/*"/>
                    <p class="btn-label">Добави снимки</p>
                </div>
        
                <div class="playground-text">
                    <h1>Площадка "Дъга"</h1>
                    <div id="age" class="card">
                        <span><ChildIcon class="icon"/> деца между 3 и 6 години.</span>
                    </div>
                    <div id="location" class="card">
                        <span><ParkIcon class="icon"/>В парк или градинка</span>
                    </div>
                    <div id="shade" class="card">
                        <span><TreeIcon class="icon"/>Естествена сянка от дървета</span>
                    </div>
                    <div id="transport" class="card">
                        <span class="card">Транспорт</span> <br/>
                        <span class="card"><BusIcon class="icon"/>Автобус 15</span>
                        <span class="card"><ParkingIcon class="icon"/>Свободно паркиране</span>
                        <span class="card"><BikeIcon class="icon"/>Велоалея</span>
                    </div>
                    <div id="fence" class="card">
                        <span><FenceIcon id="fence-icon" class="icon" height="2.5vh" width = "2.5vw"/>Оградена</span>
                    </div>
                    <div id="description">
                        <p>Площадката има люлка, пързалка и катерушка. Съораженията са от пластмаса и без остри ръбове. Настилката е от мек гумен материал.</p>
                    </div>
                </div>
                <div id="map">
                        <Map/>
                </div>
            </div>
        </div>
    )
}