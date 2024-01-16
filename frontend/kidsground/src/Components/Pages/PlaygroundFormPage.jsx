import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/playground.css'
import { Map } from '../Common/Map'

export const PlaygroundPage = () => {
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
                    <input type="radio" class="project-input project-input-radio" id="under-1" name="age-group" value="under-1"/>
                    <label for="under-1">Под 1г.</label>
                    <br/>
                    <input type="radio" class="project-input project-input-radio" id="1-3years" name="age-group" value="1-3years"/>
                    <label for="1-3years">1-3г.</label>
                    <br/>
                    <input type="radio" class="project-input project-input-radio" id="3-6years" name="age-group" value="3-6years"/>
                    <label for="3-6years">3-6г.</label>
                    <br/>
                    <input type="radio" class="project-input project-input-radio" id="6-12years" name="age-group" value="6-12years"/>
                    <label for="6-12years">6-12г.</label>
                    <br/>
                    <input type="radio" class="project-input project-input-radio" id="other-years" name="age-group" value="other-years"/>
                    <label for="other-years">Друго</label>
                    <br/>
                </div>

                <div class="question" id="location-question">
                    <label class="form-label" for="third-question">3. Какво е местоположението на детската площадка?</label>
                    <br/>
                    <input type="radio" class="project-input project-input-radio" id="boulevard" name="location" value="До голям булевард"/>
                    <label for="boulevard">До голям булевард</label>
                    <br/>
                    <input type="radio" class="project-input project-input-radio" id="park" name="location" value="В парк или градинка"/>
                    <label for="park">В парк или градинка</label>
                    <br/>
                    <input type="radio" class="project-input project-input-radio" id="apartments" name="location" value="В междублоково пространство"/>
                    <label for="apartments">В междублоково пространство</label>
                    <br/>
                    <input type="radio" class="project-input project-input-radio" id="other-place" name="location" value="Друго"/>
                    <label for="other-place">Друго</label>
                    <br/>
                </div>

                <div class="question" id="shade-question">
                    <label class="form-label" for="second-question">4. Има ли сенчести зони?</label>
                    <br/>
                    <input type="radio" class="project-input project-input-radio" id="tree-shade" name="location" value="естествена"/>
                    <label for="tree-shade">Да, естествена сянка от дървета</label>
                    <br/>
                    <input type="radio" class="project-input project-input-radio" id="fake-shade" name="location" value="изкуствена"/>
                    <label for="fake-shade">Да, изкуствена сянка от съоръжение</label>
                    <br/>
                    <input type="radio" class="project-input project-input-radio" id="no-shade" name="location" value="няма"/>
                    <label for="no-shade">Не, няма сянка</label>
                    <br/>
                </div>

                <div class="question" id="transport-question">
                    <label class="form-label" for="second-question">5. Какъв е транспортният достъп?</label>
                    <br/>
                    <input type="checkbox" class="project-input" id="free-parking" name="location" value="Свободно паркиране"/>
                    <label for="free-parking">Свободно паркиране</label>
                    <br/>
                    <input type="checkbox" class="project-input" id="fake-shade" name="location" value="Платено паркиране"/>
                    <label for="paid-parking">Платено паркиране</label>
                    <br/>
                    <input type="checkbox" class="project-input" id="no-shade" name="location" value="Велоалея"/>
                    <label for="cycle">Велоалея</label>
                    <br/>
                    <input type="checkbox" class="project-input" id="no-shade" name="location" value="Само пешеходен"/>
                    <label for="pedestrian">Само пешеходен</label>
                    <br/>
                </div>

                <div class="question" id="shade-question">
                    <label class="form-label" for="second-question">6. Има ли ограда</label>
                    <br/>
                    <input type="radio" class="project-input" id="yes" name="location" value="Да"/>
                    <label for="no">Да</label>
                    <br/>
                    <input type="radio" class="project-input" id="fake-shade" name="location" value="Не"/>
                    <label for="no">Не</label>
                    <br/>
                </div>

                <div class="question" id="description-question">
                <label class="form-label" for="description">9. Допълнително описание:</label>
                <br/>
                <textarea type="text" class="text-input" name="description" rows="10" cols="20"></textarea>
                </div>
            </form>

                <div class="question">
                    <h4>Посочете на картата мястото на площадката</h4>
                    <button onclick="showCurrentLocationPlayground()">Покажи моята локация</button>
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