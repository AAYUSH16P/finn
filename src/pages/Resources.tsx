
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, User, Calendar, DollarSign, ArrowUpDown } from "lucide-react";
import { useState } from "react";

const Resources = () => {
  const [sortBy, setSortBy] = useState("name");

  const resources = [
    {
      id: 1,
      name: "John Smith",
      project: "Project Alpha",
      type: "CIR",
      dailyRate: 650,
      workingDays: 120,
      earnings: 78000,
      startDate: "2024-01-15",
      endDate: "2024-06-30",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      project: "Project Beta", 
      type: "ACR",
      dailyRate: 780,
      workingDays: 95,
      earnings: 74100,
      startDate: "2024-02-01",
      endDate: "2024-08-15",
    },
    {
      id: 3,
      name: "Mike Chen",
      project: "Project Alpha",
      type: "Reference",
      dailyRate: 700,
      workingDays: 80,
      earnings: 56000,
      startDate: "2024-03-01",
      endDate: "2024-07-31",
    },
    {
      id: 4,
      name: "Emily Davis",
      project: "Project Gamma",
      type: "CIR",
      dailyRate: 720,
      workingDays: 110,
      earnings: 79200,
      startDate: "2024-01-20",
      endDate: "2024-07-15",
    },
    {
      id: 5,
      name: "Robert Wilson",
      project: "Project Beta",
      type: "ACR",
      dailyRate: 800,
      workingDays: 90,
      earnings: 72000,
      startDate: "2024-02-15",
      endDate: "2024-08-30",
    },
  ];

  const sortedResources = [...resources].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "project":
        return a.project.localeCompare(b.project);
      case "type":
        return a.type.localeCompare(b.type);
      case "dailyRate":
        return b.dailyRate - a.dailyRate;
      case "earnings":
        return b.earnings - a.earnings;
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resources</h1>
          <p className="text-muted-foreground">Manage resource assignments and track earnings</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{sortedResources.length} resources</p>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="project">Project (A-Z)</SelectItem>
              <SelectItem value="type">Type (A-Z)</SelectItem>
              <SelectItem value="dailyRate">Daily Rate (High-Low)</SelectItem>
              <SelectItem value="earnings">Earnings (High-Low)</SelectItem>
              <SelectItem value="workingDays">Working Days (High-Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {sortedResources.map((resource) => (
          <Card key={resource.id} className="bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {resource.name}
                  </CardTitle>
                  <CardDescription>{resource.project}</CardDescription>
                </div>
                <Badge className={getTypeColor(resource.type)}>
                  {resource.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Assignment Details */}
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

                {/* Rate Information */}
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

                {/* Earnings */}
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

                {/* Actions */}
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
    </div>
  );
};

export default Resources;
