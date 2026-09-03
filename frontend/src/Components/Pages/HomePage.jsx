import { Map } from '../Common/Map'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


export const HomePage = () => {

    const navigate = useNavigate();
    const cities = ["Пловдив", "Пазарджик", "София", "Бургас", "Стара Загора", "Кърджали", "Асеновград", "Видин", "Варна", "Благоевград", "Хасково", "Враца", "Русе", "Сандански", "Гоце Делчев", "Сливен", "Ямбол", "Добрич", "Шумен", "Плевен", "Велико Търново", "Монтана", "Ловеч", "Габрово", "Разград", "Силистра", "Кюстендил", "Смолян"];
    const colors = ["#F24630", "#FECD1B", "#A3C939", "#4a8f9b"]
    const [currentCityIndex, setCurrentCityIndex] = useState(0);
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [fadeClass, setFadeClass] = useState('');
    const [playgroundCount, setPlaygroundCount] = useState('');


    const fetchPlaygroundNumber = async () => {
        await fetch("https://kidsground.bg:8009/v1/playgrounds/count").then(response => response.json())
            .then(data => setPlaygroundCount(data));
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = "Kidsground"
    }, [])

    useEffect(() => {
        fetchPlaygroundNumber()
        const interval = setInterval(() => {
            setFadeClass('fade-out'); // Add the fade-out class
            setTimeout(() => {
                setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length)
                setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length)
                setFadeClass('fade-in');
            }, 500)

        }, 1500)

        return () => clearInterval(interval);
    }, [playgroundCount])

    return (
        <main className="page">
            <header className="main-text">
                <h2>Нека открием</h2>
                <h1 className="title-text">
                    <span className="detskite">Детските </span>
                    <span className="ploshtadki">площадки </span>
                </h1>
                <h2>на <span className={fadeClass} style={{ color: colors[currentColorIndex], display: "inline" }}>{cities[currentCityIndex]}</span> заедно!</h2>
            </header>

            <div className="subtitle">
                <h3>Участвай и ти в създаването <br />
                    на единна карта на детските <br />
                    площадки на България!</h3>
            </div>
            <img className="background-img" src="background.jpg" alt="background" />
            <section id="map-text">
                <section className="text-with-counter">
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
                            <div id="numberOfPlaygrounds">{playgroundCount}</div>
                            <p className="number-of-playgrounds-text">детски площадки</p>
                        </div>
                    </div>
                </section>
                <div id="map-wrapper">
                    <section id="map">
                        <Map onCoordinatesChange={() => { }} />
                        <div>
                            <button className="add-playground-btn add" onClick={() => navigate('/add')}> <i className="fa-regular fa-square-plus"></i>Добави детска площадка</button>
                        </div>
                    </section>
                </div>
            </section>
            <section id="about-us" className="container">
                <section className="left-outer-column">
                    <div className="left-inner-column">
                        <h2>Какво?</h2>
                    </div>
                    <p className="outer-text">
                        KIDSground е инициатива
                        за създаване на дигитална
                        карта на всички известни
                        и неизвестни детски
                        площадки в България,
                        като по този начин
                        стимулира изграждането
                        на единна онлайн
                        платформа с вида,
                        местоположението и състоянието
                        на детските площадки в
                        града.</p>
                </section>
                <section className="middle-outer-column">
                    <div className="middle-inner-column">
                        <h2>Защо?</h2>
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
                </section>
                <section className="right-outer-column">
                    <div className="right-inner-column">
                        <h2>Как?</h2>
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
                </section>
            </section>
            <footer className="social-icons">
                <ul>
                    <li>
                        <a href="https://www.facebook.com/profile.php?id=61552317088801" target="_blank" rel="noreferrer">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
                        </a>
                    </li>
                    <li>
                        <a href="https://instagram.com/kidsground.bg" target="_blank" rel="noreferrer">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
                        </a>
                    </li>
                    <li>
                        <a href="mailto:info@kidsground.bg" target="_blank" rel="noreferrer">
                            <img src="https://kidsground-permanent-images-bucket-rtyjfdnfxxdgfrq34231fngdhrz.s3.eu-central-1.amazonaws.com/gmail.png" alt="Email Icon" />
                        </a>
                    </li>
                </ul>
            </footer>
        </main>

    )
}