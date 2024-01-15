import '../../static/stylesheets/styles.css'
import { Map } from '../Common/Map'

export const HomePage = () => {
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
                            <h2 className="map-title">Играта е <br /> най-добрият <br /> метод за учене!</h2>
                            <p className="map-page-main-text">Детските площадки са места, <br />
                                                            където децата развиват важни<br />
                                                            физически и социални умения, <br /> 
                                                            необходими за придобиване на <br />
                                                            самочувствие, координация и <br />
                                                            развитие на критично мислене.</p>
                        </div>
                    </div>
                    <div className="number-of-playgrounds">
                        <div>
                            <div id="numberOfPlaygrounds">3 928</div>
                            <div className="number-of-playgrounds-text">детски площадки</div>
                        </div>
                    </div>
                </div>
                <div id="map-wrapper">
                    <div id="map">
                        <Map/>
                        <div className="add-playground-btn">
                            <button onClick="openPlaygroundForm()"> <i className="fa-regular fa-square-plus"></i> ДОБАВЕТЕ ДЕТСКА ПЛОЩАДКА</button>
                        </div>
                </div>
            </div>
            </div>
        </div>
        
    )
}