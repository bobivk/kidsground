import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/main.css'
import { Map } from '../Common/Map'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export const HomePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return(
        <div className="page">
            <div className="main-text">
                <h2>Нека открием</h2>
                <span className="title-text">
                    <h1 className="detskite">Детските </h1> 
                    <h1 className="ploshtadki">площадки </h1>
                </span>
                <h2>на Пловдив заедно!</h2>
            </div>

            <div className="subtitle">
                <h3>Участвай и ти в създаването <br />
                на единна карта на детските <br />
                площадки на град Пловдив!</h3>
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
                        <Map/>
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