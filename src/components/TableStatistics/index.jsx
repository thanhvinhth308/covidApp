import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import covidApi from '../../apis/covidApi';
TableStatistics.propTypes = {};

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => (
      <Box textAlign="center" width="100%">
        {params.row.id}
      </Box>
    ),
  },

  {
    field: 'country',
    headerName: 'COUNTRY',
    width: 200,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => (
      <Box display="flex" alignItems="center" textAlign="center">
        <Avatar src={params.row.flag} />
        <div>{params.row.country}</div>
      </Box>
    ),
  },
  {
    field: 'continent',
    headerName: 'CONTINENT',
    width: 200,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => (
      <Box textAlign="center" width="100%">
        {params.row.continent}
      </Box>
    ),
  },
  {
    field: 'cases',
    headerName: 'CASES',
    type: 'number',
    width: 200,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => (
      <Box textAlign="center" width="100%">
        {params.row.cases}
      </Box>
    ),
  },
  {
    field: 'recovered',
    headerName: 'RECOVERED',
    headerAlign: 'center',
    type: 'number',
    width: 200,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => (
      <Box textAlign="center" width="100%">
        {params.row.recovered}
      </Box>
    ),
  },
  {
    field: 'deaths',
    headerName: 'DEATHS',
    headerAlign: 'center',
    type: 'number',
    width: 200,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => (
      <Box textAlign="center" width="100%">
        {params.row.deaths}
      </Box>
    ),
  },
];

function TableStatistics(props) {
  const [infoCountries, setInfoCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const handleMapData = async () => {
      setIsLoading(true);
      const information = await covidApi.getSummaryAllCountry();
      const informationFilter = information.map((country, index) => ({
        id: index + 1,
        flag: country.countryInfo.flag,
        country: country?.country,
        continent: country?.continent,
        cases: country?.cases,
        recovered: country?.recovered,
        deaths: country?.deaths,
      }));
      setIsLoading(false);
      setInfoCountries(informationFilter);
    };
    try {
      handleMapData();
    } catch (error) {
      alert('Get Data failed,please try again');
      setIsLoading(false);
    }
  }, []);
  return (
    <Box style={{ height: 620 }}>
      <DataGrid
        className={classes.root}
        showCellRightBorder={true}
        showColumnRightBorder={true}
        loading={isLoading}
        rows={infoCountries}
        columns={columns}
        pageSize={10}
        disableExtendRowFullWidth={true}
        onCellClick={() => {
          console.log('onCellClick');
        }}
      />
    </Box>
  );
}

export default TableStatistics;
