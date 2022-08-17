// @packages
import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// @own
import config from './config';

const FirebaseProvider = ({ children }) => {
  const app = initializeApp(config);
  const db = getFirestore(app);
  const auth = getAuth();

  const authProviders = {
    google: new GoogleAuthProvider(),
  };

  return (
    <FirebaseContext.Provider value={{ app, auth, authProviders, db }}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const FirebaseContext = createContext();
export default FirebaseProvider;
