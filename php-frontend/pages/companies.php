<?php
/**
 * Companies Module - PHP Version
 * Matched strictly to the UI/UX specification prompt.
 */

// Handle routing logic within the module
$action = $_GET['action'] ?? 'list';
$companyId = $_GET['id'] ?? null;
$activeTab = $_GET['tab'] ?? 'contacts';

// The exact 12 IST Teams requested
$istTeams = [
    'IST Titan', 'IST Athenna', 'IST Orion', 'IST Nova', 
    'IST Vega', 'IST Apollo', 'IST Phoenix', 'IST Mercury', 
    'IST Atlas', 'IST Zenith', 'IST Eclipse', 'IST Horizon'
];

// Mock Companies Data
$companiesData = [
    [
        'id' => 'COM-1001', 'name' => 'Acme Corporation', 'clientName' => 'Acme Corp Client', 'lead' => 'John Doe', 
        'phone' => '+1 (555) 123-4567', 'territory' => 'North America', 'type' => 'Enterprise', 
        'status' => 'Active', 'site' => 'Headquarters', 'address' => '123 Tech Blvd', 
        'city' => 'San Francisco', 'ist' => 'IST Titan',
        'contact' => ['name' => 'Jane Smith', 'role' => 'CTO', 'phone' => '+1 (555) 987-6543', 'email' => 'jane.smith@acme.com']
    ],
    [
        'id' => 'COM-1002', 'name' => 'Globex Inc', 'clientName' => 'Globex Client', 'lead' => 'Sarah Connor', 
        'phone' => '+1 (555) 234-5678', 'territory' => 'Europe', 'type' => 'Mid-Market', 
        'status' => 'Active', 'site' => 'London Branch', 'address' => '456 Business Rd', 
        'city' => 'London', 'ist' => 'IST Athenna',
        'contact' => ['name' => 'Mike Johnson', 'role' => 'IT Director', 'phone' => '+44 20 7123 4567', 'email' => 'mjohnson@globex.co.uk']
    ],
    [
        'id' => 'COM-1003', 'name' => 'Initech', 'clientName' => 'Initech Services', 'lead' => 'Peter Gibbons', 
        'phone' => '+1 (555) 345-6789', 'territory' => 'North America', 'type' => 'SMB', 
        'status' => 'Pending', 'site' => 'Main Office', 'address' => '789 Corporate Way', 
        'city' => 'Austin', 'ist' => 'IST Titan',
        'contact' => ['name' => 'Bill Lumbergh', 'role' => 'VP', 'phone' => '+1 (555) 111-2222', 'email' => 'bill@initech.com']
    ],
    [
        'id' => 'COM-1004', 'name' => 'Massive Dynamic', 'clientName' => 'Massive Client', 'lead' => 'William Bell', 
        'phone' => '+1 (555) 456-7890', 'territory' => 'Global', 'type' => 'Enterprise', 
        'status' => 'Active', 'site' => 'NYC Tower', 'address' => '1000 Innovation Dr', 
        'city' => 'New York', 'ist' => 'IST Orion',
        'contact' => ['name' => 'Nina Sharp', 'role' => 'COO', 'phone' => '+1 (555) 333-4444', 'email' => 'nina@massivedynamic.com']
    ]
];

// Helper to find company by ID
function getCompanyById($id, $companies) {
    foreach ($companies as $c) {
        if ($c['id'] === $id) return $c;
    }
    return null;
}

?>

