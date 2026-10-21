// Built-in dataset array containing AI tools and Standard Websites with accurate rankings
let dataset = [
    {
        name: "Perplexity AI",
        type: "AI",
        categories: ["research", "fact checking", "search", "writing"],
        hasFreePlan: true,
        pricingModel: "freemium",
        rating: 4.9,
        rank: 1,
        bestFor: "Best overall for live web search and deep research citations",
        description: "AI search engine using LLMs to deliver real-time factual research backed by live web sources.",
        url: "https://www.perplexity.ai"
    },
    {
        name: "Wikipedia",
        type: "Website",
        categories: ["research", "encyclopedia", "fact checking"],
        hasFreePlan: true,
        pricingModel: "free",
        rating: 3.2,
        rank: 8,
        bestFor: "Crowdsourced encyclopedic overview (lower rating due to unverified public edits)",
        description: "Open community-edited web encyclopedia.",
        url: "https://www.wikipedia.org"
    },
    {
        name: "Encyclopedia Britannica",
        type: "Website",
        categories: ["research", "encyclopedia", "academic"],
        hasFreePlan: true,
        pricingModel: "freemium",
        rating: 4.5,
        rank: 3,
        bestFor: "Peer-reviewed academic research standard",
        description: "Fact-checked digital encyclopedia written by subject matter experts.",
        url: "https://www.britannica.com"
    },
    {
        name: "Midjourney",
        type: "AI",
        categories: ["editing images", "image generation", "art"],
        hasFreePlan: false,
        pricingModel: "paid",
        rating: 4.8,
        rank: 2,
        bestFor: "Best for photorealistic AI imagery and high-end concept art",
        description: "Generative image system specialized in artistic detail and lighting.",
        url: "https://www.midjourney.com"
    },
    {
        name: "Canva",
        type: "Website",
        categories: ["editing images", "editing videos", "design", "graphic design"],
        hasFreePlan: true,
        pricingModel: "freemium",
        rating: 4.7,
        rank: 4,
        bestFor: "Best standard web suite for photo and video editing templates",
        description: "All-in-one graphic design platform for images, videos, and social media content.",
        url: "https://www.canva.com"
    },
    {
        name: "Photopea",
        type: "Website",
        categories: ["editing images", "photo editing", "psd"],
        hasFreePlan: true,
        pricingModel: "free",
        rating: 4.6,
        rank: 5,
        bestFor: "Best 100% free web alternative to Photoshop",
        description: "Free browser-based raster graphics editor supporting PSD and raw files.",
        url: "https://www.photopea.com"
    },
    {
        name: "Runway Gen-3",
        type: "AI",
        categories: ["editing videos", "video generation", "animation"],
        hasFreePlan: true,
        pricingModel: "freemium",
        rating: 4.6,
        rank: 6,
        bestFor: "Best for generative AI video editing and text-to-video production",
        description: "Generative video tool featuring object removal, motion tracking, and AI video synthesis.",
        url: "https://runwayml.com"
    },
    {
        name: "ChatGPT",
        type: "AI",
        categories: ["writing", "research", "coding", "editing images"],
        hasFreePlan: true,
        pricingModel: "freemium",
        rating: 4.9,
        rank: 1,
        bestFor: "Best overall for creative writing, drafting, and multimodal tasks",
        description: "Conversational AI model for text generation, code execution, and image processing.",
        url: "https://chatgpt.com"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    handleSearch();
    setupDatasetUploader();
    lucide.createIcons();
});

