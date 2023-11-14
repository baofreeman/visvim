import React, { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import { deleteProduct, getAllProducts } from "../../services/productServices";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions/product";
import Modal from "./Modal/Modal";
import Details from "./Details/Details";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.productReducer.products);
  const Token = useSelector((state) => state.userReducer.token);
  const [toggle, setToggle] = useState(false);
  const [edit, setEdit] = useState(false);
  const [destroy, setDestroy] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();
  console.log(Token);
  // useEffect(() => {
  //   fetchData();
  //   console.log(Token);
  // }, [Token]);
  // console.log(ProductList);
  // const fetchData = async () => {
  //   try {
  //     if (Token) {
  //       const res = await getAllProducts(Token);
  //       dispatch(setProducts(res?.products));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleCreate = () => {
    setToggle(!toggle);
  };

  const handleEdit = (e) => {
    setEdit(!edit);
    setId(e);
  };
  const handleDelete = async (e) => {
    const res = await deleteProduct(Token, e);
    navigate("/admin");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>All Product</div>
      <div className={styles.create} onClick={() => handleCreate()}>
        Create Product
      </div>
      <div className={styles.items}>
        <div className={styles.item}>
          <table>
            <thead className={styles.heading}>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ProductList &&
                ProductList.map((item, i) => {
                  return (
                    <tr>
                      <th scope="row">{i}</th>
                      <td>
                        <img
                          src={`http://localhost:8080/products/${item?.image[0]}`}
                        />
                      </td>
                      <td className={styles.des}>{item?.name}</td>
                      <td>{item?.price}</td>
                      <td className={styles.des}>{item?.description}</td>
                      <td className={styles.des}>{item?.category}</td>
                      <td onClick={() => handleEdit(item?._id)}>EDIT</td>
                      <td onClick={() => handleDelete(item?._id)}>DELETE</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {toggle && (
        <div className={styles.modal}>
          <Modal token={Token} setToggle={setToggle} />
        </div>
      )}
      {edit && (
        <div className={styles.modal}>
          <Details token={Token} productId={id} />
        </div>
      )}
    </div>
  );
};

export default Admin;
