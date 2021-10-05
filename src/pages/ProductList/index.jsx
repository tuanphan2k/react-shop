import { useEffect, useState } from "react";
import { Pagination, Input, Rate } from "antd";
import productApi from "../../api/productApi";
import ProductItem from "./components/ProductItem";
import "./styles.scss";

const { Search } = Input;

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [totalRow, setTotalRow] = useState();
  const [filterProduct, setFilterProduct] = useState({ _page: 1, _limit: 8 });
  const [filterCategory, setFilterCategory] = useState({ _page: 1, _limit: 5 });
  const [stringUrl, setStringUrl] = useState("");
  const [isShowBtnClear, setIsShowbtnClear] = useState(false);
  const [rateSelected, setRateSelected] = useState(null);
  const [priceSelected, setPriceSelected] = useState(null);
  const [typeList, setTypeList] = useState([]);
  const [typeSelected, setTypeSelected] = useState(null);
  const [subTypeSelected, setSubTypeSelected] = useState(null);

  useEffect(() => {
    const fetchProductList = async () => {
      const params = {
        ...filterProduct,
      };

      const response = await productApi.getProductList(params, stringUrl);
      setProductList(response.data);
      setTotalRow(response.headers["x-total-count"]);
    };

    fetchProductList();
  }, [filterProduct, stringUrl]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      const params = {
        ...filterCategory,
      };

      const response = await productApi.getCategoryList(params);
      setCategoryList(response.data);
    };
    fetchCategoryList();
  }, [filterCategory]);

  useEffect(() => {
    const fetchTypeList = async () => {
      const params = {
        _page: 1,
        _limit: 10,
      };

      const response = await productApi.getTypeList(params);
      setTypeList(response.data);
    };
    fetchTypeList();
  }, []);

  function renderProductList() {
    return productList.map((item, index) => {
      return (
        <ProductItem
          key={index}
          name={item.name}
          img={item.img}
          price={item.price}
          rate={item.rate}
        />
      );
    });
  }

  function renderCategoryList() {
    return categoryList.map((item, index) => {
      let isChecked = item.isChecked === "true";
      return (
        <label key={index}>
          <input
            className="mx-3"
            name={item.name}
            value={item.id}
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              handleCheckCategory(e);
            }}
          />
          {item.name}
        </label>
      );
    });
  }

  function renderOptionRate() {
    const arrRates = [2, 3, 4, 5];

    return arrRates.map((item) => {
      return (
        <div
          className={item === rateSelected ? "bg-light px-3" : "px-3"}
          key={item}
          onClick={(e) => {
            handleOptionRate(e, item);
          }}
        >
          <Rate disabled defaultValue={item} />
        </div>
      );
    });
  }

  function renderOptionPrices() {
    const arrPrices = [
      {
        start: 0,
        end: 80,
      },
      {
        start: 80,
        end: 200,
      },
      {
        start: 200,
        end: 500,
      },
      {
        start: 500,
        end: 1000,
      },
      {
        start: 1000,
        end: 99999,
      },
    ];

    return arrPrices.map((item, index) => {
      return (
        <div
          className={
            priceSelected === index ? "fw-bold text-danger px-3" : "px-3 fw-bold"
          }
          key={index}
          onClick={() => {
            handleOptionPrice(item, index);
          }}
        >
          {item.start !== 1000
            ? `$${item.start} - ${item.end}`
            : `≥ $${item.start}`}
        </div>
      );
    });
  }

  function renderTypeList() {
    if (typeList) {
      return typeList.map((item, index) => {
        return (
          <li
            className="nav-item"
            key={item.id}
            onClick={(e) => {
              handleType(item.id);
            }}
          >
            <span
              className={`${
                typeSelected === item.id
                  ? "nav-link fw-bold text-danger"
                  : "nav-link fw-bold"
              }`}
              data-bs-toggle="collapse"
              data-bs-target={`#menu_item${index + 1}`}
            >
              {item.name}
              <i className="bi small bi-caret-down-fill"></i>
            </span>
            <ul
              id={`menu_item${index + 1}`}
              className="submenu collapse fw-bold"
              data-bs-parent="#nav_accordion"
            >
              {renderSubTypeList(item)}
            </ul>
          </li>
        );
      });
    }
  }

  function renderSubTypeList(type) {
    if (type) {
      return type.subTypes.map((item) => {
        return (
          <li
            className={`${subTypeSelected === item.id ? "text-danger" : ""}`}
            key={item.id}
            onClick={(e) => {
              handleSubType(item.id, e);
            }}
          >
            <span className="nav-link">{item.name}</span>
          </li>
        );
      });
    }
  }

  function handleSelectOption(e) {
    const value = e.target.value;

    setFilterProduct({
      ...filterProduct,
      _sort: value !== "Featured" ? "price" : "",
      _order: value !== "Featured" ? value : "",
    });
  }

  function handleChangePagination(page) {
    setFilterProduct({
      ...filterProduct,
      _page: page,
    });
  }

  function handleSearch(e) {
    const value = e.target.value;

    setFilterProduct({
      ...filterProduct,
      q: value,
    });
  }

  function handleSearchCategory(e) {
    const value = e.target.value;

    setFilterCategory({
      ...filterCategory,
      q: value,
    });
  }

  function handleCheckCategory(e) {
    const categoryId = e.target.value;
    const status = e.target.checked;

    let newCategory = categoryList;
    newCategory.forEach((item) => {
      if (item.id == parseInt(categoryId)) {
        item.isChecked = `${status}`;
      }
    });

    setCategoryList(newCategory);

    if (status) {
      stringUrl === ""
        ? setStringUrl(stringUrl + `?categoryId=${categoryId}`)
        : setStringUrl(stringUrl + `&categoryId=${categoryId}`);
    } else {
      let indexStart = stringUrl.indexOf(`categoryId=${categoryId}`) - 1;
      let length = `categoryId=${categoryId}`.length;

      let firstString = stringUrl.slice(0, indexStart);
      let lastString = stringUrl.slice(indexStart + length + 1);
      let newStringUrl = firstString + lastString;

      newStringUrl.indexOf("&") === 0
        ? setStringUrl("?" + newStringUrl.slice(1))
        : setStringUrl(newStringUrl);
    }
    setIsShowbtnClear(true);
  }

  function handleClearFilter() {
    setIsShowbtnClear(false);
    setFilterProduct({ _page: 1, _limit: 8 });
    setFilterCategory({ _page: 1, _limit: 5 });
    setStringUrl("");

    let newCategoryList = categoryList;
    newCategoryList.forEach((item) => {
      item.isChecked = "false";
    });

    setRateSelected(null);
    setPriceSelected(null);
    setTypeSelected(null);
    setSubTypeSelected(null);
  }

  function handleOptionRate(e, rate) {
    setIsShowbtnClear(true);
    setRateSelected(rate);
    setFilterProduct({
      ...filterProduct,
      rate,
    });
  }

  function handleOptionPrice(item, index) {
    setIsShowbtnClear(true);
    setPriceSelected(index);
    setFilterProduct({
      ...filterProduct,
      price_gte: item.start,
      price_lte: item.end,
    });
  }

  function handleType(typeId) {
    let newFilter = filterProduct;
    if(newFilter.subTypeId) {
      delete newFilter["subTypeId"];
      setSubTypeSelected(null);
    }

    setIsShowbtnClear(true);
    setTypeSelected(typeId);
    setFilterProduct({
      ...newFilter,
      typeId,
    });
  }

  function handleSubType(subTypeId, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsShowbtnClear(true);
    setSubTypeSelected(subTypeId);
    setFilterProduct({
      ...filterProduct,
      subTypeId,
    });
  }

  return (
    <>
      <header className="header d-flex">
        <img
          src="https://community.algolia.com/instantsearch.js/v1/examples/e-commerce/logo-is.png"
          alt="logo"
        />
        <h1 className="header__logo">amazing</h1>
        <div className="header__search ">
          <div className="input-group">
            <input
              id="search-input"
              className="form-control form-control-md border-end-0 border rounded-pill rounded-end"
              type="text"
              placeholder="Search a product..."
              onChange={(e) => {
                handleSearch(e);
              }}
            />
            <span className="input-group-append">
              <button
                className="btn btn-warning btn-md border-start-0 rounded-pill rounded-start"
                type="button"
              >
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
      </header>
      <main className="main d-flex">
        <div className="main__sidebar">
          {isShowBtnClear ? (
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                handleClearFilter();
              }}
            >
              Clear All Filters
            </button>
          ) : (
            ""
          )}

          <div>
            <h5 className="text-muted">Show results for</h5>
            <div className="sidebar__type">
              <ul className="nav flex-column" id="nav_accordion">
                {renderTypeList()}
              </ul>
            </div>
          </div>
          <div>
            <h5 className="text-muted">Refine by</h5>
            <div>
              <p className="fw-bold my-2">Branch</p>
              <Search
                placeholder="input search text"
                onChange={(e) => {
                  handleSearchCategory(e);
                }}
                style={{ width: 200 }}
              />
              <div className="d-flex flex-column">{renderCategoryList()}</div>
            </div>
            <div>
              <p className="fw-bold my-2">Ratings</p>
              {renderOptionRate()}
            </div>
            <div className = "my-4">
              <p className="fw-bold my-2">Prices</p>
              {renderOptionPrices()}
            </div>
          </div>
        </div>
        <div className="main__container">
          <div className="container__top d-flex justify-content-between">
            <span className="text-dark">{totalRow} results found in 4ms</span>
            <div>
              <label htmlFor="sort">Sort by</label>
              <select
                onChange={(e) => {
                  handleSelectOption(e);
                }}
                className="mx-3"
                name="sort"
                id="sort"
              >
                <option defaultValue>Featured</option>
                <option value="asc">Price asc</option>
                <option value="desc">Price desc</option>
              </select>
            </div>
          </div>
          <div className="row mt-4">{renderProductList()}</div>
          <div className="paginagion d-flex justify-content-center align-items-center mb-5 mt-3">
            {totalRow / filterProduct._limit > 1 ? (
              <Pagination
                defaultCurrent={1}
                pageSize={filterProduct._limit}
                total={totalRow}
                onChange={(page) => {
                  handleChangePagination(page);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductList;
