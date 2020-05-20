import React, {Fragment, useState, useEffect} from 'react';
import AppBarDash from '../components/AppBarDash';
import DashDate from '../components/DashDate';
import DashData from '../components/DashData';
import ScanLayout from '../components/ScanLayout';
import ScanPOS from '../components/ScanPOS';
import ResultLayout from '../components/ResultLayout';
import ResultPOS from '../components/ResultPOS';
import TransactionLayout from '../components/TransactionLayout';
import Transaction from '../components/Transaction';
import { withAuthSync, logout } from '../utils/auth';
import nextCookie from 'next-cookies';
import moment from 'moment';
import { Container } from '@material-ui/core';


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
    setEmployee_number('');
    setCostOfGoods('');
    setOpenAlert(false);
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



  ///// DASHDATE PROPS
  const [startDate, handleStartDateChange] = useState(new Date());
  const [endDate, handleEndDateChange] = useState(new Date());
  const [shift, setShift] = useState('AM');
  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };
  const [ netSales, setNetSales ] = useState({});
  const [ totalLoadedAmount, setTotalLoadedAmount ] = useState({});
  const [ transactionCount, setTransactionCount ] = useState({});
  const [ transactionLog, setTransactionLog ] = useState({});


  // get report agad agad
  useEffect(() => {
    async function fetchCanteenNetSales(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/getnetsales'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setNetSales(await response.json())
      }
    }

    fetchCanteenNetSales()
  }, [startDate])
  // get report agad agad
  useEffect(() => {
    async function fetchCanteenNetSales(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/gettotalloadedamount'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setTotalLoadedAmount(await response.json())
      }
    }

    fetchCanteenNetSales()
  }, [startDate])
  
  // get report agad agad
  useEffect(() => {
    async function fetchCanteenNetSales(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/gettransactioncounts'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setTransactionCount(await response.json())
      }
    }

    fetchCanteenNetSales()
  }, [startDate])

  // get report agad agad
  useEffect(() => {
    async function fetchCanteenTransactionLogs(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/gettransactionlogs'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setTransactionLog(await response.json())
      }
    }

    fetchCanteenTransactionLogs()
  }, [startDate])

  // get report agad agad
  useEffect(() => {
    async function fetchCanteenNetSales(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/getnetsales'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setNetSales(await response.json())
      }
    }

    fetchCanteenNetSales()
  }, [endDate])
  // get report agad agad
  useEffect(() => {
    async function fetchCanteenNetSales(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/gettotalloadedamount'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setTotalLoadedAmount(await response.json())
      }
    }

    fetchCanteenNetSales()
  }, [endDate])
  
  // get report agad agad
  useEffect(() => {
    async function fetchCanteenNetSales(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/gettransactioncounts'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setTransactionCount(await response.json())
      }
    }

    fetchCanteenNetSales()
  }, [endDate])

  // get report agad agad
  useEffect(() => {
    async function fetchCanteenTransactionLogs(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/gettransactionlogs'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setTransactionLog(await response.json())
      }
    }

    fetchCanteenTransactionLogs()
  }, [endDate])

  // get report agad agad
  useEffect(() => {
    async function fetchCanteenNetSales(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/getnetsales'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setNetSales(await response.json())
      }
    }

    fetchCanteenNetSales()
  }, [shift])
  // get report agad agad
  useEffect(() => {
    async function fetchCanteenNetSales(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/gettotalloadedamount'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setTotalLoadedAmount(await response.json())
      }
    }

    fetchCanteenNetSales()
  }, [shift])
  
  // get report agad agad
  useEffect(() => {
    async function fetchCanteenNetSales(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/gettransactioncounts'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setTransactionCount(await response.json())
      }
    }

    fetchCanteenNetSales()
  }, [shift])

  // get report agad agad
  useEffect(() => {
    async function fetchCanteenTransactionLogs(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4849/gettransactionlogs'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          shift: shift
        }) 
      })

      if(response.status === 200){
        setTransactionLog(await response.json())
      }
    }

    fetchCanteenTransactionLogs()
  }, [shift])

  //console.log(netSales, totalLoadedAmount, transactionCount, transactionLog)

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
      <AppBarDash logout={logout} canteenUserData={canteenUserData} />
      <DashDate
        startDate={startDate}
        handleStartDateChange={handleStartDateChange}
        endDate={endDate}
        handleEndDateChange={handleEndDateChange}
        shift={shift}
        handleShiftChange={handleShiftChange}
      />
      <DashData
        startDate={startDate}
        endDate={endDate}
        shift={shift}
        netSales={netSales}
        totalLoadedAmount={totalLoadedAmount}
        transactionCount={transactionCount}
        transactionLog={transactionLog}
      />
    </Fragment>
  );
}


export default withAuthSync(Index);

Index.getInitialProps = async (context) => {
  const {token} = nextCookie(context);
  return {token};
}