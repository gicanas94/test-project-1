// @packages
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

// @app
import Progress from 'components/Progress';
import useAuthUser from 'hooks/useAuthUser';
import useFirebase from 'hooks/useFirebase';
import { openNotification } from 'redux/notification';

const ValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Required'),
});

const GeneralInformation = () => {
  const [requesting, setRequesting] = useState(false);
  const dispatch = useDispatch();
  const { authUser } = useAuthUser();
  const { db } = useFirebase();

  const handleFormSubmit = async (values) => {
    try {
      setRequesting(true);

      await setDoc(
        doc(db, 'users', authUser.uid),
        {
          name: values.name.trim(),
          phoneNumber: values.phoneNumber.trim(),
        },
        { merge: true }
      );

      dispatch(
        openNotification({
          duration: 5000,
          message: 'The changes were saved',
          type: 'success',
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

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: authUser.email || '',
        name: authUser.name || '',
        phoneNumber: authUser.phoneNumber || '',
      }}
      onSubmit={handleFormSubmit}
      validateOnBlur
      validationSchema={ValidationSchema}
    >
      {({ errors, handleBlur, handleChange, touched, values }) => (
        <Form>
          <Progress open={requesting}>
            <Typography
              component="h2"
              sx={{
                fontWeight: 'bold',
                marginBottom: 4,
              }}
              variant="h5"
            >
              General information
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: 4 }}>
              <Grid item sm={6} xs={12}>
                <TextField
                  error={errors.name && touched.name}
                  fullWidth
                  helperText={errors.name && touched.name && errors.name}
                  label="Name"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.name}
                  variant="filled"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  disabled
                  error={errors.email && touched.email}
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  variant="filled"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  error={errors.phoneNumber && touched.phoneNumber}
                  fullWidth
                  helperText={
                    errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber
                  }
                  label="Phone number"
                  name="phoneNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  variant="filled"
                />
              </Grid>
            </Grid>
            <Box sx={{ textAlign: 'right' }}>
              <Button
                disableElevation
                size="large"
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Progress>
        </Form>
      )}
    </Formik>
  );
};

export default GeneralInformation;
