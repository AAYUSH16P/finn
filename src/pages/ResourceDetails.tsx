import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Calendar, DollarSign, TrendingUp, User, MapPin, Phone, Droplet, Heart, Cake } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ResourceDetails = () => {
  const { resourceId } = useParams();
  const [selectedProject, setSelectedProject] = useState("project-alpha");

  // Mock data - in real app this would come from API
  const resource = {
    id: resourceId,
    name: "John Smith",
    role: "Senior Developer",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bloodGroup: "O+",
    dateOfBirth: "1990-05-15",
    age: 33,
    profileImage: "/placeholder.svg"
  };

  const projects = [
    { id: "project-alpha", name: "Project Alpha", status: "active" },
    { id: "project-beta", name: "Project Beta", status: "completed" },
    { id: "project-gamma", name: "Project Gamma", status: "completed" }
  ];

  const currentProject = projects.find(p => p.id === selectedProject);
  const isCurrentProject = currentProject?.status === "active";

  // Mock project-specific data
  const projectData = {
    "project-alpha": {
      dailyRate: 650,
      totalDays: 120,
      workedDays: 95,
      totalEarnings: 61750,
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      attendance: 92,
      performance: 95
    },
    "project-beta": {
      dailyRate: 600,
      totalDays: 80,
      workedDays: 78,
      totalEarnings: 46800,
      startDate: "2023-08-01",
      endDate: "2023-12-15",
      attendance: 97,
      performance: 88
    },
    "project-gamma": {
      dailyRate: 620,
      totalDays: 60,
      workedDays: 58,
      totalEarnings: 35960,
      startDate: "2023-03-01",
      endDate: "2023-06-30",
      attendance: 95,
      performance: 91
    }
  };

  const currentData = projectData[selectedProject as keyof typeof projectData];

  // Generate mock calendar data
  const generateCalendarData = () => {
    const today = new Date();
    const data: { [key: string]: 'present' | 'absent' | 'not-applicable' } = {};
    
    // Generate past 90 days of data
    for (let i = 90; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      // Weekend or future dates are not applicable
      if (date.getDay() === 0 || date.getDay() === 6 || date > today) {
        data[dateKey] = 'not-applicable';
      } else {
        // Random attendance for past weekdays
        data[dateKey] = Math.random() > 0.1 ? 'present' : 'absent';
      }
    }
    
    return data;
  };

  const calendarData = generateCalendarData();

  const getDayClassName = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    const status = calendarData[dateKey];
    
    switch (status) {
      case 'present':
        return 'bg-green-500 text-white hover:bg-green-600';
      case 'absent':
        return 'bg-red-500 text-white hover:bg-red-600';
      case 'not-applicable':
        return 'bg-gray-200 text-gray-400';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/resources">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{resource.name}</h1>
          <p className="text-muted-foreground">{resource.role}</p>
        </div>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Phone:</span>
                <span className="text-sm">{resource.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Location:</span>
                <span className="text-sm">{resource.location}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Blood Group:</span>
                <span className="text-sm">{resource.bloodGroup}</span>
              </div>
              <div className="flex items-center gap-2">
                <Cake className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Age:</span>
                <span className="text-sm">{resource.age} years</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                View Resume
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Project Selection</CardTitle>
          <CardDescription>Select a project to view detailed information and analytics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  <div className="flex items-center gap-2">
                    {project.name}
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isCurrentProject && (
            <Alert>
              <Heart className="h-4 w-4" />
              <AlertDescription>
                You are currently viewing data for the active project: <strong>{currentProject?.name}</strong>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Project Details Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Project Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline & Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Rate Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Daily Rate:</span>
                    <span className="font-mono">${currentData.dailyRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Days:</span>
                    <span className="font-mono">{currentData.totalDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Worked Days:</span>
                    <span className="font-mono">{currentData.workedDays}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Start Date:</span>
                    <span className="text-sm">{currentData.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">End Date:</span>
                    <span className="text-sm">{currentData.endDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${currentData.totalEarnings.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  ${currentData.dailyRate} × {currentData.workedDays} days
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Attendance Calendar
                  </CardTitle>
                  <CardDescription>
                    Track daily attendance. Green = Present, Red = Absent, Gray = Weekend/Holiday
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    className="w-full"
                    modifiers={{
                      present: (date) => calendarData[date.toISOString().split('T')[0]] === 'present',
                      absent: (date) => calendarData[date.toISOString().split('T')[0]] === 'absent',
                      notApplicable: (date) => calendarData[date.toISOString().split('T')[0]] === 'not-applicable'
                    }}
                    modifiersClassNames={{
                      present: 'bg-green-500 text-white hover:bg-green-600',
                      absent: 'bg-red-500 text-white hover:bg-red-600',
                      notApplicable: 'bg-gray-200 text-gray-400'
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Present Days:</span>
                    <span className="font-mono text-green-600">{currentData.workedDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Absent Days:</span>
                    <span className="font-mono text-red-600">{currentData.totalDays - currentData.workedDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Attendance Rate:</span>
                    <span className="font-mono">{currentData.attendance}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">This Month Earnings:</span>
                    <span className="font-mono">${(currentData.dailyRate * 20).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg. Daily Earnings:</span>
                    <span className="font-mono">${currentData.dailyRate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourceDetails;