// @packages
import PropTypes from 'prop-types';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';

// @app
import { openNotification } from 'redux/notification';
import { useFirebase } from 'components/FirebaseProvider';

const AuthProvider = ({ children }) => {
  const { auth, db } = useFirebase();
  const [authUser, setAuthUser] = useState(null);
  const [requestingAuth, setRequestingAuth] = useState(true);
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
        setRequestingAuth(true);

        if (user) {
          await onSnapshot(
            doc(db, 'users', user.uid),
            (document) => {
              setAuthUser(document.data());
              setRequestingAuth(false);
            },
            handleError
          );
        } else {
          setAuthUser(null);
          setRequestingAuth(false);
        }
      },
      handleError
    );
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, requestingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
