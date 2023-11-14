import React, { useEffect, useState } from "react";
import styles from "./Details.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createProduct,
  editProduct,
  getProduct,
} from "../../../services/productServices";
import { useDispatch } from "react-redux";

const Details = ({ token, productId }) => {
  const [product, setProduct] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  console.log(productId);
  const navigate = useDispatch();
  useEffect(() => {
    fetchData();
  }, [productId]);
  const fetchData = async () => {
    if (productId) {
      const res = await getProduct(token, productId);
      setProduct(res[0]);
      setName(res[0].name);
      setPrice(res[0].price);
      setCategory(res[0].category);
      setDescription(res[0].description);
      setImage(res[0].image);
    }
  };

  const onSubmit = async () => {
    try {
      const res = await editProduct(token, productId);
      console.log(res);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create</h1>
      <form onSubmit={onSubmit} method="PUT">
        <input
          placeholder="Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          placeholder="Price"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <input
          placeholder="Description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <input
          placeholder="Category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {/* <input
          type="file"
          placeholder="Image"
          name="image"
          multiple
          onChange={(e) => setImage(e.target.value)}
        /> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Details;
