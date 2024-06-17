import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/main.css'
import { Map } from '../Common/Map'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const HomePage = () => {

    const cities = ["Пловдив", "Пазарджик", "София", "Бургас", "Стара Загора", "Кърджали", "Асеновград", "Видин", "Варна", "Благоевград", "Хасково", "Враца", "Русе", "Сандански", "Гоце Делчев", "Сливен", "Ямбол"];
    const colors = ["#F24630", "#FECD1B", "#A3C939", "#4a8f9b"]
    const [currentCityIndex, setCurrentCityIndex] = useState(0);
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [fadeClass, setFadeClass] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0) 
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeClass('fade-out'); // Add the fade-out class
            setTimeout(() => {
                setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length)
                setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length)
                setFadeClass('fade-in');
            }, 500)

        }, 1000)

        return () => clearInterval(interval);
    })

    return(
        <div className="page">
            <div className="main-text">
                <h2>Нека открием</h2>
                <span className="title-text">
                    <h1 className="detskite">Детските </h1> 
                    <h1 className="ploshtadki">площадки </h1>
                </span>
                <h2>на <h2 className={fadeClass} style={{color: colors[currentColorIndex]}}>{cities[currentCityIndex]}</h2> заедно!</h2>
            </div>

            <div className="subtitle">
                <h3>Участвай и ти в създаването <br />
                на единна карта на детските <br />
                площадки на град <h3 className={fadeClass} style={{color: colors[currentColorIndex]}}>{cities[currentCityIndex]}</h3>!</h3>
            </div>
            <img className="background-img" src="background.jpg" />
            <div id="map-text">
                <div className="text-with-counter">
                        <div id="igrata">
                            <div id="igrata-inner">
                            <h2 className="map-title">Играта е най-добрият метод за учене!</h2>
                            <p className="map-page-main-text">Детските площадки са места,
                                                            където децата развиват важни
                                                            физически и социални умения,
                                                            необходими за придобиване на
                                                            самочувствие, координация и
                                                            развитие на критично мислене.</p>
                        </div>
                    </div>
                    <div className="number-of-playgrounds">
                        <div>
                            <div id="numberOfPlaygrounds">3928</div>
                            <div className="number-of-playgrounds-text">детски площадки</div>
                        </div>
                    </div>
                </div>
                <div id="map-wrapper">
                    <div id="map">
                        <Map onCoordinatesChange={()=> {}}/>
                        <div >
                            <Link to="/add"><button className="add-playground-btn add"> <i className="fa-regular fa-square-plus"></i>Добави детска площадка</button></Link>
                        </div>
                </div>
            </div>
            </div>
            <div id="about-us" className="container">
                <div className="left-outer-column">
                  <div className="left-inner-column">
                    <p>Какво?</p>
                  </div>
                  <p className="outer-text"> 
                    KIDSground е инициатива 
                    за създаване на дигитална 
                    карта на всички известни 
                    и неизвестни детски 
                    площадки в град Пловдив, 
                    като по този начин 
                    стимулира изграждането 
                    на единна онлайн 
                    платформа с вида, 
                    местоположението и състоянието 
                    на детските площадки в
                    града.</p>
                </div>
                <div className="middle-outer-column">
                  <div className="middle-inner-column">
                    <p>Защо?</p>
                  </div>
                  <p className="outer-text"> 
                    Липсва единна карта, която да отразява
                    всички детски площадки, 
                    тяхното състояние, 
                    налични съоръжения и 
                    проблеми свързани с тях. 
                    Дигиталното картиране 
                    на детските площадки ще 
                    даде ясна представа за 
                    районите в града, където 
                    такива липсват или са 
                    крайно недостатъчни.</p>
                </div>
                <div className="right-outer-column">
                  <div className="right-inner-column">
                    <p>Как?</p>
                  </div>
                  <p className="outer-text"> 
                    Отвори картата, 
                    отбележи площадка и 
                    отговори на краткия 
                    въпросник. Така би 
                    допринесъл за изграждане 
                    на подробна и полезна 
                    информационна 
                    платформа в реално време
                    за детските площадки в 
                    града, благодарение на 
                    колективната дейност и 
                    мобилизация.</p>
                </div>
              </div>
        </div>
        
    )
}