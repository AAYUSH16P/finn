import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

interface Resource {
  id: number;
  name: string;
}

interface AttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: number;
}

const AttendanceDialog = ({ open, onOpenChange, projectId }: AttendanceDialogProps) => {
  const resources: Resource[] = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Mike Wilson" },
    { id: 4, name: "Emily Davis" },
  ];

  const [attendanceStatus, setAttendanceStatus] = useState<Record<number, boolean>>(
    resources.reduce((acc, resource) => ({ ...acc, [resource.id]: true }), {})
  );
  
  // Single day selection
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeIn, setTimeIn] = useState("09:00");
  const [timeOut, setTimeOut] = useState("17:00");
  
  // Date range selection
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  
  const [comment, setComment] = useState("");
  const [attendanceMode, setAttendanceMode] = useState("single");
  
  const { toast } = useToast();

  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  });

  const handleAttendanceChange = (resourceId: number, isPresent: boolean) => {
    setAttendanceStatus(prev => ({ ...prev, [resourceId]: isPresent }));
  };

  const handleSubmit = () => {
    const presentCount = Object.values(attendanceStatus).filter(Boolean).length;
    const totalCount = resources.length;
    
    let dateText = "";
    if (attendanceMode === "single" && selectedDate) {
      dateText = format(selectedDate, "MMMM d, yyyy");
    } else if (attendanceMode === "range" && dateRange?.from) {
      dateText = dateRange.to 
        ? `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d, yyyy")}`
        : format(dateRange.from, "MMMM d, yyyy");
    }
    
    toast({
      title: "Attendance Marked",
      description: `Attendance marked for ${presentCount}/${totalCount} resources on ${dateText}.`,
    });
    
    onOpenChange(false);
    setComment("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
          <DialogDescription>
            Select date(s), time, and mark attendance for project resources.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Date Selection Mode */}
          <Tabs value={attendanceMode} onValueChange={setAttendanceMode}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Single Day</TabsTrigger>
              <TabsTrigger value="range">Date Range</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single" className="space-y-4">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </TabsContent>
            
            <TabsContent value="range" className="space-y-4">
              <div className="space-y-2">
                <Label>Select Date Range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </TabsContent>
          </Tabs>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time In
              </Label>
              <Select value={timeIn} onValueChange={setTimeIn}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time Out
              </Label>
              <Select value={timeOut} onValueChange={setTimeOut}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resource Selection */}
          <div className="space-y-3">
            <Label>Select Resources</Label>
            <div className="space-y-3 max-h-32 overflow-y-auto">
              {resources.map((resource) => (
                <div key={resource.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`resource-${resource.id}`}
                    checked={attendanceStatus[resource.id]}
                    onCheckedChange={(checked) => 
                      handleAttendanceChange(resource.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`resource-${resource.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {resource.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comment">Comments (Optional)</Label>
            <Textarea
              id="comment"
              placeholder="Add any additional notes..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Mark Attendance
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceDialog;