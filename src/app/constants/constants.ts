
const apiUrl = 'http://parc.localhost';

export const endpoint = {
  api:{
    listParcs: `${apiUrl}/api/parcs`,
    listRegions: `${apiUrl}/api/regions`,
    listTypes: `${apiUrl}/api/types`,
    detailParc: `${apiUrl}/api/parcs`,

    forgotUsername: `${apiUrl}/auth/forgot-username`,
    forgotPassword: `${apiUrl}/auth/forgot-password`,
    validToken: `${apiUrl}/auth/validate-reset-token`,
    resetPassword: `${apiUrl}/auth/reset-password`,

    register: `${apiUrl}/auth/register`,

  },
};


