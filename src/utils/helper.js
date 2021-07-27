const checkToken = () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  if (username && password) return true;
  return false;
};

const filterCountryReport = (data, startDate, endedDate) => {
  const cases = data.cases;
  const deaths = data.deaths;
  const recovered = data.recovered;

  const casesDay = Object.keys(cases);
  const deathsDay = Object.keys(deaths);
  const recoveredDay = Object.keys(recovered);

  const casesDayIndex = casesDay.findIndex((day) => day === startDate);
  const casesEndedDayIndex = casesDay.findIndex((day) => day === endedDate);

  const casesValue = Object.values(cases).slice(casesDayIndex, casesEndedDayIndex + 1);
  const casesKey = Object.keys(cases).slice(casesDayIndex, casesEndedDayIndex + 1);
  const newCases = {};
  for (let y = 0; y < casesKey.length; y++) {
    newCases[casesKey[y]] = casesValue[y];
  }

  const deathsDayIndex = deathsDay.findIndex((day) => day === startDate);
  const deathsEndedDayIndex = deathsDay.findIndex((day) => day === endedDate);
  const deathsValue = Object.values(deaths).slice(deathsDayIndex, deathsEndedDayIndex + 1);
  const deathsKey = Object.keys(deaths).slice(deathsDayIndex, deathsEndedDayIndex + 1);
  const newDeaths = {};
  for (let y = 0; y < casesKey.length; y++) {
    newDeaths[deathsKey[y]] = deathsValue[y];
  }

  const recoveredDayIndex = recoveredDay.findIndex((day) => day === startDate);
  const recoveredEndedDayIndex = recoveredDay.findIndex((day) => day === endedDate);
  const recoveredValue = Object.values(recovered).slice(recoveredDayIndex, recoveredEndedDayIndex + 1);
  const recoveredKey = Object.keys(recovered).slice(recoveredDayIndex, recoveredEndedDayIndex + 1);
  const newRecovered = {};
  for (let y = 0; y < casesKey.length; y++) {
    newRecovered[recoveredKey[y]] = recoveredValue[y];
  }

  const dataMap = { timeline: { cases: newCases, deaths: newDeaths, recovered: newRecovered } };
  return dataMap;
};

export { checkToken, filterCountryReport };
