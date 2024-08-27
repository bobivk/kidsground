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
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/byUser`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get("user")}`
            }
        }).then(response => response.json()).then((data) => {
            setMyPlaygrounds(data);  
        })
    }

    const fetchMyComments = async () => {
        await fetch(`https://kidsground.bg:8009/v1/comments/byUser`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get("user")}`
            }
        }).then(response => response.json()).then((data) => {
            setMyComments(data);  
        })
        
    }

    const approvePlayground = async (id) => {
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/${id}/approve?isApproved=true`, {
            method: "POST"
        })
        window.location.reload();
    }

    const disapprovePlayground = async (id) => {
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/${id}/approve?isApproved=false`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get("user")}`
            },
            method: "POST"
        })
        window.location.reload();
    }

    const deletePlayground = async (id) => {
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/${id}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get("user")}`
            },
            method: "DELETE"
        })
        window.location.reload();
    }


    const fetchPendingPlaygrounds = async () => {
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/toApprove`).then(response => response.json()).then((data) => {
            setPendingPlaygrounds(data);  
        })
        
        await fetch(`https://kidsground.bg:8009/v1/playgrounds/all`).then(response => response.json()).then((data) => {
            setExistingPlaygrounds(data);  
        })
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() is zero-based
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        if(Cookies.get("user")){
            fetchMyPlaygrounds();
            fetchMyComments();
        }
        if(Cookies.get("user") && Cookies.get("role") === "ADMIN") {
            fetchPendingPlaygrounds();
        }
    }, [])

    if(Cookies.get("user") && Cookies.get("role") === "ADMIN") {
        return (
            <div className="page table-page">
                <h2>Площадки очакващи одобрение: </h2>
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
                        <tr key={playground.id}>
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
                <h2>Моите Площадки: </h2>
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
                        </tr>
                    {myPlaygrounds && myPlaygrounds.map((playground) => (
                        <tr key={playground.id}>
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
                        </tr>
                    ))}
                    </table>
                <h2>Моите Коментари: </h2>
                    <table>
                        <tr>
                            <th>Текст</th>
                            <th>Рейтинг</th>
                            <th>Създаден на</th>
                        </tr>
                {myComments && myComments.map((comment) => (
                    <tr>
                        <td onClick={() => {navigate(`/playground/${comment.playground_id}`)}} className="playground-link">{comment.text ? comment.text : "Оставили сте само рейтинг"}</td>
                        <td>{comment.rating}</td>
                        <td>{formatDate(comment.createdAt)}</td>
                    </tr>
                ))}
                </table>
                <h2>Съществуващи площадки: </h2>
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
                        <tr key={playground.id}>
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
        );
    }
    else if(Cookies.get("user") && Cookies.get("role") === "USER") {
        return( 
            <div className="page table-page">
                <h2>Моите Площадки: </h2>
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
                        </tr>
                    {myPlaygrounds && myPlaygrounds.map((playground) => (
                        <tr key={playground.id}>
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
                        </tr>
                    ))}
                    </table>
                <h2>Моите Коментари: </h2>
                    <table>
                        <tr>
                            <th>Текст</th>
                            <th>Рейтинг</th>
                            <th>Създаден на</th>
                        </tr>
                {myComments && myComments.map((comment) => (
                    <tr>
                        <td onClick={() => {navigate(`/playground/${comment.playground_id}`)}} className="playground-link">{comment.text ? comment.text : "Оставили сте само рейтинг"}</td>
                        <td>{comment.rating}</td>
                        <td>{formatDate(comment.createdAt)}</td>
                    </tr>
                ))}
                </table>
            </div>
        );
    }
    else {
        return(
            <Navigate to="/login" />
        );
    }
}