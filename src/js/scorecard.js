const jsonDataUrl2 = 'data/salesperday.json';

fetch(jsonDataUrl2)
  .then(response => response.json())
  .then(data => {
    const filterSelect = document.getElementById('filter');
    const dataContainer = document.getElementById('sales-per-day');

    filterSelect.addEventListener('change', (e) => {
      const selectedOption = e.target.value;
      const filteredData = data.dataset.filter((item) => {
        return Object.keys(item)[0] === selectedOption;
      });
      displayData(filteredData);
    });

    function displayData(data) {
      dataContainer.innerHTML = '';
      data.forEach((item) => {
        const key = Object.keys(item)[0];
        const value = item[key][0].penjualan_perhari;
        const html = `<p>${value}</p>`;
        dataContainer.innerHTML += html;
      });
    }

    // Display all data by default
    const defaultData = data.dataset.find((item) => Object.keys(item)[0] === 'default');
    displayData([defaultData]);
  })
  .catch(error => console.error('Error:', error));



const jsonDataUrl = 'data/totalproductsold.json';

fetch(jsonDataUrl)
  .then(response => response.json())
  .then(data => {
    const filterSelect = document.getElementById('filter');
    const dataContainer = document.getElementById('total-product-sold');

    filterSelect.addEventListener('change', (e) => {
      const selectedOption = e.target.value;
      const filteredData = data.dataset.filter((item) => {
        return Object.keys(item)[0] === selectedOption;
      });
      displayData(filteredData);
    });

    function displayData(data) {
      dataContainer.innerHTML = '';
      data.forEach((item) => {
        const key = Object.keys(item)[0];
        const value = item[key][0].jumlah_terjual;
        const html = `<p>${value}</p>`;
        dataContainer.innerHTML += html;
      });
    }

    // Display all data by default
    const defaultData = data.dataset.find((item) => Object.keys(item)[0] === 'default');
    displayData([defaultData]);
  })
  .catch(error => console.error('Error:', error));




const jsonDataUrl1 = 'data/totalrevanue.json';

fetch(jsonDataUrl1)
  .then(response => response.json())
  .then(data => {
    const filterSelect = document.getElementById('filter');
    const dataContainer = document.getElementById('total-revanue');

    filterSelect.addEventListener('change', (e) => {
      const selectedOption = e.target.value;
      const filteredData = data.dataset.filter((item) => {
        return Object.keys(item)[0] === selectedOption;
      });
      displayData(filteredData);
    });

    function displayData(data) {
      dataContainer.innerHTML = '';
      data.forEach((item) => {
        const key = Object.keys(item)[0];
        const value = item[key][0].jumlah_pendapatan;
        const html = `<p>${value}</p>`;
        dataContainer.innerHTML += html;
      });
    }

    // Display all data by default
    const defaultData = data.dataset.find((item) => Object.keys(item)[0] === 'default');
    displayData([defaultData]);
  })
  .catch(error => console.error('Error:', error));