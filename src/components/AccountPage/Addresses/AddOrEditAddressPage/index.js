// @packages
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import orderBy from 'lodash/orderBy';
import { Formik, Form } from 'formik';
import { doc, setDoc } from 'firebase/firestore';
import { getData as getCountriesList } from 'country-list';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// @app
import ActionPanel from 'components/ActionPanel';
import ROUTES from 'routes';
import trimObject from 'utils/trimObject';
import useAuthUser from 'hooks/useAuthUser';
import useFirebase from 'hooks/useFirebase';
import { openNotification } from 'redux/notification';

const ValidationSchema = Yup.object().shape({
  address: Yup.string().trim().required('Required'),
  city: Yup.string().trim().required('Required'),
  country: Yup.string().trim().required('Required'),
  email: Yup.string().trim().required('Required'),
  firstName: Yup.string().trim().required('Required'),
  lastName: Yup.string().trim().required('Required'),
  postalCode: Yup.string().trim().required('Required'),
  state: Yup.string().trim().required('Required'),
});

const AddOrEditAddressPage = () => {
  const [requesting, setRequesting] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: addressId } = useParams();
  const { authUser, authUserAddresses } = useAuthUser();
  const { db } = useFirebase();
  const address = authUserAddresses.find((a) => a.id === Number(addressId));
  const countries = orderBy(getCountriesList(), 'name');

  const handleFormSubmit = async (values) => {
    try {
      setRequesting(true);

      const trimmedAddress = trimObject(values);
      trimmedAddress.id = address?.id || Date.now();

      await setDoc(
        doc(db, `users/${authUser.uid}/addresses/${trimmedAddress.id}`),
        trimmedAddress,
        { merge: true }
      );

      dispatch(
        openNotification({
          duration: 5000,
          message: 'The address was saved',
          type: 'success',
        })
      );

      history.push(ROUTES.ACCOUNT.ADDRESSES.ROOT);
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

  useEffect(() => {
    if (addressId && authUserAddresses.length && !address) {
      dispatch(
        openNotification({
          duration: 5000,
          message: "We couldn't find the address you want to edit",
          type: 'warning',
        })
      );
    }
  }, [authUserAddresses]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        additionalComments: address?.additionalComments || '',
        address: address?.address || '',
        addressExtraInformation: address?.addressExtraInformation || '',
        city: address?.city || '',
        companyName: address?.companyName || '',
        country: address?.country || '',
        email: address?.email || '',
        firstName: address?.firstName || '',
        lastName: address?.lastName || '',
        phoneNumber: address?.phoneNumber || '',
        postalCode: address?.postalCode || '',
        referenceName: address?.referenceName || '',
        state: address?.state || '',
      }}
      onSubmit={handleFormSubmit}
      validateOnBlur
      validationSchema={ValidationSchema}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <Form>
          <ActionPanel
            backToText="Addresses"
            maxWidth="md"
            onBack={() => history.push(ROUTES.ACCOUNT.ADDRESSES.ROOT)}
            onPrimaryButtonClick={handleSubmit}
            onSecondaryButtonClick={() =>
              history.push(ROUTES.ACCOUNT.ADDRESSES.ROOT)
            }
            requesting={requesting}
          >
            <Typography
              component="h1"
              sx={{
                fontWeight: 'bold',
                marginBottom: 2,
              }}
              variant="h5"
            >
              {address ? 'Edit address' : 'Add address'}
            </Typography>
            <Typography
              component="h2"
              sx={{
                marginBottom: 2,
              }}
              variant="h6"
            >
              Contact details
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: 4 }}>
              <Grid item sm={4} xs={12}>
                <TextField
                  error={errors.firstName && touched.firstName}
                  fullWidth
                  helperText={
                    errors.firstName && touched.firstName && errors.firstName
                  }
                  label="First name"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  variant="filled"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  error={errors.lastName && touched.lastName}
                  fullWidth
                  helperText={
                    errors.lastName && touched.lastName && errors.lastName
                  }
                  label="Last name"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  variant="filled"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  error={errors.companyName && touched.companyName}
                  fullWidth
                  helperText={
                    errors.companyName &&
                    touched.companyName &&
                    errors.companyName
                  }
                  label="Company name"
                  name="companyName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyName}
                  variant="filled"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  error={errors.email && touched.email}
                  fullWidth
                  helperText={errors.email && touched.email && errors.email}
                  label="Email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant="filled"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
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
                  required
                  value={values.phoneNumber}
                  variant="filled"
                />
              </Grid>
            </Grid>
            <Typography
              component="h2"
              sx={{
                marginBottom: 2,
              }}
              variant="h6"
            >
              Address details
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: 4 }}>
              <Grid item sm={4} xs={12}>
                <TextField
                  error={errors.country && touched.country}
                  fullWidth
                  helperText={
                    errors.country && touched.country && errors.country
                  }
                  label="Country"
                  name="country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  select
                  value={values.country}
                  variant="filled"
                >
                  {countries.map((c) => (
                    <MenuItem key={c.code} value={c.code}>
                      {c.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  error={errors.state && touched.state}
                  fullWidth
                  helperText={errors.state && touched.state && errors.state}
                  label="State/Province/Region"
                  name="state"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.state}
                  variant="filled"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  error={errors.city && touched.city}
                  fullWidth
                  helperText={errors.city && touched.city && errors.city}
                  label="City/Town"
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.city}
                  variant="filled"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  error={errors.postalCode && touched.postalCode}
                  fullWidth
                  helperText={
                    errors.postalCode && touched.postalCode && errors.postalCode
                  }
                  label="Postal/ZIP code"
                  name="postalCode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.postalCode}
                  variant="filled"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  error={errors.address && touched.address}
                  fullWidth
                  helperText={
                    errors.address && touched.address
                      ? errors.address
                      : 'Street name and number'
                  }
                  label="Address"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.address}
                  variant="filled"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  error={
                    errors.addressExtraInformation &&
                    touched.addressExtraInformation
                  }
                  fullWidth
                  helperText={
                    errors.addressExtraInformation &&
                    touched.addressExtraInformation
                      ? errors.address
                      : 'Apartment, unit, building, floor, etc.'
                  }
                  label="Address additional info"
                  name="addressExtraInformation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.addressExtraInformation}
                  variant="filled"
                />
              </Grid>
            </Grid>
            <Typography
              component="h2"
              sx={{
                marginBottom: 2,
              }}
              variant="h6"
            >
              Additional details
            </Typography>
            <Grid container columnSpacing={0} rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errors.referenceName && touched.referenceName}
                  fullWidth
                  helperText={
                    errors.referenceName &&
                    touched.referenceName &&
                    errors.referenceName
                  }
                  label="Give the address a reference name"
                  name="referenceName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.referenceName}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    errors.additionalComments && touched.additionalComments
                  }
                  fullWidth
                  helperText={
                    errors.additionalComments &&
                    touched.additionalComments &&
                    errors.additionalComments
                  }
                  label="Any additional comments"
                  multiline
                  name="additionalComments"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  rows={2}
                  value={values.additionalComments}
                  variant="filled"
                />
              </Grid>
            </Grid>
          </ActionPanel>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrEditAddressPage;
