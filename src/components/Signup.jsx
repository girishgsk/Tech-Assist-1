import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../service";
import Swal from "sweetalert2";

import Captcha from "react-canvas-captcha";

const Signup = () => {
  const history = useNavigate();
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [errors, setErrors] = useState();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const valid = () => {
    let err = {};

    if (!name) {
      err = { ...err, name: true };
    }
    if (!company) {
      err = { ...err, company: true };
    }
    if (!email) {
      err = { ...err, email: true };
    }

    if (!password) {
      err = { ...err, password: true };
    }
    if (!captcha) {
      err = { ...err, captcha: true, captchaNotMatching: false };
    } else if (captcha.toLowerCase() !== generatedCaptcha) {
      err = { ...err, captcha: false, captchaNotMatching: true };
    }

    setErrors(err);
    const result = Object.values(err)?.some((val) => val === true);
    if (result) {
      return false;
    }
    return true;
  };

  const postData = async () => {
    if (!valid()) {
      return false;
    }
    const data = {
      name,
      company,
      email,
      password,
    };
    signup(data)
      .then((res) => {
        localStorage.setItem("useremail", res?.data?.data?.email);
        history("/");
      })
      .catch((e) => {
        const message =
          typeof e?.response?.data?.message === "string"
            ? e?.response?.data?.message
            : e?.response?.data?.message?.join("<br/>");
        Swal.fire("Error!", message, "error");
      });
  };

  const nameChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setErrors({ ...errors, name: true });
    } else {
      setErrors({ ...errors, name: false });
    }
    setName(val);
  };
  const companyChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setErrors({ ...errors, company: true });
    } else {
      setErrors({ ...errors, company: false });
    }
    setCompany(val);
  };
  const emailChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setErrors({ ...errors, email: true });
    } else {
      setErrors({ ...errors, email: false });
    }
    setEmail(val);
  };
  const passwordChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setErrors({ ...errors, password: true });
    } else {
      setErrors({ ...errors, password: false });
    }
    setPassword(val);
  };
  const captchaChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setErrors({ ...errors, captcha: true });
    } else {
      setErrors({ ...errors, captcha: false });
    }
    setCaptcha(val);
  };

  return (
    <>
      <div
        style={{ height: "100vh", width: "80vw", margin: "3rem auto" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="card">
          <div className="card-header">
            <h3>Signup</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={
                    errors?.name ? "form-control border-danger" : "form-control"
                  }
                  placeholder="Enter name"
                  onChange={nameChange}
                  value={name}
                />
                {errors?.name && (
                  <span className="text-danger">Please enter name</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  type="company"
                  name="company"
                  id="company"
                  className={
                    errors?.company
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter company"
                  onChange={companyChange}
                  value={company}
                />
                {errors?.company && (
                  <span className="text-danger">Please enter company name</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors?.email
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter email"
                  onChange={emailChange}
                  value={email}
                />
                {errors?.email && (
                  <span className="text-danger">Please enter email </span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors?.password
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter password"
                  onChange={passwordChange}
                  value={password}
                />
                {errors?.password && (
                  <span className="text-danger">Please enter password</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <Captcha
                  boxHeight={50}
                  boxWidth={120}
                  refreshButton
                  caseType="uppercase"
                  captchaConfig={{
                    numberOfChars: 4,
                    font: "bold 30px Arial",
                    textStartingX: 5,
                    textStartingY: 10,
                  }}
                  setCode={(captchaCode) => setGeneratedCaptcha(captchaCode)}
                />

                <label htmlFor="captcha" className="form-label">
                  Captcha
                </label>
                <input
                  type="text"
                  name="captchaCode"
                  id="captchaCode"
                  className={
                    errors?.captcha
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter captcha"
                  onChange={captchaChange}
                  value={captcha}
                />
                {errors?.captcha && (
                  <span className="text-danger">Please enter captcha</span>
                )}
                {errors?.captchaNotMatching && (
                  <span className="text-danger">
                    Please enter correct captcha
                  </span>
                )}
              </div>
              <p>
                Already have an account?{" "}
                <Link to="/">
                  <span>log In</span>
                </Link>
              </p>
              <div className="d-flex justify-content-center mt-2 col-12">
                <button className="btn btn-primary" onClick={postData}>
                  <span>Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
