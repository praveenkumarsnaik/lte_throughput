data2 = JSON.parse(data2)

Highcharts.chart('container_2', {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Final Throuhput value Average for 15  different simalated throughput '
    },
    subtitle: {
      text: 'with and without MIMO tech'
    },
    xAxis: {
      categories:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,4,49,50],
      title: {
          text: 'Number of users'
      }
    },
    yAxis: {
      title: {
        text: 'Average Throughput Mbps'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: [{
      name: 'without MIMO tech',
      data: data2[0]
    }, {
      name: 'with MIMO 2*2 tech',
      data: data2[1]
    }]
  });