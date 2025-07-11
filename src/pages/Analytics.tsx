import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockEarningsData = {
  delphi: [
    { period: "Jan", earnings: 45000 },
    { period: "Feb", earnings: 52000 },
    { period: "Mar", earnings: 48000 },
    { period: "Apr", earnings: 61000 },
    { period: "May", earnings: 55000 },
    { period: "Jun", earnings: 67000 },
  ],
  bau: [
    { period: "Jan", earnings: 38000 },
    { period: "Feb", earnings: 42000 },
    { period: "Mar", earnings: 39000 },
    { period: "Apr", earnings: 47000 },
    { period: "May", earnings: 44000 },
    { period: "Jun", earnings: 51000 },
  ],
  saiven: [
    { period: "Jan", earnings: 32000 },
    { period: "Feb", earnings: 28000 },
    { period: "Mar", earnings: 35000 },
    { period: "Apr", earnings: 41000 },
    { period: "May", earnings: 38000 },
    { period: "Jun", earnings: 44000 },
  ],
  "spectrum-profit": [
    { period: "Jan", earnings: 29000 },
    { period: "Feb", earnings: 33000 },
    { period: "Mar", earnings: 31000 },
    { period: "Apr", earnings: 37000 },
    { period: "May", earnings: 35000 },
    { period: "Jun", earnings: 42000 },
  ],
};

// Mock projects data
const mockProjects = [
  { id: "1", name: "Project Alpha", earnings: { delphi: 15000, bau: 12000, saiven: 8000, "spectrum-profit": 10000 } },
  { id: "2", name: "Project Beta", earnings: { delphi: 8500, bau: 7200, saiven: 5500, "spectrum-profit": 6800 } },
  { id: "3", name: "Project Gamma", earnings: { delphi: 12000, bau: 9800, saiven: 7200, "spectrum-profit": 8500 } },
  { id: "4", name: "ADVERA Project", earnings: { delphi: 18000, bau: 15500, saiven: 11000, "spectrum-profit": 13200 } },
  { id: "5", name: "Digital Transform", earnings: { delphi: 22000, bau: 18000, saiven: 14500, "spectrum-profit": 16800 } },
];

// Mock resources data
const mockResources = [
  { id: "1", name: "Ajay Kumar", earnings: { delphi: 8000, bau: 6500, saiven: 4800, "spectrum-profit": 5500 } },
  { id: "2", name: "Sarah Chen", earnings: { delphi: 7200, bau: 6000, saiven: 4200, "spectrum-profit": 5000 } },
  { id: "3", name: "Mike Johnson", earnings: { delphi: 6800, bau: 5500, saiven: 3800, "spectrum-profit": 4500 } },
  { id: "4", name: "Priya Sharma", earnings: { delphi: 9500, bau: 8000, saiven: 6200, "spectrum-profit": 7200 } },
  { id: "5", name: "David Wilson", earnings: { delphi: 8500, bau: 7000, saiven: 5500, "spectrum-profit": 6300 } },
];

