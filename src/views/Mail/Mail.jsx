import MailApi from "../../api/Mail";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import MailEstyAccount from "./Mail-Esty-Account";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
require("dotenv").config();
//================================================================================================

const schema = yup.object().shape({
  emailSender: yup.string().email("Không đúng định dạng email").required("Bắt buộc nhập."),
  passwordSender: yup.string().required("Bắt buộc nhập."),
  emailReceived: yup.string().required("Bắt buộc nhập."),
});
export default function Mail() {
  const [editable, setEditable] = useState(true);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [notifyError, setNotifyError] = useState(false);
  const [fieldsByTypeEmail, setFieldsByTypeEmail] = useState(1);
  const [name, setName] = useState("");
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
      console.error(error);
      setNotifyError(true);
    } finally {
      setEditable(true);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setNotifySuccess(false);
      setNotifyError(false);
    }, 7000);
  }, [notifySuccess, notifyError]);
  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="bg-white p-3">
          {notifySuccess && (
            <SnackbarContent
              message={"Đã spam mail xong."}
              // close
              color="success"
            />
          )}
          {notifyError && (
            <SnackbarContent
              message={"Có lỗi xảy ra. Vui lòng thử lại."}
              // close
              color="danger"
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
                    <input
                      {...register("emailSender")}
                      // style={{
                      //   borderColor: "red",
                      // }}
                      type="email"
                      className="form-control"
                      placeholder="Địa chỉ sender"
                      disabled={!editable}
                    />
                    {errors.emailSender?.message && <p style={{ color: "#f55a4e" }}>{errors.emailSender?.message}</p>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="passwordSender" className="col-lg-6 col-form-label">
                    Password Sender
                  </label>
                  <div className="">
                    <input type="password" className="form-control" id="email" {...register("passwordSender")} placeholder="Mật khẩu sender" disabled={!editable} />
                    {errors.passwordSender?.message && <p style={{ color: "#f55a4e" }}>{errors.passwordSender?.message}</p>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="email" className="col-lg-4 col-form-label">
                    Email
                  </label>
                  <div className="">
                    <input type="email" className="form-control" id="email" {...register("emailReceived")} placeholder="Địa chỉ email gửi tới" disabled={!editable} />
                    {errors.emailReceived?.message && <p style={{ color: "#f55a4e" }}>{errors.emailReceived?.message}</p>}
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
                        const value = parseInt(e.target.value);
                        if (value === 3) {
                          setFieldsByTypeEmail(3);
                        } else if (value === 5) {
                          setFieldsByTypeEmail(5);
                        } else if (value === 7) {
                          setFieldsByTypeEmail(7);
                        } else if (value === 9) {
                          setFieldsByTypeEmail(9);
                        } else {
                          setFieldsByTypeEmail(1);
                        }
                        reset({
                          typeEmail: value,
                        });
                      }}
                    >
                      <option value="1">Spam Email</option>
                      <option value="3">Last Chance</option>
                      <option value="5">Email Christmas</option>
                      <option value="7">Email LLCPECK</option>
                      <option value="9">Email SELLERS</option>
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
                    <input
                      {...register("name")}
                      type="text"
                      className="form-control"
                      id="toEmail"
                      placeholder="Tên"
                      disabled={!editable}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>

                {fieldsByTypeEmail === 1 && (
                  <>
                    <div className="form-group row">
                      <label htmlFor="fromEmail" className="col-lg-4 col-form-label">
                        From Email
                      </label>
                      <div className="">
                        <input
                          {...register("fromEmail")}
                          type="email"
                          className="form-control"
                          id="fromEmail"
                          placeholder="Email"
                          disabled={!editable}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setEmailFrom(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="toEmail" className="col-lg-4 col-form-label">
                        To Email
                      </label>
                      <div className="">
                        <input
                          {...register("toEmail")}
                          type="email"
                          className="form-control"
                          id="toEmail"
                          placeholder="Email"
                          disabled={!editable}
                          onChange={(e) => {
                            setEmailTo(e.target.value);
                          }}
                        />
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
      <div className="col-lg-6">
        <div className="bg-white p-3">
          <h3 className="pb-2 mt-2 mb-4 border-bottom">Template Email</h3>
          <div>
            <MailEstyAccount name={name} emailFrom={emailFrom} emailTo={emailTo} />
          </div>
        </div>
      </div>
    </div>
  );
}
