import Highchart from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
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
      name: 'Dan so',
    },
  ],
};

function CountryMap(props) {
  const { countryId } = props;
  const [options, setOptions] = useState({});
  const [mapData, setMapData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (countryId) {
      import(`@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`).then(
        (res) => {
          const fakeData = res.features.map((feature, index) => ({
            key: feature.properties['hc-key'],
            value: index,
          }));
          setMapData(res);
          setOptions({
            ...initOption,
            series: [
              {
                ...initOption.series[0],
                mapData: res,
                data: fakeData,
              },
            ],
          });
        }
      );
    }
  }, [countryId]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0]?.update({
        mapData,
      });
    }
  }, [mapData]);
  return (
    <HighchartsReact
      highcharts={Highchart}
      options={cloneDeep(options)}
      constructorType="mapChart"
      ref={chartRef}
    />
  );
}

export default CountryMap;
