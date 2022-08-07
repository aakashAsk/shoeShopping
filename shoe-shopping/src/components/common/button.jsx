export default function Button({ name, className, value }) {
  return (
    <div className="form-group form-button">
      <input
                type="submit"
        name={name}
        id={name}
        className={className}
        value={value}
      />
    </div>
  );
}