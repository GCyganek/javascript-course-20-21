define([], function(){
    return {
        drawPieChart: function(data, chartTitle, canvasId) {
            var canvas = document.querySelector("#" + canvasId);
            var context = canvas.getContext("2d");
        
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;

            context.clearRect(0, 0, WIDTH, HEIGHT);
        
            const LEGEND_LEFT = WIDTH / 2;
            const LEGEND_TOP = HEIGHT / 10;
            
            const GRAPH_AND_LEGEND_WIDTH = WIDTH / 2;
            const GRAPH_AND_LEGEND_HEIGHT = 9 * HEIGHT / 10;
        
            var data_value = 0;
            var data_size = 0;
        
            // chartTitle
            context.font = "bold .8rem serif"
            context.textAlign = "center";
            context.fillText(chartTitle, WIDTH / 2, HEIGHT / 15, 9 * WIDTH / 10)
        
        
            // drawing pie chart using data
            var colors = []
            
            for (var label in data){
                data_value += data[label];
                data_size += 1;
                colors.push("#" + Math.floor(Math.random()*16777215).toString(16));
            }
        
            var angle = 0;
            var radius = Math.min(GRAPH_AND_LEGEND_WIDTH / 2, HEIGHT / 10 + GRAPH_AND_LEGEND_HEIGHT / 2);
            var color_index = 0;
            for (label in data) {
                var slice_angle = 2 * Math.PI * data[label] / data_value;
                context.beginPath();
                context.fillStyle = colors[color_index];
                context.moveTo(GRAPH_AND_LEGEND_WIDTH / 2, HEIGHT / 10 + GRAPH_AND_LEGEND_HEIGHT / 2);
                context.arc(GRAPH_AND_LEGEND_WIDTH / 2, HEIGHT / 10 + GRAPH_AND_LEGEND_HEIGHT / 2, radius, angle, angle + slice_angle);
                angle += slice_angle;
                color_index += 1;
                context.fill();
                context.stroke();
                context.closePath();
            }
        
        
            // creating chart legend
            color_index = 0;
            for (label in data) {
                context.beginPath();
                context.fillStyle = colors[color_index];
                context.textAlign = "center";
                context.fillText(label + ": " + Math.round(100 * data[label] / data_value) + "%", LEGEND_LEFT + GRAPH_AND_LEGEND_WIDTH / 2, LEGEND_TOP + (color_index + 1) * GRAPH_AND_LEGEND_HEIGHT / data_size);
                color_index += 1;
                context.closePath();
            }
        }
    };
});