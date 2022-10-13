// @packages
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import orderBy from 'lodash/orderBy';
import { deleteDoc, doc } from 'firebase/firestore';
import { getName as getCountryName } from 'country-list';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// @app
import ROUTES from 'routes';
import useAuthUser from 'hooks/useAuthUser';
import useConfirmationModal from 'hooks/useConfirmationModal';
import useFirebase from 'hooks/useFirebase';
import { openNotification } from 'redux/notification';

// @own
import AddressCard from './AddressCard';
import CreateAddressCard from './CreateAddressCard';

const Addresses = () => {
  const [requestingAddressId, setRequestingAddressId] = useState(undefined);
  const dispatch = useDispatch();
  const history = useHistory();
  const { authUser, authUserAddresses } = useAuthUser();
  const { db } = useFirebase();
  const { openConfirmationModal } = useConfirmationModal();

  const handleAddressCreate = () => history.push(ROUTES.ACCOUNT.ADDRESSES.NEW);

  const handleAddressEdit = (addressId) =>
    history.push(ROUTES.ACCOUNT.ADDRESSES.EDIT_FN(addressId));

  const handleAddressDelete = async (addressId) => {
    const isConfirmed = await openConfirmationModal({
      content: 'Are you sure you want to delete this address?',
      title: 'Delete address',
    });

    if (isConfirmed) {
      try {
        setRequestingAddressId(addressId);

        await deleteDoc(
          doc(db, `users/${authUser.uid}/addresses/${addressId}`)
        );

        dispatch(
          openNotification({
            duration: 5000,
            message: 'The address was deleted',
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
        setRequestingAddressId(false);
      }
    }
  };

  return (
    <>
      <Typography
        component="h2"
        sx={{
          fontWeight: 'bold',
          marginBottom: 2,
        }}
        variant="h5"
      >
        Addresses
      </Typography>
      <Typography sx={{ marginBottom: 4 }}>
        Add shipping or billing addresses to use when shopping on the site.
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          <CreateAddressCard onClick={handleAddressCreate} />
        </Grid>
        {orderBy(authUserAddresses, ['referenceName', 'firstName']).map((a) => (
          <Grid item key={a.id} md={4} sm={6} xs={12}>
            <AddressCard
              address={`${a.address} ${a.addressExtraInformation}`}
              city={a.city}
              country={getCountryName(a.country)}
              name={`${a.firstName} ${a.lastName}`}
              onDelete={() => handleAddressDelete(a.id)}
              onEdit={() => handleAddressEdit(a.id)}
              referenceName={a.referenceName}
              requesting={a.id === requestingAddressId}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Addresses;
