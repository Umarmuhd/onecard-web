import {
  AuthResponse,
  LoginUserPayload,
  RegisterUserPayload,
} from "@/types/auth";
import { HttpClient } from "./http-client";
import { API_ENDPOINTS } from "./api-endpoints";

class Client {
  auth = {
    login: (variables: LoginUserPayload) => {
      return HttpClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, variables);
    },
    register: (variables: RegisterUserPayload) => {
      return HttpClient.post<unknown>(API_ENDPOINTS.AUTH.REGISTER, variables);
    },
  };
}

export default new Client();
