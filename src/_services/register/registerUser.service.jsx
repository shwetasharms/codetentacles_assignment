import axios from "axios";
import {registerApi} from '../../_constants/api.constant'

export async function registerUser(postData){
    const response=await axios.post(
        process.env.REACT_APP_BASEURL+registerApi.REGISTER,postData

        ).then(function(response) {
           
        return response;
        }).catch(function (error) {
        console.log(error.response);
        return error.response;
        });
    return response;
}