import { Skeleton } from '@material-ui/lab';
import Highchart from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import covidApi from '../../apis/covidApi';
import { GlobalActions } from '../../redux/rootAction';
import { themeColor } from '../../utils/constants';
WorldMap.propTypes = {};

highchartsMap(Highchart);
const initOption = {
  chart: {
    height: '500',
  },
  title: {
    text: '',
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
      name: 'Số người bị',
    },
    {
      name: 'Cases',
      nullColor: 'gray',
      showInLegend: false,
    },
  ],
};

function WorldMap(props) {
  const [mapData, setMapData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const darkMode = useSelector((state) => state.GlobalReducer.darkTheme);
  const dispatch = useDispatch();

  const handleMapData = async () => {
    try {
      setIsLoading(true);
      const map = await import(`@highcharts/map-collection/custom/world.geo.json`);
      const summaryByCountry = await covidApi.getSummaryAllCountry();
      setMapData({
        ...initOption,
        chart: { backgroundColor: darkMode ? themeColor.gray : themeColor.light, height: '500' },
        series: [
          {
            ...initOption.series[0],
            ...initOption.series[1],
            mapData: map,
            data: summaryByCountry.map((feature) => ({
              key: feature.countryInfo.iso2?.toLowerCase(),
              value: feature.cases,
            })),
          },
        ],
      });
      setIsLoading(false);
    } catch (error) {
      dispatch(GlobalActions.toggleErrorHandler(true));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleMapData();
  }, [darkMode]);

  return (
    <div>
      {isLoading ? (
        <Skeleton animation="wave" height={500} />
      ) : (
        <HighchartsReact highcharts={Highchart} options={mapData} constructorType="mapChart" />
      )}
    </div>
  );
}

export default WorldMap;
