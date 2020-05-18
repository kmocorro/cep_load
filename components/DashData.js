import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EmojiFoodBeverageOutlined from '@material-ui/icons/EmojiFoodBeverageOutlined';
import ExitToAppOutlined from '@material-ui/icons/ExitToAppOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import MomentUtils from '@date-io/moment';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MaterialTable from 'material-table'
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

import { Button, Divider } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBarTitle: {
    flex: 1
  },
  dashdate: {
    margin: 20
  },
  table: {
    minWidth: 650,
  },
  header: {
    marginTop: 20
  },
  logs: {
    marginTop: 20,
  }
}));

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function DashData(props) {
  const classes = useStyles();
  const transactionLog = props.transactionLog;
  console.log(transactionLog);

  return (
    <div className={classes.dashdate}>
      <Container>
        <Grid container spacing={2} className={classes.header}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography align="center">Receipts</Typography>
            <Typography align="center" variant="h2">
              {
                props.transactionCount && props.transactionCount !== 'null' && props.transactionCount !== 'undefined' && props.transactionCount !== null ?
                numberWithCommas(props.transactionCount.queryresult || "--")
                : 0
              }
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography align="center">Net Sales</Typography>
            <Typography align="center" variant="h2">
              {
                props.netSales && props.netSales !== 'null' && props.netSales !== 'undefined' && props.netSales !== null ?
                numberWithCommas(props.netSales.queryresult || "--")
                : 0
              }
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography align="center">Total Loaded Amount</Typography>
            <Typography align="center" variant="h2">
              {
                props.totalLoadedAmount && props.totalLoadedAmount !== 'null' && props.totalLoadedAmount !== 'undefined' ?
                numberWithCommas(props.totalLoadedAmount.queryresult || "--")
                : 0
              }
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.logs}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {
              typeof transactionLog !== 'undefined' && transactionLog !== 'null' && transactionLog.length > 0 ?
                <MaterialTable
                  icons={tableIcons}
                  columns={[
                    { title: 'Transaction Date', field: 'transaction_date', defaultSort: 'desc' },
                    { title: 'Canteen', field: 'organization' },
                    { title: 'Staff', field: 'staff' },
                    { title: 'Employee Id', field: 'account_id' },
                    { title: 'Transaction Type', field: 'transaction_type' },
                    { title: 'Amount', field: 'amount', type: 'numeric' }
                  ]}
                  data={transactionLog}
                  title={`${moment(props.startDate).format('MMM DD')} to ${moment(props.endDate).format('MMM DD')} ${props.shift} Shift transaction logs`}
                  options={{
                    exportButton: true,
                    exportAllData: true
                  }}
                />
              :
              <></>
            }
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
