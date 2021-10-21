var mkwSocket = 'https://mkw-socket.vndirect.com.vn';
var companyNames = [];
var isChartUpdated = false;
function Liquidity(opt) {
  this.init();
}
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;
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

Liquidity.prototype.init = function () {
  console.log('Init chart');
  var index = getUrlParameter('index');
  this.lang = getUrlParameter('lang');
  if (!this.lang) {
    this.lang = 'en';
  }
  if (!index) {
    let nodata = 'Chưa có dữ liệu giao dịch';
    if (this.lang == 'en') {
      nodata = 'No data avaiable';
    }
    $('#chart-title').html('');
    $('#liquiditydiv').html("<div class='nodata'>" + nodata + '</div>');
    return;
  }
  $('#liquiditydiv').html("<div class='nodata'>Loading...</div>");
  this.mainDiv = $('#liquiditydiv');
  let self = this;

  $('#liquiditydiv').html('');
  this.arrDataLi = [];
  this.arrDataLiY = [];

  $.get(
    mkwSocket + '/mkwsocket/liquidity?index=PRE-' + index,
    function (response) {
      self.arrDataLiY = response.data;
      if (!self.arrDataLiY || self.arrDataLiY.length === 0) {
        let nodata = 'Chưa có dữ liệu giao dịch';
        if (self.lang == 'en') {
          nodata = 'No data avaiable';
        }
        $('#liquiditydiv').html("<div class='nodata'>" + nodata + '</div>');
      } else {
        let last = self.arrDataLiY[self.arrDataLiY.length - 1];
        var d = new Date(last.time);
        d.setHours(15);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        self.arrDataLiY.push({
          time: d.getTime() + 7 * 60 * 60 * 1000,
          value: self.arrDataLiY[self.arrDataLiY.length - 1].value,
        });
        $.get(
          mkwSocket + '/mkwsocket/liquidity?index=' + index,
          function (response) {
            self.arrDataLi = response.data ? response.data : [];
            if (!self.arrDataLi || self.arrDataLi.length === 0) {
              let nodata = 'Chưa có dữ liệu giao dịch';
              if (self.lang == 'en') {
                nodata = 'No data avaiable';
              }
              $('#liquiditydiv').html(
                "<div class='nodata'>" + nodata + '</div>'
              );
            } else {
              $('#liquiditydiv').html('');
              var chartData = self.createChartData();
              self.draw(chartData);
            }
          }
        );
      }
    }
  );

  setInterval(() => {
    if (isChartUpdated) {
      var chartData = this.createChartData();
      this.draw(chartData);
      isChartUpdated = false;
    }
  }, 1000 * 60);
};

Liquidity.prototype.drawChart = function () {
  this.mainDiv.html('');
  var chartData = this.createChartData();
  this.draw(chartData);
};

Liquidity.prototype.draw = function (data) {
  this.mainDiv.highcharts(data);
  this.mainDiv.attr('isDraw', 'true');
};

Liquidity.prototype.updateData = function (data) {
  if (data.value === 0) {
    return;
  }
  this.arrDataLi.push(data);
  isChartUpdated = true;
};

Liquidity.prototype.createChartData = function () {
  var heightChart = getUrlParameter('height');
  if (!heightChart) {
    heightChart = 400;
  }

  var ranges = [];
  if (this.arrDataLi.length > 0) {
    for (var i in this.arrDataLi) {
      ranges.push([
        parseFloat(this.arrDataLi[i].time),
        0,
        parseFloat(this.arrDataLi[i].value.toFixed(2)),
      ]);
    }
  }

  var ranges1 = [];
  if (this.arrDataLiY.length > 0) {
    for (var i in this.arrDataLiY) {
      console.log(this.arrDataLiY[i].time);
      ranges1.push([
        parseFloat(this.arrDataLiY[i].time),
        0,
        parseFloat(this.arrDataLiY[i].value.toFixed(2)),
      ]);
    }
  }

  var color = getUrlParameter('color');
  if (!color) {
    color = '#274b6d';
  }

  var result = {
    chart: {
      type: 'arearange',
      zoomType: 'x',
      height: heightChart,
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      labels: {
        style: {
          color: color,
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: this.lang == 'en' ? 'Trading value (bil. VND)' : 'GTGD (tỷ VND)',
        style: {
          color: color,
        },
      },
      labels: {
        style: {
          color: color,
        },
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      valueSuffix: '',
      xDateFormat: '%H:%M:%S',
    },
    legend: {
      enable: true,
      borderWidth: 0,
      itemStyle: {
        color: color,
      },
      itemHoverStyle: {
        color: color,
      },
    },
    credits: {
      text: '',
      href: '',
    },
    plotOptions: {
      series: {
        animation: {
          duration: 0,
        },
      },
    },
    series: [
      {
        name: this.lang == 'en' ? 'Previous trading value' : 'GTGD phiên trước',
        lineWidth: 1,
        data: ranges1,
        color: '#808285',
      },
      {
        name: this.lang == 'en' ? 'Today trading value' : 'GTGD hôm nay',
        lineWidth: 1,
        data: ranges,
        color: '#F7941F',
      },
    ],
  };
  return result;
};

$(document).ready(function () {
  window.vnda('create', 'MKW', 'auto', 'MKW-tracker');
  window.vnda('MKW-tracker.send', 'event', 'Liquidity', 'View');
  liquidity = new Liquidity();
  var index = getUrlParameter('index');
  var socket = io(mkwSocket + '/socket.io', {
    query: {
      chart: 'liquidity',
    },
  });
  socket.on('connect', function () {
    console.log('Socket Connected');
  });
  let self = this;
  socket.on('data', function (data) {
    if (data.length > 0 && data[0].index === index) {
      liquidity.updateData(data[0]);
    }
  });
  socket.on('disconnect', function () {});
});

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
};
