import { useState } from 'react'
import { ReactComponent as WarningIcon } from '../../static/icons/warning-sign.svg'
import Cookies from "js-cookie"

export const AddImage = ({ onChangeImage, confirmation, sendPhotos, noButtonEvent }) => {

    const [upload, setUpload] = useState(false);

    if (Cookies.get("user")) {
        return (
            <section id="input-upload-wrapper">
                {!confirmation && <div id="upload-wrapper">
                    <label className="upload-btn-wrapper">
                        <button className="btn">+</button>
                        <p className="btn-label">Добави снимки</p>
                        <input onChange={onChangeImage} id='input-wrapper' type="file" name="myfile" accept="image/*" multiple />
                    </label>

                </div>}
                {confirmation && !upload && <div id="confirm-wrapper">
                    <label className="confirm-btn-wrapper">
                        <p className="btn-label">Сигурни ли сте че искате да качите тези снимки?</p>
                        <button className="confirm-btn" onClick={typeof (sendPhotos) === "function" ? sendPhotos : () => { setUpload(true) }}>✓</button>
                        <button className="confirm-btn" onClick={noButtonEvent}>✗</button>
                    </label>
                </div>}
                {upload && <div id="confirm-wrapper">
                    <label className="confirm-btn-wrapper">
                        <p className="confirm">✓</p>
                        <p className="btn-label">Благодарим ви снимките успешно са качени</p>
                    </label>
                </div>}
            </section>
        )
    } else {
        return (
            <section id="warning-wrapper">
                <div id="warning">
                    <WarningIcon id="warning-icon" style={{ fill: "#FECD1B", marginTop: "17px", marginRight: "20px" }} />
                    <p id="warning-text">За да добавите снимки, трябва да сте влезли профила си.</p>
                </div>
            </section>
        )
    }

}