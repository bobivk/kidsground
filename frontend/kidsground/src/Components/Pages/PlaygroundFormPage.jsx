import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playgroundForm.css'
import { Map } from '../Common/Map'
import { useState, useRef, useEffect } from 'react'

export const PlaygroundFormPage = () => {

    const ageRef = useRef(null);
    const facilityRef = useRef(null);
    const locationRef = useRef(null);

    const [name, setName] = useState("");
    const [ageGroup, setAgeGroup] = useState("");
    const [environment, setEnvironment] = useState("");
    const [shaded, setShaded] = useState("");
    const [transport, setTransport] = useState([]);
    const [isFenced, setIsFenced] = useState(true);
    const [floor, setFloor] = useState();
    const [toys, setToys] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [description, setDescription] = useState("");
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isOtherAgeFocused, setIsOtherAgeFocused] = useState(false);
    const [isOtherFacilityFocused, setIsOtherFacilityFocused] = useState(false);
    const [isOtherLocationFocused, setIsOtherLocationFocused] = useState(false);
    const [otherFacilityText, setOtherFacilityText] = useState("");
    const [otherAgeText, setOtherAgeText] = useState("");
    const [otherLocationText, setOtherLocationText] = useState("");


    useEffect(() => {
            window.scrollTo(0, 0)
    }, [])

    const resetFocus = () => {
        setIsOtherAgeFocused(false);
        setIsOtherFacilityFocused(false);
        setIsOtherLocationFocused(false);
    }

    const changeName = (event) => {
        setName(event.target.value);
    }

    const changeAgeGroup = (event) => {
        resetFocus();
        setAgeGroup(event.target.value);
        console.log(ageGroup);
    }

    const otherChangeAgeGroup = (event) => {
        resetFocus();
        setIsOtherAgeFocused(true)
        ageRef.current.focus();
        setAgeGroup(event.target.value);
        console.log(ageGroup);
    }
    
    const otherChangeAgeGroupText = (event) => {
        setOtherAgeText(event.target.value)
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
        console.log(location);
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
        setFloor(event.target.value);
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

        console.log(toys);
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
    }


    const otherChangeFacilities = (event) => {
        resetFocus();
        setIsOtherFacilityFocused(true)
        facilityRef.current.focus();
        const value = event.target.value;
        if (!Array.isArray(facilities)) {
            setFacilities([]);
            return;
        }

        const index = facilities.indexOf(value);
        
        if (index !== -1) {
            const newFacilities = facilities.filter(facility => facility !== value);
            facilityRef.current.blur();
            setIsOtherFacilityFocused(false);
            setFacilities(newFacilities);
        } else {
            setFacilities([...facilities, value]);
        }

        console.log(facilities);

    }

    const otherChangeFacilitiesText = (event) => {
        setOtherFacilityText(event.target.value);
    }


    const changeDescription = (event) => {
        resetFocus();
        setDescription(event.target.value);
    }

    return(
    <div className="page background">
        <div id="add-playground">
            <form id="playground-form" className="form-container">
            <h2 style={{textAlign:"center"}}>Добави площадка</h2>
                <div className="question" id="name-question">
                    <label className="form-label" for="name-question">1. Име:</label>
                    <br/>
                    <input onChange={changeName} id="playground-name-input" type="text" onFocus={() => {resetFocus(); setIsNameFocused(true)}} onBlur={() => setIsNameFocused(false)} className={isNameFocused ? 'text-input focused' : 'text-input'} placeholder="Име на площадката, ако има такова." name="name"/>
                </div>

                <div className="question" id="age-group-question">
                    <label className="form-label" for="age-group-question">2. За каква възрастова група е подходяща площадката?</label>
                    <br/>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeAgeGroup} className="playground-input playground-input-radio" id="zero_to_three" name="age_group" value="zero_to_three"/>
                        <label for="zero_to_three">0-3г.</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeAgeGroup} className="playground-input playground-input-radio" id="three_to_six" name="age_group" value="three_to_six"/>
                        <label for="three_to_six">3-6г.</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeAgeGroup} className="playground-input playground-input-radio" id="six_to_twelve" name="age_group" value="six_to_twelve"/>
                        <label for="six_to_twelve">6-12г.</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={otherChangeAgeGroup} className="playground-input playground-input-radio" id="other-years" name="age-group" value={otherAgeText}/>
                        <label for="other-years">Друго</label>
                        <input onClick={otherChangeAgeGroupText} onChange={otherChangeAgeGroupText} onFocus={() => {setIsOtherAgeFocused(true)}} className={isOtherAgeFocused ? 'focused' : ''} type="text" ref={ageRef} id="other-years-text" />
                    </div>
                    <br/>
                </div>

                <div className="question" id="environment-question">
                    <label className="form-label" for="environment-question">3. Какво е местоположението на детската площадка?</label>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeEnvironment} className="playground-input playground-input-radio" id="boulevard" name="environment" value="boulevard"/>
                        <label for="boulevard">До голям булевард</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeEnvironment} className="playground-input playground-input-radio" id="park" name="environment" value="park"/>
                        <label for="park">В парк или градинка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeEnvironment} className="playground-input playground-input-radio" id="apartments" name="environment" value="apartments"/>
                        <label for="apartments">В междублоково пространство</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={otherChangeLocation} className="playground-input playground-input-radio" id="other-place" name="location" value={otherLocationText}/>
                        <label for="other-place">Друго</label>
                        <input type="text" onClick={otherChangeLocation} onChange={otherChangeLocationText} onFocus={() => {setIsOtherLocationFocused(true)}} className={isOtherLocationFocused ? 'focused' : ''} ref={locationRef} id="other-location-text" />
                    </div>
                    <br/>
                </div>

                <div className="question" id="shade-question">
                    <label className="form-label" for="shade-question">4. Има ли сенчести зони?</label>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeShaded} className="playground-input playground-input-radio" id="tree-shade" name="shade" value="tree-shade"/>
                        <label for="tree-shade">Да, естествена сянка от дървета</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeShaded} className="playground-input playground-input-radio" id="fake-shade" name="shade" value="fake-shade"/>
                        <label for="fake-shade">Да, изкуствена сянка от съоръжение</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeShaded} className="playground-input playground-input-radio" id="no-shade" name="shade" value="no-shade"/>
                        <label for="no-shade">Не, няма сянка</label>
                    </div>
                    <br/>
                </div>

                <div className="question" id="transport-question">
                    <label className="form-label" for="transport-question">5. Какъв е транспортният достъп?</label>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeTransport} className="playground-input" id="free-parking" name="transport" value="free-parking"/>
                        <label for="free-parking">Свободно паркиране</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="paid-parking" name="transport" value="paid-parking"/>
                        <label for="paid-parking">Платено паркиране</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="bike-lane" name="transport" value="bike-lane"/>
                        <label for="bike-lane">Велоалея</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="pedestrian" name="transport" value="pedestrian"/>
                        <label for="pedestrian">Само пешеходен</label>
                    </div>
                    <br/>
                </div>

                <div className="question" id="fence-question">
                    <label className="form-label" for="fence-question">6. Има ли ограда?</label>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeIsFenced} className="playground-input" id="yes" name="fence" value="true"/>
                        <label for="yes">Да</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeIsFenced} className="playground-input" id="no" name="fence" value="false"/>
                        <label for="no">Не</label>
                    </div>
                    <br/>
                </div>
                <div className="question" id="floor-question">
                    <label className="form-label" for="floor-question">7. Каква е настилката</label>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeFloor} className="playground-input" id="asphalt" name="floor" value="asphalt"/>
                        <label for="asphalt">Асфалт / бетонни плочи</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeFloor} className="playground-input" id="grass" name="floor" value="grass"/>
                        <label for="asphalt">Тревна настилка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeFloor} className="playground-input" id="rubber" name="floor" value="rubber"/>
                        <label for="asphalt">Ударопоглъщаща гумена настилка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeFloor} className="playground-input" id="mulch" name="floor" value="mulch"/>
                        <label for="asphalt">Стърготини (мулч)</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeFloor} className="playground-input" id="dirt" name="floor" value="dirt"/>
                        <label for="asphalt">Без настилка (пръст)</label>
                    </div>
                    <br/>
                </div>

                <div className="question" id="swings-question">
                    <label className="form-label" for="swings-question">8. С какви катерушки разполага площадката?</label>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="combined" name="swings" value="combined"/>
                        <label for="combined">Комбинирано съоражение</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="slide" name="swings" value="slide"/>
                        <label for="slide">Пързалка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="swing" name="swings" value="swing"/>
                        <label for="swing">Люлка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="seesaw" name="swings" value="seesaw"/>
                        <label for="seesaw">Люлка-везна</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="spring-riders" name="swings" value="spring-riders"/>
                        <label for="spring-riders">Пружинни клатушки</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="balance-beam" name="swings" value="balance-beam"/>
                        <label for="balance-beam">Съоражение за катерене и баланс</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="climbing-wall" name="swings" value="climbing-wall"/>
                        <label for="climbing-wall">Стена за катерене</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="dynamic" name="swings" value="dynamic"/>
                        <label for="dynamic">Динамични съоражения за игра (батут, въжен "тролей")</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="accessible" name="swings" value="accessible"/>
                        <label for="accessible">Съораженя, достъпни за деца с ограничени двигателни функции</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="house" name="swings" value="house"/>
                        <label for="house">Детски къщичка и беседка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="go-round" name="swings" value="go-round"/>
                        <label for="go-round">Въртележка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="tunnel" name="swings" value="tunnel"/>
                        <label for="tunnel">Тунел</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="sandbox" name="swings" value="sandbox"/>
                        <label for="sandbox">Пясъчник и съоражения за игра с пясък</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="games" name="swings" value="games"/>
                        <label for="games">Занимателни игри (ребуси, лабиринт, сметало)</label>
                    </div>
                    <br/>
                </div>

                <div className="question" id="facilities-question">
                    <label className="form-label" for="facilities-question">9. Други съоражения?</label>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeFacilities} className="playground-input" id="wc" name="facilities" value="wc"/>
                        <label for="wc">Тоалетна</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeFacilities} className="playground-input" id="cafe" name="facilities" value="cafe"/>
                        <label for="cafe">Барче / кафене</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeFacilities} className="playground-input" id="bin" name="facilities" value="bin"/>
                        <label for="bin">Koшче за боклук</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeFacilities} className="playground-input" id="fountain" name="facilities" value="fountain"/>
                        <label for="fountain">Чешма</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeFacilities} className="playground-input" id="bench" name="facilities" value="bench"/>
                        <label for="bench">Пейка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={otherChangeFacilities}  className="playground-input" id="bench" name="facilities" value={otherFacilityText}/>
                        <label for="others">Друго</label>
                        <input type="text" onClick={otherChangeFacilities} onChange={otherChangeFacilitiesText} onFocus={() => {setIsOtherFacilityFocused(true)}} className={isOtherFacilityFocused ? 'focused' : ''}  ref={facilityRef} id="other-facilities-text" />
                    </div>
                    <br/>
                </div>

                <div className="question" id="description-question">
                <label className="form-label" for="description">10. Допълнително описание:</label>
                <br/>
                <textarea type="text" onChange={changeDescription} className="text-input" name="description" rows="10" cols="20"></textarea>
                </div>
                <div>
                    <div>
                        <h4>Посочете на картата мястото на площадката</h4>
                        <div id="map">
                            <Map/>
                        </div>
                    </div>
                    <div className="add-playground-btns" >
                        <button id="add-playground-btn" type="submit"><i className="fa-solid fa-plus"></i> Добави</button>
                        <button id="cancel-add-playground-btn" type="button" onclick="closeForm()"><i className="fa-solid fa-xmark"></i> Назад</button>
                    </div>
                </div>
            </form>
        </div>
</div>
)
}