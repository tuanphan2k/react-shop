import { Rate } from 'antd';

function ProductItem(prop) {
  const { name, price, rate, img } = prop;
  return (
    <div className="col-lg-3 col-md-4 my-2">
      <div className="card">
        <div className ="product__img d-flex justify-content-center align-items-center">
          <img className="card-img-top" src={img} alt="" />
        </div>
        <div className="card-body">
          <h5 className="card-title card__name">{name}</h5>
          <div className="d-flex justify-content-between">
            <Rate disabled defaultValue={rate} />
            <p className="card__price d-flex align-items-center">${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
