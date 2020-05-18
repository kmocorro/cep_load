import React, {Fragment, useState, useEffect} from 'react';
import AppBar from '../components/AppBar';
import ScanLayout from '../components/ScanLayout';
import Scan from '../components/Scan';
import ResultLayout from '../components/ResultLayout';
import Result from '../components/Result';
import TransactionLayout from '../components/TransactionLayout';
import Transaction from '../components/Transaction';
import { withAuthSync, logout } from '../utils/auth';
import nextCookie from 'next-cookies';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

function Index(props) {
  //console.log(props);
  const [ canteenUserData, setCanteenUserData ] = useState('');
  console.log(canteenUserData);
  const [ employee_number, setEmployee_number ] = useState('');
  const [ userData, setUserData ] = useState({});
  //console.log(userData);
  const handleEmployeeNumberOnClick = () => {
    setOpenAlert(false)
  }
  const handleEmployeeNumberOnChange = (e) => {
    setEmployee_number(e.target.value);
  }
  const handleSearchCancel = () => {
    setEmployee_number('');
    setSelectedCashValue('');
    setSelectCash100(false);
    setSelectCash200(false);
    setSelectCash500(false);
  }

  const [ selectedCashValue, setSelectedCashValue ] = useState('');
  const [ selectCash100, setSelectCash100 ] = useState(false);
  const [ selectCash200, setSelectCash200 ] = useState(false);
  const [ selectCash500, setSelectCash500 ] = useState(false);

  const handleCashOnToggle100 = () => {
    setSelectedCashValue('100')
    setSelectCash100(!selectCash100)
    setSelectCash200(false)
    setSelectCash500(false)
    if(selectCash100){
      setSelectedCashValue('')
    }
  }
  const handleCashOnToggle200 = () => {
    setSelectedCashValue('200')
    setSelectCash100(false)
    setSelectCash200(!selectCash200)
    setSelectCash500(false)
    if(selectCash200){
      setSelectedCashValue('')
    }
  }
  const handleCashOnToggle500 = () => {
    setSelectedCashValue('500')
    setSelectCash100(false)
    setSelectCash200(false)
    setSelectCash500(!selectCash500)
    if(selectCash500){
      setSelectedCashValue('')
    }
  }

  // response message from server after loading....
  const [ responseMessage, setResponseMessage ] = useState('');
  console.log(responseMessage);

  const [ openBackdrop, setOpenBackrop ] = useState(false);

  // Dialog box
  const [openNext, setOpenNext] = useState(false);
  const handleClickOpenNext = () => {
    setOpenNext(true);
    setOpenAlert(false)
  };
  const handleCloseNext = () => {
    setOpenNext(false);
  };

  // Response Alert box
  const [ openAlert, setOpenAlert ] = useState(false);
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
    setOpenNext(false);
  }
  const handleClickCloseAlert = () => {
    setOpenAlert(false)
  }

  // get acccount info ----------
  useEffect(() => {
    async function fetchAccountInfo(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4848/getaccountinfo'
      
      let response = await fetch(`${route}/${employee_number}`)

      if(response.status === 200){
        setUserData(await response.json())
      }
    }

    fetchAccountInfo()
  }, [employee_number])
  
  // get acccount info again----------
  useEffect(() => {
    async function fetchAccountInfo(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4848/getaccountinfo'
      
      let response = await fetch(`${route}/${employee_number}`)

      if(response.status === 200){
        setUserData(await response.json())
      }
    }

    fetchAccountInfo()
  }, [openAlert])

  
  // get user info ----------
  useEffect(() => {
    async function fetchAccountInfo(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4848/getuserprofile'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token
        }) 
      })

      if(response.status === 200){
        setCanteenUserData(await response.json())
      }
    }

    fetchAccountInfo()
  }, [employee_number])

  async function handleSubmitLoadAccount(){
    setOpenNext(false);
    setOpenBackrop(!openBackdrop)

    let route = 'http://dev-metaspf401.sunpowercorp.com:4848/loadaccount'

    let response = await fetch(`${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: props.token,
        id: userData.id,
        username: canteenUserData.username, // login canteen credentials first...
        organization: canteenUserData.organization,
        available_balance: userData.available_balance,
        load_amount: selectedCashValue
      })
    })

    if(response.status === 200){
      setResponseMessage(await response.json());
      setOpenAlert(true);
      setOpenBackrop(false)
    }

  }

  async function handleLogout(){

    let route = 'http://dev-metaspf401.sunpowercorp.com:4848/logout'

    let response = await fetch(`${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: props.token,
        username: canteenUserData.username, // login canteen credentials first...
      })
    })

    if(response.status === 200){
      setResponseMessage(await response.json());
      setOpenAlert(true);
      setOpenBackrop(false)
    }

    logout();

  }

  return (
    <Fragment>
      <AppBar logout={logout}  />
      <Container maxWidth="sm">
        <div style={{marginTop: 20, marginBottom: 20}}>
        <Typography variant="body2" color="textSecondary" gutterBottom>Select your mode</Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Link href="/pos">
            <Button fullWidth variant="outlined" style={{height: 200}}>
              <Typography variant="h6">Point-of-Sale</Typography>
            </Button>
            </Link>
          </Grid>
        </Grid>
        </div>
        <div  style={{marginTop: 20, marginBottom: 20}}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Link href="/loader">
            <Button fullWidth variant="outlined"  style={{height: 200 }}>
              <Typography variant="h6">Loading Station</Typography>
            </Button>
            </Link>
          </Grid>
        </Grid> 
        </div>
        <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Link href="/dashboard">
            <Button fullWidth variant="outlined"  style={{height: 200 }}>
              <Typography variant="h6">Dashboard</Typography>
            </Button>
            </Link>
          </Grid>
        </Grid> 
        </div>
      </Container>
    </Fragment>
  );
}


export default withAuthSync(Index);

Index.getInitialProps = async (context) => {
  const {token} = nextCookie(context);
  return {token};
}