export const selectConfirmationModalIsConfirmed = (state) =>
  state.confirmationModal.status.confirmed;

export const selectConfirmationModalIsDeclined = (state) =>
  state.confirmationModal.status.declined;

export const selectConfirmationModalIsOpen = (state) =>
  state.confirmationModal.status.open;

export const selectConfirmationModalTitle = (state) =>
  state.confirmationModal.title;

export const selectConfirmationModalContent = (state) =>
  state.confirmationModal.content;
