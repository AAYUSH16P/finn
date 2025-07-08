import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import AttendanceMarkDialog from "@/components/AttendanceMarkDialog";

const Timeline = () => {
  const { resourceId } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);

  // Mock resource data - in real app this would come from API
  const resource = {
    id: parseInt(resourceId || "1"),
    name: "John Smith",
    project: "Project Alpha",
    role: "Senior Developer",
  };

  // Mock attendance data - in real app this would come from API
  const attendanceData = {
    "2025-06-01": { status: "na", comment: "New Year" },
    "2025-06-02": { status: "present", comment: "" },
    "2025-06-03": { status: "absent", comment: "Sick leave" },
    "2025-06-04": { status: "present", comment: "" },
    "2025-06-05": { status: "absent", comment: "Sick leave" },
    "2025-06-06": { status: "present", comment: "" },
    "2025-06-07": { status: "present", comment: "" },
    "2025-06-08": { status: "absent", comment: "Personal leave" },
    "2025-06-09": { status: "present", comment: "" },
    "2025-06-10": { status: "na", comment: "Holiday" },
    "2024-06-15": { status: "present", comment: "Full day" },
    "2024-06-16": { status: "absent", comment: "Sick leave" },
    "2024-06-17": { status: "present", comment: "" },
    "2024-06-18": { status: "na", comment: "Public holiday" },
    "2024-06-19": { status: "present", comment: "Half day" },
    "2024-06-22": { status: "present", comment: "" },
    "2024-06-23": { status: "absent", comment: "Personal leave" },
    "2024-06-24": { status: "present", comment: "" },
  };

  const getAttendanceForDate = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    return attendanceData[dateKey as keyof typeof attendanceData] || null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-finance-profit/10 text-finance-profit";
      case "absent":
        return "bg-finance-loss/10 text-finance-loss";
      case "na":
        return "bg-finance-warning/10 text-finance-warning";
      default:
        return "bg-muted/20 text-muted-foreground";
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
        <Link to="/resources">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Timeline - {resource.name}</h1>
          <p className="text-muted-foreground">{resource.project} • {resource.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Calendar - Takes up more space */}
        <Card className="xl:col-span-3 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Attendance Calendar</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-lg font-semibold min-w-[140px] text-center">
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
            <div className="grid grid-cols-7 gap-1 rounded-lg border overflow-hidden">
              {/* Header Row */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="bg-muted/50 p-3 text-center text-sm font-medium border-r border-b last:border-r-0">
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
                      relative h-24 p-2 border-r border-b last:border-r-0 cursor-pointer transition-colors
                      ${isCurrentMonth ? 'bg-background hover:bg-muted/30' : 'bg-muted/10 text-muted-foreground'}
                      ${isSelected ? 'ring-2 ring-primary' : ''}
                      ${isTodayDate ? 'bg-primary/5' : ''}
                    `}
                    onClick={() => handleDateClick(date)}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-sm font-medium ${isTodayDate ? 'text-primary' : ''}`}>
                          {format(date, "dd")}
                        </span>
                        {isTodayDate && (
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                      
                      {attendance && isCurrentMonth && (
                        <div className="flex-1 flex flex-col justify-center items-center">
                          <div className={`
                            px-2 py-1 rounded text-xs font-semibold
                            ${attendance.status === 'present' ? 'bg-finance-profit/20 text-finance-profit' : ''}
                            ${attendance.status === 'absent' ? 'bg-finance-loss/20 text-finance-loss' : ''}
                            ${attendance.status === 'na' ? 'bg-finance-warning/20 text-finance-warning' : ''}
                          `}>
                            {getStatusIndicator(attendance.status)}
                          </div>
                          {attendance.comment && (
                            <div className="mt-1 text-xs text-muted-foreground text-center truncate w-full">
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
            
            <div className="mt-8 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-finance-profit/20 flex items-center justify-center text-xs font-semibold text-finance-profit">P</div>
                <span className="font-medium">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-finance-loss/20 flex items-center justify-center text-xs font-semibold text-finance-loss">A</div>
                <span className="font-medium">Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-finance-warning/20 flex items-center justify-center text-xs font-semibold text-finance-warning">NA</div>
                <span className="font-medium">N/A</span>
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
                      <Badge className={getStatusColor(selectedDateAttendance.status)}>
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