import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderOpen, Calendar, Users, ArrowUpDown, UserCheck, Edit } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NewProjectDialog from "@/components/NewProjectDialog";
import AttendanceDialog from "@/components/AttendanceDialog";

const Projects = () => {
  const [sortBy, setSortBy] = useState("name");
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      name: "Project Alpha",
      client: "TechCorp Inc.",
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      cirProfit: 170,
      acrProfit: 40,
      resources: 3,
    },
    {
      id: 2,
      name: "Project Beta",
      client: "FinanceFlow Ltd.",
      status: "Active",
      startDate: "2024-02-01",
      endDate: "2024-08-15",
      cirProfit: 95,
      acrProfit: -25,
      resources: 2,
    },
    {
      id: 3,
      name: "Project Gamma",
      client: "DataDriven Co.",
      status: "Completed",
      startDate: "2023-10-01",
      endDate: "2024-03-31",
      cirProfit: 230,
      acrProfit: 80,
      resources: 4,
    },
  ];

  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "client":
        return a.client.localeCompare(b.client);
      case "overallProfit":
        return (b.cirProfit + b.acrProfit) - (a.cirProfit + a.acrProfit);
      case "cirProfit":
        return b.cirProfit - a.cirProfit;
      case "status":
        return a.status.localeCompare(b.status);
      case "resources":
        return b.resources - a.resources;
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-finance-profit/10 text-finance-profit";
      case "Completed":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? "text-finance-profit" : "text-finance-loss";
  };

  const handleMarkAttendance = (projectId: number) => {
    setSelectedProjectId(projectId);
    setAttendanceDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">Manage your resource supply projects and track profitability</p>
        </div>
        <NewProjectDialog />
      </div>

      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{sortedProjects.length} projects</p>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="client">Client (A-Z)</SelectItem>
              <SelectItem value="overallProfit">Overall Profit (High-Low)</SelectItem>
              <SelectItem value="cirProfit">CIR Profit (High-Low)</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="resources">Resources (High-Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {sortedProjects.map((project) => (
          <Card key={project.id} className="bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5" />
                    {project.name}
                  </CardTitle>
                  <CardDescription>{project.client}</CardDescription>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Project Details */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Project Details</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-3 h-3" />
                      <span>{project.startDate} - {project.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-3 h-3" />
                      <span>{project.resources} resources</span>
                    </div>
                  </div>
                </div>

                {/* Profit Analysis */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Profit Analysis</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>CIR Profit:</span>
                      <span className={`font-mono ${getProfitColor(project.cirProfit)}`}>
                        ${project.cirProfit}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ACR Profit:</span>
                      <span className={`font-mono ${getProfitColor(project.acrProfit)}`}>
                        ${project.acrProfit}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium border-t pt-1">
                      <span>Overall Profit:</span>
                      <span className={`font-mono ${getProfitColor(project.cirProfit + project.acrProfit)}`}>
                        ${project.cirProfit + project.acrProfit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Actions</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleMarkAttendance(project.id)}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Mark Attendance
                    </Button>
                    <Link to={`/projects/${project.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <NewProjectDialog 
                      isEdit={true}
                      existingData={project}
                      trigger={
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Project
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <AttendanceDialog 
        open={attendanceDialogOpen}
        onOpenChange={setAttendanceDialogOpen}
        projectId={selectedProjectId || 0}
      />
    </div>
  );
};

export default Projects;