import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Users, FolderOpen, Calculator, ProjectorIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  // Mock data for charts
  const profitData = [
    { month: "Jan", cir: 45000, acr: 52000, basic: 38000 },
    { month: "Feb", cir: 52000, acr: 61000, basic: 44000 },
    { month: "Mar", cir: 48000, acr: 56000, basic: 41000 },
    { month: "Apr", cir: 61000, acr: 71000, basic: 53000 },
    { month: "May", cir: 55000, acr: 64000, basic: 47000 },
    { month: "Jun", cir: 67000, acr: 78000, basic: 58000 },
  ];

  const projectData = [
    { name: "Project Alpha", profit: 15000, margin: 22 },
    { name: "Project Beta", profit: 8500, margin: 18 },
    { name: "Project Gamma", profit: 12000, margin: 25 },
    { name: "Project Delta", profit: -2000, margin: -5 },
  ];

  const companyEarningsData = [
    { company: "Delphi", earnings: 52000, percentage: 28 },
    { company: "BAU", earnings: 44000, percentage: 24 },
    { company: "Saiven", earnings: 38000, percentage: 21 },
    { company: "Spectrum", earnings: 48000, percentage: 27 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Real-time financial overview and project metrics</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-finance-profit/20 profit-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-finance-profit" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-profit">$234,500</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="bg-finance-profit/10 text-finance-profit">
                +12.5%
              </Badge>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Project</CardTitle>
            <ProjectorIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ADVERA</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                +8.2%
              </Badge>
              <span>of total proft</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">300</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Ajay
              </Badge>
              <span>Higest paid resource</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-finance-loss/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="text-finance-loss">2 underperforming</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Earnings Overview */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Company Earnings Overview</CardTitle>
            <CardDescription>Earnings trend by company over time</CardDescription>
          </div>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[150px] mt-4 md:mt-0">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Last 7 days</SelectItem>
              <SelectItem value="monthly">Last Month</SelectItem>
              <SelectItem value="quarterly">Last Quarter</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { time: "Jan", Delphi: 12000, BAU: 10000, Saiven: 8000, Spectrum: 11000 },
              { time: "Feb", Delphi: 14000, BAU: 12000, Saiven: 9000, Spectrum: 12000 },
              { time: "Mar", Delphi: 13000, BAU: 11000, Saiven: 9500, Spectrum: 12500 },
              { time: "Apr", Delphi: 16000, BAU: 10500, Saiven: 8500, Spectrum: 13000 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }} 
              />
              <Bar dataKey="Delphi" fill="#3b82f6" />
              <Bar dataKey="BAU" fill="#10b981" />
              <Bar dataKey="Saiven" fill="#f59e0b" />
              <Bar dataKey="Spectrum" fill="#ef4444" />

              <Line type="monotone" dataKey="Delphi" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="BAU" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="Saiven" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="Spectrum" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit Trend Chart */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Profit Trends</CardTitle>
            <CardDescription>CIR vs ACR vs Basic Rate profits over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="cir" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2 }}
                  name="CIR Profit"
                />
                <Line 
                  type="monotone" 
                  dataKey="acr" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                  name="ACR Profit"
                />
                <Line 
                  type="monotone" 
                  dataKey="basic" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b", strokeWidth: 2 }}
                  name="Basic Rate"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Performance */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Project Performance</CardTitle>
            <CardDescription>Profit and margin by project</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }} 
                />
                <Bar 
                  dataKey="profit"
                  radius={[4, 4, 0, 0]}
                >
                  {projectData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.profit >= 0 ? "#16a34a" : "#dc2626"} // green for positive, red for negative
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-finance-profit rounded-full"></div>
              <div className="text-sm">
                <p className="font-medium">Project Alpha completed</p>
                <p className="text-muted-foreground text-xs">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="text-sm">
                <p className="font-medium">New project added</p>
                <p className="text-muted-foreground text-xs">4 weeks ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-finance-loss rounded-full"></div>
              <div className="text-sm">
                <p className="font-medium">3 new resources added</p>
                <p className="text-muted-foreground text-xs">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-finance-loss/20">
          <CardHeader>
            <CardTitle className="text-sm text-finance-loss">Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-finance-loss/10 border border-finance-loss/20 rounded-lg">
              <p className="text-sm font-medium text-finance-loss">Project Delta</p>
              <p className="text-xs text-muted-foreground">Basic rate below CIR threshold</p>
            </div>
            <div className="p-3 bg-finance-warning/10 border border-finance-warning/20 rounded-lg">
              <p className="text-sm font-medium text-finance-warning">Resource Utilization</p>
              <p className="text-xs text-muted-foreground">3 resources underutilized</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
