import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const ProfilePage = () => {

    const [myPlaygrounds, setMyPlaygrounds] = useState([])
    const [myComments, setMyComments] = useState([])
    const [pendingPlaygrounds, setPendingPlaygrounds] = useState([])

    const fetchMyPlaygrounds = async () => {
        setMyPlaygrounds();
    }

    const fetchMyComments = async () => {
        setMyComments();
    }

    const fetchPendingPlaygrounds = async () => {
        setPendingPlaygrounds();
    }

    useEffect(() => {

        fetchMyPlaygrounds();
        fetchMyComments();
        if(Cookies.get("user") && Cookies.get("role") === "ADMIN") {
            fetchPendingPlaygrounds();
        }   
    })

    if(Cookies.get("user") && Cookies.get("role") === "ADMIN") {
        return (
            <div className="page">
                <h2>Площадки очакващи одобрение: </h2>
                {pendingPlaygrounds && pendingPlaygrounds.map((playground) => {

                })}
                <h2>Моите Площадки: </h2>
                {myPlaygrounds && myPlaygrounds.map((playground) => {
                    
                })}
                <h2>Моите Коментари: </h2>
                {myComments && myComments.map((comment) => {
                    
                })}
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
                {myComments && myComments.map((comment) => {
                    
                })}
            </div>
        );
    }
    else {
        return(
            <Navigate to="/login" />
        );
    }
}