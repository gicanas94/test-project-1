// @packages
import GoogleIcon from '@mui/icons-material/Google';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { doc, setDoc } from 'firebase/firestore';
import { getAdditionalUserInfo, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// @app
import ROUTES from 'routes';
import useFirebase from 'hooks/useFirebase';
import useQuery from 'hooks/useQuery';
import { openNotification } from 'redux/notification';

// @own
import ProviderButton from './ProviderButton';

const SignInWithProvider = () => {
  const [requesting, setRequesting] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const { auth, authProviders, db } = useFirebase();

  const handleProviderButtonClick = async (provider) => {
    try {
      setRequesting(true);

      const response = await signInWithPopup(auth, provider);
      const { user } = response;
      const { isNewUser } = getAdditionalUserInfo(response);

      if (isNewUser) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: user?.displayName || '',
          uid: user.uid,
        });
      }

      dispatch(
        openNotification({
          duration: 5000,
          message: 'Welcome!',
          type: 'success',
        })
      );

      if (query.get('continue')) {
        history.push(query.get('continue'));
      } else {
        history.push(ROUTES.HOME);
      }
    } catch (error) {
      dispatch(
        openNotification({
          duration: 5000,
          message: `An error occurred (${error.code})`,
          type: 'error',
        })
      );

      setRequesting(false);
    }
  };

  return (
    <>
      <Typography sx={{ marginBottom: 3 }}>
        Use your preferred provider to sign in.
      </Typography>
      <ProviderButton
        disabled={requesting}
        onClick={() => handleProviderButtonClick(authProviders.google)}
        provider={{
          color: 'google',
          icon: <GoogleIcon />,
          name: 'Google',
        }}
        sx={{ marginBottom: 3 }}
      />
    </>
  );
};

export default SignInWithProvider;
