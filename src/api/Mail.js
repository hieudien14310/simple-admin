import Client from "./Client";
const endpoint = "/sendmail";
class MailApi {
  static async sendMail(body) {
    return await Client.post(endpoint, body);
  }
}
export default MailApi;
