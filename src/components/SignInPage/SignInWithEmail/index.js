// @packages
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';
import { doc, setDoc } from 'firebase/firestore';
import {
  getAdditionalUserInfo,
  isSignInWithEmailLink as isSignInWithEmailLinkFirebase,
  sendSignInLinkToEmail as sendSignInLinkToEmailFirebase,
  signInWithEmailLink as signInWithEmailLinkFirebase,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// @app
import ROUTES from 'routes';
import useFirebase from 'hooks/useFirebase';
import useQuery from 'hooks/useQuery';
import { openNotification } from 'redux/notification';

// @own
import EmailConfirmationModal from './EmailConfirmationModal';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email').required('Required'),
});

const SignInWithEmailForm = () => {
  const [requesting, setRequesting] = useState(false);
  const [requestingInModal, setRequestingInModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const { auth, db } = useFirebase();
  const emailFromLocalStorage = window.localStorage.getItem('emailForSignIn');
  const [emailConfirmationModalOpen, setEmailConfirmationModalOpen] =
    useState(false);

  const isSignInWithEmailLink = isSignInWithEmailLinkFirebase(
    auth,
    window.location.href
  );

  const sendSignInLinkToEmail = async (values) => {
    try {
      setRequesting(true);
      const trimmedEmail = values.email.trim();

      await sendSignInLinkToEmailFirebase(auth, trimmedEmail, {
        handleCodeInApp: true,
        url: window.location.href,
      });

      window.localStorage.setItem('emailForSignIn', trimmedEmail);

      dispatch(
        openNotification({
          duration: 5000,
          message: 'Access link sent, please check your email',
          type: 'info',
        })
      );
    } catch (error) {
      dispatch(
        openNotification({
          duration: 5000,
          message: `An error occurred (${error.code})`,
          type: 'error',
        })
      );
    } finally {
      setRequesting(false);
    }
  };

  const signInWithEmailLink = async (values, isModal = false) => {
    try {
      if (isModal) {
        setRequestingInModal(true);
      } else {
        setRequesting(true);
      }

      const trimmedEmail = values.email.trim();

      const response = await signInWithEmailLinkFirebase(
        auth,
        trimmedEmail,
        window.location.href
      );

      const { user } = response;
      const { isNewUser } = getAdditionalUserInfo(response);

      if (isNewUser) {
        await setDoc(doc(db, 'users', user.uid), {
          email: trimmedEmail,
          name: user?.displayName || '',
          uid: user.uid,
        });
      }

      window.localStorage.removeItem('emailForSignIn');

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

      if (isModal) {
        setRequestingInModal(false);
      } else {
        setRequesting(false);
      }
    }
  };

  useEffect(() => {
    if (isSignInWithEmailLink) {
      if (emailFromLocalStorage) {
        signInWithEmailLink({ email: emailFromLocalStorage });
      } else {
        setEmailConfirmationModalOpen(true);
      }
    }
  }, []);

  return (
    <>
      <Formik
        initialValues={{ email: emailFromLocalStorage || '' }}
        onSubmit={sendSignInLinkToEmail}
        validateOnBlur
        validationSchema={ValidationSchema}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <Form>
            <Typography sx={{ marginBottom: 3 }}>
              Or use your email, we will send you a link so you can access.
            </Typography>
            <TextField
              error={errors.email && touched.email}
              fullWidth
              helperText={errors.email && touched.email && errors.email}
              label="Email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              required
              sx={{ marginBottom: 3 }}
              value={values.email}
              variant="filled"
            />
            <Button
              disableElevation
              disabled={requesting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
      <EmailConfirmationModal
        onClose={() => setEmailConfirmationModalOpen(false)}
        onSubmit={signInWithEmailLink}
        open={emailConfirmationModalOpen}
        requesting={requestingInModal}
      />
    </>
  );
};

export default SignInWithEmailForm;
