import React from 'react'
import { useForm  } from "react-hook-form"
import "./Signup.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';


const Signup = () => {


    const {
        register,
        handleSubmit,
        watch,
        
        formState: { errors, isSubmitting },
      } = useForm()
      
      
      const navigate = useNavigate(); 
      
      const {storeTokenInLS} = useAuth();
      
      const onSubmit = async (data) => {
        if (data.password !== data.repassword) {
          
          console.log("Passwords do not match");
          return;
        }

        try {
          let response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
          

          if (response.ok) {
            const res_data = await response.json()
            // console.log("response from server", res_data);

            alert("Register succesfull")
            // stored the token in localhost
            // storeTokenInLS(res_data.token);
            navigate("/login"); 
            console.log(res_data );
          } else {
            const error_data = await response.json()
            console.log(error_data);
            alert(error_data.message);
          }
        } catch (error) {
          console.error(error);
          
        }
      }
  return (
   
    <div className='signup-container'>
    <form action="" onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <h1>Sign Up</h1>
  
      <input 
        placeholder='Username' 
        {...register("username", { 
          required: {value: true, message: 'Please fill'}, 
          minLength: {value: 3, message : 'Min length is 3'}, 
          maxLength: {value: 10, message : 'Max length is 10' }
        })} 
        type="text" 
        className='input-field'
      />
      {errors.username && <div className='error'>{errors.username.message}</div>}
  
      <input 
        placeholder='Email' 
        {...register("email", { 
          required: {value: true, message: 'Please fill'}, 
          minLength: {value: 3, message : 'Min length is 3'}
        })} 
        type="email" 
        className='input-field'
      />
      {errors.email && <div className='error'>{errors.email.message}</div>}
  
      <input 
        placeholder='Phone' 
        {...register("phone", { 
          required: {value: true, message: 'Please fill'}, 
          minLength: {value: 3, message : 'Min length is 3'}
        })} 
        type="text" 
        className='input-field'
      />
      {errors.phone && <div className='error'>{errors.phone.message}</div>}
  
      <input 
        placeholder='Password' 
        {...register("password", { 
          required: {value: true, message:'Please fill'}, 
          minLength: 8, 
          maxLength: 15 
        })} 
        type="password" 
        className='input-field'
      />
      {errors.password && <div className='error'>{errors.password.message}</div>}
  
      <input 
        placeholder='Re-Enter Password' 
        {...register("repassword", { 
          required: {value: true, message:'Please fill'}, 
          minLength: 8, 
          maxLength: 15 
        })} 
        type="password" 
        className='input-field'
      />
      {errors.repassword && <div className='error'>{errors.repassword.message}</div>}
  
      <input 
        disabled={isSubmitting} 
        type="submit" 
        value="Submit" 
        className="submit-btn" 
      />
    </form>
  </div>
  
  )
}

export default Signup