<div class="max-w-screen-2xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
    
    <!-- Top Navigation Tabs & Settings -->
    <div class="flex justify-between items-center mb-4 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
        <div class="flex space-x-1 overflow-x-auto pb-1 md:pb-0">
            <!-- 📌 Main Sections (Top Navigation Tabs) -->
            <a href="?page=companies&action=list&tab=contacts" class="px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap <?= ($action === 'list' && $activeTab === 'contacts') ? 'bg-sn-green text-sn-dark' : 'text-gray-600 hover:bg-gray-100' ?>">
                Contacts
            </a>
            <a href="?page=companies&action=list&tab=configuration" class="px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap <?= $activeTab === 'configuration' ? 'bg-sn-green text-sn-dark' : 'text-gray-600 hover:bg-gray-100' ?>">
                Configuration
            </a>
            <a href="?page=companies&action=list&tab=activity" class="px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap <?= $activeTab === 'activity' ? 'bg-sn-green text-sn-dark' : 'text-gray-600 hover:bg-gray-100' ?>">
                Company Activity
            </a>
            <a href="?page=companies&action=list&tab=reports" class="px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap <?= $activeTab === 'reports' ? 'bg-sn-green text-sn-dark' : 'text-gray-600 hover:bg-gray-100' ?>">
                Company Reports
            </a>
        </div>
        <div>
            <!-- ⚙️ Settings Icon top right corner -->
            <button onclick="document.getElementById('config-modal').classList.remove('hidden')" class="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sn-green shadow-sm border border-gray-200" title="Settings">
                <i data-lucide="settings" class="w-5 h-5 text-gray-700"></i>
            </button>
        </div>
    </div>

    <?php if ($action === 'details' && $companyId): ?>
        <?php $company = getCompanyById($companyId, $companiesData); ?>
        <?php if ($company): ?>
            <!-- 📄 Company Details Page -->
            <div class="flex-grow bg-white rounded-lg shadow-sm border border-gray-100 p-6 overflow-y-auto">
                <div class="flex items-center gap-3 mb-6">
                    <button onclick="window.location.href='?page=companies&action=list'" class="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                        <i data-lucide="arrow-left" class="w-5 h-5"></i>
                    </button>
                    <h1 class="text-2xl font-bold text-gray-800">Company Details: <?= htmlspecialchars($company['name']) ?></h1>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Left Column: Full Info -->
                    <div class="lg:col-span-2 space-y-6">
                        <div class="bg-gray-50 rounded-xl p-5 border border-gray-200 shadow-inner">
                            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2 flex items-center gap-2">
                                <i data-lucide="building-2" class="w-5 h-5 text-gray-500"></i> Full Company Information
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                <div>
                                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Company ID</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['id']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Lead</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['lead']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Phone Number</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['phone']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Territory</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['territory']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Type</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['type']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Status</p>
                                    <span class="px-2 py-0.5 rounded-full text-xs font-semibold <?= $company['status'] === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' ?>">
                                        <?= $company['status'] ?>
                                    </span>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Site</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['site']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Address Line</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['address']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">City</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['city']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Assigned IST</p>
                                    <p class="font-bold text-sn-green"><?= htmlspecialchars($company['ist']) ?></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Primary Contact (Small Card/Box layout) -->
                    <div class="lg:col-span-1">
                        <div class="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden relative">
                            <!-- Highlighted Top Bar -->
                            <div class="h-2 w-full bg-sn-green"></div>
                            
                            <div class="p-5">
                                <div class="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                                    <i data-lucide="star" class="w-5 h-5 text-yellow-400 fill-current"></i>
                                    <h3 class="text-lg font-bold text-gray-800">Primary Contact</h3>
                                </div>
                                
                                <div class="flex items-center gap-4 mb-4">
                                    <div class="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl shadow-sm">
                                        <?= substr($company['contact']['name'], 0, 1) ?>
                                    </div>
                                    <div>
                                        <p class="font-bold text-gray-900 text-lg leading-tight"><?= htmlspecialchars($company['contact']['name']) ?></p>
                                        <p class="text-sm text-gray-500 font-medium"><?= htmlspecialchars($company['contact']['role']) ?></p>
                                    </div>
                                </div>
                                
                                <div class="space-y-3 mt-5 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div class="flex items-center gap-3 text-gray-700 text-sm">
                                        <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                            <i data-lucide="phone" class="w-4 h-4 text-sn-green"></i>
                                        </div>
                                        <span class="font-medium"><?= htmlspecialchars($company['contact']['phone']) ?></span>
                                    </div>
                                    <div class="flex items-center gap-3 text-gray-700 text-sm">
                                        <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                            <i data-lucide="mail" class="w-4 h-4 text-sn-green"></i>
                                        </div>
                                        <span class="font-medium truncate"><?= htmlspecialchars($company['contact']['email']) ?></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php else: ?>
            <div class="flex-grow bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-8">
                <div class="text-center">
                    <i data-lucide="alert-circle" class="w-12 h-12 text-red-400 mx-auto mb-3"></i>
                    <h2 class="text-xl font-medium text-gray-900">Company Not Found</h2>
                </div>
            </div>
        <?php endif; ?>

    <?php else: ?>
        <!-- Main Data Table View -->
        <div class="flex-grow flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden relative">
            
            <!-- ⚙️ Top Action Bar (Horizontal Controls) -->
            <div class="p-4 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex flex-wrap items-center gap-2">
                    
                    <!-- Actions (dropdown for bulk actions) -->
                    <div class="relative group">
                        <button class="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                            <span>Actions</span>
                            <i data-lucide="chevron-down" class="w-4 h-4"></i>
                        </button>
                        <div class="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                            <div class="py-1">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bulk Update</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete Selected</a>
                            </div>
                        </div>
                    </div>

                    <!-- Search (with input field) -->
                    <div class="relative flex items-center">
                        <i data-lucide="search" class="w-4 h-4 absolute left-3 text-gray-400"></i>
                        <input type="text" id="company-search" placeholder="Search..." class="pl-9 pr-3 py-1.5 border border-gray-300 rounded-l-md text-sm w-48 focus:outline-none focus:ring-1 focus:ring-sn-green focus:border-sn-green" onkeyup="filterCompanies()">
                        <button onclick="filterCompanies()" class="px-3 py-1.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm font-bold text-gray-700 hover:bg-gray-200">Search</button>
                    </div>

                    <!-- Clear (reset filters) -->
                    <button onclick="clearFilters()" class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent rounded-md transition-colors">
                        <i data-lucide="x" class="w-4 h-4"></i>
                        <span>Clear</span>
                    </button>
                    
                    <!-- Export (CSV / Excel) -->
                    <button class="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                        <i data-lucide="download" class="w-4 h-4"></i>
                        <span>Export</span>
                    </button>

                    <!-- View (IST filter dropdown) -->
                    <div class="relative group/ist ml-2">
                        <button class="flex items-center gap-2 px-4 py-1.5 bg-sn-dark text-white rounded-md text-sm font-bold hover:bg-gray-800 shadow-sm transition-colors ring-2 ring-transparent focus:ring-sn-green">
                            <i data-lucide="eye" class="w-4 h-4"></i>
                            <span id="current-ist-label">View</span>
                            <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400"></i>
                        </button>
                        <!-- 🧩 IST (Internal Sales Team) Filter list -->
                        <div class="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-xl opacity-0 invisible group-hover/ist:opacity-100 group-hover/ist:visible transition-all z-30 max-h-64 overflow-y-auto">
                            <div class="py-1">
                                <button onclick="selectIST('All')" class="w-full text-left px-4 py-2 text-sm font-bold text-gray-900 bg-gray-50 hover:bg-gray-200">Clear IST View</button>
                                <div class="border-t border-gray-200 my-1"></div>
                                <div class="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Select IST</div>
                                <?php foreach ($istTeams as $ist): ?>
                                    <button onclick="selectIST('<?= htmlspecialchars($ist) ?>')" class="w-full text-left px-4 py-2 text-sm text-gray-700 font-medium hover:bg-sn-green hover:text-sn-dark transition-colors">
                                        <?= htmlspecialchars($ist) ?>
                                    </button>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Standard Table View (Hidden when an IST is selected) -->
            <div id="standard-table-view" class="flex-grow overflow-auto relative">
                <table class="w-full text-left border-collapse min-w-[1200px]" id="companies-table">
                    <thead class="bg-gray-50 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <!-- 📊 Companies Data Table Headers -->
                            <th class="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 w-10">
                                <input type="checkbox" class="rounded border-gray-300 text-sn-green focus:ring-sn-green">
                            </th>
                            <th class="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Lead</th>
                            <th class="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Company ID</th>
                            <th class="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Company Name</th>
                            <th class="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Phone Number</th>
                            <th class="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Territory</th>
                            <th class="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Type</th>
                            <th class="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Status</th>
                            <th class="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Site</th>
                            <th class="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Address Line</th>
                            <th class="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">City</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white" id="companies-tbody">
                        <?php foreach ($companiesData as $c): ?>
                            <tr class="hover:bg-blue-50/50 transition-colors company-row">
                                <td class="px-4 py-3 border-b border-gray-100">
                                    <input type="checkbox" class="rounded border-gray-300 text-sn-green focus:ring-sn-green">
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-700 font-medium border-b border-gray-100"><?= htmlspecialchars($c['lead']) ?></td>
                                <td class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100 font-mono"><?= htmlspecialchars($c['id']) ?></td>
                                <td class="px-4 py-3 border-b border-gray-100">
                                    <!-- 🔗 Navigation Behavior -->
                                    <a href="?page=companies&action=details&id=<?= $c['id'] ?>" class="text-sm font-bold text-blue-600 hover:text-blue-800 underline transition-colors">
                                        <?= htmlspecialchars($c['name']) ?>
                                    </a>
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100"><?= htmlspecialchars($c['phone']) ?></td>
                                <td class="px-4 py-3 text-sm text-gray-700 border-b border-gray-100"><?= htmlspecialchars($c['territory']) ?></td>
                                <td class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100"><?= htmlspecialchars($c['type']) ?></td>
                                <td class="px-4 py-3 border-b border-gray-100">
                                    <span class="px-2 inline-flex text-xs leading-5 font-bold rounded-full <?= $c['status'] === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' ?>">
                                        <?= $c['status'] ?>
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100"><?= htmlspecialchars($c['site']) ?></td>
                                <td class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100 truncate max-w-[150px]" title="<?= htmlspecialchars($c['address']) ?>"><?= htmlspecialchars($c['address']) ?></td>
                                <td class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100"><?= htmlspecialchars($c['city']) ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

            <!-- 👥 IST -> Client View (Grid/List of clients shown ONLY when an IST is selected) -->
            <div id="ist-client-view" class="hidden flex-grow overflow-auto bg-gray-50 p-6">
                <div class="mb-6 flex items-center justify-between border-b border-gray-200 pb-3">
                    <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i data-lucide="users" class="w-6 h-6 text-sn-green"></i>
                        Clients under <span id="display-ist-name" class="text-sn-green"></span>
                    </h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="client-grid">
                    <?php foreach ($companiesData as $c): ?>
                        <div class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all p-5 client-card" data-ist="<?= htmlspecialchars($c['ist']) ?>">
                            <div class="flex items-start justify-between mb-4">
                                <div class="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center font-bold text-gray-500 text-xl border border-gray-200">
                                    <?= substr($c['clientName'], 0, 1) ?>
                                </div>
                                <span class="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100"><?= htmlspecialchars($c['id']) ?></span>
                            </div>
                            
                            <!-- Display Client Name, Company Name, Company ID as requested -->
                            <div class="space-y-1">
                                <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Client Name</p>
                                <!-- 🔗 Navigation Behavior -->
                                <a href="?page=companies&action=details&id=<?= $c['id'] ?>" class="text-lg font-bold text-sn-dark hover:text-sn-green block truncate mb-3 transition-colors">
                                    <?= htmlspecialchars($c['clientName']) ?>
                                </a>

                                <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Company Name</p>
                                <!-- 🔗 Navigation Behavior -->
                                <a href="?page=companies&action=details&id=<?= $c['id'] ?>" class="text-md font-semibold text-blue-600 hover:text-blue-800 underline block truncate transition-colors">
                                    <?= htmlspecialchars($c['name']) ?>
                                </a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            
            <!-- Empty State -->
            <div id="empty-state" class="hidden flex-col items-center justify-center py-16 bg-white absolute inset-0 z-10 mt-16">
                <i data-lucide="search-x" class="w-16 h-16 text-gray-300 mb-4"></i>
                <h3 class="text-xl font-bold text-gray-800">No records found</h3>
                <p class="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
                <button onclick="clearFilters()" class="mt-6 px-6 py-2 bg-sn-dark text-white rounded-md font-bold hover:bg-gray-800 transition-colors shadow-md">Clear Filters</button>
            </div>
        </div>
    <?php endif; ?>
