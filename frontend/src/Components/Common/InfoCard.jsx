import { ReactComponent as ChildIcon } from '../../static/icons/child-solid.svg'
import { ReactComponent as BusIcon } from '../../static/icons/bus-solid.svg'
import { ReactComponent as FenceIcon } from '../../static/icons/fence.svg'
import { ReactComponent as TreeIcon } from '../../static/icons/tree-solid.svg'
import { ReactComponent as ParkIcon } from '../../static/icons/tree-city-solid.svg'
import { ReactComponent as ParkingIcon } from '../../static/icons/square-parking-solid.svg'
import { ReactComponent as BikeIcon } from '../../static/icons/person-biking-solid.svg'
import { ReactComponent as WalkingPersonIcon } from '../../static/icons/walking-person.svg'
import { ReactComponent as SlideIcon } from '../../static/icons/slide.svg'
import { ReactComponent as SpringRiderIcon } from '../../static/icons/spring-rider.svg'
import { ReactComponent as LabyrinthIcon } from '../../static/icons/labyrinth.svg'
import { ReactComponent as SandBoxIcon } from '../../static/icons/sandbox.svg'
import { ReactComponent as ClimbingWallIcon } from '../../static/icons/climbing-wall.svg'
import { ReactComponent as SeesawIcon } from '../../static/icons/seesaw.svg'
import { ReactComponent as GoRoundIcon } from '../../static/icons/go-round.svg'
import { ReactComponent as SwingIcon } from '../../static/icons/swing.svg'
import { ReactComponent as BalanceBeamIcon } from '../../static/icons/balance-beam.svg'
import { ReactComponent as HouseIcon } from '../../static/icons/house.svg'
import { ReactComponent as CombinedPlaygroundIcon } from '../../static/icons/playground-combined.svg'
import { ReactComponent as TunnelIcon } from '../../static/icons/tunnel.svg'
import { ReactComponent as WheelchairIcon } from '../../static/icons/wheelchair.svg'
import { ReactComponent as TrampolineIcon } from '../../static/icons/trampoline.svg'
import { ReactComponent as FloorTypeIcon } from '../../static/icons/tiles.svg'


