define([], function(){
    return {
        drawLineChart: function(ydata, xdata, canvasId, plotTitle, xAxis, yAxis) {
            var canvas = document.querySelector("#" + canvasId);
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;
            
            const GRAPH_LEFT = WIDTH / 10;
            const GRAPH_RIGHT = 9 * WIDTH / 10;
            const GRAPH_BOTTOM = 9 * HEIGHT / 10;
            const GRAPH_TOP = HEIGHT / 10;
            
            const GRAPH_WIDTH = 8 * WIDTH / 10;
            const GRAPH_HEIGHT = 8 * HEIGHT / 10;
            
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, WIDTH, HEIGHT);
        
            // drawing axes
            context.beginPath();
            context.moveTo(GRAPH_LEFT, GRAPH_TOP);
            context.lineTo(GRAPH_LEFT, GRAPH_BOTTOM);
            context.lineTo(GRAPH_RIGHT, GRAPH_BOTTOM);
            
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
            
            context.beginPath();
            context.strokeStyle = '#D3D3D3';  
            context.lineWidth = 1;
            
            // drawing plot lines 
            context.moveTo(GRAPH_LEFT, (HEIGHT / 10 +  GRAPH_HEIGHT / 4));  
            context.lineTo(GRAPH_RIGHT, (HEIGHT / 10 + GRAPH_HEIGHT / 4));  
            context.stroke();
            
            context.moveTo(GRAPH_LEFT, (HEIGHT / 10 + GRAPH_HEIGHT / 2));  
            context.lineTo(GRAPH_RIGHT, (HEIGHT / 10 + GRAPH_HEIGHT / 2));  
            context.stroke();
            
            context.moveTo(GRAPH_LEFT, (HEIGHT / 10 + 3 * GRAPH_HEIGHT / 4));  
            context.lineTo(GRAPH_RIGHT, (HEIGHT / 10 + 3 * GRAPH_HEIGHT / 4));  
            context.stroke();
            
            context.moveTo(GRAPH_LEFT, (HEIGHT / 10));  
            context.lineTo(GRAPH_RIGHT, (HEIGHT / 10));  
            context.stroke();
            context.closePath();
        
            context.beginPath();
            context.strokeStyle = '#D3D3D3';  
            context.lineWidth = 1;
            
            context.moveTo(GRAPH_LEFT + GRAPH_WIDTH / 6, (GRAPH_BOTTOM));  
            context.lineTo(GRAPH_LEFT + GRAPH_WIDTH / 6, (GRAPH_TOP));  
            context.stroke();
        
            context.moveTo(GRAPH_LEFT + 2 * GRAPH_WIDTH / 6, (GRAPH_BOTTOM));  
            context.lineTo(GRAPH_LEFT + 2 * GRAPH_WIDTH / 6, (GRAPH_TOP));  
            context.stroke();
        
            context.moveTo(GRAPH_LEFT + 3 * GRAPH_WIDTH / 6, (GRAPH_BOTTOM));  
            context.lineTo(GRAPH_LEFT + 3 * GRAPH_WIDTH / 6, (GRAPH_TOP));  
            context.stroke();
        
            context.moveTo(GRAPH_LEFT + 4 * GRAPH_WIDTH / 6, (GRAPH_BOTTOM));  
            context.lineTo(GRAPH_LEFT + 4 * GRAPH_WIDTH / 6, (GRAPH_TOP));  
            context.stroke();
        
            context.moveTo(GRAPH_LEFT + 5 * GRAPH_WIDTH / 6, (GRAPH_BOTTOM));  
            context.lineTo(GRAPH_LEFT + 5 * GRAPH_WIDTH / 6, (GRAPH_TOP));  
            context.stroke();
            context.closePath();
            
            // drawing plot using data
            var largestY = Math.max(...ydata);
            var largestX = Math.max(...xdata);
            
            context.beginPath();
            context.lineJoin = "miter"
            context.strokeStyle = "black";   
            
            context.moveTo(GRAPH_LEFT, GRAPH_HEIGHT + HEIGHT / 10 - ydata[0] / largestY * GRAPH_HEIGHT);   
            for( var i = 1; i < ydata.length; i++ ){  
                context.lineTo(GRAPH_LEFT + xdata[i] / largestX * GRAPH_WIDTH,  GRAPH_HEIGHT + HEIGHT / 10 - ydata[i] / largestY * GRAPH_HEIGHT); 
            }   
            context.stroke();
            context.closePath();
        
            context.font = "bold .8rem serif"
            context.textAlign = "center";
        
            // plotTitle
            context.fillText(plotTitle, WIDTH / 2, HEIGHT / 15, 9 * WIDTH / 10)
        
            // yAxis label
            context.rotate(3 * Math.PI / 2);
            context.fillText(yAxis, -HEIGHT / 2, WIDTH / 30, 9 * HEIGHT / 10);
            
            // xAxis label
            context.rotate(Math.PI / 2);
            context.fillText(xAxis, WIDTH / 2, HEIGHT, 9 * WIDTH / 10);
        
            context.font = "10px sans-serif"
        
            // yAxis values
            context.fillText(parseFloat((largestY).toFixed(3)), GRAPH_LEFT - WIDTH / 20, (HEIGHT / 10), WIDTH / 20);
            context.fillText(parseFloat((largestY / 4).toFixed(3)), GRAPH_LEFT - WIDTH / 20, (HEIGHT / 10 + 3 * GRAPH_HEIGHT / 4), WIDTH / 20);
            context.fillText(parseFloat((largestX / 2).toFixed(3)), GRAPH_LEFT - WIDTH / 20, (HEIGHT / 10 + GRAPH_HEIGHT / 2), WIDTH / 20);
            context.fillText(parseFloat((3 * largestY / 4).toFixed(3)), GRAPH_LEFT - WIDTH / 20, (HEIGHT / 10 +  GRAPH_HEIGHT / 4), WIDTH / 20);
        
            // xAxis values 
            context.fillText(parseFloat((largestX / 6).toFixed(3)), GRAPH_LEFT + GRAPH_WIDTH / 6, (GRAPH_BOTTOM) + HEIGHT / 20, GRAPH_WIDTH / 8);
            context.fillText(parseFloat((2 * largestX / 6).toFixed(3)), GRAPH_LEFT + 2 * GRAPH_WIDTH / 6, (GRAPH_BOTTOM) + HEIGHT / 20, GRAPH_WIDTH / 8);
            context.fillText(parseFloat((3 * largestX / 6).toFixed(3)), GRAPH_LEFT + 3 * GRAPH_WIDTH / 6, (GRAPH_BOTTOM) + HEIGHT / 20, GRAPH_WIDTH / 8);
            context.fillText(parseFloat((4 * largestX / 6).toFixed(3)), GRAPH_LEFT + 4 * GRAPH_WIDTH / 6, (GRAPH_BOTTOM) + HEIGHT / 20, GRAPH_WIDTH / 8);
            context.fillText(parseFloat((5 * largestX / 6).toFixed(3)), GRAPH_LEFT + 5 * GRAPH_WIDTH / 6, (GRAPH_BOTTOM) + HEIGHT / 20, GRAPH_WIDTH / 8);
        }
    };
});