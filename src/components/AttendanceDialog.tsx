import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

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
  
  const { toast } = useToast();

  const handleAttendanceChange = (resourceId: number, isPresent: boolean) => {
    setAttendanceStatus(prev => ({ ...prev, [resourceId]: isPresent }));
  };

  const handleSubmit = () => {
    const presentCount = Object.values(attendanceStatus).filter(Boolean).length;
    const totalCount = resources.length;
    
    toast({
      title: "Attendance Marked",
      description: `Attendance marked for ${presentCount}/${totalCount} resources.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
          <DialogDescription>
            Check/uncheck resources who are working today.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            {resources.map((resource) => (
              <div key={resource.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`resource-${resource.id}`}
                  checked={attendanceStatus[resource.id]}
                  onCheckedChange={(checked) => 
                    handleAttendanceChange(resource.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={`resource-${resource.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {resource.name}
                </label>
              </div>
            ))}
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