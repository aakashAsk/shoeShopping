export default function Product(){
  return (
    <div className="productBox">
      <div className="imageBox">
        <img src="/images/products/product.jpg" />
      </div>
      <div className="infoBox">
        <p className="title">Endeavor Daytrip Backpack</p>
        <div className="priceBox">
          <p className="disPrice" style={{ textDecoration: "line-through" }}>
            &#8377; 200
          </p>
          <p className="price">
            &#8377; 100
          </p>
        </div>
      </div>
      <div className="buttonBox">
        <button className="reserveButton">reserve</button>
      </div>
    </div>
  );
}