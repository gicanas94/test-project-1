// @packages
import PropTypes from 'prop-types';
import React, { createContext, useState, useEffect } from 'react';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';

// @app
import useFirebase from 'hooks/useFirebase';
import { openNotification } from 'redux/notification';

const AuthUserProvider = ({ children }) => {
  const { auth, db } = useFirebase();
  const [authUser, setAuthUser] = useState(null);
  const [authUserAddresses, setAuthUserAddresses] = useState(null);
  const [requestingAuthUser, setRequestingAuthUser] = useState(true);
  const dispatch = useDispatch();

  const handleError = (error) => {
    dispatch(
      openNotification({
        duration: 5000,
        message: `An error occurred (${error.code})`,
        type: 'error',
      })
    );
  };

  useEffect(() => {
    onAuthStateChanged(
      auth,
      async (user) => {
        setRequestingAuthUser(true);

        if (user) {
          await onSnapshot(
            doc(db, 'users', user.uid),
            (document) => {
              setAuthUser(document.data());
            },
            handleError
          );

          await onSnapshot(
            query(collection(db, `users/${user.uid}/addresses`)),
            (querySnapshot) => {
              const addresses = [];

              querySnapshot.forEach((document) =>
                addresses.push(document.data())
              );

              setAuthUserAddresses(addresses);
            },
            handleError
          );

          setRequestingAuthUser(false);
        } else {
          setAuthUser(null);
          setRequestingAuthUser(false);
        }
      },
      handleError
    );
  }, []);

  return (
    <AuthUserContext.Provider
      value={{ authUser, authUserAddresses, requestingAuthUser }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

AuthUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthUserContext = createContext();
export default AuthUserProvider;
