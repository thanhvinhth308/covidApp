import { LinearProgress } from '@material-ui/core';
import Highchart from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import covidApi from '../../apis/covidApi';
import { GlobalActions } from '../../redux/rootAction';

WorldMap.propTypes = {};

highchartsMap(Highchart);
const initOption = {
  chart: {
    height: '500',
    // nullColor: 'yellow',
    backgroundColor: '#b7e3fa',
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
      [0.2, '#e0529c'],
      [0.4, '#cb2b83'],
      [0.6, '#cb2b83'],
      [0.8, '#a02669'],
      [1, '#551c3b'],
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
      // point: {
      //   type: 'mapline',
      //   name: 'Separators',
      //   nullColor: 'gray',
      //   showInLegend: false,
      //   enableMouseTracking: false,
      // },
    },
    {
      name: 'Separators',
      nullColor: 'gray',
      showInLegend: false,
    },
  ],
};

function WorldMap(props) {
  const [mapData, setMapData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const handleMapData = async () => {
        setIsLoading(true);
        const map = await import(`@highcharts/map-collection/custom/world.geo.json`);
        const summaryByCountry = await covidApi.getSummaryAllCountry();
        setMapData({
          ...initOption,
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
      };
      handleMapData();
    } catch (error) {
      dispatch(GlobalActions.changeApiStatus(true));
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      {isLoading && <LinearProgress />}
      <HighchartsReact
        highcharts={Highchart}
        options={mapData}
        constructorType="mapChart"
        // ref={chartRef}
      />
    </div>
  );
}

export default WorldMap;
