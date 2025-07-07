import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RoleDialog from "./RoleDialog";

interface Role {
  id: string;
  roleName: string;
  roleSpecification: string;
  dayRate: string;
  bau: string;
  saiven: string;
  spectrumProfit: string;
  basicRate: string;
}

interface NewProjectDialogProps {
  isEdit?: boolean;
  existingData?: any;
  trigger?: React.ReactNode;
}

const NewProjectDialog = ({ isEdit = false, existingData, trigger }: NewProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>(existingData?.roles || []);
  const [formData, setFormData] = useState({
    projectName: existingData?.projectName || "",
    teamName: existingData?.teamName || "",
    clientName: existingData?.clientName || "",
    description: existingData?.description || "",
    startDate: existingData?.startDate || "",
    endDate: existingData?.endDate || "",
    status: existingData?.status || "Active"
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save the project data
    console.log("Project data:", { ...formData, roles });
    
    toast({
      title: isEdit ? "Project Updated" : "Project Created",
      description: `${formData.projectName} has been successfully ${isEdit ? "updated" : "created"}.`,
    });
    
    // Reset form and close dialog only if not editing
    if (!isEdit) {
      setFormData({
        projectName: "",
        teamName: "",
        clientName: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Active"
      });
      setRoles([]);
    }
    setOpen(false);
  };

  const handleAddRole = (role: Role) => {
    setRoles(prev => [...prev, role]);
  };

  const handleRemoveRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {trigger ? (
          <DialogTrigger asChild>
            {trigger}
          </DialogTrigger>
        ) : (
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
        )}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Project" : "Create New Project"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update project details below." : "Add a new project to your portfolio. Fill in the details below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleInputChange("projectName", e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name *</Label>
              <Input
                id="teamName"
                value={formData.teamName}
                onChange={(e) => handleInputChange("teamName", e.target.value)}
                placeholder="Enter team name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name *</Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => handleInputChange("clientName", e.target.value)}
              placeholder="Enter client name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the project scope and objectives"
              rows={3}
            />
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
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Roles Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Project Roles</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setRoleDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            </div>
            
            {isEdit && (
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                Note: You can only add new roles here. To edit existing roles, go to the project view details page.
              </div>
            )}
            
            {roles.length > 0 && (
              <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{role.roleName}</Badge>
                      {role.roleSpecification && (
                        <span className="text-sm text-muted-foreground">
                          - {role.roleSpecification}
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveRole(role.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Project Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    
    <RoleDialog 
      open={roleDialogOpen}
      onOpenChange={setRoleDialogOpen}
      onAddRole={handleAddRole}
    />
    </>
  );
};

export default NewProjectDialog;