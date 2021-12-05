define(["linechart", "piechart"], function(linechart, piechart){
    return {
        drawTestPlots: function(){
            linechart.drawLineChart([23, 33, 42, 51, 9, 72, 12, 23, 24], [1, 2, 3, 4, 5, 8, 12, 15, 50], "canvas1", "Chart for first set of data", "xAxis", "yAxis");
            linechart.drawLineChart([23, 33, 42, 51, 9, 72, 12, 23, 24], [1, 2, 3, 4, 5, 8, 12, 15, 50], "canvas2", "Chart for first set of data", "xAxis", "yAxis");
            linechart.drawLineChart([1000, 20, 5003, 2200, 999, 2902, 1000, 5000, 1000], [1, 50, 300, 350, 400, 420, 440, 460, 480], "canvas3", "Chart for second set of data", "xAxis", "yAxis");
            linechart.drawLineChart([1000, 20, 5003, 2200, 999, 2902, 1000, 5000, 1000], [1, 50, 300, 350, 400, 420, 440, 460, 480], "canvas4", "Chart for second set of data", "xAxis", "yAxis");

            dataSetPieChart1 = {
                "Label1": 2,
                "Label2": 23,
                "Label3": 22,
                "Label4": 15,
                "Label5": 6
            };

            dataSetPieChart2 = {
                "Label1": 23,
                "Label2": 50,
                "Label3": 21,
                "Label4": 11,
                "Label5": 23,
                "Label6": 22,
                "Label7": 3
            };

            piechart.drawPieChart(dataSetPieChart1, "Pie Chart for dataSetPieChart1", "canvas5");
            piechart.drawPieChart(dataSetPieChart1, "Pie Chart for dataSetPieChart1", "canvas6");
            piechart.drawPieChart(dataSetPieChart2, "Pie Chart for dataSetPieChart2", "canvas7");
            piechart.drawPieChart(dataSetPieChart2, "Pie Chart for dataSetPieChart2", "canvas8");
        },
        drawPieChart: function(data, title, canvasId) {
            piechart.drawPieChart(data, title, canvasId);
        },
        drawLineChart: function(xdata, ydata, canvasId, title, xAxis, yAxis) {
            linechart.drawLineChart(xdata, ydata, canvasId, title, xAxis, yAxis);
        }
    };
});