const Analytics = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>("delphi");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedResource, setSelectedResource] = useState<string>("");
  const [timeRange, setTimeRange] = useState<string>("monthly");
  const [projectOpen, setProjectOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);

  const companies = [
    { value: "delphi", label: "Delphi" },
    { value: "bau", label: "BAU" },
    { value: "saiven", label: "Saiven" },
    { value: "spectrum-profit", label: "Spectrum Profit" },
  ];

  const getCurrentData = () => {
    let baseData = mockEarningsData[selectedCompany as keyof typeof mockEarningsData] || [];
    
    // If filtering by project or resource, modify the data
    if (filterType === "projects" && selectedProject) {
      const project = mockProjects.find(p => p.id === selectedProject);
      if (project) {
        const projectEarnings = project.earnings[selectedCompany as keyof typeof project.earnings] || 0;
        // Create time-based data for the selected project
        baseData = baseData.map(item => ({
          ...item,
          earnings: Math.round(projectEarnings * (0.8 + Math.random() * 0.4)) // Simulate variation
        }));
      }
    } else if (filterType === "resources" && selectedResource) {
      const resource = mockResources.find(r => r.id === selectedResource);
      if (resource) {
        const resourceEarnings = resource.earnings[selectedCompany as keyof typeof resource.earnings] || 0;
        // Create time-based data for the selected resource
        baseData = baseData.map(item => ({
          ...item,
          earnings: Math.round(resourceEarnings * (0.7 + Math.random() * 0.6)) // Simulate variation
        }));
      }
    }
    
    return baseData;
  };

  const getTotalEarnings = () => {
    return getCurrentData().reduce((total, item) => total + item.earnings, 0);
  };

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
    // Reset selections when filter type changes
    setSelectedProject("");
    setSelectedResource("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track company earnings and performance metrics</p>
          </div>
        </div>

        {/* Filter Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Select company and filter options to view specific analytics</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.value} value={company.value}>
                      {company.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Filter By</Label>
              <Select value={filterType} onValueChange={handleFilterTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="projects">Projects</SelectItem>
                  <SelectItem value="resources">Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project Selection - Only show when filtering by projects */}
            {filterType === "projects" && (
              <div className="space-y-2">
                <Label>Select Project</Label>
                <Popover open={projectOpen} onOpenChange={setProjectOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={projectOpen}
                      className="w-full justify-between"
                    >
                      {selectedProject
                        ? mockProjects.find((project) => project.id === selectedProject)?.name
                        : "Search projects..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search projects..." />
                      <CommandList>
                        <CommandEmpty>No project found.</CommandEmpty>
                        <CommandGroup>
                          {mockProjects.map((project) => (
                            <CommandItem
                              key={project.id}
                              value={project.name}
                              onSelect={() => {
                                setSelectedProject(project.id);
                                setProjectOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedProject === project.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {project.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Resource Selection - Only show when filtering by resources */}
            {filterType === "resources" && (
              <div className="space-y-2">
                <Label>Select Resource</Label>
                <Popover open={resourceOpen} onOpenChange={setResourceOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={resourceOpen}
                      className="w-full justify-between"
                    >
                      {selectedResource
                        ? mockResources.find((resource) => resource.id === selectedResource)?.name
                        : "Search resources..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search resources..." />
                      <CommandList>
                        <CommandEmpty>No resource found.</CommandEmpty>
                        <CommandGroup>
                          {mockResources.map((resource) => (
                            <CommandItem
                              key={resource.id}
                              value={resource.name}
                              onSelect={() => {
                                setSelectedResource(resource.id);
                                setResourceOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedResource === resource.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {resource.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <div className="space-y-2">
              <Label>Time Range</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${getTotalEarnings().toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last period</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(getTotalEarnings() / 6).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last period</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resources Allocated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+15 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="line" className="space-y-4">
          <TabsList>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          </TabsList>
          
          <TabsContent value="line">
            <Card>
              <CardHeader>
                <CardTitle>
                  {companies.find(c => c.value === selectedCompany)?.label} Earnings Trend
                  {filterType === "projects" && selectedProject && 
                    ` - ${mockProjects.find(p => p.id === selectedProject)?.name}`}
                  {filterType === "resources" && selectedResource && 
                    ` - ${mockResources.find(r => r.id === selectedResource)?.name}`}
                </CardTitle>
                <CardDescription>
                  {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} earnings over time
                  {filterType === "projects" && selectedProject && " for selected project"}
                  {filterType === "resources" && selectedResource && " for selected resource"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={getCurrentData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Earnings']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bar">
            <Card>
              <CardHeader>
                <CardTitle>
                  {companies.find(c => c.value === selectedCompany)?.label} Earnings Distribution
                  {filterType === "projects" && selectedProject && 
                    ` - ${mockProjects.find(p => p.id === selectedProject)?.name}`}
                  {filterType === "resources" && selectedResource && 
                    ` - ${mockResources.find(r => r.id === selectedResource)?.name}`}
                </CardTitle>
                <CardDescription>
                  {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} earnings breakdown
                  {filterType === "projects" && selectedProject && " for selected project"}
                  {filterType === "resources" && selectedResource && " for selected resource"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={getCurrentData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Earnings']}
                    />
                    <Bar 
                      dataKey="earnings" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;