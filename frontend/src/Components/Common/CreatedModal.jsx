export const Modal = ({ onClose }) => {
    return (
        <section id="modal-overlay">
            <div id="modal" role="dialog" aria-modal="true">
                <h4>Вашата площадка беше създадена успешно и ще бъде показана на картата след одобрение от администратор</h4>
                <button onClick={onClose}>Затвори</button>
            </div>
        </section>
    )
}