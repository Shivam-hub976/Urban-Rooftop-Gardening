// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const errorText = document.getElementById('errorText');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultsArea = document.getElementById('resultsArea');

// Mock Database (Since there is no real API for this static task)
const mockServices = [
    { id: 1, title: "Soil Testing & Enrichment", description: "Comprehensive analysis of rooftop soil composition and nutrient balancing.", status: "Available" },
    { id: 2, title: "Drip Irrigation Setup", description: "Automated, water-efficient irrigation systems designed for urban rooftops.", status: "Available" },
    { id: 3, title: "Structural Weight Assessment", description: "Engineering consultation to ensure your roof can support soil and planter weight.", status: "Requires Booking" },
    { id: 4, title: "Seasonal Crop Planning", description: "Customized planting schedules tailored to urban micro-climates.", status: "Available" },
    { id: 5, title: "Pest Management", description: "Organic and pet-safe pest control for exposed rooftop environments.", status: "High Demand" }
];

// Non-Functional Requirements 

// Telemetry Simulation
function logAnalytics() {
    console.log("[Analytics] User interacted with Urban Rooftop Gardening Service Website");
}

// Security: XSS Sanitization
// Prevents malicious scripts from being injected via the search bar
function sanitizeInput(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Unhappy Path Helpers 

// Displays a clean message instead of a blank screen when things fail
function showEmptyState(message) {
    resultsArea.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-md);">
            <h3>${message}</h3>
        </div>
    `;
}

// Mock API Fetching (Simulating Network Latency) 
async function fetchServices(query) {
    return new Promise((resolve) => {
        // Simulate a slow 3G connection (1.5 seconds delay)
        setTimeout(() => {
            const lowerCaseQuery = query.toLowerCase();
            // Filter the mock database based on the search query
            const filteredResults = mockServices.filter(service => 
                service.title.toLowerCase().includes(lowerCaseQuery) || 
                service.description.toLowerCase().includes(lowerCaseQuery)
            );
            resolve(filteredResults);
        }, 1500);
    });
}

// Main Event Listener
searchForm.addEventListener('submit', async (e) => {
    // Prevent page reload on form submit
    e.preventDefault();
    
    const rawInput = searchInput.value.trim();
    const safeQuery = sanitizeInput(rawInput);
    
    // Unhappy Path: Invalid Inputs
    if (!safeQuery) {
        searchInput.classList.add('input-error');
        errorText.classList.remove('hidden');
        return; // Stop execution
    }
    
    // Reset UI state for a fresh search
    searchInput.classList.remove('input-error');
    errorText.classList.add('hidden');
    resultsArea.innerHTML = '';
    
    // Unhappy Path: Bad Connectivity
    // Show spinner before async operation starts
    loadingIndicator.classList.remove('hidden');
    
    let services = [];

    try {
        // Fetch the data (Simulated)
        services = await fetchServices(safeQuery);
    } catch (err) {
        console.error("Unexpected execution error:", err);
        services = null;
    } finally {
        // Hide spinner once network request completes, regardless of success or failure
        loadingIndicator.classList.add('hidden');
    }
    
    // Unhappy Path: Empty / Error States
    if (!services) {
        showEmptyState("A network error occurred. Please try again.");
        return;
    }
    
    if (services.length === 0) {
        showEmptyState("No data found.");
        return;
    }
    
    // The "Happy Path": Render Data 
    services.forEach(service => {
        const safeTitle = sanitizeInput(service.title);
        const safeDescription = sanitizeInput(service.description);
        const safeStatus = sanitizeInput(service.status);
        
        const card = document.createElement('div');
        card.className = 'service-card';
        
        // Build and inject the HTML structure for the service card
        card.innerHTML = `
            <h3>${safeTitle}</h3>
            <p>${safeDescription}</p>
            <span class="status-badge">${safeStatus}</span>
        `;
        
        resultsArea.appendChild(card);
    });
    
    // Telemetry ping on successful completion of the primary action
    logAnalytics(); 
});