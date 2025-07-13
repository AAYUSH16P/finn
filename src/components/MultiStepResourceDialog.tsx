
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, ChevronRight, ChevronLeft, Upload, Settings } from "lucide-react";
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
  // New personal details
  bloodGroup?: string;
  location?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  age?: number;
}

interface WorkArrangementData {
  dayRate: string;
  tolerance: string;
  tada: string;
  nearDelivery: string;
  mcbCrm: string;
  dabDelphi: string;
  dabApex: string;
  dabBigData: string;
  ws: string;
  saiven: string;
  bau: string;
  spectrumProfit: string;
  basicRate: string;
}

interface MultiStepResourceDialogProps {
  isEdit?: boolean;
  existingData?: Resource;
  trigger?: React.ReactNode;
  onClose?: () => void;
}

const MultiStepResourceDialog = ({ isEdit = false, existingData, trigger, onClose }: MultiStepResourceDialogProps) => {
  const [open, setOpen] = useState(!!existingData);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    resourceName: existingData?.name || "",
    email: existingData?.email || "",
    resume: null as File | null,
    bloodGroup: existingData?.bloodGroup || "",
    location: existingData?.location || "",
    dateOfBirth: existingData?.dateOfBirth || "",
    phoneNumber: existingData?.phoneNumber || "",
    age: existingData?.age?.toString() || "",
    project: existingData?.project || "",
    role: existingData?.role || "",
    workArrangement: "",
    resourceType: existingData?.type || "",
    cirRate: "",
    acrRate: "",
    acrCommission: "",
    type: existingData?.type || "",
    dailyRate: existingData?.dailyRate?.toString() || "",
    workingDays: existingData?.workingDays?.toString() || "",
    startDate: existingData?.startDate || "",
    endDate: existingData?.endDate || "",
    skills: existingData?.skills || "",
    // Work arrangement specific values for editing
    arrangementDayRate: "",
    arrangementTolerance: "",
    arrangementTada: "",
    arrangementNearDelivery: "",
    arrangementMcbCrm: "",
    arrangementDabDelphi: "",
    arrangementDabApex: "",
    arrangementDabBigData: "",
    arrangementWs: "",
    arrangementSaiven: "",
    arrangementBau: "",
    arrangementSpectrumProfit: "",
    arrangementBasicRate: ""
  });

  const [showWorkArrangementDialog, setShowWorkArrangementDialog] = useState(false);
  const { toast } = useToast();

  // Mock data - in real app this would come from your state/API
  const projects = [
    { id: "1", name: "Project Alpha" },
    { id: "2", name: "Project Beta" },
    { id: "3", name: "Project Gamma" }
  ];
  
  const roles = [
    { 
      id: "1", 
      name: "Senior Developer", 
      wfmRemoteFlexibleUK: { dayRate: "800", bau: "720", saiven: "750", spectrumProfit: "100", basicRate: "650", tolerance: "50", tada: "30", nearDelivery: "40", mcbCrm: "20", dabDelphi: "15", dabApex: "25", dabBigData: "35", ws: "10" },
      wfmRemoteFlexibleLanded: { dayRate: "750", bau: "680", saiven: "700", spectrumProfit: "90", basicRate: "600", tolerance: "45", tada: "25", nearDelivery: "35", mcbCrm: "18", dabDelphi: "12", dabApex: "20", dabBigData: "30", ws: "8" },
      onSiteUK: { dayRate: "850", bau: "770", saiven: "800", spectrumProfit: "120", basicRate: "700", tolerance: "60", tada: "40", nearDelivery: "50", mcbCrm: "25", dabDelphi: "20", dabApex: "30", dabBigData: "40", ws: "15" },
      onSiteLanded: { dayRate: "800", bau: "720", saiven: "750", spectrumProfit: "110", basicRate: "650", tolerance: "55", tada: "35", nearDelivery: "45", mcbCrm: "22", dabDelphi: "18", dabApex: "28", dabBigData: "38", ws: "12" },
      remoteUK: { dayRate: "780", bau: "700", saiven: "730", spectrumProfit: "95", basicRate: "630", tolerance: "48", tada: "28", nearDelivery: "38", mcbCrm: "19", dabDelphi: "14", dabApex: "22", dabBigData: "32", ws: "9" },
      returnerRemoteUK: { dayRate: "720", bau: "650", saiven: "680", spectrumProfit: "85", basicRate: "580", tolerance: "42", tada: "22", nearDelivery: "32", mcbCrm: "16", dabDelphi: "11", dabApex: "18", dabBigData: "28", ws: "7" }
    },
    { 
      id: "2", 
      name: "Project Manager", 
      wfmRemoteFlexibleUK: { dayRate: "900", bau: "820", saiven: "850", spectrumProfit: "150", basicRate: "750", tolerance: "70", tada: "50", nearDelivery: "60", mcbCrm: "30", dabDelphi: "25", dabApex: "35", dabBigData: "45", ws: "20" },
      wfmRemoteFlexibleLanded: { dayRate: "850", bau: "780", saiven: "800", spectrumProfit: "140", basicRate: "700", tolerance: "65", tada: "45", nearDelivery: "55", mcbCrm: "28", dabDelphi: "22", dabApex: "32", dabBigData: "42", ws: "18" },
      onSiteUK: { dayRate: "950", bau: "870", saiven: "900", spectrumProfit: "170", basicRate: "800", tolerance: "80", tada: "60", nearDelivery: "70", mcbCrm: "35", dabDelphi: "30", dabApex: "40", dabBigData: "50", ws: "25" },
      onSiteLanded: { dayRate: "900", bau: "820", saiven: "850", spectrumProfit: "160", basicRate: "750", tolerance: "75", tada: "55", nearDelivery: "65", mcbCrm: "32", dabDelphi: "28", dabApex: "38", dabBigData: "48", ws: "22" },
      remoteUK: { dayRate: "880", bau: "800", saiven: "830", spectrumProfit: "145", basicRate: "730", tolerance: "68", tada: "48", nearDelivery: "58", mcbCrm: "29", dabDelphi: "24", dabApex: "34", dabBigData: "44", ws: "19" },
      returnerRemoteUK: { dayRate: "820", bau: "750", saiven: "780", spectrumProfit: "135", basicRate: "680", tolerance: "62", tada: "42", nearDelivery: "52", mcbCrm: "26", dabDelphi: "21", dabApex: "31", dabBigData: "41", ws: "16" }
    },
    { 
      id: "3", 
      name: "QA Engineer", 
      wfmRemoteFlexibleUK: { dayRate: "650", bau: "580", saiven: "600", spectrumProfit: "80", basicRate: "500", tolerance: "40", tada: "20", nearDelivery: "30", mcbCrm: "15", dabDelphi: "10", dabApex: "18", dabBigData: "25", ws: "8" },
      wfmRemoteFlexibleLanded: { dayRate: "600", bau: "530", saiven: "550", spectrumProfit: "70", basicRate: "450", tolerance: "35", tada: "18", nearDelivery: "25", mcbCrm: "12", dabDelphi: "8", dabApex: "15", dabBigData: "22", ws: "6" },
      onSiteUK: { dayRate: "700", bau: "630", saiven: "650", spectrumProfit: "90", basicRate: "550", tolerance: "50", tada: "30", nearDelivery: "40", mcbCrm: "20", dabDelphi: "15", dabApex: "25", dabBigData: "35", ws: "12" },
      onSiteLanded: { dayRate: "650", bau: "580", saiven: "600", spectrumProfit: "85", basicRate: "500", tolerance: "45", tada: "25", nearDelivery: "35", mcbCrm: "18", dabDelphi: "12", dabApex: "20", dabBigData: "30", ws: "10" },
      remoteUK: { dayRate: "630", bau: "560", saiven: "580", spectrumProfit: "75", basicRate: "480", tolerance: "38", tada: "22", nearDelivery: "28", mcbCrm: "14", dabDelphi: "9", dabApex: "16", dabBigData: "24", ws: "7" },
      returnerRemoteUK: { dayRate: "580", bau: "520", saiven: "540", spectrumProfit: "65", basicRate: "430", tolerance: "32", tada: "16", nearDelivery: "22", mcbCrm: "11", dabDelphi: "7", dabApex: "12", dabBigData: "18", ws: "5" }
    }
  ];

  const workArrangements = [
    { key: 'wfmRemoteFlexibleUK', name: '(WFM/Remote - Flexible) UK' },
    { key: 'wfmRemoteFlexibleLanded', name: '(WFM/Remote - Flexible) Landed' },
    { key: 'onSiteUK', name: '(On-Site) - UK' },
    { key: 'onSiteLanded', name: '(On-Site) - Landed' },
    { key: 'remoteUK', name: '(Remote) - UK' },
    { key: 'returnerRemoteUK', name: '(Returner remote) - UK' }
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const selectedRole = roles.find(role => role.name === formData.role);
  const selectedWorkArrangement = workArrangements.find(arr => arr.name === formData.workArrangement);
  const selectedWorkArrangementData = selectedRole && selectedWorkArrangement 
    ? selectedRole[selectedWorkArrangement.key as keyof typeof selectedRole] as WorkArrangementData
    : null;

  const getInheritedRate = () => {
    if (!selectedRole || !selectedWorkArrangement) return "";
    
    const arrangementData = selectedRole[selectedWorkArrangement.key as keyof typeof selectedRole] as WorkArrangementData;
    
    switch (formData.resourceType) {
      case "CIR":
        return arrangementData?.dayRate || "";
      case "ACR":
        return arrangementData?.saiven || "";
      case "Reference":
        return arrangementData?.bau || "";
      default:
        return arrangementData?.dayRate || "";
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
    const expectedRate = selectedWorkArrangementData?.dayRate ? parseInt(selectedWorkArrangementData.dayRate) : finalDailyRate;
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
    
    if (!isEdit) {
      setFormData({
        resourceName: "",
        email: "",
        resume: null,
        bloodGroup: "",
        location: "",
        dateOfBirth: "",
        phoneNumber: "",
        age: "",
        project: "",
        role: "",
        type: "",
        dailyRate: "",
        workingDays: "",
        startDate: "",
        endDate: "",
        skills: "",
        workArrangement: "",
        resourceType: "",
        cirRate: "",
        acrRate: "",
        acrCommission: "",
        arrangementDayRate: "",
        arrangementTolerance: "",
        arrangementTada: "",
        arrangementNearDelivery: "",
        arrangementMcbCrm: "",
        arrangementDabDelphi: "",
        arrangementDabApex: "",
        arrangementDabBigData: "",
        arrangementWs: "",
        arrangementSaiven: "",
        arrangementBau: "",
        arrangementSpectrumProfit: "",
        arrangementBasicRate: ""
      });
    }
    setStep(1);
    setOpen(false);
    onClose?.();
  };

  const handleInputChange = (field: string, value: string | File | null) => {
    console.log(`Updating field ${field} with value:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("resume", file);
  };

  const handleRoleOrArrangementChange = (field: string, value: string) => {
    console.log(`Handling ${field} change:`, value);
    handleInputChange(field, value);
    
    // Auto-populate rates when role or work arrangement changes
    if (field === "role" || field === "workArrangement" || field === "resourceType") {
      setTimeout(() => {
        const newRole = field === "role" ? roles.find(r => r.name === value) : selectedRole;
        const newArrangement = field === "workArrangement" ? workArrangements.find(a => a.name === value) : selectedWorkArrangement;
        
        if (newRole && newArrangement) {
          const arrangementData = newRole[newArrangement.key as keyof typeof newRole] as WorkArrangementData;
          if (arrangementData) {
            const newRate = field === "resourceType" ? getInheritedRateForType(value, arrangementData) : getInheritedRate();
            if (newRate) {
              handleInputChange("dailyRate", newRate);
            }
            
            // Pre-populate work arrangement specific values for editing
            setFormData(prev => ({
              ...prev,
              arrangementDayRate: arrangementData.dayRate || "",
              arrangementTolerance: arrangementData.tolerance || "",
              arrangementTada: arrangementData.tada || "",
              arrangementNearDelivery: arrangementData.nearDelivery || "",
              arrangementMcbCrm: arrangementData.mcbCrm || "",
              arrangementDabDelphi: arrangementData.dabDelphi || "",
              arrangementDabApex: arrangementData.dabApex || "",
              arrangementDabBigData: arrangementData.dabBigData || "",
              arrangementWs: arrangementData.ws || "",
              arrangementSaiven: arrangementData.saiven || "",
              arrangementBau: arrangementData.bau || "",
              arrangementSpectrumProfit: arrangementData.spectrumProfit || "",
              arrangementBasicRate: arrangementData.basicRate || ""
            }));
          }
        }
      }, 100);
    }
  };

  const getInheritedRateForType = (type: string, arrangementData: WorkArrangementData) => {
    switch (type) {
      case "CIR":
        return arrangementData.dayRate;
      case "ACR":
        return arrangementData.saiven;
      case "Reference":
        return arrangementData.bau;
      default:
        return arrangementData.dayRate;
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      onClose?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
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
          // ... keep existing code (Step 1 form fields exactly as they were)
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resourceName">Full Name *</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter location/address"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Age"
                  min="18"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleNext}
                disabled={!formData.resourceName || !formData.email || !formData.phoneNumber || !formData.location || !formData.dateOfBirth}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Assign to Project *</Label>
                <Select value={formData.project} onValueChange={(value) => handleInputChange("project", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project..." />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.name}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Role *</Label>
                <Select value={formData.role} onValueChange={(value) => handleRoleOrArrangementChange("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role..." />
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
              <Label>Work Arrangement *</Label>
              <div className="flex gap-2">
                <Select value={formData.workArrangement} onValueChange={(value) => handleRoleOrArrangementChange("workArrangement", value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select work arrangement..." />
                  </SelectTrigger>
                  <SelectContent>
                    {workArrangements.map((arrangement) => (
                      <SelectItem key={arrangement.key} value={arrangement.name}>
                        {arrangement.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowWorkArrangementDialog(true)}
                  disabled={!formData.workArrangement || !selectedWorkArrangementData}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  View/Edit
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Resource Type *</Label>
              <Select value={formData.resourceType} onValueChange={(value) => handleRoleOrArrangementChange("resourceType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACR">ACR</SelectItem>
                  <SelectItem value="CIR">CIR</SelectItem>
                  <SelectItem value="Reference">Reference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.resourceType === "CIR" && (
              <div className="space-y-2">
                <Label htmlFor="cirRate">CIR Rate ($) *</Label>
                <Input
                  id="cirRate"
                  type="number"
                  value={formData.cirRate}
                  onChange={(e) => handleInputChange("cirRate", e.target.value)}
                  placeholder="Enter CIR rate"
                  required
                />
              </div>
            )}

            {formData.resourceType === "ACR" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="acrCommission">ACR Commission ($) *</Label>
                  <Input
                    id="acrCommission"
                    type="number"
                    value={formData.acrCommission}
                    onChange={(e) => handleInputChange("acrCommission", e.target.value)}
                    placeholder="Enter CIR commission"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="acrRate">ACR Rate ($) *</Label>
                  <Input
                    id="acrRate"
                    type="number"
                    value={formData.acrRate}
                    onChange={(e) => handleInputChange("acrRate", e.target.value)}
                    placeholder="Enter CIR rate"
                    required
                  />
                </div>
              </div>
            )}

            {selectedRole && selectedWorkArrangement && selectedWorkArrangementData && (
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                Inherited from {formData.role} ({formData.workArrangement}): Day Rate ${getInheritedRate()} ({formData.resourceType} rate)
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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

            {/* Work Arrangement Details Dialog */}
            {showWorkArrangementDialog && selectedWorkArrangementData && (
              <Dialog open={showWorkArrangementDialog} onOpenChange={setShowWorkArrangementDialog}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Work Arrangement Details</DialogTitle>
                    <DialogDescription>
                      View and edit work arrangement details for {formData.workArrangement}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Day Rate ($)</Label>
                        <Input
                          type="number"
                          value={formData.arrangementDayRate}
                          onChange={(e) => handleInputChange("arrangementDayRate", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tolerance ($)</Label>
                        <Input
                          type="number"
                          value={formData.arrangementTolerance}
                          onChange={(e) => handleInputChange("arrangementTolerance", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>TA & DA ($)</Label>
                        <Input
                          type="number"
                          value={formData.arrangementTada}
                          onChange={(e) => handleInputChange("arrangementTada", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Near Delivery ($)</Label>
                        <Input
                          type="number"
                          value={formData.arrangementNearDelivery}
                          onChange={(e) => handleInputChange("arrangementNearDelivery", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>MCB/CRM ($)</Label>
                        <Input
                          type="number"
                          value={formData.arrangementMcbCrm}
                          onChange={(e) => handleInputChange("arrangementMcbCrm", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>WS ($)</Label>
                        <Input
                          type="number"
                          value={formData.arrangementWs}
                          onChange={(e) => handleInputChange("arrangementWs", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">DAB</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-4 border-l-2 border-muted">
                        <div className="space-y-2">
                          <Label className="text-sm">Delphi ($)</Label>
                          <Input
                            type="number"
                            value={formData.arrangementDabDelphi}
                            onChange={(e) => handleInputChange("arrangementDabDelphi", e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Apex ($)</Label>
                          <Input
                            type="number"
                            value={formData.arrangementDabApex}
                            onChange={(e) => handleInputChange("arrangementDabApex", e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Big Data ($)</Label>
                          <Input
                            type="number"
                            value={formData.arrangementDabBigData}
                            onChange={(e) => handleInputChange("arrangementDabBigData", e.target.value)}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Saiven ($)</Label>
                        <Input
                          type="number"
                          value={formData.arrangementSaiven}
                          onChange={(e) => handleInputChange("arrangementSaiven", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>BAU ($)</Label>
                        <Input
                          type="number"
                          value={formData.arrangementBau}
                          onChange={(e) => handleInputChange("arrangementBau", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Spectrum Profit ($)</Label>
                        <Input
                          type="number"
                          value={formData.arrangementSpectrumProfit}
                          onChange={(e) => handleInputChange("arrangementSpectrumProfit", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Basic Rate ($)</Label>
                        <Input
                          type="number"
                          value={formData.arrangementBasicRate}
                          onChange={(e) => handleInputChange("arrangementBasicRate", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowWorkArrangementDialog(false)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
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
