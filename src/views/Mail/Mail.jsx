import MailApi from "../../api/Mail";
import React from "react";
import { useForm } from "react-hook-form";
require("dotenv").config();
//================================================================================================

export default function Mail() {
  const { handleSubmit, register } = useForm();
  const sendMail = async (body) => {
    const data = await MailApi.sendMail(body);
    console.log(data);
  };
  return (
    <div className="container">
      <div className="bg-white p-3">
        <h3 className="pb-2 mt-2 mb-4 border-bottom">
          Email address change requested
        </h3>
        <form onSubmit={handleSubmit(sendMail)} className="p-3">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group row">
                <label
                  htmlFor="emailSender"
                  className="col-lg-4 col-form-label"
                >
                  Email Sender
                </label>
                <div className="">
                  <input
                    {...register("emailSender")}
                    type="email"
                    className="form-control"
                    placeholder="Địa chỉ sender"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="passwordSender"
                  className="col-lg-4 col-form-label"
                >
                  Password Sender
                </label>
                <div className="">
                  <input
                    type="password"
                    className="form-control"
                    id="email"
                    {...register("passwordSender")}
                    placeholder="Mật khẩu sender"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group row">
                <label htmlFor="email" className="col-lg-4 col-form-label">
                  Email
                </label>
                <div className="">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register("emailReceived")}
                    placeholder="Địa chỉ email gửi tới"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="fromEmail" className="col-lg-4 col-form-label">
                  From Email
                </label>
                <div className="">
                  <input
                    type="email"
                    className="form-control"
                    id="fromEmail"
                    {...register("fromEmail")}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="toEmail" className="col-lg-4 col-form-label">
                  To Email
                </label>
                <div className="">
                  <input
                    type="email"
                    className="form-control"
                    id="toEmail"
                    {...register("toEmail")}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="toEmail" className="col-lg-4 col-form-label">
                  Name
                </label>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    id="toEmail"
                    {...register("name")}
                    placeholder="Tên"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-lg-4 col-form-label">
                  Number
                </label>
                <div className="">
                  <input
                    type="number"
                    className="form-control"
                    id="password"
                    {...register("number")}
                    placeholder="Số lượng mail sẽ gửi"
                  />
                </div>
              </div>
              {/* <div className="form-group row">
                <label
                  htmlFor="confirmPassword"
                  className="col-lg-4 col-form-label"
                >
                  Subject
                </label>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    id="confirmPassword"
                    name="subject"
                    placeholder="Tiêu đề mail"
                  ></input>
                </div>
              </div> */}
              {/* <div className="form-group row">
                <label
                  htmlFor="confirmPassword"
                  className="col-lg-4 col-form-label"
                >
                  Text
                </label>
                <div className="">
                  <textarea
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="text"
                    placeholder="Nội dung mail"
                  ></textarea>
                </div>
              </div> */}
              <div className="form-group row">
                <label htmlFor="" className="col-lg-4 col-form-label"></label>
                <div className="col-sm-10">
                  <button className="btn btn-primary" type="submit">
                    <i className="fas fa-shipping-fast fa-sm"> Send</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