export const InfoCard = (props) => {

    const hasFenceResults = props.hasFence ? "Оградена" : "Неоградена"
    const ageGroups = Object.freeze({
        ZERO_TO_THREE: "0 и 3",
        THREE_TO_SIX: "3 и 6",
        THREE_TO_TWELVE: "3 и 12",
        SIX_TO_TWELVE: "6 и 12"
    })

    const shades = Object.freeze({
        fake: "Изкуствена сянка от съоръжение",
        trees: "Естествена сянка от дървета",
        none: "Няма сянка",
    })

    return (
        <section id="info-card">
            <article className="playground-text">
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
                <p className="playground-description">{props.description}</p>
                <ul className="card-list">
                    <li id="age" className="card">
                        <span>
                            <ChildIcon className="icon" />
                            Деца между {props.ageGroups?.map((age) => ageGroups[age] ?? "N/A").join(", ")} години.
                        </span>
                    </li>

                    <li id="playgroundLocation" className="card">
                        <span><ParkIcon className="icon" />{props.environment}</span>
                    </li>
                    <li id="floorType" className="card">
                        <span className="floor-card"><FloorTypeIcon className="icon icon-mt-20" />{Array.isArray(props.floorType) ? <p>{props.floorType.join(", ")}</p> : <p>{props.floorType}</p>}</span>
                    </li>
                    <li id="shade" className="card">
                        <span><TreeIcon className="icon" />{shades[props.shadeType]}</span>
                    </li>
                    <li id="transport" className="card">
                        <span className="card">Видове Транспорт: </span> <br />
                        {props.transport && props.transport.map((transportType) => {
                            if (transportType.includes("паркиране")) {
                                return (<span className="card"><ParkingIcon className="icon" />{transportType}</span>);
                            }
                            if (transportType === "Велоалея") {
                                return (<span className="card"><BikeIcon className="icon transportIcon" />{transportType}</span>);
                            }
                            if (transportType === "Градски транспорт") {
                                return (<span className="card"><BusIcon className="icon transportIcon" />{transportType}</span>);
                            }
                            if (transportType === "Пешеходен") {
                                return (<span className="card"><WalkingPersonIcon className="icon transportIcon" />{transportType}</span>);
                            }
                            return null;
                        })}
                    </li>
                    <li id="fence" className="card">
                        <span className="fence-card"><FenceIcon id="fence-icon" className="icon icon-mt-22" /><p>{hasFenceResults}</p></span>
                    </li>
                </ul>
                <div id="description">
                    <p className="facilities-intro">Площадката има: </p>
                    {props.toys && props.toys.map((toy) => {
                        switch (toy) {
                            case "Комбинирано съоръжение": {
                                return (<span className="toy-card" key={toy}><CombinedPlaygroundIcon className="icon icon-mt-16" /><p>{toy}</p><br /></span>);
                            }
                            case "Пързалка": {
                                return (<span className="toy-card" key={toy}><SlideIcon className="icon icon-mt-20" /><p>{toy}</p><br /></span>);
                            }
                            case "Люлка": {
                                return (<span className="toy-card" key={toy}><SwingIcon className="icon icon-mt-22" /><p>{toy}</p><br /></span>);
                            }
                            case "Люлка-везна": {
                                return (<span className="toy-card" key={toy}><SeesawIcon className="icon icon-mt-22" /><p>{toy}</p><br /></span>);
                            }
                            case "Пружинни клатушки": {
                                return (<span className="toy-card" key={toy}><SpringRiderIcon className="icon icon-mt-22" /><p>{toy}</p><br /></span>);
                            }
                            case "Съоръжение за катерене и баланс": {
                                return (<span className="toy-card" key={toy}><BalanceBeamIcon className="icon" /><p>{toy}</p><br /></span>);
                            }
                            case "Стена за катерене": {
                                return (<span className="toy-card" key={toy}><ClimbingWallIcon className="icon" /><p>{toy}</p><br /></span>);
                            }
                            case 'Динамични съоръжения за игра (батут, въжен "тролей")': {
                                return (<span className="toy-card" key={toy}><TrampolineIcon className="icon" /><p>{toy}</p><br /></span>);
                            }
                            case "Съоръжения, достъпни за деца с ограничени двигателни функции": {
                                return (<span className="toy-card" key={toy}><WheelchairIcon className="icon" /><p>{toy}</p><br /></span>);
                            }
                            case "Детски къщичка и беседка": {
                                return (<span className="toy-card" key={toy}><HouseIcon className="icon" /><p>{toy}</p><br /></span>);
                            }
                            case "Въртележка": {
                                return (<span className="toy-card" key={toy}><GoRoundIcon className="icon" /><p>{toy}</p><br /></span>);
                            }
                            case "Тунел": {
                                return (<span className="toy-card" key={toy}><TunnelIcon className="icon" /><p>{toy}</p><br /></span>);
                            }
                            case "Пясъчник и съоръжения за игра с пясък": {
                                return (<span className="toy-card" key={toy}><SandBoxIcon className="icon icon-mt-22" /><p>{toy}</p><br /></span>);
                            }
                            case "Занимателни игри (ребуси, лабиринт, сметало)": {
                                return (<span className="toy-card" key={toy}><LabyrinthIcon className="icon" /><p>{toy}</p><br /></span>);
                            }
                            default: {
                                return null;
                            }
                        }
                    })}
                    {props.facilities && props.facilities.length > 0 &&
                        <ul className="facilities-list">
                            {props.facilities.map((facility) => (
                                <li key={facility}>{facility}</li>
                            ))}
                        </ul>}
                </div>
            </article>
        </section>
    )
}