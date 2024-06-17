import '../../static/stylesheets/modal.css'
export const Modal = ({onClose}) => {
    return (
        <div id="modal-overlay">
            <div id="modal">
                <h4>Вашата площадка беше създадена успешно и ще бъде показана на картата след одобрение от администратор</h4>
                <button onClick={onClose}>Затвори</button>
            </div>
        </div>
    )
}