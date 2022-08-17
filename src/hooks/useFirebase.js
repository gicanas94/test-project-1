// @packages
import { useContext } from 'react';

// @app
import { FirebaseContext } from 'providers/FirebaseProvider';

export default () => useContext(FirebaseContext);
