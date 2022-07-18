export default function TextBox({ icon, type, name, placeholder, error, callbackFunction, value }) {
  function hitCallBackFunction(e){
    callbackFunction(e);
  }
  return (
    <div className="wrapper" style={{ marginBottom: "25px" }}>
      <div className="form-group" style={{ margin: 0 }}>
        <label htmlFor={name}>
          {/* <i className={`zmdi material-icons-name ${icon}`}></i> */}
          <i class={`fa fa-${icon}`} aria-hidden="true"></i>
        </label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={hitCallBackFunction}
        />
      </div>
      {/* <span className="error">{error}</span> */}
    </div>
  );
}