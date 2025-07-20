document.addEventListener('DOMContentLoaded', function () {
    // List of months matching input IDs in index.html
    const months = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    // Retrieve values for income or expenses for each month
    function getMonthlyValues(type) {
        return months.map(month => {
            const input = document.getElementById(`${type}-${month}`);
            return input ? Number(input.value) || 0 : 0;
        });
    }

    // Chart.js initialization
    const ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
            datasets: [
                {
                    label: 'Income',
                    data: getMonthlyValues('income'),
                    backgroundColor: 'rgba(54, 162, 235, 0.7)'
                },
                {
                    label: 'Expenses',
                    data: getMonthlyValues('expenses'),
                    backgroundColor: 'rgba(255, 99, 132, 0.7)'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Update chart when any input changes
    months.forEach(month => {
        ['income', 'expenses'].forEach(type => {
            const input = document.getElementById(`${type}-${month}`);
            if (input) {
                input.addEventListener('input', () => {
                    chart.data.datasets[0].data = getMonthlyValues('income');
                    chart.data.datasets[1].data = getMonthlyValues('expenses');
                    chart.update();
                });
            }
        });
    });

    // Update chart when Chart tab is shown
    const chartTab = document.getElementById('chart-tab');
    if (chartTab) {
        chartTab.addEventListener('shown.bs.tab', () => {
            chart.data.datasets[0].data = getMonthlyValues('income');
            chart.data.datasets[1].data = getMonthlyValues('expenses');
            chart.update();
        });
    }

    document.getElementById('downloadChart').addEventListener('click', function () {
        const canvas = document.getElementById('myChart');
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'chart.png';
        link.click();
    });
});