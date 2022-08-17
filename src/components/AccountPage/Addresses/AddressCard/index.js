// @packages
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// @app
import Progress from 'components/Progress';

const StyledCard = styled(Card)(() => ({
  borderWidth: '2px',
  display: 'flex',
  flexDirection: 'column',
  height: '250px',
  justifyContent: 'space-between',
}));

const AddressCard = ({
  address,
  city,
  country,
  name,
  onDelete,
  onEdit,
  referenceName,
  requesting,
}) => (
  <Progress open={requesting}>
    <StyledCard variant="outlined">
      <CardContent>
        <Typography component="h3" sx={{ fontWeight: 'bold' }} variant="h6">
          {referenceName || name}
        </Typography>
        {referenceName && (
          <Typography
            color="text.secondary"
            sx={{ fontWeight: 'bold' }}
            variant="body2"
          >
            {name}
          </Typography>
        )}
        <Typography color="text.secondary" variant="body2">
          {address}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {`${city}, ${country}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </CardActions>
    </StyledCard>
  </Progress>
);

AddressCard.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  referenceName: PropTypes.string,
  requesting: PropTypes.bool,
};

AddressCard.defaultProps = {
  referenceName: '',
  requesting: false,
};

export default AddressCard;
