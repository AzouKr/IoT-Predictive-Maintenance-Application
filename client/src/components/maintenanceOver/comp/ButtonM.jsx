const ButtonM = ({ onClickHandler, value, id }) => {
    return (
      <button onClick={onClickHandler} value={value} className="btns">
        {id}
      </button>
    );
  };
  
  export default ButtonM;