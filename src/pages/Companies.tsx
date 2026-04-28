import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  Download, 
  Eye, 
  Filter,
  X,
  Settings,
  Building2,
  Phone,
  MapPin,
  Tag,
  CheckCircle,
  Globe,
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  User,
  Edit,
  Activity,
  UserPlus,
  Mail,
  Phone as PhoneIcon,
  Trash2,
  MessageSquare,
  Calendar as CalendarIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DataTable } from "../components/DataTable";

interface Company {
  id: string;
  name: string;
  companyId: string;
  phone: string;
  territory: string;
  type: string;
  status: string;
  site: string;
  city: string;
  lead: string;
  isISTClient: boolean;
  ISTTitle?: string;
  dateAcquired?: string;
  market?: string;
  fiscalYearEnd?: string;
  userCount?: number;
  serviceModel?: string;
  itProvider?: string;
  changeWindow?: string;
  servicePOD?: string;
  companyPersona?: string;
  accountExecEngagement?: string;
  directISTPhoneNumber?: string;
  primaryContact?: {
    name: string;
    email: string;
    phone: string;
    title?: string;
    department?: string;
    status?: string;
    lastContact?: string;
    notes?: string;
  };
}

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

export function Companies() {
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedClientGroup, setSelectedClientGroup] = useState("all-clients");
  const [selectedView, setSelectedView] = useState("table");
  const [showIstOptions, setShowIstOptions] = useState(false);
  const [showOnlyISTClients, setShowOnlyISTClients] = useState(false);
  const istPanelRef = useRef<HTMLDivElement>(null);
  const [activeDetailTab, setActiveDetailTab] = useState("overview");
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  
  // Add Company Form State
  const [newCompany, setNewCompany] = useState({
    name: "",
    companyId: "",
    phone: "",
    territory: "",
    type: "",
    status: "Active",
    site: "",
    city: "",
    lead: "",
    isISTClient: false,
    primaryContact: {
      name: "",
      email: "",
      phone: "",
      title: "",
      department: "",
      status: "Active",
      lastContact: "",
      notes: ""
    }
  });

  
  // Close IST panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (istPanelRef.current && !istPanelRef.current.contains(event.target as Node)) {
        setShowIstOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Filter states
  const [filters, setFilters] = useState({
    companyName: "",
    companyId: "",
    phoneNumber: "",
    territory: "",
    type: "",
    status: "",
    site: "",
    city: ""
  });

  const [istOptions, setIstOptions] = useState({
    teamMember: "",
    priorityLevel: "all",
    dateRange: "all",
    statusFilter: "all",
    sortBy: "name"
  });

  // Mock data
  const [companies] = useState<Company[]>([
    {
      id: "1",
      name: "Tech Solutions Inc.",
      companyId: "TS001",
      phone: "+1-555-0101",
      territory: "North America",
      type: "Technology",
      status: "Active",
      site: "Main Office",
      city: "New York",
      lead: "John Smith",
      isISTClient: true,
      ISTTitle: "Premium IST Client",
      dateAcquired: "2022-03-15",
      market: "Enterprise",
      fiscalYearEnd: "December 31",
      userCount: 250,
      serviceModel: "Managed Services",
      itProvider: "Internal IT",
      changeWindow: "Weekend 12AM-6AM",
      servicePOD: "POD-A",
      companyPersona: "Innovator",
      accountExecEngagement: "High",
      directISTPhoneNumber: "+1-800-IST-HELP",
      primaryContact: {
        name: "Michael Chen",
        email: "michael.chen@techsolutions.com",
        phone: "+1-555-0102",
        title: "Chief Technology Officer",
        department: "Technology",
        status: "Active",
        lastContact: "2 days ago",
        notes: "Key decision maker for technology purchases. Prefers technical details over business benefits."
      }
    },
    {
      id: "2",
      name: "Global Manufacturing",
      companyId: "GM002",
      phone: "+1-555-0125",
      territory: "Europe",
      type: "Manufacturing",
      status: "Active",
      site: "Plant A",
      city: "Berlin",
      lead: "Sarah Williams",
      isISTClient: false,
      primaryContact: {
        name: "Bob Davis",
        email: "bob@globalmfg.com",
        phone: "+1-555-0126"
      }
    },
    {
      id: "3",
      name: "Digital Services Ltd",
      companyId: "DSL003",
      phone: "+1-555-0127",
      territory: "Asia Pacific",
      type: "Services",
      status: "Pending",
      site: "Regional Office",
      city: "Singapore",
      lead: "Mike Chen",
      isISTClient: true,
      ISTTitle: "Standard IST Client",
      dateAcquired: "2023-03-20",
      market: "SMB",
      fiscalYearEnd: "June 30",
      userCount: 75,
      serviceModel: "Hybrid",
      itProvider: "IST Managed",
      changeWindow: "Daily 10PM-2AM",
      servicePOD: "Singapore",
      companyPersona: "Optimizer",
      accountExecEngagement: "Medium",
      directISTPhoneNumber: "+1-555-0128",
      primaryContact: {
        name: "Carol White",
        email: "carol@digitalservices.com",
        phone: "+1-555-0128",
        title: "Operations Manager",
        department: "Operations",
        status: "Active",
        lastContact: "2024-04-18",
        notes: "Main point of contact for operational matters"
      }
    }
  ]);

  // State for companies list to allow adding new companies
  const [companiesList, setCompaniesList] = useState(companies);

  const clientGroups = [
    { id: "all-clients", name: "All Clients", count: 156 },
    { id: "ist-clients", name: "IST Clients", count: 42 },
    { id: "enterprise", name: "Enterprise", count: 28 },
    { id: "small-business", name: "Small Business", count: 86 },
    { id: "government", name: "Government", count: 12 },
    { id: "non-profit", name: "Non-Profit", count: 8 }
  ];

  const [searchName, setSearchName] = useState("");
  const [territory, setTerritory] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [site, setSite] = useState("");
  const [city, setCity] = useState("");
  const [lead, setLead] = useState("");

  const filteredCompanies = useMemo(() => {
    return companiesList.filter(company => {
      const matchesSearch = searchName === "" || 
        company.name.toLowerCase().includes(searchName.toLowerCase()) ||
        company.companyId.toLowerCase().includes(searchName.toLowerCase()) ||
        company.phone.toLowerCase().includes(searchName.toLowerCase()) ||
        company.territory.toLowerCase().includes(searchName.toLowerCase()) ||
        company.type.toLowerCase().includes(searchName.toLowerCase()) ||
        company.status.toLowerCase().includes(searchName.toLowerCase()) ||
        company.site.toLowerCase().includes(searchName.toLowerCase()) ||
        company.city.toLowerCase().includes(searchName.toLowerCase()) ||
        company.lead.toLowerCase().includes(searchName.toLowerCase());

      const matchesTerritory = territory === "" || company.territory === territory;
      const matchesType = type === "" || company.type === type;
      const matchesStatus = status === "" || company.status === status;
      const matchesSite = site === "" || company.site.toLowerCase().includes(site.toLowerCase());
      const matchesCity = city === "" || company.city.toLowerCase().includes(city.toLowerCase());
      const matchesLead = lead === "" || company.lead.toLowerCase().includes(lead.toLowerCase());

      const matchesIST = !showOnlyISTClients || company.isISTClient;

      return matchesSearch && matchesTerritory && matchesType && matchesStatus && matchesSite && matchesCity && matchesLead && matchesIST;
    });
  }, [companiesList, searchName, territory, type, status, site, city, lead, showOnlyISTClients]);

  const tableColumns = [
    {
      key: 'name' as keyof Company,
      label: 'Company Name',
      sortable: true,
      filterable: true,
      width: '2fr',
      render: (value: string, row: Company) => (
        <div className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
          {value}
        </div>
      )
    },
    {
      key: 'companyId' as keyof Company,
      label: 'Company ID',
      sortable: true,
      filterable: true,
      width: '1fr'
    },
    {
      key: 'phone' as keyof Company,
      label: 'Phone',
      sortable: true,
      filterable: true,
      width: '1.5fr'
    },
    {
      key: 'territory' as keyof Company,
      label: 'Territory',
      sortable: true,
      filterable: true,
      width: '1fr'
    },
    {
      key: 'type' as keyof Company,
      label: 'Type',
      sortable: true,
      filterable: true,
      width: '1fr'
    },
    {
      key: 'status' as keyof Company,
      label: 'Status',
      sortable: true,
      filterable: true,
      width: '1fr',
      render: (value: string) => (
        <span className={cn(
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
          value === "Active" 
            ? "bg-green-100 text-green-800" 
            : "bg-yellow-100 text-yellow-800"
        )}>
          {value}
        </span>
      )
    },
    {
      key: 'site' as keyof Company,
      label: 'Site',
      sortable: true,
      filterable: true,
      width: '1fr'
    },
    {
      key: 'city' as keyof Company,
      label: 'City',
      sortable: true,
      filterable: true,
      width: '1fr'
    },
    {
      key: 'isISTClient' as keyof Company,
      label: 'IST',
      sortable: true,
      filterable: false,
      width: '0.5fr',
      render: (value: boolean, row: Company) => (
        value && (
          <span 
            onClick={(e) => {
              e.stopPropagation();
              handleISTTitleClick();
            }}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors"
          >
            IST
          </span>
        )
      )
    }
  ];

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  const handleClear = () => {
    setFilters({
      companyName: "",
      companyId: "",
      phoneNumber: "",
      territory: "",
      type: "",
      status: "",
      site: "",
      city: ""
    });
  };

  const handleExport = () => {
    console.log("Exporting data...");
    // Simulate export functionality
    const data = filteredCompanies.map(company => ({
      name: company.name,
      companyId: company.companyId,
      phone: company.phone,
      territory: company.territory,
      type: company.type,
      status: company.status,
      site: company.site,
      city: company.city,
      isISTClient: company.isISTClient
    }));
    
    console.log("Exported data:", data);
    alert(`Exported ${data.length} companies successfully!`);
  };

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setShowCompanyModal(true);
  };

  const handleISTTitleClick = () => {
    setShowOnlyISTClients(true);
  };

  const handleClearISTFilter = () => {
    setShowOnlyISTClients(false);
  };

  const handleAddCompany = () => {
    setShowAddCompanyModal(true);
  };

  const handleAddCompanySubmit = () => {
    try {
      // Validate form
      if (!newCompany.name || !newCompany.companyId || !newCompany.phone) {
        alert("Please fill in all required fields (Company Name, Company ID, Phone)");
        return;
      }

      // Create new company object with proper type casting
      const companyToAdd: Company = {
        id: Date.now().toString(),
        name: newCompany.name,
        companyId: newCompany.companyId,
        phone: newCompany.phone,
        territory: newCompany.territory || "",
        type: newCompany.type || "",
        status: newCompany.status,
        site: newCompany.site || "",
        city: newCompany.city || "",
        lead: newCompany.lead || "",
        isISTClient: newCompany.isISTClient,
        primaryContact: newCompany.primaryContact.name ? {
          name: newCompany.primaryContact.name,
          email: newCompany.primaryContact.email,
          phone: newCompany.primaryContact.phone,
          title: newCompany.primaryContact.title,
          department: newCompany.primaryContact.department,
          status: newCompany.primaryContact.status,
          lastContact: newCompany.primaryContact.lastContact,
          notes: newCompany.primaryContact.notes
        } : undefined
      };

      // Add to companies array (in real app, this would be an API call)
      setCompaniesList([...companiesList, companyToAdd]);
      
      console.log("Company added:", companyToAdd);
      alert(`Company "${newCompany.name}" added successfully!`);
      
      // Reset form and close modal
      setNewCompany({
        name: "",
        companyId: "",
        phone: "",
        territory: "",
        type: "",
        status: "Active",
        site: "",
        city: "",
        lead: "",
        isISTClient: false,
        primaryContact: {
          name: "",
          email: "",
          phone: "",
          title: "",
          department: "",
          status: "Active",
          lastContact: "",
          notes: ""
        }
      });
      setShowAddCompanyModal(false);
    } catch (error) {
      console.error("Error adding company:", error);
      alert("An error occurred while adding the company. Please try again.");
    }
  };

  const handleAddCompanyCancel = () => {
    setNewCompany({
      name: "",
      companyId: "",
      phone: "",
      territory: "",
      type: "",
      status: "Active",
      site: "",
      city: "",
      lead: "",
      isISTClient: false,
      primaryContact: {
        name: "",
        email: "",
        phone: "",
        title: "",
        department: "",
        status: "Active",
        lastContact: "",
        notes: ""
      }
    });
    setShowAddCompanyModal(false);
  };

  const handleViewChange = (view: string) => {
    setSelectedView(view);
    console.log("View changed to:", view);
  };

  const handleClientGroupChange = (groupId: string) => {
    setSelectedClientGroup(groupId);
    console.log("Client group changed to:", groupId);
  };

  const handleAddContact = () => {
    console.log("Adding contact...");
    alert("Add Contact functionality would open a contact form");
  };

  const handleViewActivity = () => {
    console.log("Viewing activity...");
    setActiveDetailTab("activity");
  };

  const handleAssignTeam = () => {
    console.log("Assigning team...");
    alert("Assign Team functionality would open team assignment dialog");
  };

  const handleEditCompany = () => {
    console.log("Editing company...");
    alert("Edit Company functionality would open company edit form");
  };

  const handleSendMessage = (contact: any) => {
    console.log("Sending message to:", contact.name);
    alert(`Message functionality would open messaging interface for ${contact.name}`);
  };

  const handleMakeCall = (contact: any) => {
    console.log("Calling:", contact.phone);
    alert(`Call functionality would initiate call to ${contact.phone}`);
  };

  const handleSendEmail = (contact: any) => {
    console.log("Emailing:", contact.email);
    alert(`Email functionality would open email client for ${contact.email}`);
  };

  const handleEditContact = (contact: any) => {
    console.log("Editing contact:", contact.name);
    alert(`Edit Contact functionality would open contact edit form for ${contact.name}`);
  };

  const handleDeleteContact = (contact: any) => {
    console.log("Deleting contact:", contact.name);
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      alert(`Contact ${contact.name} deleted successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">Company Search</h1>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleAddCompany}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
              
              <Dropdown
                trigger={
                  <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    <Filter className="w-4 h-4" />
                    Actions
                    <ChevronDown className="w-4 h-4" />
                  </button>
                }
              >
                <div className="py-1">
                  <button 
                    onClick={() => alert("Bulk Edit functionality would open bulk edit interface")}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Bulk Edit
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm("Are you sure you want to delete selected companies?")) {
                        alert("Bulk Delete functionality would delete selected companies");
                      }
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Bulk Delete
                  </button>
                  <button 
                    onClick={() => alert("Import Companies functionality would open file import dialog")}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Import Companies
                  </button>
                </div>
              </Dropdown>
              
              <button 
                onClick={handleSearch}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              
              <button 
                onClick={handleClear}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <Filter className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Enhanced IST Section */}
            <div className="relative" ref={istPanelRef}>
              <button
                onClick={() => setShowIstOptions(!showIstOptions)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                  showIstOptions 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
                )}
              >
                <Users className="w-4 h-4" />
                IST Clients
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Enhanced IST Options Panel */}
              {showIstOptions && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">IST Client Options</h3>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-green-800">42</div>
                        <div className="text-xs text-green-600">Total IST Clients</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-blue-800">8</div>
                        <div className="text-xs text-blue-600">New This Week</div>
                      </div>
                    </div>
                    
                    {/* IST Filters */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Team Member</label>
                        <select
                          value={istOptions.teamMember}
                          onChange={(e) => setIstOptions({ ...istOptions, teamMember: e.target.value })}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
                        >
                          <option value="">All Team Members</option>
                          <option value="john_smith">John Smith</option>
                          <option value="sarah_williams">Sarah Williams</option>
                          <option value="mike_chen">Mike Chen</option>
                          <option value="alice_johnson">Alice Johnson</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Priority Level</label>
                        <select
                          value={istOptions.priorityLevel}
                          onChange={(e) => setIstOptions({ ...istOptions, priorityLevel: e.target.value })}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
                        >
                          <option value="all">All Priorities</option>
                          <option value="high">High Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="low">Low Priority</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* IST Companies List */}
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">Recent IST Companies</h4>
                      <div className="space-y-2">
                        {companiesList.filter(c => c.isISTClient).slice(0, 3).map((company) => (
                          <div
                            key={company.id}
                            onClick={() => handleCompanyClick(company)}
                            className="p-3 bg-gray-50 rounded-lg hover:bg-green-50 cursor-pointer transition-colors border border-gray-200"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-sm text-gray-900">{company.name}</div>
                                <div className="text-xs text-gray-500 mt-1">ID: {company.companyId}</div>
                                <div className="text-xs text-gray-500">Phone: {company.phone}</div>
                              </div>
                              <div className="flex flex-col items-end gap-1 ml-3">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  IST
                                </span>
                                <span className={cn(
                                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                  company.status === "Active" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                )}>
                                  {company.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full mt-3 text-center text-xs text-green-600 hover:text-green-700 font-medium">
                        View All IST Companies →
                      </button>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-2 gap-2">
                      <button className="flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors">
                        <Plus className="w-3 h-3" />
                        Add IST Client
                      </button>
                      <button className="flex items-center justify-center gap-1 px-3 py-2 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50 transition-colors">
                        <Download className="w-3 h-3" />
                        Export IST
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  {selectedView === "table" ? "Table View" : "Card View"}
                  <ChevronDown className="w-4 h-4" />
                </button>
              }
            >
              <div className="py-1">
                <button 
                  onClick={() => handleViewChange("table")}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm transition-colors",
                    selectedView === "table" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Table View
                </button>
                <button 
                  onClick={() => handleViewChange("card")}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm transition-colors",
                    selectedView === "card" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Card View
                </button>
              </div>
            </Dropdown>
            
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium min-w-[180px]">
                  {clientGroups.find(g => g.id === selectedClientGroup)?.name || "Select Group"}
                  <ChevronDown className="w-4 h-4" />
                </button>
              }
            >
              <div className="py-1 max-h-64 overflow-y-auto">
                {clientGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => handleClientGroupChange(group.id)}
                    className={cn(
                      "w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between",
                      selectedClientGroup === group.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <span>{group.name}</span>
                    <span className="text-xs text-gray-500">{group.count}</span>
                  </button>
                ))}
              </div>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* IST Filter Banner */}
      {showOnlyISTClients && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Showing IST Clients Only ({companiesList.filter(c => c.isISTClient).length} companies)
              </span>
            </div>
            <button
              onClick={handleClearISTFilter}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}

      {/* Filters Row */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="grid grid-cols-8 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Company Name</label>
            <input
              type="text"
              value={filters.companyName}
              onChange={(e) => setFilters({ ...filters, companyName: e.target.value })}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm transition-colors"
              placeholder="Search name..."
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Company ID</label>
            <input
              type="text"
              value={filters.companyId}
              onChange={(e) => setFilters({ ...filters, companyId: e.target.value })}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm transition-colors"
              placeholder="Search ID..."
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
            <input
              type="text"
              value={filters.phoneNumber}
              onChange={(e) => setFilters({ ...filters, phoneNumber: e.target.value })}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm transition-colors"
              placeholder="Search phone..."
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Territory</label>
            <select
              value={filters.territory}
              onChange={(e) => setFilters({ ...filters, territory: e.target.value })}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm transition-colors bg-transparent"
            >
              <option value="">All Territories</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Asia Pacific">Asia Pacific</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm transition-colors bg-transparent"
            >
              <option value="">All Types</option>
              <option value="Technology">Technology</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Services">Services</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm transition-colors bg-transparent"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Site</label>
            <input
              type="text"
              value={filters.site}
              onChange={(e) => setFilters({ ...filters, site: e.target.value })}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm transition-colors"
              placeholder="Search site..."
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
            <input
              type="text"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm transition-colors"
              placeholder="Search city..."
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white">
        <DataTable
          data={filteredCompanies}
          columns={tableColumns}
          onRowClick={handleCompanyClick}
          className="mt-4"
        />
      </div>

      {/* Company Detail Modal */}
      {showCompanyModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCompany.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">ID: {selectedCompany.companyId}</span>
                      {selectedCompany.isISTClient && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          IST Client
                        </span>
                      )}
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        selectedCompany.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      )}>
                        {selectedCompany.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowCompanyModal(false)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <button 
                  onClick={() => alert("Add IST Client functionality would open IST client registration form")}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add IST Client
                </button>
                <button 
                  onClick={() => {
                    const istClients = companiesList.filter(c => c.isISTClient);
                    alert(`Exporting ${istClients.length} IST clients...`);
                    console.log("IST Clients exported:", istClients);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  Export IST
                </button>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button 
                  onClick={handleEditCompany}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Edit Company
                </button>
                <button 
                  onClick={handleAddContact}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Contact
                </button>
                <button 
                  onClick={handleViewActivity}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <Activity className="w-4 h-4" />
                  View Activity
                </button>
                <button 
                  onClick={handleAssignTeam}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  Assign Team
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 border-b border-gray-200 bg-white">
              <div className="flex space-x-8">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "ist", label: "IST Details", disabled: !selectedCompany.isISTClient },
                  { id: "contacts", label: "Contacts" },
                  { id: "activity", label: "Activity" },
                  { id: "documents", label: "Documents" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => !tab.disabled && setActiveDetailTab(tab.id)}
                    disabled={tab.disabled}
                    className={cn(
                      "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                      activeDetailTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : tab.disabled
                        ? "border-transparent text-gray-400 cursor-not-allowed"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeDetailTab === "overview" && (
                <div className="space-y-6">
                  {/* Company Summary Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{selectedCompany.name}</h2>
                        <div className="flex items-center gap-4 text-blue-100">
                          <span>ID: {selectedCompany.companyId}</span>
                          <span>•</span>
                          <span>{selectedCompany.territory}</span>
                          <span>•</span>
                          <span>{selectedCompany.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                          selectedCompany.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        )}>
                          {selectedCompany.status}
                        </span>
                        {selectedCompany.isISTClient && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-blue-600">
                            IST Client
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Total Users</span>
                        <Users className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedCompany.userCount || 0}
                      </div>
                      <div className="text-xs text-green-600 mt-1">+12% from last month</div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Active Projects</span>
                        <Activity className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">8</div>
                      <div className="text-xs text-blue-600 mt-1">2 this week</div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Support Tickets</span>
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">3</div>
                      <div className="text-xs text-orange-600 mt-1">1 urgent</div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Last Contact</span>
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">2d</div>
                      <div className="text-xs text-gray-600 mt-1">April 20, 2024</div>
                    </div>
                  </div>

                  {/* Quick Options Box */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
                      <h3 className="text-lg font-semibold text-white">Quick Options</h3>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button 
                          onClick={() => setActiveDetailTab("contacts")}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Users className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-900">View Contacts</span>
                          </div>
                          <p className="text-sm text-gray-600">Manage company contacts and relationships</p>
                        </button>
                        
                        <button 
                          onClick={() => setActiveDetailTab("activity")}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <Activity className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="font-medium text-gray-900">Activity Log</span>
                          </div>
                          <p className="text-sm text-gray-600">View recent activities and interactions</p>
                        </button>
                        
                        <button 
                          onClick={() => setActiveDetailTab("documents")}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Globe className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="font-medium text-gray-900">Documents</span>
                          </div>
                          <p className="text-sm text-gray-600">Access company documents and files</p>
                        </button>
                        
                        <button 
                          onClick={() => alert("Analytics functionality would show company performance metrics and charts")}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-orange-600" />
                            </div>
                            <span className="font-medium text-gray-900">Analytics</span>
                          </div>
                          <p className="text-sm text-gray-600">View company performance metrics</p>
                        </button>
                        
                        <button 
                          onClick={() => alert("Support Tickets functionality would open ticket management system")}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <AlertCircle className="w-4 h-4 text-red-600" />
                            </div>
                            <span className="font-medium text-gray-900">Support Tickets</span>
                          </div>
                          <p className="text-sm text-gray-600">Manage support requests and issues</p>
                        </button>
                        
                        <button 
                          onClick={() => alert("Settings functionality would open company configuration options")}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                              <Settings className="w-4 h-4 text-yellow-600" />
                            </div>
                            <span className="font-medium text-gray-900">Settings</span>
                          </div>
                          <p className="text-sm text-gray-600">Configure company preferences</p>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Company Information Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Basic Information</h3>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">Company Name</span>
                          <span className="text-sm font-medium text-gray-900">{selectedCompany.name}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">Company ID</span>
                          <span className="text-sm font-medium text-gray-900">{selectedCompany.companyId}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">Phone</span>
                          <span className="text-sm font-medium text-gray-900">{selectedCompany.phone}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">Territory</span>
                          <span className="text-sm font-medium text-gray-900">{selectedCompany.territory}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">Type</span>
                          <span className="text-sm font-medium text-gray-900">{selectedCompany.type}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-gray-600">Status</span>
                          <span className={cn(
                            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                            selectedCompany.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          )}>
                            {selectedCompany.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Location Information */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Location Information</h3>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">Site</span>
                          <span className="text-sm font-medium text-gray-900">{selectedCompany.site}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">City</span>
                          <span className="text-sm font-medium text-gray-900">{selectedCompany.city}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">Lead</span>
                          <span className="text-sm font-medium text-gray-900">{selectedCompany.lead}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-gray-600">Service POD</span>
                          <span className="text-sm font-medium text-gray-900">{selectedCompany.servicePOD || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* IST Information (only for IST clients) */}
                  {selectedCompany.isISTClient && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-green-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="font-semibold text-green-900">IST Information</h3>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-xs text-green-600 mb-1">IST Title</div>
                            <div className="text-sm font-medium text-gray-900">{selectedCompany.ISTTitle}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-xs text-green-600 mb-1">Date Acquired</div>
                            <div className="text-sm font-medium text-gray-900">{selectedCompany.dateAcquired}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-xs text-green-600 mb-1">Market</div>
                            <div className="text-sm font-medium text-gray-900">{selectedCompany.market}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-xs text-green-600 mb-1">Service Model</div>
                            <div className="text-sm font-medium text-gray-900">{selectedCompany.serviceModel}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-xs text-green-600 mb-1">IT Provider</div>
                            <div className="text-sm font-medium text-gray-900">{selectedCompany.itProvider}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-xs text-green-600 mb-1">Change Window</div>
                            <div className="text-sm font-medium text-gray-900">{selectedCompany.changeWindow}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Primary Contact */}
                  {selectedCompany.primaryContact && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Primary Contact</h3>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-medium text-gray-900">{selectedCompany.primaryContact.name}</h4>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {selectedCompany.primaryContact.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-3">
                              {selectedCompany.primaryContact.title} • {selectedCompany.primaryContact.department}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span>{selectedCompany.primaryContact.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <PhoneIcon className="w-4 h-4 text-gray-400" />
                                <span>{selectedCompany.primaryContact.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <CalendarIcon className="w-4 h-4 text-gray-400" />
                                <span>Last contact: {selectedCompany.primaryContact.lastContact}</span>
                              </div>
                            </div>
                            
                            {selectedCompany.primaryContact.notes && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">Notes:</span> {selectedCompany.primaryContact.notes}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2">
                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <PhoneIcon className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recent Activity */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Activity className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">System configuration updated</div>
                            <div className="text-xs text-gray-500">2 days ago by John Smith</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">Service renewal completed</div>
                            <div className="text-xs text-gray-500">5 days ago by Sarah Williams</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <UserPlus className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">New user added</div>
                            <div className="text-xs text-gray-500">1 week ago by Mike Chen</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDetailTab === "ist" && selectedCompany.isISTClient && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">IST Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">IST Title</div>
                        <div className="font-medium text-gray-900">{selectedCompany.ISTTitle}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">Date Acquired</div>
                        <div className="font-medium text-gray-900">{selectedCompany.dateAcquired}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">Market</div>
                        <div className="font-medium text-gray-900">{selectedCompany.market}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">Fiscal Year End</div>
                        <div className="font-medium text-gray-900">{selectedCompany.fiscalYearEnd}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">User Count</div>
                        <div className="font-medium text-gray-900">{selectedCompany.userCount}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">Service Model</div>
                        <div className="font-medium text-gray-900">{selectedCompany.serviceModel}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">IT Provider</div>
                        <div className="font-medium text-gray-900">{selectedCompany.itProvider}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">Change Window</div>
                        <div className="font-medium text-gray-900">{selectedCompany.changeWindow}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">Service POD</div>
                        <div className="font-medium text-gray-900">{selectedCompany.servicePOD}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">Company Persona</div>
                        <div className="font-medium text-gray-900">{selectedCompany.companyPersona}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">Account Exec Engagement</div>
                        <div className="font-medium text-gray-900">{selectedCompany.accountExecEngagement}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 mb-1">Direct IST Phone</div>
                        <div className="font-medium text-gray-900">{selectedCompany.directISTPhoneNumber}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDetailTab === "contacts" && (
                <div className="space-y-6">
                  {/* Primary Contact Section */}
                  {selectedCompany.primaryContact && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Primary Contact</h3>
                        <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          <Plus className="w-4 h-4" />
                          Add Contact
                        </button>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            {/* Contact Info */}
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="text-lg font-medium text-gray-900">{selectedCompany.primaryContact.name}</h4>
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {selectedCompany.primaryContact.status}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-3">
                                  {selectedCompany.primaryContact.title} • {selectedCompany.primaryContact.department}
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span>{selectedCompany.primaryContact.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <PhoneIcon className="w-4 h-4 text-gray-400" />
                                    <span>{selectedCompany.primaryContact.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                                    <span>Last contact: {selectedCompany.primaryContact.lastContact}</span>
                                  </div>
                                </div>
                                
                                {selectedCompany.primaryContact.notes && (
                                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-600">
                                      <span className="font-medium">Notes:</span> {selectedCompany.primaryContact.notes}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleSendMessage(selectedCompany.primaryContact)}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleMakeCall(selectedCompany.primaryContact)}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <PhoneIcon className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleSendEmail(selectedCompany.primaryContact)}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Mail className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleEditContact(selectedCompany.primaryContact)}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteContact(selectedCompany.primaryContact)}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Additional Contacts Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Contacts</h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="divide-y divide-gray-200">
                        {/* Sample additional contacts */}
                        <div className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Bob Davis</div>
                                <div className="text-sm text-gray-600">IT Administrator • Technology</div>
                                <div className="text-sm text-gray-500">bob.davis@company.com</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Inactive
                              </span>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Sarah Miller</div>
                                <div className="text-sm text-gray-600">Finance Manager • Finance</div>
                                <div className="text-sm text-gray-500">sarah.miller@company.com</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDetailTab === "activity" && (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
                  <p className="text-gray-500">Activity will appear here as interactions are recorded</p>
                </div>
              )}

              {activeDetailTab === "documents" && (
                <div className="text-center py-12">
                  <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
                  <p className="text-gray-500 mb-4">Upload documents to keep everything organized</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Upload First Document
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Company Modal */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Add New Company</h2>
                <button
                  onClick={handleAddCompanyCancel}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newCompany.name}
                      onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newCompany.companyId}
                      onChange={(e) => setNewCompany({...newCompany, companyId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter company ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={newCompany.phone}
                      onChange={(e) => setNewCompany({...newCompany, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Territory
                    </label>
                    <select
                      value={newCompany.territory}
                      onChange={(e) => setNewCompany({...newCompany, territory: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Territory</option>
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia">Asia</option>
                      <option value="South America">South America</option>
                      <option value="Africa">Africa</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Type
                    </label>
                    <select
                      value={newCompany.type}
                      onChange={(e) => setNewCompany({...newCompany, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Education">Education</option>
                      <option value="Government">Government</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={newCompany.status}
                      onChange={(e) => setNewCompany({...newCompany, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site
                    </label>
                    <input
                      type="text"
                      value={newCompany.site}
                      onChange={(e) => setNewCompany({...newCompany, site: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter site location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={newCompany.city}
                      onChange={(e) => setNewCompany({...newCompany, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lead
                    </label>
                    <input
                      type="text"
                      value={newCompany.lead}
                      onChange={(e) => setNewCompany({...newCompany, lead: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter lead name"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <input
                      type="checkbox"
                      id="isISTClient"
                      checked={newCompany.isISTClient}
                      onChange={(e) => setNewCompany({...newCompany, isISTClient: e.target.checked})}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isISTClient" className="text-sm font-medium text-gray-700">
                      IST Client
                    </label>
                  </div>

                  {/* Primary Contact Section */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Contact</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          value={newCompany.primaryContact.name}
                          onChange={(e) => setNewCompany({
                            ...newCompany, 
                            primaryContact: {...newCompany.primaryContact, name: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter contact name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={newCompany.primaryContact.email}
                          onChange={(e) => setNewCompany({
                            ...newCompany, 
                            primaryContact: {...newCompany.primaryContact, email: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter email address"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={newCompany.primaryContact.phone}
                          onChange={(e) => setNewCompany({
                            ...newCompany, 
                            primaryContact: {...newCompany.primaryContact, phone: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter contact phone"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={newCompany.primaryContact.title}
                          onChange={(e) => setNewCompany({
                            ...newCompany, 
                            primaryContact: {...newCompany.primaryContact, title: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter job title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Department
                        </label>
                        <input
                          type="text"
                          value={newCompany.primaryContact.department}
                          onChange={(e) => setNewCompany({
                            ...newCompany, 
                            primaryContact: {...newCompany.primaryContact, department: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter department"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleAddCompanyCancel}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCompanySubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Company
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
