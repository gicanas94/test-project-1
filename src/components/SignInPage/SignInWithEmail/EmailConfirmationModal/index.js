// @packages
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';

// @app
import Modal from 'components/Modal';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email').required('Required'),
});

const EmailConfirmationModal = ({ onClose, onSubmit, open, requesting }) => (
  <Modal maxWidth="xs" onClose={onClose} open={open}>
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values) => onSubmit(values, true)}
      validateOnBlur
      validationSchema={ValidationSchema}
    >
      {({ errors, handleBlur, handleChange, touched, values }) => (
        <Form>
          <Typography
            component="h2"
            sx={{
              fontWeight: 'bold',
              marginBottom: 3,
            }}
            variant="h6"
          >
            Email confirmation
          </Typography>
          <TextField
            autoFocus
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
            Confirm
          </Button>
        </Form>
      )}
    </Formik>
  </Modal>
);

EmailConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  requesting: PropTypes.bool,
};

EmailConfirmationModal.defaultProps = {
  open: false,
  requesting: false,
};

export default EmailConfirmationModal;
