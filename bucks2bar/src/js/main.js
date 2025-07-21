document.addEventListener('DOMContentLoaded', () => {
    const months = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    const getMonthlyValues = type =>
        months.map(month =>
            Number(document.getElementById(`${type}-${month}`)?.value) || 0
        );

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months.map(m => m[0].toUpperCase() + m.slice(1)),
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

    months.forEach(month => {
        ['income', 'expenses'].forEach(type => {
            const input = document.getElementById(`${type}-${month}`);
            input?.addEventListener('input', () => {
                chart.data.datasets[0].data = getMonthlyValues('income');
                chart.data.datasets[1].data = getMonthlyValues('expenses');
                chart.update();
            });
        });
    });

    document.getElementById('chart-tab')?.addEventListener('shown.bs.tab', () => {
        chart.data.datasets[0].data = getMonthlyValues('income');
        chart.data.datasets[1].data = getMonthlyValues('expenses');
        chart.update();
    });

    document.getElementById('downloadChart')?.addEventListener('click', () => {
        const canvas = document.getElementById('myChart');
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'chart.png';
        link.click();
    });

    document.getElementById('username')?.addEventListener('input', function () {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,}$/;
        this.style.borderColor = regex.test(this.value) ? 'green' : 'red';
    });
});