</div>

<!-- Configuration Modal (Hidden by default) -->
<div id="config-modal" class="fixed inset-0 z-50 hidden overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity" aria-hidden="true" onclick="document.getElementById('config-modal').classList.add('hidden')"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div class="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-200">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sn-green sm:mx-0 sm:h-10 sm:w-10">
                        <i data-lucide="settings" class="h-6 w-6 text-sn-dark"></i>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <h3 class="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                            Configuration Panel
                        </h3>
                        <div class="mt-4 space-y-4">
                            <div>
                                <label class="text-sm font-bold text-gray-700 block mb-2">Fields Visibility</label>
                                <div class="grid grid-cols-2 gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <label class="flex items-center"><input type="checkbox" checked class="mr-2 rounded text-sn-green focus:ring-sn-green"> Lead</label>
                                    <label class="flex items-center"><input type="checkbox" checked class="mr-2 rounded text-sn-green focus:ring-sn-green"> Phone</label>
                                    <label class="flex items-center"><input type="checkbox" checked class="mr-2 rounded text-sn-green focus:ring-sn-green"> Territory</label>
                                    <label class="flex items-center"><input type="checkbox" checked class="mr-2 rounded text-sn-green focus:ring-sn-green"> City</label>
                                </div>
                            </div>
                            <div class="border-t border-gray-200 pt-4">
                                <label class="text-sm font-bold text-gray-700 block mb-2">IST Management</label>
                                <button class="w-full text-sm text-white font-bold bg-sn-dark px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    <i data-lucide="plus" class="w-4 h-4"></i> Add New IST Option
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                <button type="button" onclick="document.getElementById('config-modal').classList.add('hidden')" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sn-green text-base font-bold text-sn-dark hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sn-green sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                    Save Configuration
                </button>
                <button type="button" onclick="document.getElementById('config-modal').classList.add('hidden')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sn-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                    Close
                </button>
            </div>
        </div>
    </div>
