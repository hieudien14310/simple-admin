import MailApi from "../../api/Mail";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
require("dotenv").config();
//================================================================================================

export default function Mail() {
  const [editable, setEditable] = useState(true);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [fieldsByTypeEmail, setFieldsByTypeEmail] = useState(1);
  const { handleSubmit, register, reset } = useForm();
  const sendMail = async (body) => {
    try {
      setEditable(false);
      body.typeEmail = parseInt(body.typeEmail);
      if (body.typeEmail === 1) {
        body.number = parseInt(body.number);
      }
      console.log(body);
      await MailApi.sendMail(body);
      setNotifySuccess(true);
      // console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setEditable(true);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setNotifySuccess(false);
    }, 5000);
  }, [notifySuccess]);
  return (
    <div className="container">
      <div className="bg-white p-3">
        {notifySuccess && (
          <SnackbarContent
            message={"Đã spam mail xong."}
            // close
            color="success"
          />
        )}
        <h3 className="pb-2 mt-2 mb-4 border-bottom">Email address change requested</h3>
        <form onSubmit={handleSubmit(sendMail)} className="p-3">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group row">
                <label htmlFor="emailSender" className="col-lg-4 col-form-label">
                  Email Sender
                </label>
                <div className="">
                  <input {...register("emailSender")} type="email" className="form-control" placeholder="Địa chỉ sender" disabled={!editable} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="passwordSender" className="col-lg-5 col-form-label">
                  Password Sender
                </label>
                <div className="">
                  <input type="password" className="form-control" id="email" {...register("passwordSender")} placeholder="Mật khẩu sender" disabled={!editable} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="passwordSender" className="col-lg-4 col-form-label">
                  Type Email
                </label>
                <div className="">
                  <select
                    className="form-control custom-select"
                    {...register("typeEmail")}
                    onChange={(e) => {
                      if (parseInt(e.target.value) === 3) {
                        setFieldsByTypeEmail(3);
                      } else {
                        setFieldsByTypeEmail(1);
                      }
                      reset({
                        typeEmail: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="1">Spam Email</option>
                    <option value="3">Last Chance</option>
                    <option value="5">Email Christmas</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group row">
                <label htmlFor="toEmail" className="col-lg-4 col-form-label">
                  Name
                </label>
                <div className="">
                  <input type="text" className="form-control" id="toEmail" {...register("name")} placeholder="Tên" disabled={!editable} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-lg-4 col-form-label">
                  Email
                </label>
                <div className="">
                  <input type="email" className="form-control" id="email" {...register("emailReceived")} placeholder="Địa chỉ email gửi tới" disabled={!editable} />
                </div>
              </div>
              {fieldsByTypeEmail === 1 && (
                <>
                  <div className="form-group row">
                    <label htmlFor="fromEmail" className="col-lg-4 col-form-label">
                      From Email
                    </label>
                    <div className="">
                      <input type="email" className="form-control" id="fromEmail" {...register("fromEmail")} placeholder="Email" disabled={!editable} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="toEmail" className="col-lg-4 col-form-label">
                      To Email
                    </label>
                    <div className="">
                      <input type="email" className="form-control" id="toEmail" {...register("toEmail")} placeholder="Email" disabled={!editable} />
                    </div>
                  </div>
                </>
              )}
              <div className="form-group row">
                <label htmlFor="password" className="col-lg-4 col-form-label">
                  Number
                </label>
                <div className="">
                  <input type="number" className="form-control" id="password" {...register("number")} placeholder="Số lượng mail sẽ gửi" disabled={!editable} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="" className="col-lg-4 col-form-label"></label>
                <div className="col-sm-10">
                  <button className="btn btn-primary" type="submit" disabled={!editable}>
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
