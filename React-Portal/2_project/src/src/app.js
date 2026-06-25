import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function App() {

    const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });


  const initialValues = {
 
    email: "",
    password : "",
  };



  const onSubmit = (values, {resetForm}) => {
    console.log(values);
    resetForm();
  }
 

  return (
    <div>
      <h1>Simple Login Form</h1>
      <Formik
      
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema ={validationSchema}
      >
        {() => (
          <Form>
            {/* Email Field */}
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage  name="email" component="div" />
         
             
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage  name="password" component="div" />
             
            </div>
            

           
            <button type="submit">Submit</button> 
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
