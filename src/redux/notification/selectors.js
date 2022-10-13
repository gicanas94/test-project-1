export const selectNotificationIsOpen = (state) => state.notification.open;

export const selectNotificationDuration = (state) =>
  state.notification.duration;

export const selectNotificationMessage = (state) => state.notification.message;

export const selectNotificationType = (state) => state.notification.type;
