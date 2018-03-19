import { 
  authMobileSend,  
  authMobileVerify,
  authMobileSignup,
  authMobileBinding,
  authMobileReset,
} from "../api/auth-mobile";

export function sendCode(mobile) {
  return authMobileSend(mobile)  
}

export function verifyMobile(mobile) {
  return authMobileVerify(mobile)  
}

export function signup(mobile, code, password) {
  return authMobileSignup(mobile, code, password)
}

export function bind(mobile, code, password) {
  return authMobileBinding(mobile, code, password)
}

export function retrieve(mobile, code, password) {
  return authMobileReset(mobile, code, password)
}