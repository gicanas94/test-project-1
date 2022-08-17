// @packages
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

// @app
import LeftMenuList from 'components/LeftMenuList';
import ROUTES from 'routes';

// @own
import Addresses from './Addresses';
import GeneralInformation from './GeneralInformation';

const AccountPage = () => {
  const history = useHistory();
  const { section: sectionParam } = useParams();

  const sections = [
    {
      component: <GeneralInformation />,
      icon: <PersonIcon fontSize="medium" />,
      name: 'general',
      onClick: () => history.push(ROUTES.ACCOUNT.GENERAL),
      text: 'General information',
    },
    {
      component: <Addresses />,
      icon: <LocationOnIcon fontSize="medium" />,
      name: 'addresses',
      onClick: () => history.push(ROUTES.ACCOUNT.ADDRESSES.ROOT),
      text: 'Addresses',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Paper variant="outlined">
        <Grid container>
          <Grid item md={3} xs={12}>
            <LeftMenuList title="Account">
              {sections.map((s) => (
                <ListItemButton
                  key={s.name}
                  onClick={s.onClick}
                  selected={s.name === sectionParam}
                >
                  {s.icon && <ListItemIcon>{s.icon}</ListItemIcon>}
                  {s.text && <ListItemText primary={s.text} />}
                </ListItemButton>
              ))}
            </LeftMenuList>
          </Grid>
          <Grid item md={9} xs={12}>
            <Box sx={{ padding: 3 }}>
              {sections.find((s) => s.name === sectionParam)?.component}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AccountPage;
