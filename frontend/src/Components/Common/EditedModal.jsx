import '../../static/stylesheets/modal.css'
export const Modal = ({ onClose }) => {
    return (
        <div id="modal-overlay">
            <div id="modal">
                <h4>Площадката беше променена успешно и отново ще бъде показана на картата след одобрение от администратор</h4>
                <button onClick={onClose}>Затвори</button>
            </div>
        </div>
    )
}