</div>

<script>
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Logic
    let currentISTFilter = 'All';

    function selectIST(istName) {
        currentISTFilter = istName;
        
        const standardTable = document.getElementById('standard-table-view');
        const istView = document.getElementById('ist-client-view');
        const emptyState = document.getElementById('empty-state');
        
        if (istName === 'All') {
            // Show standard table, hide IST grid
            document.getElementById('current-ist-label').textContent = 'View';
            if (standardTable) standardTable.classList.remove('hidden');
            if (istView) istView.classList.add('hidden');
        } else {
            // Show IST grid, hide standard table
            document.getElementById('current-ist-label').textContent = 'View: ' + istName;
            document.getElementById('display-ist-name').textContent = istName;
            
            if (standardTable) standardTable.classList.add('hidden');
            if (istView) istView.classList.remove('hidden');
            
            // Filter the cards
            let visibleCards = 0;
            const cards = document.querySelectorAll('.client-card');
            cards.forEach(card => {
                if (card.getAttribute('data-ist') === istName) {
                    card.style.display = 'block';
                    visibleCards++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (visibleCards === 0) {
                if (istView) istView.classList.add('hidden');
                if (emptyState) emptyState.classList.remove('hidden');
                if (emptyState) emptyState.classList.add('flex');
            } else {
                if (emptyState) emptyState.classList.add('hidden');
                if (emptyState) emptyState.classList.remove('flex');
            }
        }
        
        // Always run filter for table if we switch back to All
        if (istName === 'All') filterCompanies();
    }

    function clearFilters() {
        const searchInput = document.getElementById('company-search');
        if (searchInput) searchInput.value = '';
        selectIST('All');
    }

    function filterCompanies() {
        if (currentISTFilter !== 'All') return; // Don't filter table if in IST grid view
        
        const searchInput = document.getElementById('company-search');
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.company-row');
        let visibleCount = 0;

        rows.forEach(row => {
            const rowText = row.innerText.toLowerCase();
            if (searchTerm === '' || rowText.includes(searchTerm)) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        // Show/Hide Empty State
        const emptyState = document.getElementById('empty-state');
        const standardTable = document.getElementById('standard-table-view');
        
        if (visibleCount === 0 && standardTable) {
            standardTable.classList.add('hidden');
            emptyState.classList.remove('hidden');
            emptyState.classList.add('flex');
        } else if (standardTable) {
            emptyState.classList.add('hidden');
            emptyState.classList.remove('flex');
            standardTable.classList.remove('hidden');
        }
    }
</script>
