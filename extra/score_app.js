const data = {
	"Daniel": [1, 0, 1, 2, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 2, 1, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1],
	"Jarek": [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 1, 2, 0, 1, 0, 0, 0, 1, 0],
	"Kuba": [1, 1, 1, 1, 2, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 0, 0, 2, 1, 2, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1],
	"Łukasz": [1, 0, 1, 1, 1, 2, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 2, 1, 1, 0, 1, 0, 1, 0, 0, 0],
	"Maciek": [1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 0, 1, 2, 0, 1, 0, 2, 1, 2, 2],
	"Marcin": [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 2, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 2, 0, 2, 1],
	"Michał": [1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 0, 0, 2, 1, 2, 0, 0, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
	"Paweł": [1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 2, 1, 0, 0, 2, 0, 1, 0, 0, 1, 0, 1, 2, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
	"Tomek": [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 2, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1],
	"Wojtek": [1, 0, 2, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 2, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 2, 0, 1, 0, 0, 0, 1, 2],
	"Piotr": [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 2, 1, 0, 0, 0, 0, 1],
};


const players = Object.keys(data);
const steps = players.map(player => data[player].length);
const maxSteps = Math.max(...steps);
const width = 800;
const height = 400;
const margin = { top: 20, right: 60, bottom: 30, left: 40 };

let currentStep = 0;
let interval;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleLinear()
    .domain([0, maxSteps])
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, d3.max(players.map(player => d3.sum(data[player])))])
    .range([height, 0]);

const line = d3.line()
    .x((d, i) => x(i))
    .y(d => y(d));

const cumulativeData = {};
players.forEach(player => {
    cumulativeData[player] = data[player].map((sum => value => sum += value)(0));
});

svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y));

const paths = svg.selectAll(".line")
    .data(players)
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("d", player => line(cumulativeData[player].slice(0, currentStep + 1)))
    .style("stroke", (d, i) => d3.schemeCategory10[i])
    .on("mouseover", function(event, d) {
        d3.select(this).classed("hovered", true);
        showLabel(d);
    })
    .on("mouseout", function(event, d) {
        d3.select(this).classed("hovered", false);
        hideLabel();
    });

const labels = svg.selectAll(".player-label")
    .data(players)
    .enter()
    .append("text")
    .attr("class", "player-label")
    .attr("x", width + 5)
    .attr("y", (d, i) => y(cumulativeData[d][currentStep]) - 5)
    .style("fill", (d, i) => d3.schemeCategory10[i])
    .text(d => d)
    .style("display", "none");

function update(step) {
    paths.transition().duration(500).attr("d", player => line(cumulativeData[player].slice(0, step + 1)));
    
    const labelPositions = players.map(player => y(cumulativeData[player][step]));

    labels.transition().duration(500)
        .attr("x", x(step) + 5)
        .attr("y", (d, i) => adjustLabelPosition(labelPositions, i));
}

function adjustLabelPosition(positions, index) {
    let offset = 0;
    for (let i = 0; i < index; i++) {
        if (Math.abs(positions[i] - positions[index]) < 20) {
            offset += 15;
        }
    }
    return positions[index] - offset;
}

function startAutoPlay() {
    interval = setInterval(() => {
        if (currentStep < maxSteps - 1) {
            currentStep++;
            update(currentStep);
            document.getElementById("stepSlider").value = currentStep;
        } else {
            clearInterval(interval);
        }
    }, 2000);
}

document.getElementById("stepSlider").addEventListener("input", (event) => {
    currentStep = +event.target.value;
    update(currentStep);
});

function showLabel(player) {
    labels.filter(d => d === player).style("display", "block");
}

function hideLabel() {
    labels.style("display", "none");
}

const legend = d3.select("#legend")
    .selectAll(".legend-item")
    .data(players)
    .enter()
    .append("div")
    .attr("class", "legend-item")
    .on("mouseover", function(event, d) {
        paths.filter(p => p === d).classed("hovered", true);
        showLabel(d);
    })
    .on("mouseout", function(event, d) {
        paths.filter(p => p === d).classed("hovered", false);
        hideLabel();
    });

legend.append("div")
    .attr("class", "legend-color")
    .style("background-color", (d, i) => d3.schemeCategory10[i]);

legend.append("span")
    .text(d => d);

startAutoPlay();

update(currentStep);
