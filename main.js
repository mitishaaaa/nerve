$(document).ready(function () {

    // Data from resources
    const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
    const strategyArray = [
        {
            View: 'Bullish',
            Value: {
                '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Long Call'],
                '02-May-2024': ['Bull Call Spread', 'Bull Call Spread'],
                '09-May-2024': ['Strategy Call', 'Strategy Call'],
            },
        },
        {
            View: 'Bearish',
            Value: {
                '24-Apr-2024': ['Bear Call Spread', 'Long Put'],
                '31-May-2024': ['Long Put'],
                '21-Jun-2024': ['Bear Put Spread', 'Long Put'],
            },
        },
        {
            View: 'RangeBound',
            Value: {
                '24-Apr-2024': ['Short Straddle', 'Iron Butterfly'],
                '02-May-2024': ['Short Straddle'],
                '21-Jun-2024': ['Iron Condor'],
            },
        },
        {
            View: 'Volatile',
            Value: {
                '02-May-2024': ['Long Straddle', 'Long Strangle'],
                '09-May-2024': ['Long Straddle'],
            },
        },
    ];

    // Elements
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const dateDropdown = document.getElementById('date-dropdown');
    const strategyContainer = document.getElementById('strategy-container');

    // State
    let selectedView = 'Bullish';
    let selectedDate = dateArray[0];

    // Initialize dropdown and render strategies
    function init() {
        // Populate dropdown
        dateArray.forEach((date) => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = date;
            dateDropdown.appendChild(option);
        });

        // Set default date
        dateDropdown.value = selectedDate;

        // Render initial strategies
        renderStrategies();
    }

    // Event Listeners
    toggleButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            toggleButtons.forEach((b) => b.classList.remove('active'));
            e.target.classList.add('active');
            selectedView = e.target.dataset.view;
            renderStrategies();
        });
    });

    dateDropdown.addEventListener('change', (e) => {
        selectedDate = e.target.value;
        renderStrategies();
    });

    // Render strategies
    function renderStrategies() {
        strategyContainer.innerHTML = '';

        const viewData = strategyArray.find((item) => item.View === selectedView);
        const strategies = viewData ?.Value[selectedDate] || [];

        if (strategies.length === 0) {
            strategyContainer.innerHTML = `<div class="empty-state">There are no strategies for ${selectedDate}</div>`;
            return;
        }

        // Group strategies by name and count
        const strategyCount = strategies.reduce((acc, strategy) => {
            acc[strategy] = (acc[strategy] || 0) + 1;
            return acc;
        }, {});

        // Render cards
        Object.entries(strategyCount).forEach(([name, count]) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
      <h3>${name}</h3>
      <p>${count} ${count > 1 ? 'Strategies' : 'Strategy'}</p>
    `;
            strategyContainer.appendChild(card);
        });
    }

    // Initialize app
    init();



});


// Render Strategies

