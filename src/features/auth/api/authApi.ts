// "authApi encapsulates authentication-related backend operations and hides HTTP details from the UI."

import { apiClient } from '../../../app/api/client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface RegisterCustomerRequest {
    firstname:string;
    lastname:string;
    email:string;
    phoneNumber:string;
    panNumber:string;
    address:string;
    dateOfBirth:string;
}

export interface RegisterRequest {
    customerId:number;
    password:string;
}

export interface RequestResponse {
    userId:number;
    customerId:number;
    email:string;
    message:string;
}

export const authApi = {
  login: (request: LoginRequest) => {
    return apiClient.post('/auth/login', request);
  },

  verifyOtp: (request: VerifyOtpRequest) => {
    return apiClient.post('/auth/verify-otp', request);
  },

  registerCustomer : (request :RegisterCustomerRequest) => {
    return apiClient.post('/auth/register', request);
  },

  register : (request : RegisterRequest) => {
    return apiClient.post('/auth/register', request);
  }
};