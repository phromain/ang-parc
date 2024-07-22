export let CURRENT_JWT = '';
export const constants = {
  CURRENT_JWT: 'CURRENT_JWT',
};


const apiUrl = 'http://parc.localhost';
const apiUrlLocal = 'http://localhost:8084';


export const endpoint = {
  api:{
    listParcs: `${apiUrl}/api/parcs`,
    listRegions: `${apiUrl}/api/regions`,
    listTypes: `${apiUrl}/api/types`,
    detailParc: `${apiUrl}/api/parcs`,

    forgotUsername: `${apiUrlLocal}/auth/forgot-username`,
    forgotPassword: `${apiUrlLocal}/auth/forgot-password`,
    validToken: `${apiUrlLocal}/auth/validate-reset-token`,
    resetPassword: `${apiUrlLocal}/auth/reset-password`,
    register: `${apiUrlLocal}/auth/register`,
    login: `${apiUrlLocal}/auth/login`,
    loginVerify: `${apiUrlLocal}/auth/login/verify`,
  },
};


