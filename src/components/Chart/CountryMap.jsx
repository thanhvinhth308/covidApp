import { Box, CircularProgress } from '@material-ui/core';
import Highchart from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { themeColor } from '../../utils/constants';
CountryMap.propTypes = {};

highchartsMap(Highchart);

const initOption = {
  chart: {
    height: '500',
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, '#e84749'],
      [0.4, '#a61d24'],
      [0.6, '#791a1f'],
      [0.8, '#58181c'],
      [1, '#431418'],
    ],
  },
  legend: {
    layout: 'bottom',
    align: 'left',
    verticalAlign: 'bottom',
  },
  series: [
    {
      mapData: {},
      joinBy: ['hc-key', 'key'],
      name: 'Population',
    },
  ],
};

function CountryMap(props) {
  const { countryId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({});
  const [mapData, setMapData] = useState(null);
  const darkMode = useSelector((state) => state.GlobalReducer.darkTheme);
  const chartRef = useRef(null);

  useEffect(() => {
    if (countryId) {
      setIsLoading(true);
      import(`@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`)
        .then((res) => {
          setIsLoading(false);
          const fakeData = res.features.map((feature, index) => ({
            key: feature.properties['hc-key'],
            value: index,
          }));
          setMapData(res);
          setOptions({
            ...initOption,
            chart: {
              backgroundColor: darkMode ? themeColor.gray : themeColor.light,
              height: '400',
            },
            series: [
              {
                ...initOption.series[0],
                mapData: res,
                data: fakeData,
              },
            ],
          });
        })
        .catch((error) => {
          setOptions({
            title: {
              text: 'Sorry,Map not found :((',
              verticalAlign: 'middle',
            },
          });
          setIsLoading(false);
        });
    }
  }, [countryId, darkMode]);
  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0]?.update({
        mapData,
      });
    }
  }, [mapData]);

  return isLoading ? (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    <HighchartsReact highcharts={Highchart} options={cloneDeep(options)} constructorType="mapChart" ref={chartRef} />
  );
}

export default React.memo(CountryMap);
