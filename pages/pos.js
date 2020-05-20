import React, {Fragment, useState, useEffect} from 'react';
import AppBarPOS from '../components/AppBarPOS';
import ScanLayout from '../components/ScanLayout';
import ScanPOS from '../components/ScanPOS';
import ResultLayout from '../components/ResultLayout';
import ResultPOS from '../components/ResultPOS';
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
    setSubmitPOSbutton(false);
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
    setEmployee_number('');
    setCostOfGoods('');
    setOpenAlert(false);
    setSubmitPOSbutton(false);
  }

  // cost of goods ---------------
  const [ costOfGoods, setCostOfGoods ] = useState('');
  const handleOnChangeCostOfGoods = (e) => {
    setCostOfGoods(e.target.value);
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
      setOpenNext(false);
    }

  }

  const [ submitPOSbutton, setSubmitPOSbutton ] = useState(false);

  async function handleSubmitPOS(){
    setSubmitPOSbutton(true);
    setOpenNext(false);
    setOpenBackrop(!openBackdrop)

    let route = 'http://dev-metaspf401.sunpowercorp.com:4848/pointofsaletransaction'

    let response = await fetch(`${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: props.token,
        id: userData.id,
        username: canteenUserData.username, // login canteen credentials first...
        organization: canteenUserData.organization,
        available_balance: userData.available_balance,
        cost_of_goods_purchased: costOfGoods
      })
    })

    if(response.status === 200){
      setResponseMessage(await response.json());
      setOpenAlert(true);
      setOpenBackrop(false)
      setCostOfGoods('');
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
      <AppBarPOS logout={logout}  canteenUserData={canteenUserData} />
      <ScanLayout>
        <ScanPOS employee_number={employee_number} handleEmployeeNumberOnChange={handleEmployeeNumberOnChange} handleEmployeeNumberOnClick={handleEmployeeNumberOnClick} autoFocus={true} />
      </ScanLayout>
      <ResultLayout>
      { 
        userData ?
          userData.id == employee_number  ?  // will be replaced soon... with data from the server.
          <ResultPOS 
            userData={userData}
            selectCash100={selectCash100}
            selectCash200={selectCash200}
            selectCash500={selectCash500}
            handleSearchCancel={handleSearchCancel}
            handleCashOnToggle100={handleCashOnToggle100}
            handleCashOnToggle200={handleCashOnToggle200}
            handleCashOnToggle500={handleCashOnToggle500}
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
            costOfGoods={costOfGoods}
            handleOnChangeCostOfGoods={handleOnChangeCostOfGoods}
            handleSubmitPOS={handleSubmitPOS}
            submitPOSbutton={submitPOSbutton}
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