import { LinearProgress } from '@material-ui/core';
import Highchart from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import React, { useEffect, useState } from 'react';
import covidApi from '../../apis/covidApi';

WorldMap.propTypes = {};

highchartsMap(Highchart);
const initOption = {
  chart: {
    height: '500',
    // nullColor: 'yellow',
    backgroundColor: 'gray',
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
      [0.2, '#FFC4AA'],
      [0.4, '#FF8A66'],
      [0.6, '#FF392B'],
      [0.8, '#B71525'],
      [1, '#7A0826'],
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
      alert('Get Data failed,please try again');
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
