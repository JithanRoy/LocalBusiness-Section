import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Image from 'next/future/image';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import authAxios from '../../../library/apis/api-client';
import profile from '../../../public/assets/profile.png';
import CompanyList from '../../Search/CompanyList/CompanyList';
import EditProfileModal from './editProfileModal';

const MyProfile = () => {
  const [value, setValue] = useState(0);
  const [showChild, setShowChild] = useState(false);
  const [userData, setData] = useState();
  const [open, setOpen] = React.useState(false);
  const [servicedata, setServicedata] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [paymentdata, setPaymentData] = useState();

  const [pageLimit, setPageLimit] = useState();

  const getProfile = async () => {
    try {
      const response = await axios.all([
        authAxios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/self/profile`
        ),
        authAxios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/history/paymentHistorybyToken`
        ),
        authAxios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/history/HistoryDetailbyToken`
        ),
      ]);

      if (response === 'undefined') {
      } else {
        setData(response[0]?.data.data);
        setPaymentData(response[1]?.data.paymentHistory);

        setPageLimit(response[1]?.data?.limit);
        setServicedata(response[2].data?.historyDetail);

        console.log('response', response);
      }

      if (response.status === 200) {
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
      }
    }
  };

  useEffect(() => {
    setShowChild(true);

    getProfile();

    const endOffset = itemOffset + pageLimit;

    setCurrentItems(paymentdata?.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(paymentdata?.length / pageLimit));

    //console.log(pageCount);
  }, [itemOffset, pageLimit]);

  const handlePageClick = (event, value) => {
    const pagevalue = value - 1;
    setPage(value);
    console.log(value);
    const newOffset = (pagevalue * pageLimit) % paymentdata?.length;

    setItemOffset(newOffset);
  };

  if (!showChild) {
    return null;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function createData(
    pnp,
    noc,
    date,
    time,
    sent_cur,
    receive_cur,
    payment_stat
  ) {
    return { pnp, noc, date, time, sent_cur, receive_cur, payment_stat };
  }

  const rows = [
    createData(
      'Print and post',
      14247406,
      '20 July 2022',
      '20:52',
      '5.00 CAD',
      '315.00 INR',
      'Completed'
    ),
  ];

  return (
    <>
      <section className="section-style">
        <div className="bg-[#3294D1] md:min-h-[285px] sm:min-h-[285px] min-h-[200px] sm:p-12 p-5 rounded-xl">
          <div className=" flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-white">
                {' '}
                <PersonIcon />
              </span>

              <h2 className="text-white sm:ml-4 ml-2 text-[16px] sm:text-[20px] lg:text-[20px] md:text-[20px] text-left mt-0 sm:mt-1 uppercase">
                My Profile
              </h2>
            </div>

            <div className="">
              <button
                onClick={() => setOpen(true)}
                className="flex bg-[#D16F32] text-white sm:text-[14px] text-[12px] cursor-pointer px-4 md:py-3 py-2 rounded-md items-center"
                href=""
              >
                <span className="mr-2">
                  {' '}
                  <EditIcon />
                </span>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="flex bg-white rounded-xl mt-[-90px] mx-5 sm:mx-12 pb-8  shadow-xl">
          <Image
            src={profile}
            alt="logo text"
            className="mt-[-30px] md:mx-6 mx-3  border rounded-full bg-white md:max-w-[176px] md:max-h-[176px] max-w-[120px] max-h-[120px] object-scale-down"
          />
          <div className="flex flex-col justify-center items-start">
            <h1 className="headline1 uppercase font-bold lg:text-[26px] md:text-[26px] sm:text-[20px] text-sm my-2">
              {`${userData?.firstname} ${userData?.lastname}`}
            </h1>
            <h4 className="text-[12px] md:text-sm font-medium">Director</h4>
          </div>
        </div>
      </section>
      <div className="section-style">
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              height: '55px',
              background: '#FFFFF',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)',
              borderRadius: '10px',
              padding: '7px 0px',
            }}
          >
            <Tabs
              TabIndicatorProps={{
                style: { background: '#D16F32' },
              }}
              value={value}
              variant="scrollable"
              onChange={handleChange}
              scrollButtons="auto"
              aria-label="basic tabs example "
            >
              <Tab
                style={{
                  textTransform: 'none',
                  color: value === 0 ? '#D16F32' : '#909090',
                  fontSize: 17,
                  fontWeight: value === 0 ? 'bold' : '',
                }}
                label="Basic"
                {...a11yProps(0)}
              />
              <Tab
                style={{
                  textTransform: 'none',
                  color: value === 1 ? '#D16F32' : '#909090',
                  fontSize: 17,
                  fontWeight: value === 1 ? 'bold' : '',
                }}
                label="Payment"
                {...a11yProps(1)}
              />
              <Tab
                style={{
                  textTransform: 'none',
                  color: value === 2 ? '#D16F32' : '#909090',
                  fontSize: 17,
                  fontWeight: value === 2 ? 'bold' : '',
                }}
                label="Print and post"
                {...a11yProps(1)}
              />
              <Tab
                style={{
                  textTransform: 'none',
                  color: value === 3 ? '#D16F32' : '#909090',
                  fontSize: 17,
                  fontWeight: value === 3 ? 'bold' : '',
                }}
                label="Download"
                {...a11yProps(1)}
              />
              <Tab
                style={{
                  textTransform: 'none',
                  color: value === 4 ? '#D16F32' : '#909090',
                  fontSize: 17,
                  fontWeight: value === 4 ? 'bold' : '',
                }}
                label="Email"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          {/* Basic tab */}
          <TabPanel value={value} index={0}>
            <div className="text-xl py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl font-bold text-[#797979]">
              Basic
            </div>
            <div className="companyprofile-table">
              <table className="w-full shadow-lg rounded-2xl">
                <tbody>
                  <tr>
                    <td>Phone Number: </td>
                    <td>{userData?.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Email: </td>
                    <td>{userData?.email}</td>
                  </tr>
                  <tr>
                    <td>Company Name</td>
                    <td>{userData?.company_name}</td>
                  </tr>
                  <tr>
                    <td>Services we provuserDatae: </td>
                    <td>{userData?.companyType}</td>
                  </tr>
                  <tr>
                    <td>Website: </td>
                    <td>{userData?.companyWebsite}</td>
                  </tr>
                  <tr>
                    <td>Joining Date:</td>
                    <td>{userData?.createdAt}</td>
                  </tr>
                  <tr>
                    <td>Address: </td>
                    <td>{`${userData?.country} ${userData?.city} `}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPanel>
          {/* Myprofile Payment tab */}
          <TabPanel value={value} index={1}>
            <div className="text-xl py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl font-bold text-[#797979]">
              PAYMENT HISTORY
            </div>
            <div className="w-full shadow-lg rounded-2xl">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-bold text-[#797979] text-center min-w-[160px] lg:min-w-full ">
                        Package name
                      </TableCell>
                      <TableCell className="font-bold text-[#797979] text-center min-w-[160px] lg:min-w-full ">
                        Number of company
                      </TableCell>
                      <TableCell className="font-bold text-[#797979] text-center min-w-[160px] lg:min-w-full ">
                        Date
                      </TableCell>
                      <TableCell className="font-bold text-[#797979] text-center min-w-[160px] lg:min-w-full ">
                        Time
                      </TableCell>
                      <TableCell className="font-bold text-[#797979] text-center min-w-[160px] lg:min-w-full ">
                        Sent Currency
                      </TableCell>
                      <TableCell className="font-bold text-[#797979] text-center min-w-[160px] lg:min-w-full ">
                        Receive Currency
                      </TableCell>
                      <TableCell className="font-bold text-[#797979] text-center min-w-[160px] lg:min-w-full ">
                        Payment status
                      </TableCell>
                      <TableCell className="font-bold text-[#797979] text-center min-w-[160px] lg:min-w-full ">
                        Details
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentItems?.length > 0 ? (
                      currentItems?.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell align="center" component="th" scope="row">
                            {row.pnp}
                          </TableCell>
                          <TableCell align="center">{row.noc}</TableCell>
                          <TableCell align="center">{row.date}</TableCell>
                          <TableCell align="center">{row.time}</TableCell>
                          <TableCell align="center">{row.sent_cur}</TableCell>
                          <TableCell align="center">
                            {row.receive_cur}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              color:
                                value === 'Completed'
                                  ? 'text-green-600 '
                                  : 'text-red-600',
                            }}
                          >
                            Completed
                          </TableCell>
                          <TableCell
                            className="cursor-pointer text-[#3294D1]"
                            align="center"
                          >
                            <RemoveRedEyeOutlinedIcon />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <div>
                        <h3 className="text-xl font-semibold py-20 pl-5">
                          No data available
                        </h3>
                      </div>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="border shadow-lg p-3 items-center">
                <Stack className="items-center" spacing={2}>
                  <Pagination
                    count={pageCount}
                    defaultPage={1}
                    variant="outlined"
                    color="secondary"
                    page={page}
                    onChange={handlePageClick}
                  />
                </Stack>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className=" py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl"></div>
            <table className="w-full shadow-lg rounded-2xl">
              <tbody>
                <CompanyList data={servicedata} />
              </tbody>
            </table>
          </TabPanel>

          <TabPanel value={value} index={3}>
            <div className=" py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl"></div>
            <table className="w-full shadow-lg rounded-2xl">
              <tbody>
                <CompanyList data={servicedata} />
              </tbody>
            </table>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <div className=" py-5 pl-5 mt-3 text-left border border-[#F6F7F7] shadow rounded-t-2xl"></div>
            <table className="w-full shadow-lg rounded-2xl">
              <tbody>
                <CompanyList data={servicedata} />
              </tbody>
            </table>
          </TabPanel>
        </Box>
      </div>
      {userData ? (
        <EditProfileModal open={open} data={userData} setOpen={setOpen} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default MyProfile;