// Search and Filter Function
function handleSearch() {
    const categoryQuery = document.getElementById('categoryInput').value.toLowerCase().trim();
    const pricingFilter = document.getElementById('pricingSelect').value;
    const typeFilter = document.getElementById('typeSelect').value;

    const resultsGrid = document.getElementById('resultsGrid');
    const emptyState = document.getElementById('emptyState');
    const resultStatus = document.getElementById('resultStatus');

    const filtered = dataset.filter(item => {
        // Match user's typed category against categories or name/description
        const matchesCategory = !categoryQuery || 
            item.categories.some(c => c.toLowerCase().includes(categoryQuery) || categoryQuery.includes(c.toLowerCase())) ||
            item.name.toLowerCase().includes(categoryQuery) ||
            item.description.toLowerCase().includes(categoryQuery);

        // Match Pricing Plan
        let matchesPricing = true;
        if (pricingFilter === 'free_plan') {
            matchesPricing = item.hasFreePlan === true;
        } else if (pricingFilter === 'paid_only') {
            matchesPricing = item.pricingModel === 'paid' && !item.hasFreePlan;
        }

        // Match Platform Type (AI vs Website)
        let matchesType = true;
        if (typeFilter !== 'both') {
            matchesType = item.type === typeFilter;
        }

        return matchesCategory && matchesPricing && matchesType;
    });

    // Rank tools: Sort highest rating first, then by rank index
    filtered.sort((a, b) => b.rating - a.rating || a.rank - b.rank);

    resultStatus.textContent = `Found ${filtered.length} matching result(s) ranked from best to worst.`;

    if (filtered.length === 0) {
        resultsGrid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    resultsGrid.innerHTML = filtered.map(item => `
        <div class="bg-cardbg border border-bordercol rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${item.type === 'AI' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}">
                        ${item.type === 'AI' ? '⚡ AI Tool' : '🌐 Standard Website'}
                    </span>
                    <span class="text-xs font-semibold px-2 py-1 bg-darkbg border border-bordercol rounded-lg text-gray-400">
                        Rank #${item.rank}
                    </span>
                </div>

                <h3 class="font-bold text-lg text-white">${item.name}</h3>

                <p class="text-xs text-indigo-300 bg-indigo-950/30 border border-indigo-900/40 p-2.5 rounded-xl font-medium">
                    ⭐ ${item.bestFor}
                </p>

                <p class="text-xs text-gray-400 leading-relaxed">${item.description}</p>
            </div>

            <div class="pt-4 border-t border-bordercol flex items-center justify-between">
                <div class="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                    <i data-lucide="star" class="h-3.5 w-3.5 fill-amber-400"></i> ${item.rating} / 5.0
                </div>
                <span class="text-[11px] font-semibold text-gray-400 bg-darkbg border border-bordercol px-2 py-1 rounded-md">
                    ${item.hasFreePlan ? 'Free Plan Available' : 'Paid Only'}
                </span>
                <a href="${item.url}" target="_blank" class="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition">
                    Visit Site
                </a>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

// Custom Local Dataset Upload Handler (.json / .csv)
function setupDatasetUploader() {
    const fileInput = document.getElementById('datasetFileInput');
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                if (file.name.endsWith('.json')) {
                    const parsed = JSON.parse(event.target.result);
                    if (Array.isArray(parsed)) {
                        dataset = parsed;
                        alert(`Successfully loaded JSON dataset with ${dataset.length} items!`);
                    }
                } else if (file.name.endsWith('.csv')) {
                    dataset = parseCSV(event.target.result);
                    alert(`Successfully imported CSV dataset with ${dataset.length} items!`);
                }
                handleSearch();
            } catch (err) {
                alert('Error reading dataset file. Ensure it is a valid CSV or JSON array.');
            }
        };
        reader.readAsText(file);
    });
}

// Utility to parse uploaded CSV files into app objects
function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    return lines.slice(1).map((line, index) => {
        const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        return {
            name: cols[0] || `Tool #${index + 1}`,
            type: (cols[1] || 'AI').toUpperCase().includes('AI') ? 'AI' : 'Website',
            categories: cols[2] ? cols[2].split(';').map(c => c.trim()) : ['general'],
            hasFreePlan: (cols[3] || 'true').toLowerCase() === 'true' || (cols[3] || '').toLowerCase() === 'free',
            pricingModel: cols[3] || 'freemium',
            rating: parseFloat(cols[4]) || 4.0,
            rank: parseInt(cols[5]) || (index + 1),
            bestFor: cols[6] || 'Popular Platform',
            description: cols[7] || 'Directory entry.',
            url: cols[8] || '#'
        };
    });
}
