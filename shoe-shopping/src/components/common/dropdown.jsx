export default function Dropdown({ options, id, callbackFunction, value }) {
  function hitCallBackFunction(e){
    callbackFunction(e);
  }
  return (
    <div className="wrapper" style={{ marginBottom: "25px" }}>
      <div className="form-group" style={{ margin: 0 }}>
        <select
          id={id}
          name={id}
          className="dropdownList"
          onChange={hitCallBackFunction}
        >
          {options.map((i, j) => {
            return (
              <option value={i.value} key={j}>
                {i.text}
              </option>
            );
          })}
        </select>
      </div>
      {/* <span className="error">{error}</span> */}
    </div>
  );
}