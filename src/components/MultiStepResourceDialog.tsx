import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, ChevronRight, ChevronLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: number;
  name: string;
  email: string;
  project: string;
  role: string;
  type: string;
  dailyRate: number;
  workingDays: number;
  startDate: string;
  endDate: string;
  skills: string;
  resume?: File;
  earnings: number;
  profit: number;
}

interface MultiStepResourceDialogProps {
  isEdit?: boolean;
  existingData?: Resource;
  trigger?: React.ReactNode;
}

const MultiStepResourceDialog = ({ isEdit = false, existingData, trigger }: MultiStepResourceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    resourceName: existingData?.name || "",
    email: existingData?.email || "",
    resume: null as File | null,
    project: existingData?.project || "",
    role: existingData?.role || "",
    type: existingData?.type || "",
    dailyRate: existingData?.dailyRate?.toString() || "",
    workingDays: existingData?.workingDays?.toString() || "",
    startDate: existingData?.startDate || "",
    endDate: existingData?.endDate || "",
    skills: existingData?.skills || ""
  });
  const { toast } = useToast();

  // Mock data - in real app this would come from your state/API
  const projects = ["Project Alpha", "Project Beta", "Project Gamma"];
  const roles = [
    { id: "1", name: "Senior Developer", dayRate: 800, bau: 720, saiven: 750 },
    { id: "2", name: "Project Manager", dayRate: 900, bau: 820, saiven: 850 },
    { id: "3", name: "QA Engineer", dayRate: 650, bau: 580, saiven: 600 }
  ];

  const selectedRole = roles.find(role => role.name === formData.role);

  const getInheritedRate = () => {
    if (!selectedRole) return "";
    
    switch (formData.type) {
      case "CIR":
        return selectedRole.dayRate.toString();
      case "ACR":
        return selectedRole.saiven.toString();
      case "Reference":
        return selectedRole.bau.toString();
      default:
        return selectedRole.dayRate.toString();
    }
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const inheritedRate = getInheritedRate();
    const finalDailyRate = parseInt(formData.dailyRate || inheritedRate);
    const workingDays = parseInt(formData.workingDays);
    const earnings = finalDailyRate * workingDays;
    const expectedRate = selectedRole?.dayRate || finalDailyRate;
    const profit = (expectedRate * workingDays) - earnings;

    console.log("Resource data:", {
      ...formData,
      dailyRate: finalDailyRate,
      earnings,
      profit
    });
    
    toast({
      title: isEdit ? "Resource Updated" : "Resource Added",
      description: `${formData.resourceName} has been successfully ${isEdit ? "updated" : "added"}.`,
    });
    
    // Reset form and close dialog
    if (!isEdit) {
      setFormData({
        resourceName: "",
        email: "",
        resume: null,
        project: "",
        role: "",
        type: "",
        dailyRate: "",
        workingDays: "",
        startDate: "",
        endDate: "",
        skills: ""
      });
    }
    setStep(1);
    setOpen(false);
  };

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("resume", file);
  };

  // Update daily rate when role or type changes
  const handleRoleOrTypeChange = (field: string, value: string) => {
    handleInputChange(field, value);
    if (field === "role" || field === "type") {
      // Auto-populate rate based on role and type selection
      setTimeout(() => {
        const newRate = getInheritedRate();
        if (newRate) {
          handleInputChange("dailyRate", newRate);
        }
      }, 100);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Resource" : "Add New Resource"} - Step {step} of 2
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Enter personal details and upload resume"
              : "Assign to project and configure role details"
            }
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          // Step 1: Personal Details
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resourceName">Resource Name *</Label>
                <Input
                  id="resourceName"
                  value={formData.resourceName}
                  onChange={(e) => handleInputChange("resourceName", e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF format)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('resume')?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {formData.resume ? formData.resume.name : "Upload Resume (PDF)"}
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleNext}
                disabled={!formData.resourceName || !formData.email}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          // Step 2: Project Assignment
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project">Assign to Project *</Label>
                <Select value={formData.project} onValueChange={(value) => handleInputChange("project", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project} value={project}>
                        {project}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select value={formData.role} onValueChange={(value) => handleRoleOrTypeChange("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Resource Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleRoleOrTypeChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CIR">CIR</SelectItem>
                  <SelectItem value="ACR">ACR</SelectItem>
                  <SelectItem value="Reference">Reference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRole && (
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                Inherited from {formData.role}: Day Rate ${getInheritedRate()} ({formData.type} rate)
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dailyRate">Daily Rate ($) *</Label>
                <Input
                  id="dailyRate"
                  type="number"
                  value={formData.dailyRate}
                  onChange={(e) => handleInputChange("dailyRate", e.target.value)}
                  placeholder="Inherited from role"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workingDays">Expected Working Days</Label>
                <Input
                  id="workingDays"
                  type="number"
                  value={formData.workingDays}
                  onChange={(e) => handleInputChange("workingDays", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills & Expertise</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                placeholder="e.g., React, Node.js, Project Management"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {isEdit ? "Update Resource" : "Add Resource"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepResourceDialog;