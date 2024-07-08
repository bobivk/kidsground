import { ReactComponent as ChildIcon } from '../../static/icons/child-solid.svg'
import { ReactComponent as BusIcon } from '../../static/icons/bus-solid.svg'
import { ReactComponent as FenceIcon } from '../../static/icons/fence.svg'
import { ReactComponent as TreeIcon } from '../../static/icons/tree-solid.svg'
import { ReactComponent as ParkIcon } from '../../static/icons/tree-city-solid.svg'
import { ReactComponent as ParkingIcon } from '../../static/icons/square-parking-solid.svg'
import { ReactComponent as BikeIcon } from '../../static/icons/person-biking-solid.svg'
import { ReactComponent as WalkingPersonIcon} from '../../static/icons/walking-person.svg'


export const InfoCard = (props) => {

    const hasFenceResults = props.hasFence ? "Оградена" : "Неоградена"
    const ageGroups = Object.freeze({
        zero_to_three: "0 и 3",
        three_to_six: "3 и 6",
        three_to_twelve: "3 и 12",
        six_to_twelve: "6 и 12"
    })

    const shades = Object.freeze({
        fake: "Изкуствена сянка от съоръжение",
        trees: "Естествена сянка от дървета",
        none: "Няма сянка",
    })

    return (
        <div id="info-card">
                    <div className="playground-text">
                        <h1>{props.name}</h1>
                        <div id="age" className="card">
                            <span><ChildIcon className="icon"/>Деца между {ageGroups[props.ageGroup]} години.</span>
                        </div>
                        <div id="playgroundLocation" className="card">
                            <span><ParkIcon className="icon"/>{props.environment}</span>
                        </div>
                        <div id="shade" className="card">
                            <span><TreeIcon className="icon"/>{shades[props.shadeType]}</span>
                        </div>
                        <div id="transport" className="card">
                            <span className="card">Видове Транспорт</span> <br/>
                            {props.transport && props.transport.map((transportType) => {
                                if(transportType.contains("паркиране")) {
                                    <span className="card"><ParkingIcon className="icon"/>{transportType}</span>
                                }
                                if(transportType === "Велоалея") {
                                    <span className="card"><BikeIcon className="icon"/>{transportType}</span>
                                }
                                if(transportType === "Градски транспорт") {
                                    <span className="card"><BusIcon className="icon"/>{transportType}</span>
                                }
                                if(transportType === "Пешеходен") {
                                    <span className="card"><WalkingPersonIcon className="icon"/>{transportType}</span>
                                }
                            })}
                        </div>
                        <div id="fence" className="card">
                            <span><FenceIcon id="fence-icon" className="icon" style={{marginTop: "10px"}}/>{hasFenceResults}</span>
                        </div>
                        <div id="description">
                            <p>Площадката има люлка, пързалка и катерушка. Съораженията са от пластмаса и без остри ръбове. Настилката е от мек гумен материал.</p>
                        </div>
                    </div>
        </div>
    )
}