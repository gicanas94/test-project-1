// @packages
import { useDispatch, useSelector } from 'react-redux';

// @app
import {
  confirmConfirmationModal,
  declineConfirmationModal,
} from 'redux/confirmationModal';
import { openConfirmationModalThunk } from 'redux/confirmationModal/thunks';
import {
  selectConfirmationModalContent,
  selectConfirmationModalIsOpen,
  selectConfirmationModalTitle,
} from 'redux/confirmationModal/selectors';

export default () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectConfirmationModalIsOpen);
  const title = useSelector(selectConfirmationModalTitle);
  const content = useSelector(selectConfirmationModalContent);

  const openConfirmationModal = async (payload) => {
    const { payload: result } = await dispatch(
      openConfirmationModalThunk(payload)
    );

    return result;
  };

  const confirm = () => dispatch(confirmConfirmationModal());
  const decline = () => dispatch(declineConfirmationModal());

  return {
    confirm,
    content,
    decline,
    isOpen,
    openConfirmationModal,
    title,
  };
};
