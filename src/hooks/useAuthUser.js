// @packages
import { useContext } from 'react';

// @app
import { AuthUserContext } from 'providers/AuthUserProvider';

export default () => useContext(AuthUserContext);
