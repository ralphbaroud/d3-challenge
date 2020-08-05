var svgWidth = 1000;
var svgHeight = 800;




var Margins = {
  top: 50,
  right: 150,
  bot: 50,
  left: 150
};


var WidthOfChart = svgWidth - Margins.left - Margins.right;
var HeightOfChart = svgHeight - Margins.top - Margins.bot;


var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${Margins.left}, ${Margins.top})`);

var ToolTip = d3.select("body").append("div")
  .attr("class", "ToolTip")
  .style("opacity", 0);


var labels = d3.select("body").append("div")
   .attr("class","text");

var labels = d3.select("body").append("div")
  .attr("class","yaxis");
  
d3.csv("data/data.csv").then(function(data) {

    data.forEach(function(d) {
        d.income = +d.income;
        d.obesity = +d.obesity;
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
        
    });
    
    var poverty = data.map(d => d.poverty);   
  
    var healthcare = data.map(d => d.healthcare);
  
  
    var xAxe = d3.scaleLinear()
    .domain([d3.min(poverty)-1 , d3.max(poverty)+1])
    .range([0, WidthOfChart])
    
    var yLAxe = d3.scaleLinear()
      .domain([d3.min(healthcare)-1 , d3.max(healthcare)+1])
      .range([HeightOfChart, 0]);
      
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", Margins.left - 50)
      .attr("x",0 - (HeightOfChart / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Lacks Healthcare");
      
    svg.append("text")      
      .attr("x", WidthOfChart -200 )
      .attr("y",  HeightOfChart + 40 + Margins.bot)
      .style("text-anchor", "middle")
      .text("In Poverty (%) ");

    var BotAxe = d3.axisBottom(xAxe);
    var LeftAxe = d3.axisLeft(yLAxe);

    chartGroup.append("g")
      .call(LeftAxe);
      
    chartGroup.append("g")
      .attr("transform", `translate(0, ${HeightOfChart})`)
      .call(BotAxe);
      
    var element = chartGroup.selectAll(".circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 18)
      .attr("cx", d => xAxe(d.poverty))
      .attr("cy", d => yLAxe(d.healthcare))
      .attr("fill","green")
      .attr("stroke-width", 5);
      
    
    var labels2 = chartGroup.selectAll(".text").append("g")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => xAxe(d.poverty))
      .attr("y", d => yLAxe(d.healthcare))
      .text(function(d){return d.abbr})
      .style("fill",d3.color("white"))
      .style("text-anchor", "middle");
    
})