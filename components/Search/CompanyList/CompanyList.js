import React, { useEffect, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { DataGrid, GridFooter, GridFooterContainer } from '@mui/x-data-grid';

// import ActionIcon from '../../../public/assets/action.png';
// import ActiveIcon from '../../../public/assets/active.png';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"
import SearchModal from './SearchModal/SearchModal';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Link from 'next/link';
import { Button, IconButton, Select } from '@mui/material';
import { useRecoilState } from 'recoil';
import { paginationRecoil } from '../../../store/atoms/paginationRecoil';
import { companyListRecoil } from '../../../store/atoms/companyListRecoil';
import { paginationClient } from '../../../library/utils/queryClient';
const CompanyList = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [paginationState, setPaginationState] = useRecoilState(paginationRecoil);
  const [companyData, setCompanyData] = useRecoilState(companyListRecoil);
  // console.log("SELECTION", companyData)

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = async (e) => {
    try {
      setPaginationState(prev => ({
        ...prev,
        sort_by: e.target.value
      }))
      const response = await paginationClient({ ...paginationState, sort_by: e.target.value })
      // console.log("RESPONSE", response)
      rowBuilder(response)
    } catch (error) {
      setPaginationState(prev => ({
        ...prev
      }))
      console.log(error)
    }
  }

  function handleRowSelect(p) {
    setCompanyData((prev) => {
      let i = prev.indexOf(p);
      if (i > -1) {
        return prev.filter((el) => el !== p);
      } else {
        return [...prev, p];
      }
    });
  }

  const handleLimit = async (p) => {
    // console.log("LIMIT ", p.target.value)
    try {
      setPaginationState(prev => ({
        ...prev,
        limit: p.target.value
      }))
      const response = await paginationClient({ ...paginationState, limit: p.target.value })
      // console.log("RESPONSE", response)
      rowBuilder(response)
    } catch (error) {
      setPaginationState(prev => ({
        ...prev
      }))
      console.log(error)
    }
  }

  const handleNext = async (e) => {
    try {
      setPaginationState(prev => ({
        ...prev,
        page: prev.page + 1
      }))
      const response = await paginationClient({ ...paginationState, page: paginationState.page + 1 })
      // console.log("RESPONSE", response)
      rowBuilder(response)
    } catch (error) {
      setPaginationState(prev => ({
        ...prev
      }))
      console.log(error)
    }
  }
  const handlePrev = async (e) => {
    try {
      setPaginationState(prev => ({
        ...prev,
        page: prev.page === 1 ? 1 : prev.page - 1
      }))
      const response = await paginationClient({ ...paginationState, page: paginationState.page === 1 ? 1 : paginationState.page - 1 })
      // console.log("RESPONSE", response)
      rowBuilder(response)
    } catch (error) {
      setPaginationState(prev => ({
        ...prev
      }))
      console.log(error)
    }
  }


  const columns = [
    { field: 'companyname', headerName: 'Company name', width: 130 },
    { field: 'companynumber', headerName: 'Company Number', width: 130 },
    { field: 'type', headerName: 'Type', width: 70 },
    {
      field: 'creationdate',
      headerName: 'Creation Date',
      type: 'date',
      width: 130,
    },
    {
      field: 'city',
      headerName: 'City',

      width: 130,
    },
    {
      field: 'postcode',
      headerName: 'Post Code',
      width: 130,
    },
    {
      field: 'siccode',
      headerName: 'Sic Code',
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        return (
          <div className="flex items-center border-2 border-solid px-2 py-1 rounded-2xl">
            <FiberManualRecordIcon className={`${params?.value === 'active' ? 'text-green-600 ' : 'text-red-600'} h-4 w-4`} />
            <span className="ml-1">{params?.value}</span>
          </div>
        );
      },
    },
    {
      field: 'details',
      headerName: 'Details',
      width: 70,
      renderCell: (params) => {
        return (
          <Link href={`companynumber/${params.value}`}>
            <IconButton aria-label="delete" size="small">
              <RemoveRedEyeOutlinedIcon fontSize="inherit" className='text-[#3294D1]' />
            </IconButton>
          </Link>
        );
      },
    },
  ];
  function CustomFooter() {
    return (
      <GridFooterContainer className='flex justify-end'>
        <div className='m-2 flex justify-between'>
          <p className='p-3'>{paginationState.page === 1 ? 1 : (((paginationState.page - 1) * paginationState.limit)+1)} - {(((paginationState.page - 1) * paginationState.limit)+1)+rows.length-1} of {paginationState.total}</p>
          <div className='p-2'>
            <Button variant='outlined' onClick={handlePrev}><AiOutlineArrowLeft /></Button>
            <Button variant='outlined' onClick={handleNext}><AiOutlineArrowRight /></Button>
          </div>
        </div>
      </GridFooterContainer>

    )
  }

  const [rows, setRows] = useState();
  const [searched, setSearched] = useState('');


  function rowBuilder(data) {
    const dataRows = data.companyData.map((row) => ({
      id: row?._id,
      companyname: row?.company_name,
      companynumber: row?.company_number,
      type: row?.company_type,
      creationdate: '2022-07-21',
      city: row?.registered_office_address.locality,
      postcode: row?.registered_office_address.postal_code,
      siccode: row.sic_codes[0],
      status: row?.company_status,
      details: row?.company_number,
    }));
    console.log(dataRows)
    setRows(dataRows);
  }

  React.useEffect(() => {
    if (data) {
      rowBuilder(data)
    }
  }, [data]);

  const requestSearch = (e) => {
    setSearched(e.target.value);
    if (searched.length <= 1) {
      //setRows(originalRows);
    } else {
      const filteredRows = rows.filter((row) => {
        return row.companyname.toLowerCase().includes(searched.toLowerCase());
      });
      setRows(filteredRows);
    }
  };
  // console.log(rows);

  return (
    <div>
      <div className="flex flex-col py-3 border-2 px-2  shadow-md lg:flex-row ">
        <div className="flex flex-col justify-between w-full lg:w-3/4 lg:flex-row md:flex-row sm:flex-row items-center">
          <div className="w-full flex lg:w-2/4">
            <h6 className="mr-2 text-[15px] font-bold">Compnay List</h6>
            <p className="text-[14px]">
              {data?.noOfDocuments} new company found
            </p>
          </div>
          <div className="flex mr-3 items-center mt-2 lg:mt-0 w-full lg:w-2/4 sm:justify-end px-2">
            <p className="mr-2 text-[14px]">Company list per page</p>
            <select value={paginationState.limit} className="border-2 border-solid rounded h-8" onChange={handleLimit}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>

        <div className="flex lg:justify-between items-center w-full lg:w-auto mt-5 lg:mt-0">
          <div className="w-2/4 ">
            <div className="flex border-2 border-solid rounded px-0 py-1 mr-1 h-8 items-center relative lg:px-2 md:justify-between">
              <input
                value={searched}
                placeholder="Search Here"
                onChange={requestSearch}
                className="Searchbar"
                sx={{
                  '& .css-i4bv87-MuiSvgIcon-root': {
                    display: 'none!important',
                  },
                }}
              />

              <button onClick={handleOpen}>
                {' '}
                <TuneIcon className="cursor-pointer" />
              </button>
              <SearchModal
                open={open}
                setOpen={setOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
                setRows={rowBuilder}
              />
            </div>
          </div>
          <div className="w-2/4 lg:w-auto">
            <div className="flex border-2 border-solid rounded px-0 h-8 lg:px-2 ">
              <select className="w-full" onChange={handleChange}>
                <option value="">Sort By</option>
                <option value="company">Company Number</option>
                <option value="city">City</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        {!!rows && (
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              rowsPerPageOptions={[paginationState.limit]}
              checkboxSelection
              components={{ Footer: CustomFooter }}
              onCellClick={(p, e) => handleRowSelect(p.row.companynumber)}
              // components={{
              //   NoRowsOverlay: () => (
              //     <Stack
              //       height="100%"
              //       alignItems="center"
              //       justifyContent="center"
              //     >
              //       No data available
              //     </Stack>
              //   ),
              //   NoResultsOverlay: () => (
              //     <Stack
              //       height="100%"
              //       alignItems="center"
              //       justifyContent="center"
              //     >
              //       CustomFooter
              //     </Stack>
              //   ),
              //   Footer: CustomFooter
              // }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
