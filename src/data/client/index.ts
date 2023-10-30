import {
  AuthResponse,
  LoginUserPayload,
  RegisterUserPayload,
} from "@/types/auth";
import { HttpClient } from "./http-client";
import { API_ENDPOINTS } from "./api-endpoints";
import { Card, IssueCard } from "@/types/card";

class Client {
  auth = {
    login: (variables: LoginUserPayload) => {
      return HttpClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, variables);
    },
    register: (variables: RegisterUserPayload) => {
      return HttpClient.post<unknown>(API_ENDPOINTS.AUTH.REGISTER, variables);
    },
  };
  cards = {
    issuedCards: (params?: any) => {
      return HttpClient.get<{ data: Card[] }>(API_ENDPOINTS.CARDS.ISSUE, {
        ...params,
      });
    },
    issueCard: (input: IssueCard) => {
      return HttpClient.post<unknown>(API_ENDPOINTS.CARDS.ISSUE, input);
    },
  };
}

export default new Client();
