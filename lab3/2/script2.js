var SetIntervalTime = [];
var SetTimeoutTime = [];
const N = 10;

var M;

var requestID;
var timeoutID;
var intervalID;

function updateMValue() {
    M = document.forms[0].quantity.value;
}

function doTimeConsumingCallculationsWithSetInterval() {
    SetIntervalTime.push(performance.now());
    if(SetIntervalTime.length > N) {
        SetIntervalTime.shift();
    }
    calculatePrimes(1000, 1000000000);
}

function doTimeConsumingCallculationsWithSetTimeout() {
    SetTimeoutTime.push(performance.now());
    if(SetTimeoutTime.length > N) {
        SetTimeoutTime.shift();
    }
    calculatePrimes(1000, 1000000000);

    timeoutID = window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, M);
}

function calculatePrimes(iterations, multiplier) {
  var primes = [];
  for (var i = 0; i < iterations; i++) {
    var candidate = i * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
          isPrime = false;
          break;
       }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
}

function drawChart() {
    var sumSetIntervalTime = 0;
    var sumSetTimeoutTime = 0;

    if (SetIntervalTime.length > 1 && SetTimeoutTime.length > 1) {
        for (var i = 0; i < SetIntervalTime.length - 1; i++) {
            sumSetIntervalTime += (SetIntervalTime[i + 1] - SetIntervalTime[i]);
        }
    
        for (var i = 0; i < SetTimeoutTime.length - 1; i++) {
            sumSetTimeoutTime += (SetTimeoutTime[i + 1] - SetTimeoutTime[i]);
        }
    
        var meanSetIntervalTime = sumSetIntervalTime / (SetIntervalTime.length - 1);
        var meanSetTimeoutTime = sumSetTimeoutTime / (SetTimeoutTime.length - 1);
    
        var chart = new CanvasJS.Chart("chartContainer1", {
            animationEnabled: false,
            exportEnabled: true,
            theme: "light1",
            title:{
                text: "Sredni czas cyklicznego wywolania funkcji obciazajacych dla SetTimeoutTime oraz SetIntervalTime"
            },
              axisY: {
              includeZero: true
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                  indexLabelFontSize: 16,
                indexLabelPlacement: "outside",
                dataPoints: [
                    { x: 1, y: meanSetIntervalTime, indexLabel: "\u2605 meanSetIntervalTime" },
                    { x: 2, y: meanSetTimeoutTime, indexLabel: "\u2691 meanSetTimeoutTime" }
                ]
            }]
        });
        chart.render();

        var chart = new CanvasJS.Chart("chartContainer2", {
            animationEnabled: false,
            exportEnabled: true,
            theme: "light1",
            title:{
                text: "Czasy cyklicznego wywolania doTimeConsumingCallculationsWithSetInterval"
            },
              axisY: {
              includeZero: true
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                  indexLabelFontSize: 16,
                indexLabelPlacement: "outside",
                dataPoints: [
                    { x: 1, y: SetIntervalTime[1] - SetIntervalTime[0]},
                    { x: 2, y: SetIntervalTime[2] - SetIntervalTime[1]},
                    { x: 3, y: SetIntervalTime[3] - SetIntervalTime[2]},
                    { x: 4, y: SetIntervalTime[4] - SetIntervalTime[3]},
                    { x: 5, y: SetIntervalTime[5] - SetIntervalTime[4]},
                    { x: 6, y: SetIntervalTime[6] - SetIntervalTime[5]},
                    { x: 7, y: SetIntervalTime[7] - SetIntervalTime[6]},
                    { x: 8, y: SetIntervalTime[8] - SetIntervalTime[7]},
                    { x: 9, y: SetIntervalTime[9] - SetIntervalTime[8]}
                ]
            }]
        });
        chart.render();
    
        var chart = new CanvasJS.Chart("chartContainer3", {
            animationEnabled: false,
            exportEnabled: true,
            theme: "light1",
            title:{
                text: "Czasy cyklicznego wywolania doTimeConsumingCallculationsWithSetTimeout"
            },
              axisY: {
              includeZero: true
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                  indexLabelFontSize: 16,
                indexLabelPlacement: "outside",
                dataPoints: [
                    { x: 1, y: SetTimeoutTime[1] - SetTimeoutTime[0]},
                    { x: 2, y: SetTimeoutTime[2] - SetTimeoutTime[1]},
                    { x: 3, y: SetTimeoutTime[3] - SetTimeoutTime[2]},
                    { x: 4, y: SetTimeoutTime[4] - SetTimeoutTime[3]},
                    { x: 5, y: SetTimeoutTime[5] - SetTimeoutTime[4]},
                    { x: 6, y: SetTimeoutTime[6] - SetTimeoutTime[5]},
                    { x: 7, y: SetTimeoutTime[7] - SetTimeoutTime[6]},
                    { x: 8, y: SetTimeoutTime[8] - SetTimeoutTime[7]},
                    { x: 9, y: SetTimeoutTime[9] - SetTimeoutTime[8]}
                ]
            }]
        });
        chart.render();
    }

    requestID = window.requestAnimationFrame(drawChart);
}

function start() {
    updateMValue();
    intervalID = window.setInterval(doTimeConsumingCallculationsWithSetInterval, M);
    timeoutID = window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, M);
    requestID = window.requestAnimationFrame(drawChart);
}

function stop() {
    console.log("stopping");
    window.cancelAnimationFrame(requestID);
    window.clearInterval(intervalID);
    window.clearTimeout(timeoutID);
}