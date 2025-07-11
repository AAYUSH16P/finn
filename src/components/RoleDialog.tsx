import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Role {
  id: string;
  roleName: string;
  roleSpecification: string;
  dayRate: string;
  bau: string;
  delphi: string;
  saiven: string;
  spectrumProfit: string;
  basicRate: string;
}

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddRole: (role: Role) => void;
  existingRole?: Role | null;
}

const RoleDialog = ({ open, onOpenChange, onAddRole, existingRole }: RoleDialogProps) => {
  const [roleData, setRoleData] = useState({
    roleName: "",
    roleSpecification: "",
    dayRate: "",
    bau: "",
    delphi: "",
    saiven: "",
    spectrumProfit: "",
    basicRate: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    if (existingRole) {
      setRoleData({
        roleName: existingRole.roleName,
        roleSpecification: existingRole.roleSpecification,
        dayRate: existingRole.dayRate,
        bau: existingRole.bau,
        delphi: existingRole.delphi,
        saiven: existingRole.saiven,
        spectrumProfit: existingRole.spectrumProfit,
        basicRate: existingRole.basicRate
      });
    } else {
      setRoleData({
        roleName: "",
        roleSpecification: "",
        dayRate: "",
        bau: "",
        delphi: "",
        saiven: "",
        spectrumProfit: "",
        basicRate: ""
      });
    }
  }, [existingRole, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roleData.roleName.trim()) {
      toast({
        title: "Error",
        description: "Role name is required.",
        variant: "destructive"
      });
      return;
    }

    const roleToSave: Role = {
      id: existingRole?.id || Date.now().toString(),
      ...roleData
    };

    onAddRole(roleToSave);
    
    toast({
      title: existingRole ? "Role Updated" : "Role Added",
      description: `${roleData.roleName} has been ${existingRole ? 'updated' : 'added'} successfully.`,
    });
    
    // Reset form and close dialog
    setRoleData({
      roleName: "",
      roleSpecification: "",
      dayRate: "",
      bau: "",
      delphi: "",
      saiven: "",
      spectrumProfit: "",
      basicRate: ""
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setRoleData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{existingRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
          <DialogDescription>
            {existingRole ? 'Update role specifications and rates.' : 'Define a new role with its specifications and rates.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roleName">Role Name *</Label>
            <Input
              id="roleName"
              value={roleData.roleName}
              onChange={(e) => handleInputChange("roleName", e.target.value)}
              placeholder="Enter role name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roleSpecification">Role Specification</Label>
            <Input
              id="roleSpecification"
              value={roleData.roleSpecification}
              onChange={(e) => handleInputChange("roleSpecification", e.target.value)}
              placeholder="Enter role specification"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dayRate">Day Rate ($)</Label>
              <Input
                id="dayRate"
                type="number"
                value={roleData.dayRate}
                onChange={(e) => handleInputChange("dayRate", e.target.value)}
                placeholder="0"
              />
            </div>
             <div className="space-y-2">
               <Label htmlFor="bau">BAU (%)</Label>
               <Input
                 id="bau"
                 type="number"
                 value={roleData.bau}
                 onChange={(e) => handleInputChange("bau", e.target.value)}
                 placeholder="0"
               />
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="space-y-2">
               <Label htmlFor="delphi">Delphi (%)</Label>
               <Input
                 id="delphi"
                 type="number"
                 value={roleData.delphi}
                 onChange={(e) => handleInputChange("delphi", e.target.value)}
                 placeholder="0"
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="saiven">Saiven (%)</Label>
              <Input
                id="saiven"
                type="number"
                value={roleData.saiven}
                onChange={(e) => handleInputChange("saiven", e.target.value)}
                placeholder="0"
              />
            </div>
             <div className="space-y-2">
               <Label htmlFor="spectrumProfit">Spectrum Profit (%)</Label>
              <Input
                id="spectrumProfit"
                type="number"
                value={roleData.spectrumProfit}
                onChange={(e) => handleInputChange("spectrumProfit", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="basicRate">Basic Rate ($)</Label>
            <Input
              id="basicRate"
              type="number"
              value={roleData.basicRate}
              onChange={(e) => handleInputChange("basicRate", e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {existingRole ? 'Update Role' : 'Add Role'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoleDialog;