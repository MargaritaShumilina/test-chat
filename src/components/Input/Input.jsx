import "./Input.css";

function Input({ value, onChange, onClick, onKeyDown }) {
    return (
        <div className="chat__input-panel">
            <input
                className="chat__input"
                placeholder="Напишите ваше сообщение..."
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <button className="chat__go-btn" onClick={onClick} type="button">
                Go
            </button>
</div> );
}

export default Input;