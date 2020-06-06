import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';
import { Alert, AlertTitle } from '@material-ui/lab';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  result: {
    marginTop: 0
  },
  button: {
    marginTop: 10,
    height: 80
  },
  buttonNext: {
    marginTop: 10,
    height: 40
  },
  account: {
    fontFamily: 'Roboto Condensed'
  },
  accountValues: {
    fontFamily: 'Roboto Condensed'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  profilePicContainer: {
    width: '80%',
    margin: 'auto',
    textAlign: 'center'
  },
  profilePic: {
    width: '50%',
    height: 'auto',
    borderRadius: '50%',
    margin: 'auto'
  },
}));

export default function Result(props) {
  const classes = useStyles()
  const employeeProfilePic = `http://dev-metaspf401.sunpowercorp.com:4000/codecs-img/${props.userData.id}.png` || '';
  function addDefaultImg(e){
    e.target.src = `https://robohash.org/${props.userData.id}`
  }

  return (
    <Paper elevation={0}  className={classes.result}>
      <CardContent>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className={classes.profilePicContainer}>
              <img src={employeeProfilePic} onError={addDefaultImg} className={classes.profilePic}/>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography color="textPrimary" align="center" variant="h2" gutterBottom>{props.userData.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography color="textSecondary" align="left">Balance</Typography>
            <Typography className={classes.accountValues} align="left" variant="h5" gutterBottom>₱{props.userData.available_balance}</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <Typography color="textSecondary" align="left">Account Name</Typography>
            <Typography className={classes.accountValues} align="left" variant="h6" gutterBottom>{props.userData.name}</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <Typography color="textSecondary" align="left">Employee Number</Typography>
            <Typography className={classes.accountValues} align="left" variant="h6" gutterBottom>{props.userData.id}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Collapse in={props.openAlert}>
              {
                props.responseMessage.status == 'success' ?
                <Alert 
                  severity="success"
                  onClose={props.handleClickCloseAlert}
                >
                  <AlertTitle>Success!</AlertTitle>
                  {props.responseMessage.message}
                </Alert>
                :
                props.responseMessage.status == 'failed' ?
                <Alert 
                  severity="error"
                  onClose={props.handleClickCloseAlert}
                >
                  <AlertTitle>Error!</AlertTitle>
                  {props.responseMessage.message}
                </Alert>
                :
                <Alert 
                  severity="error"
                  onClose={props.handleClickCloseAlert}
                >
                  <AlertTitle>Error!</AlertTitle>
                  There's an error during transfer. Check connection and try again.
                </Alert>
              }
            </Collapse>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography color="textSecondary" align="left">Enter amount</Typography>
            <Typography className={classes.accountValues} align="left" variant="h5" gutterBottom>Cost of goods</Typography>
            <TextField  pattern="[0-9]*" value={props.costOfGoods} onChange={props.handleOnChangeCostOfGoods} fullWidth variant="outlined" type="number" />
          </Grid>
        </Grid>
      </CardContent>
      {
        props.costOfGoods && props.openAlert == false ? 
          <>
            <CardContent>
              <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Typography>Total Amount </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Typography className={classes.accountValues} variant="h6"  align="right" gutterBottom>₱{props.costOfGoods}.00</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container spacing={1} justify="flex-end">
                <Grid item>
                  <Button className={classes.buttonNext} align="right" variant="text" color="secondary" onClick={props.handleSearchCancel} >Cancel</Button>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <Button fullWidth className={classes.buttonNext} align="right" variant="contained" color="secondary" onClick={props.handleClickOpenNext}>
                      Next
                    </Button>
                  <Dialog
                    open={props.openNext}
                    onClose={props.handleCloseNext}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Payment Confirmation"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        A total of ₱{props.costOfGoods}.00 will be deducted to {props.userData.name}'s account
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={props.handleSubmitPOS} disabled={props.submitPOSbutton} color="secondary" autoFocus variant="contained">
                        Confirm
                      </Button>
                      <Button onClick={props.handleCloseNext} color="default">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Backdrop className={classes.backdrop} open={props.openBackdrop}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </Grid>
              </Grid>
            </CardActions>
          </>
        : <></>
      }
    </Paper>
  );
}
