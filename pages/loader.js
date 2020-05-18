import React, {Fragment, useState, useEffect} from 'react';
import AppBarLoader from '../components/AppBarLoader';
import ScanLayout from '../components/ScanLayout';
import Scan from '../components/Scan';
import ResultLayout from '../components/ResultLayout';
import Result from '../components/Result';
import TransactionLayout from '../components/TransactionLayout';
import Transaction from '../components/Transaction';
import { withAuthSync, logout } from '../utils/auth';
import nextCookie from 'next-cookies';


function Index(props) {
  //console.log(props);
  const [ canteenUserData, setCanteenUserData ] = useState('');
  console.log(canteenUserData);
  const [ employee_number, setEmployee_number ] = useState('');
  const [ userData, setUserData ] = useState({});
  //console.log(userData);
  const handleEmployeeNumberOnClick = () => {
    setOpenAlert(false)
    setSubmitLoadAccountButton(false);
  }
  const handleEmployeeNumberOnChange = (e) => {
    setEmployee_number(e.target.value);
    setResponseMessage('');
    setSelectedCashValue('');
    setSelectCash100(false);
    setSelectCash200(false);
    setSelectCash500(false);
    setSelectCash1000(false);
  }
  const handleSearchCancel = () => {
    setEmployee_number('');
    setResponseMessage('');
    setSelectedCashValue('');
    setSelectCash100(false);
    setSelectCash200(false);
    setSelectCash500(false);
    setSelectCash1000(false);
  }

  const [ selectedCashValue, setSelectedCashValue ] = useState('');
  const [ selectCash100, setSelectCash100 ] = useState(false);
  const [ selectCash200, setSelectCash200 ] = useState(false);
  const [ selectCash500, setSelectCash500 ] = useState(false);
  const [ selectCash1000, setSelectCash1000 ] = useState(false);

  const handleCashOnToggle100 = () => {
    setSelectedCashValue('100')
    setSelectCash100(!selectCash100)
    setSelectCash200(false)
    setSelectCash500(false)
    setSelectCash1000(false)
    if(selectCash100){
      setSelectedCashValue('')
    }
  }
  const handleCashOnToggle200 = () => {
    setSelectedCashValue('200')
    setSelectCash100(false)
    setSelectCash200(!selectCash200)
    setSelectCash500(false)
    setSelectCash1000(false)
    if(selectCash200){
      setSelectedCashValue('')
    }
  }
  const handleCashOnToggle500 = () => {
    setSelectedCashValue('500')
    setSelectCash100(false)
    setSelectCash200(false)
    setSelectCash500(!selectCash500)
    setSelectCash1000(false)
    if(selectCash500){
      setSelectedCashValue('')
    }
  }
  const handleCashOnToggle1000 = () => {
    setSelectedCashValue('1000')
    setSelectCash100(false)
    setSelectCash200(false)
    setSelectCash500(false)
    setSelectCash1000(!selectCash1000)
    if(selectCash1000){
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
    setEmployee_number('');
    setResponseMessage('');
    setSelectedCashValue('');
    setSelectCash100(false);
    setSelectCash200(false);
    setSelectCash500(false);
    setSelectCash1000(false)
    setOpenNext(false);
  };

  // Response Alert box
  const [ openAlert, setOpenAlert ] = useState(false);
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
    setOpenNext(false);
  }
  const handleClickCloseAlert = () => {
    setEmployee_number('');
    setSelectedCashValue(''); 
    setSelectCash100(false);
    setSelectCash200(false);
    setSelectCash500(false);
    setSelectCash1000(false)
    setOpenAlert(false)
    setSubmitLoadAccountButton(false);
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
  
  const [ submitLoadAccountButton, setSubmitLoadAccountButton ] = useState(false);

  async function handleSubmitLoadAccount(){
    setSubmitLoadAccountButton(true);
    setOpenNext(false);
    setOpenBackrop(!openBackdrop);

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
      <AppBarLoader logout={handleLogout} />
      <ScanLayout>
        <Scan employee_number={employee_number} handleEmployeeNumberOnChange={handleEmployeeNumberOnChange} handleEmployeeNumberOnClick={handleEmployeeNumberOnClick} />
      </ScanLayout>
      <ResultLayout>
      { 
        userData ?
          userData.id == employee_number  ?  // will be replaced soon... with data from the server.
          <Result 
            userData={userData}
            selectCash100={selectCash100}
            selectCash200={selectCash200}
            selectCash500={selectCash500}
            selectCash1000={selectCash1000}
            handleSearchCancel={handleSearchCancel}
            handleCashOnToggle100={handleCashOnToggle100}
            handleCashOnToggle200={handleCashOnToggle200}
            handleCashOnToggle500={handleCashOnToggle500}
            handleCashOnToggle1000={handleCashOnToggle1000}
            selectedCashValue={selectedCashValue}
            handleSubmitLoadAccount={handleSubmitLoadAccount}
            responseMessage={responseMessage}
            openNext={openNext}
            handleClickOpenNext={handleClickOpenNext}
            handleCloseNext={handleCloseNext}
            openAlert={openAlert}
            handleClickOpenAlert={handleClickOpenAlert}
            handleClickCloseAlert={handleClickCloseAlert}
            openBackdrop={openBackdrop}
            canteenUserData={canteenUserData}
            submitLoadAccountButton={submitLoadAccountButton}
          />
          :<></>
        :<></>
      }
      </ResultLayout>
    </Fragment>
  );
}


export default withAuthSync(Index);

Index.getInitialProps = async (context) => {
  const {token} = nextCookie(context);
  return {token};
}