import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playgroundForm.css'
import { Map } from '../Common/Map'

export const PlaygroundFormPage = () => {
    return(
    <div id="page">
        <div id="add-playground">
        <h2>Добави площадка</h2>
        <div>
            <form id="playground-form" class="form-container">
                
                <div class="question">
                    <label class="form-label" for="name-question">1. Име:</label>
                    <br/>
                    <input id="playground-name" type="text" class="text-input" placeholder="Име на площадката, ако има такова." name="name"/>
                </div>

                <div class="question" id="age-group-question">
                    <label class="form-label" for="second-question">2. За каква възрастова група е подходяща площадката?</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="under-1" name="age-group" value="under-1"/>
                    <label for="under-1">Под 1г.</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="1-3years" name="age-group" value="1-3years"/>
                    <label for="1-3years">1-3г.</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="3-6years" name="age-group" value="3-6years"/>
                    <label for="3-6years">3-6г.</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="6-12years" name="age-group" value="6-12years"/>
                    <label for="6-12years">6-12г.</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="other-years" name="age-group" value="other-years"/>
                    <label for="other-years">Друго</label>
                    <br/>
                </div>

                <div class="question" id="location-question">
                    <label class="form-label" for="third-question">3. Какво е местоположението на детската площадка?</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="boulevard" name="boulevard" value="boulevard"/>
                    <label for="boulevard">До голям булевард</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="park" name="park" value="park"/>
                    <label for="park">В парк или градинка</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="apartments" name="apartments" value="apartments"/>
                    <label for="apartments">В междублоково пространство</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="other-place" name="other-place" value="other-place"/>
                    <label for="other-place">Друго</label>
                    <br/>
                </div>

                <div class="question" id="shade-question">
                    <label class="form-label" for="second-question">4. Има ли сенчести зони?</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="tree-shade" name="tree-shade" value="tree-shade"/>
                    <label for="tree-shade">Да, естествена сянка от дървета</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="fake-shade" name="fake-shade" value="fake-shade"/>
                    <label for="fake-shade">Да, изкуствена сянка от съоръжение</label>
                    <br/>
                    <input type="radio" class="playground-input playground-input-radio" id="no-shade" name="no-shade" value="no-shade"/>
                    <label for="no-shade">Не, няма сянка</label>
                    <br/>
                </div>

                <div class="question" id="transport-question">
                    <label class="form-label" for="second-question">5. Какъв е транспортният достъп?</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="free-parking" name="location" value="free-parking"/>
                    <label for="free-parking">Свободно паркиране</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="paid-parking" name="paid-parking" value="paid-parking"/>
                    <label for="paid-parking">Платено паркиране</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="bike-lane" name="bike-lane" value="bike-lane"/>
                    <label for="bike-lane">Велоалея</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="pedestrian" name="pedestrian" value="pedestrian"/>
                    <label for="pedestrian">Само пешеходен</label>
                    <br/>
                </div>

                <div class="question" id="shade-question">
                    <label class="form-label" for="shade-question">6. Има ли ограда</label>
                    <br/>
                    <input type="radio" class="playground-input" id="yes" name="yes" value="yes"/>
                    <label for="yes">Да</label>
                    <br/>
                    <input type="radio" class="playground-input" id="no" name="no" value="no"/>
                    <label for="no">Не</label>
                    <br/>
                </div>
                
                <div class="question" id="floor-question">
                    <label class="form-label" for="floor-question">7. Каква е настилката</label>
                    <br/>
                    <input type="radio" class="playground-input" id="asphalt" name="asphalt" value="asphalt"/>
                    <label for="asphalt">Асфалт / бетонни плочи</label>
                    <br/>
                    <br/>
                    <input type="radio" class="playground-input" id="grass" name="grass" value="grass"/>
                    <label for="asphalt">Тревна настилка</label>
                    <br/>
                    <br/>
                    <input type="radio" class="playground-input" id="rubber" name="rubber" value="rubber"/>
                    <label for="asphalt">Ударопоглъщаща гумена настилка</label>
                    <br/>
                    <br/>
                    <input type="radio" class="playground-input" id="mulch" name="mulch" value="mulch"/>
                    <label for="asphalt">Стърготини (мулч)</label>
                    <br/>
                    <br/>
                    <input type="radio" class="playground-input" id="dirt" name="dirt" value="dirt"/>
                    <label for="asphalt">Без настилка (пръст)</label>
                    <br/>
                </div>

                <div class="question" id="swings-question">
                    <label class="form-label" for="swings-question">8. С какви катерушки разполага площадката?</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="combined" name="combined" value="combined"/>
                    <label for="combined">Комбинирано съоражение</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="slide" name="slide" value="slide"/>
                    <label for="slide">Пързалка</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="swing" name="swing" value="swing"/>
                    <label for="swing">Люлка</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="seesaw" name="seesaw" value="seesaw"/>
                    <label for="seesaw">Люлка-везна</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="spring-riders" name="spring-riders" value="spring-riders"/>
                    <label for="spring-riders">Пружинни клатушки</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="balance-beam" name="balance-beam" value="balance-beam"/>
                    <label for="balance-beam">Съоражение за катерене и баланс</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="climbing-wall" name="climbing-wall" value="climbing-wall"/>
                    <label for="climbing-wall">Стена за катерене</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="dynamic" name="dynamic" value="dynamic"/>
                    <label for="dynamic">Динамични съоражения за игра (батут, въжен "тролей")</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="accessible" name="accesible" value="accessible"/>
                    <label for="accessible">Съораженя, достъпни за деца с ограничени двигателни функции</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="house" name="house" value="house"/>
                    <label for="house">Детски къщичка и беседка</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="go-round" name="go-round" value="go-round"/>
                    <label for="go-round">Въртележка</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="tunnel" name="tunel" value="tunnel"/>
                    <label for="tunnel">Тунел</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="sandbox" name="sandbox" value="sandbox"/>
                    <label for="sandbox">Пясъчник и съоражения за игра с пясък</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="games" name="games" value="games"/>
                    <label for="games">Занимателни игри (ребуси, лабиринт, сметало)</label>
                    <br/>
                </div>

                <div class="question" id="facilities-question">
                    <label class="form-label" for="facilities-question">9. Какъв е транспортният достъп?</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="wc" name="wc" value="wc"/>
                    <label for="wc">Тоалетна</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="cafe" name="cafe" value="cafe"/>
                    <label for="cafe">Барче / кафене</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="bin" name="bin" value="bin"/>
                    <label for="bin">Koшче за боклук</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="fountain" name="fountain" value="fountain"/>
                    <label for="fountain">Чешма</label>
                    <br/>
                    <input type="checkbox" class="playground-input" id="bench" name="bench" value="bench"/>
                    <label for="fountain">Пейка</label>
                    <br/>
                </div>

                <div class="question" id="description-question">
                <label class="form-label" for="description">10. Допълнително описание:</label>
                <br/>
                <textarea type="text" class="text-input" name="description" rows="10" cols="20"></textarea>
                </div>
            </form>

                <div class="question">
                    <h4>Посочете на картата мястото на площадката</h4>
                    <div id="map">
                        <Map/>
                    </div>
                </div>

                <div class="add-playground-btns">
                    <button id="add-playground-btn" type="submit" class="btn"><i class="fa-solid fa-plus"></i> Добави</button>
                    <button id="cancel-add-playground-btn" type="button" class="btn cancel" onclick="closeForm()"><i class="fa-solid fa-xmark"></i> Назад</button>
                </div>
        </div>
</div>
</div>
)
}