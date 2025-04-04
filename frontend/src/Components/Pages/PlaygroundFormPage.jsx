import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playgroundForm.css'
import { Map } from '../Common/Map'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '../Common/CreatedModal'
import { AddImage } from '../Common/AddImage'
import { Navigate } from 'react-router-dom'
import Cookies from "js-cookie"

export const PlaygroundFormPage = () => {

    const facilityRef = useRef(null);
    const locationRef = useRef(null);

    const [name, setName] = useState("");
    const [age_groups, setAgeGroups] = useState([]);
    const [environment, setLocation] = useState("");
    const [shade_type, setShaded] = useState("");
    const [transport, setTransport] = useState([]);
    const [has_fence, setIsFenced] = useState(true);
    const [floor_type, setFloor] = useState([]);
    const [toys, setToys] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isOtherFacilityChecked, setIsOtherFacilityChecked] = useState(false);
    const [isOtherFacilityFocused, setIsOtherFacilityFocused] = useState(false);
    const [isOtherLocationFocused, setIsOtherLocationFocused] = useState(false);
    const [otherFacilityText, setOtherFacilityText] = useState("");
    const [otherLocationText, setOtherLocationText] = useState("");
    const [coordinates, setCoordinates] = useState({});
    const [confirmation, setConfirmation] = useState(false);
    const [add, setAdd] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (age_groups.length !== 0 && environment !== "" && shade_type !== null && floor_type.length !== 0 && has_fence !== null && facilities.length !== 0 && transport.length !== 0 && toys.length !== 0 && coordinates.lat !== undefined) {
            setAdd(false);
        } else {
            setAdd(true);
        }
    }, [add, age_groups, facilities.length, floor_type, has_fence, environment, shade_type, toys.length, transport.length, coordinates, photos])

    const noButtonEvent = () => {
        setConfirmation(false)
        setPhotos([])
    }

    const resetFocus = () => {
        setIsOtherFacilityFocused(false);
        setIsOtherLocationFocused(false);
    }

    const changeName = (event) => {
        setName(event.target.value);
    }

    const changeAgeGroups = (event) => {
        resetFocus();
        const value = event.target.value;

        if (!Array.isArray(age_groups)) {
            setAgeGroups([]);
            return;
        }
        const index = age_groups.indexOf(value);

        if (index !== -1) {
            const newAgeGroup = age_groups.filter(a => a !== value);
            setAgeGroups(newAgeGroup);
        } else {
            setAgeGroups([...age_groups, value]);
        }
    }

    const changeLocation = (event) => {
        resetFocus();
        setLocation(event.target.value);
    }


    const otherChangeLocation = (event) => {
        resetFocus();
        setIsOtherLocationFocused(true)
        locationRef.current.focus();
        setLocation(event.target.value);
    }

    const otherChangeLocationText = (event) => {
        setOtherLocationText(event.target.value)
    }

    const changeShaded = (event) => {
        resetFocus();
        setShaded(event.target.value);
    }

    const changeTransport = (event) => {
        resetFocus();
        const value = event.target.value;

        if (!Array.isArray(transport)) {
            setTransport([]);
            return;
        }
        const index = transport.indexOf(value);

        if (index !== -1) {
            const newTransport = transport.filter(t => t !== value);
            setTransport(newTransport);
        } else {
            setTransport([...transport, value]);
        }
    }

    const changeIsFenced = (event) => {
        resetFocus();
        setIsFenced(event.target.value);
    }

    const changeFloor = (event) => {
        resetFocus();
        const value = event.target.value;
        if (!Array.isArray(floor_type)) {
            setFloor([]);
            return;
        }
        const index = floor_type.indexOf(value);

        if (index !== -1) {
            const newFloor = floor_type.filter(floor => floor !== value);
            setFloor(newFloor);
        } else {
            setFloor([...floor_type, value]);
        }
    }

    const changeToys = (event) => {
        resetFocus();
        const value = event.target.value;
        if (!Array.isArray(toys)) {
            setToys([]);
            return;
        }
        const index = toys.indexOf(value);

        if (index !== -1) {
            const newToys = toys.filter(toy => toy !== value);
            setToys(newToys);
        } else {
            setToys([...toys, value]);
        }
    }

    const changeFacilities = (event) => {
        resetFocus();
        const value = event.target.value;
        if (!Array.isArray(facilities)) {
            setFacilities([]);
            return;
        }

        const index = facilities.indexOf(value);

        if (index !== -1) {
            const newFacilities = facilities.filter(facility => facility !== value);
            setFacilities(newFacilities);
        } else {
            setFacilities([...facilities, value]);
        }

        if (value === "Няма") {
            setFacilities(["Няма"])
        }
    }


    const otherChangeFacilities = (event) => {
        setIsOtherFacilityChecked(!isOtherFacilityChecked)
        resetFocus();
        setIsOtherFacilityFocused(true)
        facilityRef.current.focus();
        const value = event.target.value;
        if (!Array.isArray(facilities)) {
            setFacilities([]);
            return;
        }

        const index = facilities.indexOf(value);
        const otherFacilities = [...facilities, value];
        const starterFacilities = otherFacilities.filter(f => f === "wc" || f === "fountain" || f === "cafe" || f === "bin" || f === "bench")
        setFacilities([starterFacilities, value])

        if (facilities.indexOf("")) {
            setFacilities(otherFacilities.filter(f => f !== ""));
        }

        if (index !== -1) {
            const newFacilities = facilities.filter(facility => facility !== value);
            facilityRef.current.blur();
            setIsOtherFacilityFocused(false);
            setFacilities(newFacilities);
        }
    }

    const otherChangeFacilitiesText = (event) => {
        setIsOtherFacilityChecked(true);
        const value = event.target.value;
        setOtherFacilityText(value);
        const index = facilities.indexOf(value);
        const otherFacilities = [...facilities, value];
        const starterFacilities = otherFacilities.filter(f => f === "wc" || f === "fountain" || f === "cafe" || f === "bin" || f === "bench")
        setFacilities([...starterFacilities, value])
        if (index !== -1) {
            const newFacilities = facilities.filter(facility => facility !== value);
            facilityRef.current.blur();
            setIsOtherFacilityFocused(false);
            setFacilities(newFacilities);
        }
    }

    const onChangeImage = (event) => {
        event.preventDefault();
        setPhotos(event.target.files)
        setConfirmation(true);
    }

    const createPlayground = async (event) => {
        event.preventDefault();
        let playgroundName = name;
        if (name === "") {
            await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&language=bg&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`).then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    playgroundName = `${coordinates.lat}, ${coordinates.lng}`;
                }

            }).then((response) => {
                playgroundName = response.results[0].formatted_address;
            })

        }

        const imagePayload = new FormData();
        let playgroundId;
        const data = { name: playgroundName, age_groups, environment, shade_type, floor_type, has_fence, facilities, transport, toys, coordinates, description }
        await fetch("https://kidsground.bg:8009/v1/playgrounds/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get("user")}`
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status === 200) {
                setShowModal(true);
                return response.text()
            }
        }).then((data) => {
            playgroundId = data
        })

        if (photos) {
            Array.from(photos).forEach((photo) => {
                imagePayload.append("file", photo);
            })

        }

        if (imagePayload.entries()) {
            await fetch(`https://kidsground.bg:8009/v1/playgrounds/${playgroundId}/uploadImages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get("user")}`
                },
                body: imagePayload
            })
        }

    }


    const changeDescription = (event) => {
        resetFocus();
        setDescription(event.target.value);
    }

    const changeCoordinates = (newCoords) => {
        setCoordinates(newCoords);
    }

    if (Cookies.get("user")) {
        return (
            <div className="page background">
                <section id="add-playground">
                    <form onSubmit={createPlayground} id="playground-form" className="form-container">
                        <h2 style={{ textAlign: "center" }}>Добави площадка</h2>
                        <section className="question" id="name-question">
                            <label className="form-label" for="name-question">1. Име:</label>
                            <br />
                            <input onChange={changeName} id="playground-name-input" type="text" onFocus={() => { resetFocus(); setIsNameFocused(true) }} onBlur={() => setIsNameFocused(false)} className={isNameFocused ? 'text-input focused' : 'text-input'} placeholder="Име на площадката, ако има такова." name="name" />
                        </section>

                        <section className="question" id="age-group-question">
                            <label className="form-label" for="age-group-question">2. За каква възрастова група е подходяща площадката? *</label>
                            <br />
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeAgeGroups} className="playground-input playground-input-radio" id="ZERO_TO_THREE" name="age_groups" value="ZERO_TO_THREE" />
                                <label for="ZERO_TO_THREE">0-3г. (С придружител)</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeAgeGroups} className="playground-input playground-input-radio" id="THREE_TO_SIX" name="age_groups" value="THREE_TO_SIX" />
                                <label for="THREE_TO_SIX">3-6г.</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeAgeGroups} className="playground-input playground-input-radio" id="THREE_TO_TWELVE" name="age_groups" value="THREE_TO_TWELVE" />
                                <label for="THREE_TO_TWELVE">3-12г.</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeAgeGroups} className="playground-input playground-input-radio" id="SIX_TO_TWELVE" name="age_groups" value="SIX_TO_TWELVE" />
                                <label for="SIX_TO_TWELVE">6-12г.</label>
                            </div>
                            <br />
                        </section>

                        <section className="question" id="environment-question">
                            <label className="form-label" for="environment-question">3. Какво е местоположението на детската площадка? *</label>
                            <br />
                            <div className="choice">
                                <input type="radio" onChange={changeLocation} className="playground-input playground-input-radio" id="boulevard" name="environment" value="До голям булевард" />
                                <label for="boulevard">До голям булевард</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="radio" onChange={changeLocation} className="playground-input playground-input-radio" id="park" name="environment" value="В парк или градинка" />
                                <label for="park">В парк или градинка</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="radio" onChange={changeLocation} className="playground-input playground-input-radio" id="apartments" name="environment" value="В междублоково пространство" />
                                <label for="apartments">В междублоково пространство</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="radio" onChange={otherChangeLocation} className="playground-input playground-input-radio" id="other-place" name="environment" value={otherLocationText} />
                                <label for="other-place">Друго</label>
                                <input type="text" onClick={otherChangeLocation} onChange={otherChangeLocationText} onFocus={() => { setIsOtherLocationFocused(true) }} className={isOtherLocationFocused ? 'focused' : ''} ref={locationRef} id="other-location-text" />
                            </div>
                            <br />
                        </section>

                        <section className="question" id="shade-question">
                            <label className="form-label" for="shade-question">4. Има ли сенчести зони? *</label>
                            <br />
                            <div className="choice">
                                <input type="radio" onChange={changeShaded} className="playground-input playground-input-radio" id="tree-shade" name="shade" value="trees" />
                                <label for="tree-shade">Да, естествена сянка от дървета</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="radio" onChange={changeShaded} className="playground-input playground-input-radio" id="fake-shade" name="shade" value="fake" />
                                <label for="fake-shade">Да, изкуствена сянка от съоръжение</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="radio" onChange={changeShaded} className="playground-input playground-input-radio" id="no-shade" name="shade" value="none" />
                                <label for="no-shade">Не, няма сянка</label>
                            </div>
                            <br />
                        </section>

                        <section className="question" id="transport-question">
                            <label className="form-label" for="transport-question">5. Какъв е транспортният достъп? *</label>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeTransport} className="playground-input" id="free-parking" name="transport" value="Свободно паркиране" />
                                <label for="free-parking">Свободно паркиране</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeTransport} className="playground-input" id="paid-parking" name="transport" value="Платено паркиране" />
                                <label for="paid-parking">Платено паркиране</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeTransport} className="playground-input" id="bike-lane" name="transport" value="Велоалея" />
                                <label for="bike-lane">Велоалея</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeTransport} className="playground-input" id="public_transport" name="transport" value="Градски Транспорт" />
                                <label for="public_transport">Градски Транспорт</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeTransport} className="playground-input" id="pedestrian" name="transport" value="Пешеходен" />
                                <label for="pedestrian">Пешеходен</label>
                            </div>
                            <br />
                        </section>

                        <section className="question" id="fence-question">
                            <label className="form-label" for="fence-question">6. Има ли ограда? *</label>
                            <br />
                            <div className="choice">
                                <input type="radio" onChange={changeIsFenced} className="playground-input" id="yes" name="fence" value="true" />
                                <label for="yes">Да</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="radio" onChange={changeIsFenced} className="playground-input" id="no" name="fence" value="false" />
                                <label for="no">Не</label>
                            </div>
                            <br />
                        </section>

                        <section className="question" id="floor-question">
                            <label className="form-label" for="floor-question">7. Каква е настилката? *</label>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeFloor} className="playground-input" id="asphalt" name="floor" value="Асфалт / бетонни плочи" />
                                <label for="asphalt">Асфалт / бетонни плочи</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeFloor} className="playground-input" id="grass" name="floor" value="Тревна настилка" />
                                <label for="grass">Тревна настилка</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeFloor} className="playground-input" id="rubber" name="floor" value="Ударопоглъщаща гумена настилка" />
                                <label for="rubber">Ударопоглъщаща гумена настилка</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeFloor} className="playground-input" id="mulch" name="floor" value="Стърготини (мулч)" />
                                <label for="mulch">Стърготини (мулч)</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeFloor} className="playground-input" id="dirt" name="floor" value="Без настилка (пръст)" />
                                <label for="dirt">Без настилка (пръст)</label>
                            </div>
                            <br />
                        </section>

                        <section className="question" id="swings-question">
                            <label className="form-label" for="swings-question">8. С какви катерушки разполага площадката? *</label>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="combined" name="swings" value="Комбинирано съоръжение" />
                                <label for="combined">Комбинирано съоръжение</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="slide" name="swings" value="Пързалка" />
                                <label for="slide">Пързалка</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="swing" name="swings" value="Люлка" />
                                <label for="swing">Люлка</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="seesaw" name="swings" value="Люлка-везна" />
                                <label for="seesaw">Люлка-везна</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="spring-riders" name="swings" value="Пружинни клатушки" />
                                <label for="spring-riders">Пружинни клатушки</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="balance-beam" name="swings" value="Съоръжение за катерене и баланс" />
                                <label for="balance-beam">Съоръжение за катерене и баланс</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="climbing-wall" name="swings" value="Стена за катерене" />
                                <label for="climbing-wall">Стена за катерене</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="dynamic" name="swings" value='Динамични съоръжения за игра (батут, въжен "тролей")' />
                                <label for="dynamic">Динамични съоръжения за игра (батут, въжен "тролей")</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="accessible" name="swings" value="Съоръжения, достъпни за деца с ограничени двигателни функции" />
                                <label for="accessible">Съоръжения, достъпни за деца с ограничени двигателни функции</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="house" name="swings" value="Детски къщичка и беседка" />
                                <label for="house">Детски къщичка и беседка</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="go-round" name="swings" value="Въртележка" />
                                <label for="go-round">Въртележка</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="tunnel" name="swings" value="Тунел" />
                                <label for="tunnel">Тунел</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="sandbox" name="swings" value="Пясъчник и съоръжения за игра с пясък" />
                                <label for="sandbox">Пясъчник и съоръжения за игра с пясък</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeToys} className="playground-input" id="games" name="swings" value="Занимателни игри (ребуси, лабиринт, сметало)" />
                                <label for="games">Занимателни игри (ребуси, лабиринт, сметало)</label>
                            </div>
                            <br />
                        </section>

                        <section className="question" id="facilities-question">
                            <label className="form-label" for="facilities-question">9. Други съоръжения? *</label>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeFacilities} className="playground-input" id="wc" name="facilities" value="Тоалетна" />
                                <label for="wc">Тоалетна</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeFacilities} className="playground-input" id="cafe" name="facilities" value="Барче / кафене" />
                                <label for="cafe">Барче / кафене</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeFacilities} className="playground-input" id="bin" name="facilities" value="Koшче за боклук" />
                                <label for="bin">Koшче за боклук</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeFacilities} className="playground-input" id="fountain" name="facilities" value="Чешма" />
                                <label for="fountain">Чешма</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeFacilities} className="playground-input" id="bench" name="facilities" value="Пейка" />
                                <label for="bench">Пейка</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={changeFacilities} className="playground-input" id="none" name="facilities" value="Няма" />
                                <label for="none">Няма</label>
                            </div>
                            <br />
                            <div className="choice">
                                <input type="checkbox" onChange={otherChangeFacilities} checked={isOtherFacilityChecked} className="playground-input" id="bench" name="facilities" value={otherFacilityText} />
                                <label for="others">Друго</label>
                                <input type="text" onChange={otherChangeFacilitiesText} onFocus={() => { setIsOtherFacilityFocused(true) }} className={isOtherFacilityFocused ? 'focused' : ''} ref={facilityRef} id="other-facilities-text" />
                            </div>
                            <br />
                        </section>
                        <AddImage onChangeImage={onChangeImage} confirmation={confirmation} sendPhotos={{}} noButtonEvent={noButtonEvent} />
                        {photos && Array.from(photos).forEach((photo) => (
                            <p>{photo.name}</p>
                        ))}
                        <section className="question" id="description-question">
                            <label className="form-label" for="description">10. Допълнително описание:</label>
                            <br />
                            <textarea type="text" onChange={changeDescription} className="text-input" name="description" rows="10" cols="20"></textarea>
                        </section>
                        <section>
                            <div>
                                <h4>Преместете отметката на картата, за да посочите желаното място на площадката:   </h4>
                                <div id="map">
                                    <Map onCoordinatesChange={changeCoordinates} />
                                </div>
                            </div>
                            <div className="add-playground-btns" >
                                <button onclick={createPlayground} disabled={add} id="add-playground-btn" type="submit"><i className="fa-solid fa-plus"></i> Добави</button>
                                <Link to="/"><button id="cancel-add-playground-btn" type="button" onclick="closeForm()"><i className="fa-solid fa-xmark"></i> Назад</button></Link>
                            </div>
                        </section>
                    </form>
                    {showModal && <Modal onClose={() => { setShowModal(false) }} />}
                </section>
            </div>
        )
    } else {
        return (
            <Navigate to="/login" />
        );
    }

}