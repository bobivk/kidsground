import {Routes, Route} from "react-router-dom"
import { HomePage } from "../Pages/HomePage"

export const PageRoutes = () => {
    return(
        <Routes>
            <Route exact path="/" element={<HomePage />} />
        </Routes>
    )
}