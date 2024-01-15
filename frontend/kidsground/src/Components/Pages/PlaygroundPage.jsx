import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playground.css'
import { ReactComponent as ChildIcon} from '../../static/icons/child-solid.svg'
import { ReactComponent as BusIcon} from '../../static/icons/bus-solid.svg'
import { ReactComponent as FenceIcon} from '../../static/icons/fence.svg'
import { ReactComponent as TreeIcon} from '../../static/icons/tree-solid.svg'
import { ReactComponent as ParkIcon} from '../../static/icons/tree-city-solid.svg'
import { ReactComponent as ParkingIcon} from '../../static/icons/square-parking-solid.svg'
import { ReactComponent as BikeIcon} from '../../static/icons/person-biking-solid.svg'

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
                    <div class="age">
                        <span><ChildIcon/> деца между 3 и 6 години.</span>
                    </div>
                    <div class="location">
                        <span><ParkIcon/>В парк или градинка</span>
                    </div>
                    <div class="shade">
                        <span><TreeIcon/>Естествена сянка от дървета</span>
                    </div>
                    <div class="transport">
                        <span>Транспорт</span>
                        <span><BusIcon/>Автобус 15</span>
                        <span><ParkingIcon/>Свободно паркиране</span>
                        <span><BikeIcon/>Велоалея</span>
                    </div>
                    <div class="fence">
                        <span><FenceIcon class="fence-icon"/>Оградена</span>
                    </div>
                    <div class="description">
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