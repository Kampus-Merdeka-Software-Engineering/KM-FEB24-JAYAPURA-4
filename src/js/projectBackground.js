// Barchart total revanue
async function fetchDataAndRenderChartRevenue() {
    try {
        const response = await fetch('./data/linetotal1.json');
        const data = await response.json();

        // Extract labels and data from JSON
        const labels = data.map(item => item.TransMonth);
        const values = data.map(item => parseInt(item.TotalLineTotal));

        // Create the chart
        const ctx = document.getElementById('chartbartotal').getContext('2d');
        new Chart(ctx, {
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
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            color:'#8899A6',
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
                            color:'#8899A6',
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 9 : 7
                            }
                        }
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
                        fullSize: true,
                        labels: {
                            color:'#8899A6',
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

// Line chart total revanue
async function fetchDataAndRenderChartRevenue2() {
    try {
        const response = await fetch('./data/linetotal2.json');
        const data = await response.json();

        // Extract labels and data from JSON
        const labels = data.map(item => item.TransMonth);
        const values = data.map(item => parseInt(item.TotalLineTotal));

        // Create the chart
        const ctx = document.getElementById('chartlinetotal').getContext('2d');
        new Chart(ctx, {
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
                responsive: true,
                indexAxis: 'x', // This makes the chart horizontal
                scales: {
                    x: {
                        ticks: {
                            color:'#8899A6',
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 9 : 7
                            }
                        },
                        beginAtZero: true
                    },
                    y: {
                        ticks: {
                            color:'#8899A6',
                            font: {
                                weight: 'bold',
                                size: window.innerWidth > 768 ? 9 : 7
                            }
                        }
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
                        fullSize: true,
                        labels: {
                            color:'#8899A6',
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
// Call the function to fetch data and render the chart

fetchDataAndRenderChartRevenue2();

fetchDataAndRenderChartRevenue();
