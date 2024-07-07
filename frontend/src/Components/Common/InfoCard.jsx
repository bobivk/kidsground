import { ReactComponent as ChildIcon } from '../../static/icons/child-solid.svg'
import { ReactComponent as BusIcon } from '../../static/icons/bus-solid.svg'
import { ReactComponent as FenceIcon } from '../../static/icons/fence.svg'
import { ReactComponent as TreeIcon } from '../../static/icons/tree-solid.svg'
import { ReactComponent as ParkIcon } from '../../static/icons/tree-city-solid.svg'
import { ReactComponent as ParkingIcon } from '../../static/icons/square-parking-solid.svg'
import { ReactComponent as BikeIcon } from '../../static/icons/person-biking-solid.svg'


export const InfoCard = (props) => {

    const hasFenceResults = props.hasFence ? "Оградена" : "Неоградена"
    const ageGroups = Object.freeze({
        zero_to_three: "0 и 3",
        three_to_six: "3 и 6",
        three_to_twelve: "3 и 12",
        six_to_twelve: "6 и 12"
    })

    return (
        <div id="info-card">
                    <div className="playground-text">
                        <h1>{props.name}</h1>
                        <div id="age" className="card">
                            <span><ChildIcon className="icon"/> деца между {ageGroups[props.ageGroup]} години.</span>
                        </div>
                        <div id="playgroundLocation" className="card">
                            <span><ParkIcon className="icon"/>В парк или градинка</span>
                        </div>
                        <div id="shade" className="card">
                            <span><TreeIcon className="icon"/>Естествена сянка от дървета</span>
                        </div>
                        <div id="transport" className="card">
                            <span className="card">Видове Транспорт</span> <br/>
                            <span className="card"><BusIcon className="icon"/>Автобус 15</span>
                            <span className="card"><ParkingIcon className="icon"/>Свободно паркиране</span>
                            <span className="card"><BikeIcon className="icon"/>Велоалея</span>
                        </div>
                        <div id="fence" className="card">
                            <span><FenceIcon id="fence-icon" className="icon" height="2.5vh" width = "2.5vw"/>{hasFenceResults}</span>
                        </div>
                        <div id="description">
                            <p>Площадката има люлка, пързалка и катерушка. Съораженията са от пластмаса и без остри ръбове. Настилката е от мек гумен материал.</p>
                        </div>
                    </div>
        </div>
    )
}