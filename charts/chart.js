const Chart = require('chart.js');
const fs = require('fs')
const ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type:'line',
    data: [
        JSON.parse(fs.readFileSync())
    ]
})