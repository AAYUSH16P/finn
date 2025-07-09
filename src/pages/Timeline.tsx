import { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, isBefore, isAfter } from "date-fns";
import AttendanceMarkDialog from "@/components/AttendanceMarkDialog";

const Timeline = () => {
  const { resourceId } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);

  const location = useLocation();
  const backLink = location.state?.from;

  // Mock resource data - in real app this would come from API
  const resource = {
    id: parseInt(resourceId || "1"),
    name: "John Smith",
    project: "Project Alpha",
    projectId: 1, // Add project ID for navigation
    role: "Senior Developer",
  };

  // Generate random attendance for past/current dates
  const generateRandomAttendance = (date: Date) => {
    if (isAfter(date, new Date())) return null; // No status for future dates
    
    const statuses = ['present', 'absent', 'na'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const comments = {
      present: ['Full day', 'Half day', ''],
      absent: ['Sick leave', 'Personal leave', 'Vacation'],
      na: ['Public holiday', 'Holiday', 'Weekend']
    };
    
    const statusComments = comments[randomStatus as keyof typeof comments];
    const randomComment = statusComments[Math.floor(Math.random() * statusComments.length)];
    
    return {
      status: randomStatus,
      comment: randomComment
    };
  };

  const getAttendanceForDate = (date: Date) => {
    return generateRandomAttendance(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "text-green-600";
      case "absent":
        return "text-red-600";
      case "na":
        return "text-blue-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "present":
        return "P";
      case "absent":
        return "A";
      case "na":
        return "NA";
      default:
        return "";
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

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link to={backLink}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Timeline - {resource.name}</h1>
          <p className="text-muted-foreground">{resource.project} • {resource.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Calendar - Takes up most space */}
        <Card className="xl:col-span-4 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Attendance Calendar</CardTitle>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl font-semibold min-w-[160px] text-center">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
                <Button variant="outline" size="sm" onClick={handleNextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 rounded-lg border-2 border-border overflow-hidden p-4">
              {/* Header Row */}
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <div key={day} className="bg-muted/50 p-4 text-center text-sm font-semibold border-2 border-border rounded-lg">
                  {day}
                </div>
              ))}
              
              {/* Date Cells */}
              {dateRange.map((date) => {
                const attendance = getAttendanceForDate(date);
                const isCurrentMonth = isSameMonth(date, currentDate);
                const isSelected = selectedDate && format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                const isTodayDate = isToday(date);
                
                return (
                  <div
                    key={format(date, "yyyy-MM-dd")}
                    className={`
                      relative h-32 p-3 border-2 border-border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md
                      ${isCurrentMonth ? 'bg-background hover:bg-muted/30' : 'bg-muted/10 text-muted-foreground'}
                      ${isSelected ? 'ring-2 ring-primary shadow-lg' : ''}
                      ${isTodayDate ? 'ring-2 ring-primary/50 bg-primary/5' : ''}
                    `}
                    onClick={() => handleDateClick(date)}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-lg font-semibold ${isTodayDate ? 'text-primary' : ''}`}>
                          {format(date, "d")}
                        </span>
                        {isTodayDate && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                      
                      {attendance && isCurrentMonth && (
                        <div className="flex-1 flex flex-col justify-center items-center space-y-1">
                          <div className={`text-2xl font-bold ${getStatusColor(attendance.status)}`}>
                            {getStatusIndicator(attendance.status)}
                          </div>
                          {attendance.comment && (
                            <div className="text-xs text-muted-foreground text-center leading-tight">
                              {attendance.comment}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-background border-2 border-border flex items-center justify-center text-lg font-bold text-green-600">P</div>
                <span className="font-medium">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-background border-2 border-border flex items-center justify-center text-lg font-bold text-red-600">A</div>
                <span className="font-medium">Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-background border-2 border-border flex items-center justify-center text-sm font-bold text-blue-600">NA</div>
                <span className="font-medium">Not Available</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Details - Smaller sidebar */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a Date"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDate && (
              <>
                {selectedDateAttendance ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                      <Badge className={`${selectedDateAttendance.status === 'present' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : ''}
                        ${selectedDateAttendance.status === 'absent' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : ''}
                        ${selectedDateAttendance.status === 'na' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ''}`}>
                        {selectedDateAttendance.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    {selectedDateAttendance.comment && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Comment</p>
                        <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                          <MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground" />
                          <p className="text-sm">{selectedDateAttendance.comment}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No attendance record for this date</p>
                )}
                
                <Button 
                  onClick={() => setAttendanceDialogOpen(true)}
                  className="w-full mt-6"
                  size="lg"
                >
                  Mark Attendance
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <AttendanceMarkDialog
        open={attendanceDialogOpen}
        onOpenChange={setAttendanceDialogOpen}
        selectedDate={selectedDate}
        resourceName={resource.name}
      />
    </div>
  );
};

export default Timeline;