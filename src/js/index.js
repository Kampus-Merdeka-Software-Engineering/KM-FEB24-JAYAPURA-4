var moonIcn = document.getElementById('icn')
moonIcn.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains("dark-theme")) {
        moonIcn.src = 'src/img/sun.png'
    } else {
        moonIcn.src = 'src/img/moon.png'
    }
})

const menuBar = document.querySelector('#side-bar .sidebar-header .bx.bx-menu');
const sidebar = document.getElementById('side-bar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('active');
})

const menuList = document.querySelectorAll('#side-bar .nav-sidebar .list-item')

menuList.forEach(function (item) {
    item.addEventListener('click', function () {
        if (window.innerWidth < 576) {
            sidebar.classList.remove('active');
        }
    })

})

window.addEventListener('resize', function () {
    if (this.innerWidth < 768) {
        sidebar.classList.remove('active');
    }
});

// Average Transaction Value Per Payment Method
// function to init data
async function initData(dataset) {
    //request payment method
    const response = await fetch('/data/payment_method.json')
    // convert fetch response to object
    const responseJSON = await response.json()
    const datasetData = responseJSON.dataset.find(item => Object.keys(item)[0] === dataset);
    console.log(responseJSON)
    return datasetData[dataset].map(row => ({
        tipe: row.Type,
        rata: Number(row.rata_type)
    }));
}


let chartInstance2 = null;
// script to generate pie chart payment methods
async function generatePaymentMethodsChart(responseData) {
    const ctx = document.getElementById('piechart');

    // convert response to data
    const chartData = []
    let totalData = 0

    // generate total data
    responseData.map(n => {
        totalData = totalData + Number(n.rata)
    })

    // generate data percentage
    responseData.map(n => {
        chartData.push(Number(n.rata) * 100 / totalData)
    })

    const data = {
        labels: [
            'Cash',
            'Credit',
        ],
        datasets: [{
            // label: 'My First Dataset',
            data: chartData,
            backgroundColor: [
                'rgb(135,206,235)',
                'rgb(65,105,225)',
            ],
            hoverOffset: 4
        }]
    };
    if (chartInstance2) {
        chartInstance2.destroy();
    }
    chartInstance2 = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    fullSize: true,
                    labels: {
                        boxWidth: window.innerWidth > 768 ? 25 : 20,
                        boxHeight: window.innerWidth > 768 ? 7 : 5,
                        width: "100%",
                        font: {
                            size: window.innerWidth > 768 ? 10 : 7,
                            weight: 'bold',
                        }
                    },
                    position: 'right',
                },
            }
        }
    });

}


// called on first render
// initData()

// chart 1

// Function to fetch data from JSON file
async function fetchDataFromJson(dataset) {
    const response = await fetch('./data/chart1.json');
    const data = await response.json();
    const datasetData = data.dataset.find(item => Object.keys(item)[0] === dataset);
    console.log(data)
    return datasetData[dataset].map(row => ({
        month: row.Bulan,
        category: row.Category,
        Total_Penjualan: Number(row.Total_Penjualan)
    }));
}


// Top Category Per Month

// Global variable to hold the chart instance
let chartInstance = null;

// Function to fetch data from JSON file
async function fetchDataFromJson(dataset) {
    const response = await fetch('./data/chart1.json');
    const data = await response.json();
    const datasetData = data.dataset.find(item => Object.keys(item)[0] === dataset);
    console.log(data)
    return datasetData[dataset].map(row => ({
        month: row.Bulan,
        category: row.Category,
        Total_Penjualan: Number(row.Total_Penjualan)
    }));
}

// Top Category Per Month
// Top Category Per Month
document.addEventListener('DOMContentLoaded', (event) => {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the element that opens the modal
    var img = document.getElementById('myChart');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks on the image, open the modal
    img.onclick = function() {
        modal.style.display = 'block';
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});


    async function renderChart(data) {
        const ctx = document.getElementById('chartbar').getContext('2d');
        const uniqueMonths = [...new Set(data.map(item => item.month))]; // Extract value bulan unik
        // const categories = ['Food', 'Water', 'Carbonated', 'Non Carbonated'];

        const foodData = data.filter(item => item.category === 'Food').map(item => item.Total_Penjualan);
        const waterData = data.filter(item => item.category === 'Water').map(item => item.Total_Penjualan);
        const carbonatedData = data.filter(item => item.category === 'Carbonated').map(item => item.Total_Penjualan);
        const nonCarbonatedData = data.filter(item => item.category === 'Non Carbonated').map(item => item.Total_Penjualan);

        const datasets = [
            {
                label: 'Food',
                data: foodData,
                backgroundColor: '#000080',
                borderColor: '#000080',
                borderWidth: 1
            },
            {
                label: 'Water',
                data: waterData,
                backgroundColor: '#1E90FF',
                borderColor: '#1E90FF',
                borderWidth: 1
            },
            {
                label: 'Carbonated',
                data: carbonatedData,
                backgroundColor: '#00BFFF',
                borderColor: '#00BFFF',
                borderWidth: 1
            },
            {
                label: 'Non Carbonated',
                data: nonCarbonatedData,
                backgroundColor: '#ADD8E6',
                borderColor: '#ADD8E6',
                borderWidth: 1
            }
        ];

        // Destroy existing chart instance if exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Create new chart instance
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: uniqueMonths,
                datasets: datasets
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                scales: {
                    x: {
                        ticks: {
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 10 : 7
                            }
                        },
                        stacked: true,
                    },
                    y: {
                        ticks: {
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 10 : 7
                            }
                        },
                        stacked: true
                    }
                },
                plugins: {
                    tooltips: {
                    displayColors: true,
                        callbacks: {
                            mode: 'x',
                        },
                    },
                    legend: {
                        labels: {
                            boxWidth: window.innerWidth > 768 ? 25 : 20,
                            boxHeight: window.innerWidth > 768 ? 7 : 5,
                            width: "100%",
                            font: {
                                size: window.innerWidth > 768 ? 10 : 7,
                                weight: 'bold'
                            }
                        }
                    }
                },
            }
        });
    }

    

