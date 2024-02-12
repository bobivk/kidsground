import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playgroundForm.css'
import { Map } from '../Common/Map'
import { useState } from 'react'

export const PlaygroundFormPage = () => {

    const [name, setName] = useState("");
    const [ageGroup, setAgeGroup] = useState("");
    const [location, setLocation] = useState("");
    const [shaded, setShaded] = useState("");
    const [transport, setTransport] = useState([]);
    const [isFenced, setIsFenced] = useState(true);
    const [floor, setFloor] = useState();
    const [toys, setToys] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [description, setDescription] = useState("");

    const changeName = (event) => {
        setName(event.target.value);
    }

    const changeAgeGroup = (event) => {
        setAgeGroup(event.target.value);
    }

    const changeLocation = (event) => {
        setLocation(event.target.value);
    }

    const changeShaded = (event) => {
        setShaded(event.target.value);
    }

    const changeTransport = (event) => {
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
        setIsFenced(event.target.value);
    }

    const changeFloor = (event) => {
        setFloor(event.target.value);
    }

    const changeToys = (event) => {
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

    const changeDescription = (event) => {
        setDescription(event.target.value);
    }

    return(
    <div className="page">
        <div id="add-playground">
            <form id="playground-form" className="form-container">
            <h2 style={{textAlign:"center"}}>Добави площадка</h2>
                <div className="question" id="name-question">
                    <label className="form-label" for="name-question">1. Име:</label>
                    <br/>
                    <input onChange={changeName} id="playground-name" type="text" className="text-input" placeholder="Име на площадката, ако има такова." name="name"/>
                </div>

                <div className="question" id="age-group-question">
                    <label className="form-label" for="age-group-question">2. За каква възрастова група е подходяща площадката?</label>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeAgeGroup} className="playground-input playground-input-radio" id="under-1" name="age-group" value="under-1"/>
                        <label for="under-1">Под 1г.</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeAgeGroup} className="playground-input playground-input-radio" id="1-3years" name="age-group" value="1-3years"/>
                        <label for="1-3years">1-3г.</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeAgeGroup} className="playground-input playground-input-radio" id="3-6years" name="age-group" value="3-6years"/>
                        <label for="3-6years">3-6г.</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeAgeGroup} className="playground-input playground-input-radio" id="6-12years" name="age-group" value="6-12years"/>
                        <label for="6-12years">6-12г.</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeAgeGroup} className="playground-input playground-input-radio" id="other-years" name="age-group" value="other-years"/>
                        <label for="other-years">Друго</label>
                    </div>
                    <br/>
                </div>

                <div className="question" id="location-question">
                    <label className="form-label" for="location-question">3. Какво е местоположението на детската площадка?</label>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeLocation} className="playground-input playground-input-radio" id="boulevard" name="boulevard" value="boulevard"/>
                        <label for="boulevard">До голям булевард</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeLocation} className="playground-input playground-input-radio" id="park" name="park" value="park"/>
                        <label for="park">В парк или градинка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeLocation} className="playground-input playground-input-radio" id="apartments" name="apartments" value="apartments"/>
                        <label for="apartments">В междублоково пространство</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeLocation} className="playground-input playground-input-radio" id="other-place" name="other-place" value="other-place"/>
                        <label for="other-place">Друго</label>
                    </div>
                    <br/>
                </div>

                <div className="question" id="shade-question">
                    <label className="form-label" for="shade-question">4. Има ли сенчести зони?</label>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeShaded} className="playground-input playground-input-radio" id="tree-shade" name="tree-shade" value="tree-shade"/>
                        <label for="tree-shade">Да, естествена сянка от дървета</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeShaded} className="playground-input playground-input-radio" id="fake-shade" name="fake-shade" value="fake-shade"/>
                        <label for="fake-shade">Да, изкуствена сянка от съоръжение</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeShaded} className="playground-input playground-input-radio" id="no-shade" name="no-shade" value="no-shade"/>
                        <label for="no-shade">Не, няма сянка</label>
                    </div>
                    <br/>
                </div>

                <div className="question" id="transport-question">
                    <label className="form-label" for="transport-question">5. Какъв е транспортният достъп?</label>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeTransport} className="playground-input" id="free-parking" name="location" value="free-parking"/>
                        <label for="free-parking">Свободно паркиране</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="paid-parking" name="paid-parking" value="paid-parking"/>
                        <label for="paid-parking">Платено паркиране</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="bike-lane" name="bike-lane" value="bike-lane"/>
                        <label for="bike-lane">Велоалея</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="pedestrian" name="pedestrian" value="pedestrian"/>
                        <label for="pedestrian">Само пешеходен</label>
                    </div>
                    <br/>
                </div>

                <div className="question" id="fence-question">
                    <label className="form-label" for="fence-question">6. Има ли ограда?</label>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeIsFenced} className="playground-input" id="yes" name="yes" value="true"/>
                        <label for="yes">Да</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeIsFenced} className="playground-input" id="no" name="no" value="false"/>
                        <label for="no">Не</label>
                    </div>
                    <br/>
                </div>
                <div className="question" id="floor-question">
                    <label className="form-label" for="floor-question">7. Каква е настилката</label>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeFloor} className="playground-input" id="asphalt" name="asphalt" value="asphalt"/>
                        <label for="asphalt">Асфалт / бетонни плочи</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeFloor} className="playground-input" id="grass" name="grass" value="grass"/>
                        <label for="asphalt">Тревна настилка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeFloor} className="playground-input" id="rubber" name="rubber" value="rubber"/>
                        <label for="asphalt">Ударопоглъщаща гумена настилка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeFloor} className="playground-input" id="mulch" name="mulch" value="mulch"/>
                        <label for="asphalt">Стърготини (мулч)</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="radio" onChange={changeFloor} className="playground-input" id="dirt" name="dirt" value="dirt"/>
                        <label for="asphalt">Без настилка (пръст)</label>
                    </div>
                    <br/>
                </div>

                <div className="question" id="swings-question">
                    <label className="form-label" for="swings-question">8. С какви катерушки разполага площадката?</label>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="combined" name="combined" value="combined"/>
                        <label for="combined">Комбинирано съоражение</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="slide" name="slide" value="slide"/>
                        <label for="slide">Пързалка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="swing" name="swing" value="swing"/>
                        <label for="swing">Люлка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="seesaw" name="seesaw" value="seesaw"/>
                        <label for="seesaw">Люлка-везна</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="spring-riders" name="spring-riders" value="spring-riders"/>
                        <label for="spring-riders">Пружинни клатушки</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="balance-beam" name="balance-beam" value="balance-beam"/>
                        <label for="balance-beam">Съоражение за катерене и баланс</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="climbing-wall" name="climbing-wall" value="climbing-wall"/>
                        <label for="climbing-wall">Стена за катерене</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="dynamic" name="dynamic" value="dynamic"/>
                        <label for="dynamic">Динамични съоражения за игра (батут, въжен "тролей")</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="accessible" name="accesible" value="accessible"/>
                        <label for="accessible">Съораженя, достъпни за деца с ограничени двигателни функции</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="house" name="house" value="house"/>
                        <label for="house">Детски къщичка и беседка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="go-round" name="go-round" value="go-round"/>
                        <label for="go-round">Въртележка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="tunnel" name="tunel" value="tunnel"/>
                        <label for="tunnel">Тунел</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="sandbox" name="sandbox" value="sandbox"/>
                        <label for="sandbox">Пясъчник и съоражения за игра с пясък</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" onChange={changeToys} className="playground-input" id="games" name="games" value="games"/>
                        <label for="games">Занимателни игри (ребуси, лабиринт, сметало)</label>
                    </div>
                    <br/>
                </div>

                <div className="question" id="facilities-question">
                    <label className="form-label" for="facilities-question">9. Други съоражения?</label>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="wc" name="wc" value="wc"/>
                        <label for="wc">Тоалетна</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="cafe" name="cafe" value="cafe"/>
                        <label for="cafe">Барче / кафене</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="bin" name="bin" value="bin"/>
                        <label for="bin">Koшче за боклук</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="fountain" name="fountain" value="fountain"/>
                        <label for="fountain">Чешма</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="bench" name="bench" value="bench"/>
                        <label for="bench">Пейка</label>
                    </div>
                    <br/>
                    <div className="choice">
                        <input type="checkbox" className="playground-input" id="bench" name="bench" value="bench"/>
                        <label for="others">Друго</label>
                    </div>
                    <br/>
                </div>

                <div className="question" id="description-question">
                <label className="form-label" for="description">10. Допълнително описание:</label>
                <br/>
                <textarea type="text" onChange={changeDescription} className="text-input" name="description" rows="10" cols="20"></textarea>
                </div>
                <div>
                    <h4>Посочете на картата мястото на площадката</h4>
                    <div id="map">
                        <Map/>
                    </div>
                </div>
                <div className="add-playground-btns">
                    <button id="add-playground-btn" type="submit" className="btn"><i className="fa-solid fa-plus"></i> Добави</button>
                    <button id="cancel-add-playground-btn" type="button" className="btn cancel" onclick="closeForm()"><i className="fa-solid fa-xmark"></i> Назад</button>
                </div>
            </form>
        </div>
</div>
)
}