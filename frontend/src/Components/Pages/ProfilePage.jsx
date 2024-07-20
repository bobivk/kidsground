import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import '../../static/stylesheets/profilePage.css'

export const ProfilePage = () => {

    const [myPlaygrounds, setMyPlaygrounds] = useState([]);
    const [myComments, setMyComments] = useState([]);
    const [pendingPlaygrounds, setPendingPlaygrounds] = useState([]);
    const [existingPlaygrounds, setExistingPlaygrounds] = useState([]);
    const navigate = useNavigate();

    const ageGroups = Object.freeze({
        zero_to_three: "от 0 до 3",
        three_to_six: "от 3 до 6",
        three_to_twelve: "от 3 до 12",
        six_to_twelve: "от 6 до 12"
    })

    const shades = Object.freeze({
        fake: "Изкуствена сянка от съоръжение",
        trees: "Естествена сянка от дървета",
        none: "Няма сянка",
    })


    const fetchMyPlaygrounds = async () => {
        setMyPlaygrounds();
    }

    // const fetchMyComments = async () => {
    //     await fetch(`https://kidsground.bg:8009/v1/comments`).then(response => response.json()).then((data) => {
    //         setMyComments(data);  
    //     })
        
    // }

    const approvePlayground = async (id) => {
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/${id}/approve?isApproved=true`, {
            method: "POST"
        })
    }

    const disapprovePlayground = async (id) => {
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/${id}/approve?isApproved=false`, {
            method: "POST"
        })
    }

    const deletePlayground = async (id) => {
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/${id}`, {
            method: "DELETE"
        })
    }


    const fetchPendingPlaygrounds = async () => {
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/toApprove`).then(response => response.json()).then((data) => {
            setPendingPlaygrounds(data);  
        })
        
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/all`).then(response => response.json()).then((data) => {
            setExistingPlaygrounds(data);  
        })
    }

    useEffect(() => {

        fetchMyPlaygrounds();
        // fetchMyComments();
        if(Cookies.get("user") && Cookies.get("role") === "ADMIN") {
            fetchPendingPlaygrounds();
        }
    }, [])

    if(Cookies.get("user") && Cookies.get("role") === "ADMIN") {
        return (
            <div className="page">
                <h2>Площадки очакващи одобрение: </h2>
                <div className="table-container">
                    <table>
                        <tr>
                            <th>Име</th>
                            <th>Възрастова група</th>
                            <th>Местоположение</th>
                            <th>Сенчести зони</th>
                            <th>Транспорт</th>
                            <th>Оградена</th>
                            <th>Настилка</th>
                            <th>Катерушки</th>
                            <th>Други съоръжения</th>
                            <th>Координати</th>
                            <th></th>
                        </tr>
                    {pendingPlaygrounds && pendingPlaygrounds.map((playground) => (
                        <tr>
                            <td onClick={() => {navigate(`/playground/${playground.id}`)}} key={playground.id} className="playground-link">{playground.name}</td>
                            <td>{ageGroups[playground.age_group]}</td>
                            <td>{playground.environment}</td>
                            <td>{shades[playground.shade_type]}</td>
                            <td>{playground.transport.join(', ')}</td>
                            <td>{playground.hasFence ? "Оградена" : "Неоградена"}</td>
                            <td>{playground.floor_type.join(', ')}</td>
                            <td>{playground.toys.join(', ')}</td>
                            <td>{playground.facilities.join(', ')}</td>
                            <td>{playground.coordinates.lat}, {playground.coordinates.lng}</td>
                            <td>
                                <button onClick={() => {approvePlayground(playground.id)}}>✓</button>
                                <button onClick={() => {disapprovePlayground(playground.id)}}>✗</button>
                            </td>
                        </tr>
                    ))}
                    </table>
                </div>
                <h2>Моите Площадки: </h2>
                {myPlaygrounds && myPlaygrounds.map((playground) => {
                    
                })}
                <h2>Моите Коментари: </h2>
                {myComments && myComments.map((comment) => {
                    
                })}
                <h2>Съществуващи площадки: </h2>
                <div className="table-container">
                    <table>
                        <tr>
                            <th>Име</th>
                            <th>Възрастова група</th>
                            <th>Местоположение</th>
                            <th>Сенчести зони</th>
                            <th>Транспорт</th>
                            <th>Оградена</th>
                            <th>Настилка</th>
                            <th>Катерушки</th>
                            <th>Други съоръжения</th>
                            <th>Координати</th>
                            <th></th>
                        </tr>
                    {existingPlaygrounds && existingPlaygrounds.map((playground) => (
                        <tr>
                            <td onClick={() => {navigate(`/playground/${playground.id}`)}} key={playground.id} className="playground-link">{playground.name}</td>
                            <td>{ageGroups[playground.age_group]}</td>
                            <td>{playground.environment}</td>
                            <td>{shades[playground.shade_type]}</td>
                            <td>{playground.transport.join(', ')}</td>
                            <td>{playground.hasFence ? "Оградена" : "Неоградена"}</td>
                            <td>{playground.floor_type.join(', ')}</td>
                            <td>{playground.toys.join(', ')}</td>
                            <td>{playground.facilities.join(', ')}</td>
                            <td>{playground.coordinates.lat}, {playground.coordinates.lng}</td>
                            <td>
                                <button onClick={() => {deletePlayground(playground.id)}}>✗</button>
                            </td>
                        </tr>
                    ))}
                    </table>
                </div>
            </div>
        );
    }
    else if(Cookies.get("user") && Cookies.get("role") === "USER") {
        return( 
            <div className="page">
                <h2>Моите Площадки: </h2>
                {myPlaygrounds && myPlaygrounds.map((playground) => {
                    
                })}
                <h2>Моите Коментари: </h2>
                {/* {myComments && myComments.map((comment) => {
                    
                })} */}
            </div>
        );
    }
    else {
        return(
            <Navigate to="/login" />
        );
    }
}