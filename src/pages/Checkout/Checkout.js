import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { createOrder } from "../../services/orderServices";
import {
  apiGetPublicDisTrict,
  apiGetPublicProvinces,
} from "../../services/addressServices";

const Checkout = () => {
  const Cart = useSelector((state) => state.cartReducer.cart);
  const [total, setTotal] = useState();
  const [message, setMessage] = useState();
  const [provinces, setProvinces] = useState();
  const [province, setProvince] = useState();
  const [districts, setDistricts] = useState();
  const [district, setDistrict] = useState();
  console.log(Cart);
  useEffect(() => {
    price();
  }, []);

  useEffect(() => {
    const fetchDataProvinces = async () => {
      const res = await apiGetPublicProvinces();
      console.log(res);
      setProvinces(res?.data.results);
    };
    fetchDataProvinces();
  }, []);

  useEffect(() => {
    const fetchDataDistricts = async () => {
      const res = await apiGetPublicDisTrict(province);
      console.log(res);
      setDistricts(res?.data.results);
    };
    fetchDataDistricts();
  }, [province]);
  const dataProvinces = provinces?.map((province) => {
    return {
      value: province.province_name,
      label: province.province_name,
      key: province.province_id,
    };
  });
  const dataDistricts = districts?.map((district) => {
    return {
      value: district.district_name,
      label: district.district_name,
      key: district.district_id,
    };
  });
  const price = () => {
    let price = 0;
    Cart?.map((item) => {
      price = parseFloat(item.price) * item.quantity + price;
    });
    setTotal(price);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("This field is require")
      .min(3, "Must be 4 character or more".trim()),
    email: Yup.string()
      .required("This field is require")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a validate"
      )
      .trim(),
    country: Yup.string().required("This field is require"),
    district: Yup.string().required("This field is require"),
    note: Yup.string().max(255, "Less than 255 characters").trim(),
    phone: Yup.string()
      .required("This field is require")
      .matches(
        /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
        "Must be a valid phone number"
      )
      .trim(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country: "",
      district: "",
      phone: "",
      note: "",
      paymentMethod: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (e) => {
      const items = Cart.map((item) => {
        return {
          productId: item?._id,
          quantity: item?.quantity,
          size: item?.size,
        };
      });
      console.log(e);
      if (items.length) {
        const data = {
          email: e.email,
          billingAddress: {
            name: e.name,
            country: e.country,
            district: e.district,
            phone: e.phone,
            paymentMethod: e.paymentMethod,
          },
          items: items,
          note: e.note,
          total: total,
        };
        console.log(data);
        const res = await createOrder(data);
        console.log(res);
      } else {
        console.log(message);
        setMessage("ban chua co san pham");
      }
      // localStorage.removeItem("cartVisvim");
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.billing}>
        <h1>CHECKOUT</h1>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="UserName"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className={styles.error}>{formik.errors.name}</p>
          )}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={styles.error}>{formik.errors.email}</p>
          )}
          <select
            id="country"
            name="country"
            onChange={(option) => {
              console.log(option?.target.value);
              formik.setFieldValue("country", option?.target.value);
              const selectedIndex = option.target.options.selectedIndex;
              setProvince(
                option.target.options[selectedIndex].getAttribute("data-key")
              );
            }}
          >
            {dataProvinces &&
              dataProvinces?.map((item) => {
                return (
                  <option
                    data-key={item?.key}
                    key={item?.key}
                    value={item?.value}
                  >
                    {item?.label}
                  </option>
                );
              })}
          </select>
          {formik.touched.country && formik.errors.country && (
            <p className={styles.error}>{formik.errors.country}</p>
          )}
          <select
            id="district"
            name="district"
            onChange={(option) => {
              formik.setFieldValue("district", option?.target.value);
              setDistrict(option?.target.value);
            }}
          >
            {dataDistricts &&
              dataDistricts?.map((item) => {
                return <option value={item?.value}>{item?.value}</option>;
              })}
          </select>
          {formik.touched.district && formik.errors.district && (
            <p className={styles.error}>{formik.errors.district}</p>
          )}

          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className={styles.error}>{formik.errors.phone}</p>
          )}
          <input
            id="paymentMethod"
            name="paymentMethod"
            type="text"
            placeholder="PaymentMethod"
            onChange={formik.handleChange}
            value={formik.values.paymentMethod}
          />
          {formik.touched.paymentMethod && formik.errors.paymentMethod && (
            <p className={styles.error}>{formik.errors.paymentMethod}</p>
          )}
          <input
            id="note"
            name="note"
            type="text"
            placeholder="note"
            onChange={formik.handleChange}
            value={formik.values.note}
          />
          {formik.touched.note && formik.errors.note && (
            <p className={styles.error}>{formik.errors.note}</p>
          )}
          <p className={styles.policy}>
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p>
          <button type="submit">Submit</button>
        </form>
        <span>{message}</span>
      </div>
      {/* <div className={styles.cart}>
        {Cart.map((item, i) => {
          return (
            <div key={i} className={styles.item}>
              <div className={styles.image}>
                <img src={`http://localhost:8080/products/${item?.image[0]}`} />
                <h2 className={styles.quantity}>{item?.quantity}</h2>
              </div>
              <h1>{item?.name}</h1>
              <h2>{item?.price * item?.quantity}</h2>
            </div>
          );
        })}
        <div className={styles.total}>TOTAL: {total}</div>
        
      </div> */}
    </div>
  );
};

export default Checkout;
