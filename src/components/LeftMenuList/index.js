// @packages
import List from '@mui/material/List';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';

const LeftMenuList = ({ children, title }) => (
  <List
    component="nav"
    disablePadding
    subheader={
      <Typography
        component="h1"
        sx={{
          fontWeight: 'bold',
          padding: 3,
        }}
        variant="h5"
      >
        {title}
      </Typography>
    }
  >
    {children}
  </List>
);

LeftMenuList.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default LeftMenuList;