// Top 10 Most Sold Product
async function fetchData1(dataset) {
        const response = await fetch('./data/chart2.json');
        const data = await response.json();
        console.log(data)
        const datasetdt = data.dataset.find(ds => Object.keys(ds)[0] === dataset);
        return datasetdt[dataset].map(row => ({
            product: row.Product,
            total: Number(row.jumlah_terjual)
        }));
}

let chartInstance1;
async function renderChart1(data) {

        const labels = data.map(item => item.product);
        const values = data.map(item => item.total);

        // Create the chart
        const ctx = document.getElementById('chartproduct').getContext('2d');

        const datasets = [{
            label: 'RQTY',
            data: values,
            backgroundColor: '#0f357b',
            borderColor: '#0f357b',
            borderWidth: 1,
            borderRadius: 5
        }];

        if (chartInstance1) {
            chartInstance1.destroy();
        }

        chartInstance1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
            responsive: true,
            indexAxis: 'y',// This makes the chart horizontal
            tooltips: {
                displayColors: true,
                callbacks: {
                    mode: 'x',
                },
            },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 10 : 7
                            }
                        },
                        beginAtZero: true
                    },
                    y: {
                        ticks: {
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 10 : 7
                            }
                        }
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        fullSize: true,
                        labels: {
                            width: "100%",
                            boxWidth: window.innerWidth > 768 ? 25 : 20,
                            boxHeight: window.innerWidth > 768 ? 7 : 5,
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 10 : 7
                            }
                        },

                    },
                }
            }
        });
}

// Main function to fetch data and render chart
async function main(dataset) {
    // Fetch data from JSON file
    const data1 = await fetchDataFromJson(dataset);

    // Render chart with fetched data
    await renderChart(data1);
    console.log(data1);
}
async function main2(dataset) {
    // Fetch data from JSON file
    const data2 = await fetchData1(dataset);

    // Render chart with fetched data
    await renderChart1(data2);
    console.log(data2);
}

async function main3(dataset) {
    // Fetch data from JSON file
    const data3 = await initData(dataset);

    // Render chart with fetched data
    await generatePaymentMethodsChart(data3);
    console.log(data3);
}


// Initialize with default dataset
main('default');
main2('default');
main3('default');



// Event listener for dropdown change
const filTer = document.getElementById('filter');
filTer.addEventListener('change', async (e) => {
    const dataset = e.target.value;
    await main(dataset);
    await main2(dataset);
    await main3(dataset);
});



function grabData() {
    fetch('data/totalPenjualanLibrary.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const tabelchart = $("#tabelchart");
            tabelchart.DataTable({
                scrollY: '200px',
                scrollCollapse: true,
                responsive: true,
                autoWidth: false,
                "data": data,
                "columns": [
                    { "data": "Product" },
                    { "data": "Bulan" },
                    { "data": "Avg_price" },
                    { "data": "Total_penjualan"}
                ],
                
                "columnDefs": [
                    {width: "100%", targets: [0]},
                    {width: "50px", targets: [1,2,3] },
                    {className: "text_center", targets: [1,2,3] }
                ]
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

async function fetchDataAndRenderChartRevenue() {
    try {
        const response = await fetch('./data/linetotal1.json');
        const data = await response.json();

        // Extract labels and data from JSON
        const labels = data.map(item => item.TransMonth);
        const values = data.map(item => parseInt(item.TotalLineTotal));

        // Create the chart
        const ctx = document.getElementById('chartbartotal').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'RQTY',
                    data: values,
                    backgroundColor: '#0f357b',
                    borderColor: '#0f357b',
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                indexAxis: 'x',
                scales: {
                    x: {
                        ticks: {
                            minRotation:0,
                            maxRotation:0,
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 9 : 7
                            }
                        },
                        beginAtZero: true
                    },
                    y: {
                        ticks: {
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 9 : 7
                            }
                        }
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        fullSize: true,
                        labels: {
                            boxWidth: window.innerWidth > 768 ? 25 : 20,
                            boxHeight: window.innerWidth > 768 ? 7 : 5,
                            width: "100%",
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 10 : 7
                            }
                        },

                    },
                }
            }
        });
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

async function fetchDataAndRenderChartRevenue2() {
    try {
        const response = await fetch('./data/linetotal2.json');
        const data = await response.json();

        // Extract labels and data from JSON
        const labels = data.map(item => item.TransMonth);
        const values = data.map(item => parseInt(item.TotalLineTotal));

        // Create the chart
        const ctx = document.getElementById('chartlinetotal').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'RQTY',
                    data: values,
                    backgroundColor: '#0f357b',
                    borderColor: '#0f357b',
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                indexAxis: 'x', // This makes the chart horizontal
                scales: {
                    x: {
                        ticks: {
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 9 : 7
                            }
                        },
                        beginAtZero: true
                    },
                    y: {
                        ticks: {
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 9 : 7
                            }
                        }
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        fullSize: true,
                        labels: {
                            boxWidth: window.innerWidth > 768 ? 25 : 20,
                            boxHeight: window.innerWidth > 768 ? 7 : 5,
                            width: "100%",
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 10 : 7
                            }
                        },

                    },
                }
            }
        });
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

fetchDataAndRenderChartRevenue2();

fetchDataAndRenderChartRevenue();

// Call the function to fetch data and render the chart
// fetchDataAndRenderChart();

// function to render table
grabData();

