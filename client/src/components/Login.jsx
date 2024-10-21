import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../store/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate(); 
  const {storeTokenInLS} = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        let res_data = await response.json();
        // console.log("response from server", res_data);
        storeTokenInLS(res_data.token);

        navigate("/home2");
        alert("Sucessfull login");
        // console.log(res);
      } else {
        alert("Invalid credentail");
        // console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h1>LOGIN</h1>

        <input
          placeholder="Email"
          {...register("email", {
            required: { value: true, message: "Please fill" },
            minLength: { value: 3, message: "Min length is 3" },
            maxLength: { value: 20, message: "Max length is 20" },
          })}
          type="text"
          className="input-field"
        />
        {errors.email && <div className="error">{errors.email.message}</div>}

        <input
          placeholder="Password"
          {...register("password", {
            required: { value: true, message: "Please fill" },
            minLength: 8,
            maxLength: 15,
          })}
          type="password"
          className="input-field"
        />
        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}

        <input
          disabled={isSubmitting}
          type="submit"
          value="Submit"
          className="submit-btn"
        />
      </form>
    </div>
  );
};

export default Login;
