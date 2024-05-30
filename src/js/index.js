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
async function initData() {
    //request payment method
    const response = await fetch('/data/payment_method.json')
    // convert fetch response to object
    const responseJSON = await response.json()

    // convert payment method
    generatePaymentMethodsChart(responseJSON)
}



// script to generate pie chart payment methods
function generatePaymentMethodsChart(responseData) {
    const ctx = document.getElementById('piechart');

    // convert response to data
    const chartData = []
    let totalData = 0

    // generate total data
    responseData.map(n => {
        totalData = totalData + Number(n.rata_type)
    })

    // generate data percentage
    responseData.map(n => {
        chartData.push(Number(n.rata_type) * 100 / totalData)
    })

    console.log(chartData)

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
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    fullSize: true,
                    labels: {
                        width: "100%",
                        font: {
                            weight: 'bold',
                            size: 12,
                        }
                    },
                    position: window.innerWidth > 768 ? 'bottom' : 'right',
                },
            }
        }
    });

}


// called on first render
initData()

// chart 1

// Function to fetch data from JSON file
async function fetchDataFromJson() {
    const response = await fetch('./data/chart1.json');
    const data = await response.json();
    console.log(data)
    return data.map(row => ({
        month: row.Bulan,
        category: row.Category,
        Total_Penjualan: Number(row.Total_Penjualan)
    }));
}


// Top Category Per Month
async function renderChart(data) {
    const ctx = document.getElementById('chartbar').getContext('2d');
    const uniqueMonths = [...new Set(data.map(item => item.month))]; // Extract value bulan unik
    const Categories = data.map(item => item.category);

    const foodData = data.filter(item => item.category === 'Food').map(item => item.Total_Penjualan);
    const carbonatedData = data.filter(item => item.category === 'Carbonated').map(item => item.Total_Penjualan);
    const nonCarbonatedData = data.filter(item => item.category === 'Non Carbonated').map(item => item.Total_Penjualan);
    const waterData = data.filter(item => item.category === 'Water').map(item => item.Total_Penjualan);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: uniqueMonths,
            datasets: [
                {
                    label: Categories[0],
                    data: foodData,
                    backgroundColor: '#000080',
                    borderColor: '#000080',
                    borderWidth: 1
                },
                {
                    label: Categories[1],
                    data: waterData,
                    backgroundColor: '#1E90FF',
                    borderColor: '#1E90FF',
                    borderWidth: 1
                },
                {
                    label: Categories[2],
                    data: carbonatedData,
                    backgroundColor: '#00BFFF',
                    borderColor: '#00BFFF',
                    borderWidth: 1
                },
                {
                    label: Categories[3],
                    data: nonCarbonatedData,
                    backgroundColor: '#ADD8E6',
                    borderColor: '#ADD8E6',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
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
                            // size: 10
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
                legend: {
                    responsive: true,
                    fullSize: true,
                    labels: {
                        boxWidth: window.innerWidth > 768 ? 30 : 20,
                        boxHeight: window.innerWidth > 768 ? 10 : 5,
                        width: "100%",
                        font: {
                            size: window.innerWidth > 768 ? 10 : 7,
                            weight: 'bold'
                        }
                    },
                    // position: window.innerWidth > 768 ? 'bottom' : 'right',
                },
            },
            responsive: true
        }
    });
}
// Main function to fetch data and render chart
async function main() {
    // Fetch data from BigQuery or JSON file
    // const data = await fetchDataFromBigQuery();
    const data1 = await fetchDataFromJson();

    // Render chart with fetched data
    renderChart(data1);
    console.log(data1)
}

// Call main function to execute
main();



// Top 10 Most Sold Product
async function fetchDataAndRenderChart() {
    try {
        const response = await fetch('./data/chart2.json');
        const data = await response.json();

        // Extract labels and data from JSON
        const labels = data.map(item => item.Product);
        const values = data.map(item => parseInt(item.jumlah_terjual));

        // Create the chart
        const ctx = document.getElementById('chartproduct').getContext('2d');
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
                indexAxis: 'y', // This makes the chart horizontal
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
                            boxWidth: window.innerWidth > 768 ? 30 : 20,
                            boxHeight: window.innerWidth > 768 ? 10 : 5,
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
                    { "data": "product" },
                    { "data": "rprice" },
                    { "data": "bulan" },
                    { "data": "jumlah_penjualan"}
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
                            boxWidth: window.innerWidth > 768 ? 30 : 20,
                            boxHeight: window.innerWidth > 768 ? 10 : 5,
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
                            boxWidth: window.innerWidth > 768 ? 30 : 20,
                            boxHeight: window.innerWidth > 768 ? 10 : 5,
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
fetchDataAndRenderChart();

// function to render table
grabData();

