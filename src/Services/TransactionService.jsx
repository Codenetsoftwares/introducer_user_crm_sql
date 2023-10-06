import axios from "axios";
const API_HOST = process.env.REACT_APP_API_HOST;
console.log(API_HOST);

class TransactionService {
  getIntroducerSingleUser(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/introducer-account-summary/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
}
export default new TransactionService();
