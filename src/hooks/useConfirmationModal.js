// @packages
import { useDispatch, useSelector } from 'react-redux';

// @app
import {
  confirmConfirmationModal as confirmConfirmationModalAction,
  declineConfirmationModal as declineConfirmationModalAction,
} from 'redux/confirmationModal';
import { openConfirmationModalThunk } from 'redux/confirmationModal/thunks';
import { selectConfirmationModalIsOpened } from 'redux/confirmationModal/selectors';

export default () => {
  const dispatch = useDispatch();

  const confirmationModalIsOpened = useSelector(
    selectConfirmationModalIsOpened
  );

  const openConfirmationModal = async () => {
    const { payload } = await dispatch(openConfirmationModalThunk());
    return payload;
  };

  const confirmConfirmationModal = () =>
    dispatch(confirmConfirmationModalAction());

  const declineConfirmationModal = () =>
    dispatch(declineConfirmationModalAction());

  return {
    confirmConfirmationModal,
    confirmationModalIsOpened,
    declineConfirmationModal,
    openConfirmationModal,
  };
};
