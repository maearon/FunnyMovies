// import { ListParams, ListResponse, Student } from 'models';
import API from '.';
import { User } from '../../../redux/session/sessionSlice';

export interface Response<User> {
  user?: User
  jwt?: string
  token?: string
  flash: [message_type: string, message: string]
}

const accountActivationApi = {
  update(activation_token: string, email: string): Promise<Response<User>> {
    const url = `/account_activations/${activation_token}`;
    return API.patch(url, {email: email});
  }
};

export default accountActivationApi;
