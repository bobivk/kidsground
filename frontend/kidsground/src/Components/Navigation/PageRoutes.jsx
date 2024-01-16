import {Routes, Route} from "react-router-dom"
import { HomePage } from "../Pages/HomePage"
import { PlaygroundPage } from "../Pages/PlaygroundPage"

export const PageRoutes = () => {
    return(
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/playground" element={<PlaygroundPage />} />
        </Routes>
    )
}