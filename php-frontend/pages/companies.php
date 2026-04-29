<?php
/**
 * Companies Module - PHP Version
 */

// Handle routing logic within the module
$action = $_GET['action'] ?? 'list';
$companyId = $_GET['id'] ?? null;
$activeTab = $_GET['tab'] ?? 'all';

// Mock IST Teams
$istTeams = [
    'IST Titan', 'IST Athenna', 'IST Orion', 'IST Nova', 
    'IST Vega', 'IST Apollo', 'IST Phoenix', 'IST Mercury', 
    'IST Atlas', 'IST Zenith', 'IST Eclipse', 'IST Horizon'
];

// Mock Companies Data
$companiesData = [
    [
        'id' => 'COM-1001', 'name' => 'Acme Corporation', 'lead' => 'John Doe', 
        'phone' => '+1 (555) 123-4567', 'territory' => 'North America', 'type' => 'Enterprise', 
        'status' => 'Active', 'site' => 'Headquarters', 'address' => '123 Tech Blvd', 
        'city' => 'San Francisco', 'ist' => 'IST Titan',
        'contact' => ['name' => 'Jane Smith', 'role' => 'CTO', 'phone' => '+1 (555) 987-6543', 'email' => 'jane.smith@acme.com']
    ],
    [
        'id' => 'COM-1002', 'name' => 'Globex Inc', 'lead' => 'Sarah Connor', 
        'phone' => '+1 (555) 234-5678', 'territory' => 'Europe', 'type' => 'Mid-Market', 
        'status' => 'Active', 'site' => 'London Branch', 'address' => '456 Business Rd', 
        'city' => 'London', 'ist' => 'IST Athenna',
        'contact' => ['name' => 'Mike Johnson', 'role' => 'IT Director', 'phone' => '+44 20 7123 4567', 'email' => 'mjohnson@globex.co.uk']
    ],
    [
        'id' => 'COM-1003', 'name' => 'Initech', 'lead' => 'Peter Gibbons', 
        'phone' => '+1 (555) 345-6789', 'territory' => 'North America', 'type' => 'SMB', 
        'status' => 'Pending', 'site' => 'Main Office', 'address' => '789 Corporate Way', 
        'city' => 'Austin', 'ist' => 'IST Titan',
        'contact' => ['name' => 'Bill Lumbergh', 'role' => 'VP', 'phone' => '+1 (555) 111-2222', 'email' => 'bill@initech.com']
    ],
    [
        'id' => 'COM-1004', 'name' => 'Massive Dynamic', 'lead' => 'William Bell', 
        'phone' => '+1 (555) 456-7890', 'territory' => 'Global', 'type' => 'Enterprise', 
        'status' => 'Active', 'site' => 'NYC Tower', 'address' => '1000 Innovation Dr', 
        'city' => 'New York', 'ist' => 'IST Orion',
        'contact' => ['name' => 'Nina Sharp', 'role' => 'COO', 'phone' => '+1 (555) 333-4444', 'email' => 'nina@massivedynamic.com']
    ],
    [
        'id' => 'COM-1005', 'name' => 'Stark Industries', 'lead' => 'Tony Stark', 
        'phone' => '+1 (555) 999-8888', 'territory' => 'North America', 'type' => 'Enterprise', 
        'status' => 'Active', 'site' => 'Malibu Point', 'address' => '10880 Malibu Point', 
        'city' => 'Los Angeles', 'ist' => 'IST Apollo',
        'contact' => ['name' => 'Pepper Potts', 'role' => 'CEO', 'phone' => '+1 (555) 777-6666', 'email' => 'pepper@stark.com']
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
            <a href="?page=companies" class="px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap <?= $action === 'list' && $activeTab === 'all' ? 'bg-sn-green text-sn-dark' : 'text-gray-600 hover:bg-gray-100' ?>">
                All Companies
            </a>
            <a href="?page=companies&tab=contacts" class="px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap <?= $activeTab === 'contacts' ? 'bg-sn-green text-sn-dark' : 'text-gray-600 hover:bg-gray-100' ?>">
                Contacts
            </a>
            <a href="?page=companies&tab=configuration" class="px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap <?= $activeTab === 'configuration' ? 'bg-sn-green text-sn-dark' : 'text-gray-600 hover:bg-gray-100' ?>">
                Configuration
            </a>
            <a href="?page=companies&tab=activity" class="px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap <?= $activeTab === 'activity' ? 'bg-sn-green text-sn-dark' : 'text-gray-600 hover:bg-gray-100' ?>">
                Company Activity
            </a>
            <a href="?page=companies&tab=reports" class="px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap <?= $activeTab === 'reports' ? 'bg-sn-green text-sn-dark' : 'text-gray-600 hover:bg-gray-100' ?>">
                Company Reports
            </a>
        </div>
        <div>
            <button onclick="document.getElementById('config-modal').classList.remove('hidden')" class="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sn-green">
                <i data-lucide="settings" class="w-5 h-5"></i>
            </button>
        </div>
    </div>

    <?php if ($action === 'details' && $companyId): ?>
        <?php $company = getCompanyById($companyId, $companiesData); ?>
        <?php if ($company): ?>
            <!-- Company Details Page -->
            <div class="flex-grow bg-white rounded-lg shadow-sm border border-gray-100 p-6 overflow-y-auto">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <div class="flex items-center gap-3">
                            <button onclick="window.history.back()" class="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                                <i data-lucide="arrow-left" class="w-5 h-5"></i>
                            </button>
                            <h1 class="text-2xl font-bold text-gray-800"><?= htmlspecialchars($company['name']) ?></h1>
                            <span class="px-2.5 py-0.5 rounded-full text-xs font-medium <?= $company['status'] === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' ?>">
                                <?= $company['status'] ?>
                            </span>
                        </div>
                        <p class="text-gray-500 mt-1 ml-9">ID: <?= $company['id'] ?> | IST: <?= $company['ist'] ?></p>
                    </div>
                    <div class="flex space-x-2">
                        <button class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                            Edit Company
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Left Column: Full Info -->
                    <div class="lg:col-span-2 space-y-6">
                        <div class="bg-gray-50 rounded-xl p-5 border border-gray-100">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Full Company Information</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Lead</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['lead']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Phone Number</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['phone']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Territory</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['territory']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Type</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['type']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Site</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['site']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Address Line</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['address']) ?></p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">City</p>
                                    <p class="font-medium text-gray-900"><?= htmlspecialchars($company['city']) ?></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Primary Contact -->
                    <div class="lg:col-span-1">
                        <div class="bg-gradient-to-br from-sn-dark to-gray-800 rounded-xl p-5 shadow-md border border-gray-700 text-white relative overflow-hidden group">
                            <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-sn-green rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500 blur-xl"></div>
                            
                            <div class="flex items-center gap-2 mb-4">
                                <i data-lucide="star" class="w-5 h-5 text-sn-green fill-current"></i>
                                <h3 class="text-lg font-semibold">Primary Contact</h3>
                            </div>
                            
                            <div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/5">
                                <div class="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
                                    <div class="w-10 h-10 rounded-full bg-sn-green flex items-center justify-center text-sn-dark font-bold text-lg">
                                        <?= substr($company['contact']['name'], 0, 1) ?>
                                    </div>
                                    <div>
                                        <p class="font-semibold text-white"><?= htmlspecialchars($company['contact']['name']) ?></p>
                                        <p class="text-xs text-gray-300"><?= htmlspecialchars($company['contact']['role']) ?></p>
                                    </div>
                                </div>
                                
                                <div class="space-y-2 text-sm">
                                    <div class="flex items-center gap-2 text-gray-300">
                                        <i data-lucide="phone" class="w-4 h-4 text-sn-green"></i>
                                        <span><?= htmlspecialchars($company['contact']['phone']) ?></span>
                                    </div>
                                    <div class="flex items-center gap-2 text-gray-300">
                                        <i data-lucide="mail" class="w-4 h-4 text-sn-green"></i>
                                        <span class="truncate block w-full"><?= htmlspecialchars($company['contact']['email']) ?></span>
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
                    <p class="text-gray-500 mt-1">The requested company ID does not exist.</p>
                    <a href="?page=companies" class="mt-4 inline-block px-4 py-2 bg-sn-green text-sn-dark rounded-md font-medium">Back to List</a>
                </div>
            </div>
        <?php endif; ?>

    <?php else: ?>
        <!-- Main Data Table View -->
        <div class="flex-grow flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            
            <!-- Top Action Bar -->
            <div class="p-4 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex flex-wrap items-center gap-2">
                    
                    <!-- Actions Dropdown -->
                    <div class="relative group">
                        <button class="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                            <span>Actions</span>
                            <i data-lucide="chevron-down" class="w-4 h-4"></i>
                        </button>
                        <div class="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <div class="py-1">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-sn-dark">Bulk Update</a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-sn-dark">Assign Territory</a>
                                <div class="border-t border-gray-100 my-1"></div>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete Selected</a>
                            </div>
                        </div>
                    </div>

                    <!-- Search Input -->
                    <div class="relative">
                        <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="text" id="company-search" placeholder="Search companies..." class="pl-9 pr-3 py-1.5 border border-gray-300 rounded-md text-sm w-48 focus:outline-none focus:ring-1 focus:ring-sn-green focus:border-sn-green" onkeyup="filterCompanies()">
                    </div>

                    <!-- Clear Filters -->
                    <button onclick="clearFilters()" class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                        <i data-lucide="x" class="w-4 h-4"></i>
                        <span>Clear</span>
                    </button>
                </div>

                <div class="flex items-center gap-2">
                    <!-- View (IST Filter) Dropdown -->
                    <div class="relative group/ist">
                        <button class="flex items-center gap-2 px-3 py-1.5 bg-sn-dark text-white rounded-md text-sm font-medium hover:bg-gray-800 shadow-sm transition-colors">
                            <i data-lucide="filter" class="w-4 h-4"></i>
                            <span id="current-ist-label">View: All ISTs</span>
                            <i data-lucide="chevron-down" class="w-4 h-4"></i>
                        </button>
                        <div class="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover/ist:opacity-100 group-hover/ist:visible transition-all z-20 max-h-64 overflow-y-auto">
                            <div class="py-1">
                                <button onclick="selectIST('All')" class="w-full text-left px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100">Show All ISTs</button>
                                <div class="border-t border-gray-100 my-1"></div>
                                <?php foreach ($istTeams as $ist): ?>
                                    <button onclick="selectIST('<?= htmlspecialchars($ist) ?>')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sn-green hover:text-sn-dark transition-colors">
                                        <?= htmlspecialchars($ist) ?>
                                    </button>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>

                    <!-- Export -->
                    <button class="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                        <i data-lucide="download" class="w-4 h-4"></i>
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <!-- Data Table (Horizontal Layout) -->
            <div class="flex-grow overflow-auto relative">
                <table class="w-full text-left border-collapse min-w-[1200px]" id="companies-table">
                    <thead class="bg-gray-50 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 w-10">
                                <input type="checkbox" class="rounded border-gray-300 text-sn-green focus:ring-sn-green">
                            </th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Company ID</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Company Name / Client</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">IST Team</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Lead</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Phone Number</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Territory</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Type</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Status</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Site</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 hidden xl:table-cell">City</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white" id="companies-tbody">
                        <?php foreach ($companiesData as $c): ?>
                            <tr class="hover:bg-blue-50/50 transition-colors company-row cursor-pointer" data-ist="<?= htmlspecialchars($c['ist']) ?>" onclick="window.location.href='?page=companies&action=details&id=<?= $c['id'] ?>'">
                                <td class="px-4 py-3 border-b border-gray-100" onclick="event.stopPropagation()">
                                    <input type="checkbox" class="rounded border-gray-300 text-sn-green focus:ring-sn-green">
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100 font-mono"><?= htmlspecialchars($c['id']) ?></td>
                                <td class="px-4 py-3 border-b border-gray-100">
                                    <div class="flex flex-col">
                                        <a href="?page=companies&action=details&id=<?= $c['id'] ?>" class="text-sm font-semibold text-sn-dark hover:text-sn-green transition-colors" onclick="event.stopPropagation(); window.location.href=this.href;">
                                            <?= htmlspecialchars($c['name']) ?>
                                        </a>
                                        <span class="text-xs text-gray-500">Client View</span>
                                    </div>
                                </td>
                                <td class="px-4 py-3 border-b border-gray-100">
                                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                        <?= htmlspecialchars($c['ist']) ?>
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-700 border-b border-gray-100"><?= htmlspecialchars($c['lead']) ?></td>
                                <td class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100"><?= htmlspecialchars($c['phone']) ?></td>
                                <td class="px-4 py-3 text-sm text-gray-700 border-b border-gray-100"><?= htmlspecialchars($c['territory']) ?></td>
                                <td class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100"><?= htmlspecialchars($c['type']) ?></td>
                                <td class="px-4 py-3 border-b border-gray-100">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full <?= $c['status'] === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' ?>">
                                        <?= $c['status'] ?>
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100"><?= htmlspecialchars($c['site']) ?></td>
                                <td class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100 hidden xl:table-cell"><?= htmlspecialchars($c['city']) ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
                
                <!-- Empty State -->
                <div id="empty-state" class="hidden flex-col items-center justify-center py-16">
                    <i data-lucide="search-x" class="w-12 h-12 text-gray-300 mb-3"></i>
                    <h3 class="text-lg font-medium text-gray-900">No companies found</h3>
                    <p class="text-sm text-gray-500 mt-1">Try adjusting your IST filter or search term.</p>
                    <button onclick="clearFilters()" class="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">Clear Filters</button>
                </div>
            </div>
            
            <!-- Pagination (Mock) -->
            <div class="px-4 py-3 border-t border-gray-200 bg-white flex items-center justify-between sm:px-6">
                <div class="hidden sm:block">
                    <p class="text-sm text-gray-700">
                        Showing <span class="font-medium">1</span> to <span class="font-medium">5</span> of <span class="font-medium">5</span> results
                    </p>
                </div>
                <div class="flex-1 flex justify-between sm:justify-end">
                    <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 opacity-50 cursor-not-allowed">
                        Previous
                    </button>
                    <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 opacity-50 cursor-not-allowed">
                        Next
                    </button>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>

<!-- Configuration Modal (Hidden by default) -->
<div id="config-modal" class="fixed inset-0 z-50 hidden overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true" onclick="document.getElementById('config-modal').classList.add('hidden')"></div>

        <!-- Center modal -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <i data-lucide="settings" class="h-6 w-6 text-blue-600"></i>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Companies Module Configuration
                        </h3>
                        <div class="mt-4 space-y-4">
                            <div>
                                <label class="text-sm font-medium text-gray-700 block mb-2">Visible Table Fields</label>
                                <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                    <label class="flex items-center"><input type="checkbox" checked class="mr-2 rounded text-sn-green focus:ring-sn-green"> Company ID</label>
                                    <label class="flex items-center"><input type="checkbox" checked class="mr-2 rounded text-sn-green focus:ring-sn-green"> Lead</label>
                                    <label class="flex items-center"><input type="checkbox" checked class="mr-2 rounded text-sn-green focus:ring-sn-green"> Phone</label>
                                    <label class="flex items-center"><input type="checkbox" checked class="mr-2 rounded text-sn-green focus:ring-sn-green"> Type</label>
                                    <label class="flex items-center"><input type="checkbox" class="mr-2 rounded text-sn-green focus:ring-sn-green"> Created Date</label>
                                </div>
                            </div>
                            <div class="border-t border-gray-100 pt-4">
                                <label class="text-sm font-medium text-gray-700 block mb-2">IST Management</label>
                                <button class="text-sm text-sn-dark font-medium hover:text-sn-green transition-colors flex items-center gap-1">
                                    <i data-lucide="plus" class="w-4 h-4"></i> Add New IST Team
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                <button type="button" onclick="document.getElementById('config-modal').classList.add('hidden')" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sn-dark text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sn-green sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                    Save Changes
                </button>
                <button type="button" onclick="document.getElementById('config-modal').classList.add('hidden')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sn-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>

<script>
    // Initialize icons if rendered dynamically
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // IST Filtering and Search Logic
    let currentISTFilter = 'All';

    function selectIST(istName) {
        currentISTFilter = istName;
        document.getElementById('current-ist-label').textContent = istName === 'All' ? 'View: All ISTs' : 'View: ' + istName;
        filterCompanies();
    }

    function clearFilters() {
        document.getElementById('company-search').value = '';
        currentISTFilter = 'All';
        document.getElementById('current-ist-label').textContent = 'View: All ISTs';
        filterCompanies();
    }

    function filterCompanies() {
        const searchTerm = document.getElementById('company-search').value.toLowerCase();
        const rows = document.querySelectorAll('.company-row');
        let visibleCount = 0;

        rows.forEach(row => {
            const rowIST = row.getAttribute('data-ist');
            const rowText = row.innerText.toLowerCase();
            
            const matchesSearch = searchTerm === '' || rowText.includes(searchTerm);
            const matchesIST = currentISTFilter === 'All' || rowIST === currentISTFilter;

            if (matchesSearch && matchesIST) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        // Show/Hide Empty State
        const emptyState = document.getElementById('empty-state');
        if (visibleCount === 0) {
            emptyState.classList.remove('hidden');
            emptyState.classList.add('flex');
        } else {
            emptyState.classList.add('hidden');
            emptyState.classList.remove('flex');
        }
    }
</script>
