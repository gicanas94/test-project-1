export default {
  ACCOUNT: {
    ADDRESSES: {
      EDIT: '/account/addresses/edit/:id',
      EDIT_FN: (id) => `/account/addresses/edit/${id}`,
      NEW: '/account/addresses/new',
      ROOT: '/account/addresses',
    },
    GENERAL: '/account/general',
    ROOT: '/account/:section',
  },
  HOME: '/',
  NOT_FOUND: '*',
  SIGN_IN: '/signin',
};
