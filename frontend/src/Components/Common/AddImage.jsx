import { ReactComponent as WarningIcon } from '../../static/icons/warning-sign.svg'
import Cookies from "js-cookie"

export const AddImage = ({onChangeImage, confirmation, sendPhotos, noButtonEvent}) => {

    if(Cookies.get("user")) {
        return (
            <div id="input-upload-wrapper">
                <div id="upload-wrapper">
                    {!confirmation && <label className="upload-btn-wrapper">
                        <button className="btn">+</button>
                        <p className="btn-label">Добави снимки</p>
                        <input onChange={onChangeImage} id='input-wrapper' type="file" name="myfile" accept="image/*" multiple/>
                    </label>}
                    {confirmation && <label className="upload-btn-wrapper">
                        <button className="btn">?</button>
                        <p className="btn-label">Сигурни ли сте че искате да качите тези снимки?</p>
                        <button onClick={sendPhotos}>Да</button>
                        <button onClick={noButtonEvent}>Не</button>
                    </label>} 
                </div>
            </div>
        )
    } else {
        return (
            <div id="warning-wrapper">
                <div id="warning">
                    <WarningIcon id="warning-icon" style={{fill: "#FECD1B", marginTop: "17px", marginRight: "20px"}}/>
                    <p id="warning-text">За да добавите снимки, трябва да сте влезли профила си.</p>
                </div>
            </div>
        )
    }
    
}