import "./Clear.css";

function Clear({ onClick }) {
    return (
        <button className='chat__clear-btn' onClick={onClick}>
            Clear
        </button>
    );
}

export default Clear;