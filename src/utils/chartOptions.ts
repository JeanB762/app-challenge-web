export const downtimeOptions = {
  chart: {
    type: 'column',
  },
  title: {
    text: 'Assets with higher downtime',
  },
  subtitle: {
    text: 'hours / month',
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Downtime (h)',
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} h</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
    },
  },
  series: [
    {
      name: 'Asset 1',
      data: [4.2, 1.5, 6.4, 9.2, 4.0, 6.0, 5.6, 8.5, 6.4, 4.1, 5.6, 4.4],
    },
    {
      name: 'Asset 7',
      data: [3.6, 8.8, 8.5, 3.4, 10.0, 4.5, 5.0, 4.3, 1.2, 3.5, 6.6, 2.3],
    },
    {
      name: 'Asset 10',
      data: [8.9, 8.8, 9.3, 1.4, 7.0, 8.3, 9.0, 9.6, 2.4, 5.2, 9.3, 1.2],
    },
    {
      name: 'Asset 3',
      data: [2.4, 3.2, 4.5, 9.7, 2.6, 5.5, 7.4, 6.4, 7.6, 9.1, 6.8, 1.1],
    },
  ],
};

export const temperatureOptions = {
  title: {
    text: 'Assets with higher operating temperature ( ºC )',
  },
  xAxis: {
    categories: ['26/01', '27/01', '28/01', '29/01', '30/01'],
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} ºC</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true,
  },
  series: [
    {
      name: 'Asset 1',
      data: [
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
      ],
    },
    {
      name: 'Asset 2',
      data: [
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
      ],
    },
    {
      name: 'Asset 3',
      data: [
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
      ],
    },
    {
      name: 'Asset 4',
      data: [
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        Math.floor(Math.random() * (70 - 40 + 1)) + 40,
      ],
    },
  ],
};
