import React from "react";
import styles from "./Modal.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProduct } from "../../../services/productServices";
import { useNavigate } from "react-router-dom";

const Modal = ({ token, setToggle }) => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is require").trim(),
    price: Yup.string().required("This field is require").trim(),
    description: Yup.string().required("This field is require").trim(),
    category: Yup.string().required("This field is require").trim(),
    image: Yup.mixed().required("This field is require"),
    size: Yup.array().min(1, "Select atleast one option of your interest"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
      size: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("size", data.size);
        for (let i = 0; i < data.image.length; i++) {
          formData.append("image", data.image[i]);
        }

        const res = await createProduct(token, formData);
        console.log(res);
        navigate("/admin");
        setToggle(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className={styles.container}>
      <h1>Create</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          placeholder="Name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && (
          <p>{formik.errors.name}</p>
        )}
        <input
          placeholder="Price"
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
        {formik.errors.price && formik.touched.price && (
          <p>{formik.errors.price}</p>
        )}

        <select
          name="category"
          id="category"
          onChange={formik.handleChange}
          value={formik.values.category}
        >
          <option value="" label="Select a category">
            Select a category{" "}
          </option>
          <option value="pants">pants</option>
          <option value="shirt">shirt</option>
          <option value="t-shirt">T-shirt</option>
        </select>
        {formik.errors.category && formik.touched.category && (
          <p>{formik.errors.category}</p>
        )}
        <div className={styles.size}>
          <input
            type="checkbox"
            name="size"
            onChange={formik.handleChange}
            value="s"
          />
          <label for="s">S</label>
          <input
            type="checkbox"
            name="size"
            onChange={formik.handleChange}
            value="m"
          />
          <label for="m">M</label>
          <input
            type="checkbox"
            name="size"
            onChange={formik.handleChange}
            value="l"
          />
          <label for="l">L</label>
        </div>
        <textarea
          placeholder="Description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description && formik.touched.description && (
          <p>{formik.errors.description}</p>
        )}
        <input
          type="file"
          placeholder="Image"
          name="image"
          multiple
          onChange={(e) => {
            console.log(e.target.files);
            formik.setFieldValue("image", e.target.files);
            console.log(formik.values);
          }}
        />
        {formik.errors.image && formik.touched.image && (
          <p>{formik.errors.image}</p>
        )}
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Modal;
