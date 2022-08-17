// @packages
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// @app
import Progress from 'components/Progress';

const StyledBackToBox = styled(Box)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginBottom: '7px',
}));

const StyledActionsPaper = styled(Paper)(({ theme }) => ({
  alignItems: 'center',
  borderBottom: 0,
  borderLeft: 0,
  borderRight: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(3),
}));

const ActionPanel = ({
  backToText,
  children,
  maxWidth,
  onBack,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonDisabled,
  primaryButtonText,
  requesting,
  secondaryButtonDisabled,
  secondaryButtonText,
}) => (
  <Container maxWidth={maxWidth}>
    <StyledBackToBox onClick={onBack}>
      <ArrowBackIcon sx={{ fontSize: '15px', marginRight: 0.5 }} />
      <Typography
        color="text.secondary"
        sx={{ lineHeight: 1, marginRight: 0.5 }}
        variant="caption"
      >
        Back to
      </Typography>
      <Typography
        color="text.primary"
        sx={{ fontWeight: 'bold', lineHeight: 1 }}
        variant="caption"
      >
        {backToText}
      </Typography>
    </StyledBackToBox>
    <Paper variant="outlined">
      <Progress open={requesting}>
        <Box sx={{ padding: 3 }}>{children}</Box>
        <StyledActionsPaper variant="outlined">
          <Button
            disableElevation
            disabled={secondaryButtonDisabled}
            onClick={onSecondaryButtonClick}
            size="large"
            sx={{ marginRight: 3 }}
            type="button"
            variant="text"
          >
            {secondaryButtonText}
          </Button>
          <Button
            disableElevation
            disabled={primaryButtonDisabled}
            onClick={onPrimaryButtonClick}
            size="large"
            type="button"
            variant="contained"
          >
            {primaryButtonText}
          </Button>
        </StyledActionsPaper>
      </Progress>
    </Paper>
  </Container>
);

ActionPanel.propTypes = {
  backToText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onPrimaryButtonClick: PropTypes.func.isRequired,
  onSecondaryButtonClick: PropTypes.func.isRequired,
  primaryButtonDisabled: PropTypes.bool,
  primaryButtonText: PropTypes.string,
  requesting: PropTypes.bool,
  secondaryButtonDisabled: PropTypes.bool,
  secondaryButtonText: PropTypes.string,
};

ActionPanel.defaultProps = {
  primaryButtonDisabled: false,
  primaryButtonText: 'Save',
  requesting: false,
  secondaryButtonDisabled: false,
  secondaryButtonText: 'Back',
};

export default ActionPanel;
