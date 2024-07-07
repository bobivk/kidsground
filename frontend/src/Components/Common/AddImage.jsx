import { ReactComponent as WarningIcon } from '../../static/icons/warning-sign.svg'

export const AddImage = ({onChangeImage}) => {

    if(localStorage.getItem("user")) {
        return (
            <div id="input-upload-wrapper">
                <div id="upload-wrapper">
                    <label className="upload-btn-wrapper">
                        <button className="btn">+</button>
                        <p className="btn-label">Добави снимки</p>
                    </label>
                    <input onChange={onChangeImage} id='input-wrapper' type="file" name="myfile" accept="image/*" multiple/>
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