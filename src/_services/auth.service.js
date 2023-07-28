import axios from "axios";
import { loginApi } from "../_constants/api.constant";

export async function login(data) {
  const response = await axios.post(
    process.env.REACT_APP_BASEURL + loginApi.LOGIN,
    data,
  ).then(function (response) {
    return response;
  }).catch(function (error) {
    console.log(error);
    console.log(error.response);
    return error.response;
  });
  return response;
}