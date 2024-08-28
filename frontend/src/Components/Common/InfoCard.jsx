import { ReactComponent as ChildIcon } from '../../static/icons/child-solid.svg'
import { ReactComponent as BusIcon } from '../../static/icons/bus-solid.svg'
import { ReactComponent as FenceIcon } from '../../static/icons/fence.svg'
import { ReactComponent as TreeIcon } from '../../static/icons/tree-solid.svg'
import { ReactComponent as ParkIcon } from '../../static/icons/tree-city-solid.svg'
import { ReactComponent as ParkingIcon } from '../../static/icons/square-parking-solid.svg'
import { ReactComponent as BikeIcon } from '../../static/icons/person-biking-solid.svg'
import { ReactComponent as WalkingPersonIcon} from '../../static/icons/walking-person.svg'
import { ReactComponent as SlideIcon} from '../../static/icons/slide.svg'
import { ReactComponent as SpringRiderIcon} from '../../static/icons/spring-rider.svg'
import { ReactComponent as LabyrinthIcon} from '../../static/icons/labyrinth.svg'
import { ReactComponent as SandBoxIcon} from '../../static/icons/sandbox.svg'
import { ReactComponent as ClimbingWallIcon} from '../../static/icons/climbing-wall.svg'
import { ReactComponent as SeesawIcon} from '../../static/icons/seesaw.svg'
import { ReactComponent as GoRoundIcon} from '../../static/icons/go-round.svg'
import { ReactComponent as SwingIcon} from '../../static/icons/swing.svg'
import { ReactComponent as BalanceBeamIcon} from '../../static/icons/balance-beam.svg'
import { ReactComponent as HouseIcon} from '../../static/icons/house.svg'
import { ReactComponent as CombinedPlaygroundIcon} from '../../static/icons/playground-combined.svg'
import { ReactComponent as TunnelIcon} from '../../static/icons/tunnel.svg'
import { ReactComponent as WheelchairIcon} from '../../static/icons/wheelchair.svg'
import { ReactComponent as TrampolineIcon} from '../../static/icons/trampoline.svg'
import { ReactComponent as FloorTypeIcon} from '../../static/icons/tiles.svg'


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
                        <p>{props.rating ? Math.round(props.rating * 100) / 100 : 0} <svg
                className="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="25"
                height="25"
                style={{
                  color: '#ffc107',
                }}><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.787 1.615 8.162-7.551-4.008L4.449 23.255 6.064 15.093 0 9.305l8.332-1.15z" /></svg></p>
                        <div>{props.description}</div>
                        <div id="age" className="card">
                            <span><ChildIcon className="icon"/>Деца между {Array.isArray(props.ageGroup) ? props.ageGroup.forEach((age) => {
                                return ageGroups[age]
                            }) : ageGroups[props.ageGroup]} години.</span>
                        </div>
                        <div id="playgroundLocation" className="card">
                            <span><ParkIcon className="icon"/>{props.environment}</span>
                        </div>
                        <div id="playgroundLocation" className="card">
                            <span><FloorTypeIcon className="icon"/>{Array.isArray(props.floorType) ? props.floorType.join(", ") : props.floorType }</span>
                        </div>
                        <div id="shade" className="card">
                            <span><TreeIcon className="icon"/>{shades[props.shadeType]}</span>
                        </div>
                        <div id="transport" className="card">
                            <span className="card">Видове Транспорт: </span> <br/>
                            {props.transport && props.transport.map((transportType) => {
                                if(transportType.includes("паркиране")) {
                                    return(<span className="card"><ParkingIcon className="icon"/>{transportType}</span>);
                                }
                                if(transportType === "Велоалея") {
                                    return(<span className="card"><BikeIcon className="icon transportIcon"/>{transportType}</span>);
                                }
                                if(transportType === "Градски транспорт") {
                                    return(<span className="card"><BusIcon className="icon transportIcon"/>{transportType}</span>);
                                }
                                if(transportType === "Пешеходен") {
                                    return(<span className="card"><WalkingPersonIcon className="icon transportIcon"/>{transportType}</span>);
                                }
                            })}
                        </div>
                        <div id="fence" className="card">
                            <span><FenceIcon id="fence-icon" className="icon" style={{marginTop: "10px"}}/>{hasFenceResults}</span>
                        </div>
                        <div id="description">
                            <p>Площадката има: </p>
                            {props.toys && props.toys.map((toy) => {
                                switch (toy) {
                                    case "Комбинирано съоръжение": {
                                        return (<span className="card"><CombinedPlaygroundIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    case "Пързалка": {
                                        return(<span className="card"><SlideIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    case "Люлка": {
                                        return(<span className="card"><SwingIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    case "Люлка-везна": {
                                        return(<span className="card"><SeesawIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    case "Пружинни клатушки": {
                                        return(<span className="card"><SpringRiderIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    case "Съоръжение за катерене и баланс": {
                                        return(<span className="card"><BalanceBeamIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    case "Стена за катерене": {
                                        return(<span className="card"><ClimbingWallIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    case 'Динамични съоръжения за игра (батут, въжен "тролей")': {
                                        return(<span className="card"><TrampolineIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    case "Съоръжения, достъпни за деца с ограничени двигателни функции": {
                                        return(<span className="card"><WheelchairIcon className="icon"/>{toy}<br/></span>);  
                                    }
                                    case "Детски къщичка и беседка": {
                                        return(<span className="card"><HouseIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    case "Въртележка": {
                                        return(<span className="card"><GoRoundIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    case "Тунел": {
                                        return(<span className="card"><TunnelIcon className="icon"/>{toy}<br/></span>); 
                                    }
                                    case "Пясъчник и съоръжения за игра с пясък": {
                                        return(<span className="card"><SandBoxIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    case "Занимателни игри (ребуси, лабиринт, сметало)": {
                                        return(<span className="card"><LabyrinthIcon className="icon"/>{toy}<br/></span>);
                                    }
                                    default: {
                                        <></>
                                    }
                                }                      
                            })
                            }
                            {props.facilities && props.facilities.map((facility) => {
                                return (<ul>
                                    <li>{facility}</li>
                                </ul>)
                            })}
                        </div>
                    </div>
        </div>
    )
}