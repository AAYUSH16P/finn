import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Download, Calendar, DollarSign, TrendingUp, User,
  MapPin, Phone, Droplet, Heart, Cake, MessageSquare,
  ChevronLeft, ChevronRight, Info
} from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  isSameMonth, isToday, addMonths, subMonths,
  parseISO
} from "date-fns";

const ResourceDetails = () => {
  const { resourceId } = useParams();
  const [selectedProject, setSelectedProject] = useState("project-alpha");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);

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

  const projectData = {
    "project-alpha": {
      dailyRate: 650,
      totalDays: 120,
      workedDays: 95,
      totalEarnings: 61750,
      startDate: "2025-01-15",
      endDate: "2025-07-30",
      attendance: 92,
      performance: 95
    },
    "project-beta": {
      dailyRate: 600,
      totalDays: 80,
      workedDays: 78,
      totalEarnings: 46800,
      startDate: "2024-08-01",
      endDate: "2024-12-15",
      attendance: 97,
      performance: 88
    },
    "project-gamma": {
      dailyRate: 620,
      totalDays: 60,
      workedDays: 58,
      totalEarnings: 35960,
      startDate: "2024-03-01",
      endDate: "2024-06-30",
      attendance: 95,
      performance: 91
    }
  };

  const currentData = projectData[selectedProject as keyof typeof projectData];
  const projectStartDate = parseISO(currentData.startDate);
  const projectEndDate = parseISO(currentData.endDate);
  const today = new Date();

  useEffect(() => {
    const newStartDate = parseISO(currentData.startDate);
    setCurrentDate(newStartDate);
  }, [selectedProject]);

  const [calendarData, setCalendarData] = useState<{ [key: string]: 'present' | 'absent' | 'not-applicable' }>({});
  useEffect(() => {
    const generateCalendarData = () => {
      const data: { [key: string]: 'present' | 'absent' | 'not-applicable' } = {};
      const start = new Date(parseISO(currentData.startDate));
      const end = new Date(parseISO(currentData.endDate));

      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dateKey = date.toISOString().split('T')[0];

        if (date > today) {
          data[dateKey] = 'not-applicable';
        } else if (date.getDay() === 0 || date.getDay() === 6) {
          data[dateKey] = 'not-applicable';
        } else {
          const rand = Math.random();
          if (rand > 0.15) {
            data[dateKey] = 'present';
          } else if (rand > 0.05) {
            data[dateKey] = 'absent';
          } else {
            data[dateKey] = 'not-applicable';
          }
        }
      }

      return data;
    };

    const generatedData = generateCalendarData();
    setCalendarData(generatedData);
  }, [selectedProject]);

  const getAttendanceForDate = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    if (date > today) return { status: 'not-applicable', comment: '' }; // ✅ Show NA for future dates
    return calendarData[dateKey] ? { status: calendarData[dateKey], comment: '' } : null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "text-green-600";
      case "absent": return "text-red-600";
      case "not-applicable": return "text-blue-600";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "present": return "P";
      case "absent": return "A";
      case "not-applicable": return "NA";
      default: return "";
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), monthStart.getDate() - monthStart.getDay());
  const endDate = new Date(monthEnd.getFullYear(), monthEnd.getMonth(), monthEnd.getDate() + (6 - monthEnd.getDay()));

  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  const selectedDateAttendance = selectedDate ? getAttendanceForDate(selectedDate) : null;

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const realProjectEndDate = isCurrentProject ? (today < projectEndDate ? today : projectEndDate) : projectEndDate;

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    if (startOfMonth(newDate) <= projectEndDate) {
      setCurrentDate(newDate);
    }
  };

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    if (endOfMonth(newDate) >= projectStartDate) {
      setCurrentDate(newDate);
    }
  };

  const isDateInProjectPeriod = (date: Date) => {
    return date >= projectStartDate && date <= projectEndDate;
  };
  return (
    <div className="space-y-6 animate-fade-in">
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

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Project Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline & Attendance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Project Period: <strong>{format(projectStartDate, "MMM dd, yyyy")}</strong> to <strong>{format(projectEndDate, "MMM dd, yyyy")}</strong>
              <br />
              Calendar automatically shows the project start month. Use navigation arrows to view other months within the project timeline.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Attendance Calendar
                      </CardTitle>
                      <CardDescription>
                        Track daily attendance. Green = Present, Red = Absent, Gray = Weekend/Holiday
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevMonth}
                        disabled={endOfMonth(subMonths(currentDate, 1)) < projectStartDate}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <div className="min-w-[140px] text-center">
                        <span className="text-lg font-semibold">
                          {format(currentDate, "MMMM yyyy")}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNextMonth}
                        disabled={startOfMonth(addMonths(currentDate, 1)) > projectEndDate}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-card rounded-lg border overflow-hidden">
                    <div className="grid grid-cols-7 border-b">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="bg-muted p-4 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7">
                      {dateRange.map((date, index) => {
                        const attendance = getAttendanceForDate(date);
                        const isCurrentMonth = isSameMonth(date, currentDate);
                        const isSelected = selectedDate && format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                        const isTodayDate = isToday(date);
                        const isInProjectPeriod = isDateInProjectPeriod(date);
                        
                        return (
                          <div
                            key={format(date, "yyyy-MM-dd")}
                            className={`
                              relative h-20 border-r border-b border-border last:border-r-0 cursor-pointer transition-colors
                              ${isCurrentMonth ? 'bg-card hover:bg-accent' : 'bg-muted/50 text-muted-foreground'}
                              ${isSelected ? 'ring-2 ring-primary bg-accent' : ''}
                              ${isTodayDate ? 'ring-1 ring-blue-400' : ''}
                              ${!isInProjectPeriod && isCurrentMonth ? 'opacity-50' : ''}
                            `}
                            onClick={() => handleDateClick(date)}
                          >
                            <div className="p-3 h-full flex flex-col">
                              <div className="flex justify-between items-start mb-2">
                                <span className={`text-sm font-medium ${isTodayDate ? 'text-blue-500' : isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {format(date, "d")}
                                </span>
                                {isTodayDate && (
                                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                )}
                              </div>
                              
                              {attendance && isCurrentMonth && isInProjectPeriod && (
                                <div className="flex-1 flex flex-col justify-center items-center">
                                  <div className={`text-base font-bold ${getStatusColor(attendance.status)}`}>
                                    {getStatusIndicator(attendance.status)}
                                  </div>
                                  {attendance.comment && (
                                    <div className="text-xs text-muted-foreground text-center mt-1 truncate w-full">
                                      {attendance.comment}
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {!isInProjectPeriod && isCurrentMonth && (
                                <div className="flex-1 flex items-center justify-center">
                                  <div className="text-xs text-muted-foreground">N/A</div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-green-600 border border-border bg-card">P</div>
                      <span className="text-muted-foreground">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-red-600 border border-border bg-card">A</div>
                      <span className="text-muted-foreground">Absent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-blue-600 border border-border bg-card">NA</div>
                      <span className="text-muted-foreground">Not Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a Date"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedDate && (
                    <>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                          {selectedDateAttendance && isDateInProjectPeriod(selectedDate) ? (
                            <Badge className={`${selectedDateAttendance.status === 'present' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                              ${selectedDateAttendance.status === 'absent' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                              ${selectedDateAttendance.status === 'not-applicable' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}`}>
                              {selectedDateAttendance.status.toUpperCase()}
                            </Badge>
                          ) : !isDateInProjectPeriod(selectedDate) ? (
                            <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                              OUTSIDE PROJECT PERIOD
                            </Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">No record</span>
                          )}
                        </div>
                        
                        {selectedDateAttendance?.comment && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Comment</p>
                            <div className="flex items-start gap-2 p-3 bg-muted rounded-lg border">
                              <MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground" />
                              <p className="text-sm">{selectedDateAttendance.comment}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {isCurrentProject && selectedDate && isDateInProjectPeriod(selectedDate) ? (
                        <Button 
                          onClick={() => setAttendanceDialogOpen(true)}
                          className="w-full"
                          size="lg"
                        >
                          Mark Attendance
                        </Button>
                      ) : (
                        <div className="w-full p-3 bg-muted rounded-lg border text-center">
                          <p className="text-sm text-muted-foreground">
                            {!isCurrentProject 
                              ? "Attendance marking is only available for active projects"
                              : "Date is outside the project period"
                            }
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

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

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{currentData.attendance}%</div>
                <p className="text-sm text-muted-foreground">Days present</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${currentData.totalEarnings.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Project earnings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round((currentData.workedDays / currentData.totalDays) * 100)}%</div>
                <p className="text-sm text-muted-foreground">Days worked vs planned</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourceDetails;