import React from "react";
import esty from "../../img/logo.png";
export default function MailEstyAccount({ name, emailFrom, emailTo }) {
  return (
    <>
      <a href="#">
        <img src={esty} alt="Esty" border="0" height="34" />
      </a>
      <p>
        Hi <b>{name}</b>,
      </p>
      <p>
        We received a requested to change the email address for {name} from
        <a href="#"> {emailFrom}</a> to
        <a href="#"> {emailTo}</a>
      </p>
      <p>
        We sent an email to <a href="#">{emailTo}</a> with instructions on confirming this change. Once you confirm, your login credentials will be updated to reflect the new email address
      </p>
      <p>
        If you didn't make this change, we recommend that you secure your account by{" "}
        <a href="#">
          <u>changing.your.password here</u>
        </a>
      </p>
      <p>Thanks,</p>
      <p>Etsy.</p>
    </>
  );
}
