
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Calendar, DollarSign, ArrowUpDown } from "lucide-react";
import { useState } from "react";

const ProjectDetails = () => {
  const { id } = useParams();
  const [sortBy, setSortBy] = useState("name");

  // Mock data - in real app this would come from API based on project ID
  const project = {
    id: parseInt(id || "1"),
    name: "Project Alpha",
    client: "TechCorp Inc.",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    submittedRate: 1000,
    basicRate: 820,
    cirProfit: 170,
    acrProfit: 40,
  };

  const projectResources = [
    {
      id: 1,
      name: "John Smith",
      type: "CIR",
      dailyRate: 650,
      workingDays: 120,
      earnings: 78000,
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      projectId: 1,
    },
    {
      id: 3,
      name: "Mike Chen",
      type: "Reference",
      dailyRate: 700,
      workingDays: 80,
      earnings: 56000,
      startDate: "2024-03-01",
      endDate: "2024-07-31",
      projectId: 1,
    },
  ].filter(resource => resource.projectId === project.id);

  const sortedResources = [...projectResources].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "earnings":
        return b.earnings - a.earnings;
      case "dailyRate":
        return b.dailyRate - a.dailyRate;
      case "workingDays":
        return b.workingDays - a.workingDays;
      default:
        return 0;
    }
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "CIR":
        return "bg-finance-profit/10 text-finance-profit";
      case "ACR":
        return "bg-primary/10 text-primary";
      case "Reference":
        return "bg-finance-warning/10 text-finance-warning";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? "text-finance-profit" : "text-finance-loss";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link to="/projects">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
          <p className="text-muted-foreground">{project.client} - Project Resources</p>
        </div>
      </div>

      {/* Project Summary */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Project Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{project.startDate} - {project.endDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Submitted Rate</p>
              <p className="font-mono font-medium">${project.submittedRate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CIR Profit</p>
              <p className={`font-mono font-medium ${getProfitColor(project.cirProfit)}`}>
                ${project.cirProfit}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ACR Profit</p>
              <p className={`font-mono font-medium ${getProfitColor(project.acrProfit)}`}>
                ${project.acrProfit}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Project Resources ({sortedResources.length})</h2>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="earnings">Earnings (High-Low)</SelectItem>
                <SelectItem value="dailyRate">Daily Rate (High-Low)</SelectItem>
                <SelectItem value="workingDays">Working Days (High-Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {sortedResources.length === 0 ? (
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No resources assigned to this project yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {sortedResources.map((resource) => (
              <Card key={resource.id} className="bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        {resource.name}
                      </CardTitle>
                      <CardDescription>Resource Assignment</CardDescription>
                    </div>
                    <Badge className={getTypeColor(resource.type)}>
                      {resource.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Assignment</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-3 h-3" />
                          <span>{resource.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-3 h-3" />
                          <span>{resource.endDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Rate Details</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Daily Rate:</span>
                          <span className="font-mono">${resource.dailyRate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Working Days:</span>
                          <span className="font-mono">{resource.workingDays}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Earnings</h4>
                      <div className="p-3 bg-finance-profit/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-finance-profit" />
                          <span className="text-lg font-bold text-finance-profit">
                            ${resource.earnings.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          ${resource.dailyRate} × {resource.workingDays} days
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Edit Assignment
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          View Timeline
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
