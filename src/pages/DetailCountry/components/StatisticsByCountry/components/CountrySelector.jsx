import { Avatar, Box, makeStyles, TextField } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useTranslation } from 'react-i18next';
CountrySelector.propTypes = {};

const useStyles = makeStyles((theme) => ({
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

function CountrySelector(props) {
  const { onCountryChange, countries = [] } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Autocomplete
      id="country-select"
      options={countries}
      classes={{
        option: classes.option,
      }}
      onChange={onCountryChange}
      autoHighlight
      getOptionLabel={(option) => option.country}
      renderOption={(option) => (
        <React.Fragment>
          <span>
            <Avatar className={classes.square} src={option?.flag} />
          </span>
          {option?.country}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <Box>
          <TextField
            {...params}
            label={t('detailPage.titleSelect')}
            variant="outlined"
            color="secondary"
            fullWidth
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        </Box>
      )}
    />
  );
}
export default CountrySelector;
