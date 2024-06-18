import {Routes, Route} from "react-router-dom"
import { HomePage } from "../Pages/HomePage"
import { PlaygroundPage } from "../Pages/PlaygroundPage"
import { LoginPage } from "../Pages/LoginPage"
import { PlaygroundFormPage } from "../Pages/PlaygroundFormPage"

export const PageRoutes = () => {
    return(
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/playground/:id" element={<PlaygroundPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/add" element={<PlaygroundFormPage />} />
        </Routes>
    )
}