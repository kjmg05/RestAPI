//Estructura de los datos que se van a trabajar
import {setJWT} from '../../../Lib/apiClient';
const defaultSecurity = {
    email: '',
    jwtToken: '',
    roles: [],
    _id: '',
    errors: [],
    isLoading: false
}

export const securityReducer = (state = defaultSecurity, action) => {
    const {type, payload} = action || {};
  switch(type){
    case 'ON_SIGN_IN_LOADING':
      break;
    case 'ON_SIGN_IN_SUCCESS':
      break;
    case 'ON_SIGN_IN_ERROR':
      break;
    case 'ON_LOGIN_LOADING':
      return {...state, isLoading: true, errors:[]};
      break;
    case 'ON_LOGIN_SUCCESS':
      setJWT(payload.jwtToken);
      return {...state, ...payload, isLoading: false, errors:[]};
      break;
    case 'ON_LOGIN_ERROR':
      return {...state, errors:payload.errors, isLoading:false};
      break;
    default:
      return state;
  }
}