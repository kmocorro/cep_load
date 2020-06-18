import React from 'react';
import propTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function ScanLayout({children}) {
  return (
    <Container maxWidth="lg">
      <Grid container >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          { children ? children :<Typography>Missing...</Typography>}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
        </Grid>
      </Grid>
    </Container>
  );
}

// PropTypes exports a range of validators that can be used to make sure the data you receive is valid.
ScanLayout.propTypes = {
  children: propTypes.element.isRequired
}