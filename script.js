// DOM Elements
const revInput = document.getElementById('total-revenue');
const avgOrderInput = document.getElementById('avg-order-value');
const leadRateInput = document.getElementById('lead-rate');
const prospectRateInput = document.getElementById('prospect-rate');

const valProspects = document.getElementById('val-prospects');
const valLeads = document.getElementById('val-leads');
const valCustomers = document.getElementById('val-customers');

const pctLeads = document.getElementById('pct-leads');
const pctCustomers = document.getElementById('pct-customers');

const fillLeads = document.getElementById('fill-leads');
const fillCustomers = document.getElementById('fill-customers');

const valLeadRate = document.getElementById('val-lead-rate');
const valProspectRate = document.getElementById('val-prospect-rate');

// Cumulative distribution over 6 months based on the screenshot visualization
const timeDistribution = [0.2, 0.35, 0.50, 0.70, 0.85, 1.0];

let chartInstance = null;

function calculateData() {
    const rev = parseFloat(revInput.value) || 0;
    const avgOrder = parseFloat(avgOrderInput.value) || 1;
    const leadRate = parseFloat(leadRateInput.value) / 100;
    const prospectRate = parseFloat(prospectRateInput.value) / 100;

    // Derived values
    const customers = Math.ceil(rev / avgOrder);
    const leads = Math.ceil(customers / leadRate);
    const prospects = Math.ceil(leads / prospectRate);

    // Update DOM texts
    valProspects.textContent = prospects;
    valLeads.textContent = leads;
    valCustomers.textContent = customers;

    const leadPct = ((leads / prospects) * 100).toFixed(0);
    const custPct = ((customers / prospects) * 100).toFixed(0);

    pctLeads.textContent = `${leadPct}%`;
    pctCustomers.textContent = `${custPct}%`;
    fillLeads.style.width = `${leadPct}%`;
    fillCustomers.style.width = `${custPct}%`;

    valLeadRate.textContent = `${(leadRate * 100).toFixed(2)}%`;
    valProspectRate.textContent = `${(prospectRate * 100).toFixed(2)}%`;

    updateChart(prospects, leads, customers);
}

function updateChart(prospects, leads, customers) {
    const ctx = document.getElementById('predictionChart').getContext('2d');

    // Calculate values per month (cumulative)
    const prospectsData = timeDistribution.map(d => Math.round(prospects * d));
    const leadsData = timeDistribution.map(d => Math.round(leads * d));
    const customersData = timeDistribution.map(d => Math.round(customers * d));

    if (chartInstance) {
        chartInstance.data.datasets[0].data = customersData;
        chartInstance.data.datasets[1].data = leadsData;
        chartInstance.data.datasets[2].data = prospectsData;
        chartInstance.update();
        return;
    }

    // Chart.js Configuration
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = '-apple-system, sans-serif';

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [
                {
                    label: 'Customers',
                    data: customersData,
                    backgroundColor: '#e2e8f0',     // Lightest
                    grouped: false,
                    barPercentage: 0.8,
                    categoryPercentage: 0.9,
                    order: 1
                },
                {
                    label: 'Leads',
                    data: leadsData,
                    backgroundColor: '#808ea6',     // Medium
                    grouped: false,
                    barPercentage: 0.8,
                    categoryPercentage: 0.9,
                    order: 2
                },
                {
                    label: 'Prospects',
                    data: prospectsData,
                    backgroundColor: '#5c6784',     // Darkest
                    grouped: false,
                    barPercentage: 0.8,
                    categoryPercentage: 0.9,
                    order: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(92, 103, 132, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#94a3b8',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: (items) => {
                            if (!items.length) return '';
                            return `Month #${items[0].label}`;
                        },
                        label: (item) => {
                            return `${item.dataset.label}: ${item.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#272d3f',
                        drawBorder: false
                    },
                    title: {
                        display: true,
                        text: '0 people           20 people           40 people           60 people           80 people           100 people           120 people',
                        color: '#e2e8f0',
                        font: { size: 10 }
                    },
                    ticks: {
                        display: false
                    },
                    suggestedMax: 125,
                    beginAtZero: true
                },
                y: {
                    grid: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Months',
                        color: '#e2e8f0'
                    }
                }
            }
        }
    });
}

// Event Listeners
[revInput, avgOrderInput, leadRateInput, prospectRateInput].forEach(input => {
    input.addEventListener('input', calculateData);
});

// Initial Render
calculateData();