import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

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

interface Role {
  id: string;
  roleName: string;
  roleSpecification: string;
  wfmRemoteFlexibleUK: WorkArrangementData;
  wfmRemoteFlexibleLanded: WorkArrangementData;
  onSiteUK: WorkArrangementData;
  onSiteLanded: WorkArrangementData;
  remoteUK: WorkArrangementData;
  returnerRemoteUK: WorkArrangementData;
}

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddRole: (role: Role) => void;
  existingRole?: Role | null;
}

const workArrangements = [
  { key: 'wfmRemoteFlexibleUK', label: '(WFM/Remote - Flexible) UK' },
  { key: 'wfmRemoteFlexibleLanded', label: '(WFM/Remote - Flexible) Landed' },
  { key: 'onSiteUK', label: '(On-Site) - UK' },
  { key: 'onSiteLanded', label: '(On-Site) - Landed' },
  { key: 'remoteUK', label: '(Remote) - UK' },
  { key: 'returnerRemoteUK', label: '(Returner remote) - UK' }
];

const emptyWorkArrangement: WorkArrangementData = {
  dayRate: "",
  tolerance: "",
  tada: "",
  nearDelivery: "",
  mcbCrm: "",
  dabDelphi: "",
  dabApex: "",
  dabBigData: "",
  ws: "",
  saiven: "",
  bau: "",
  spectrumProfit: "",
  basicRate: ""
};

const RoleDialog = ({ open, onOpenChange, onAddRole, existingRole }: RoleDialogProps) => {
  const [roleData, setRoleData] = useState({
    roleName: "",
    roleSpecification: "",
    wfmRemoteFlexibleUK: { ...emptyWorkArrangement },
    wfmRemoteFlexibleLanded: { ...emptyWorkArrangement },
    onSiteUK: { ...emptyWorkArrangement },
    onSiteLanded: { ...emptyWorkArrangement },
    remoteUK: { ...emptyWorkArrangement },
    returnerRemoteUK: { ...emptyWorkArrangement }
  });
  const [selectedArrangements, setSelectedArrangements] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (existingRole) {
      // Always ensure all arrangements exist:
      setRoleData({
        roleName: existingRole.roleName || "",
        roleSpecification: existingRole.roleSpecification || "",
        wfmRemoteFlexibleUK: existingRole.wfmRemoteFlexibleUK || { ...emptyWorkArrangement },
        wfmRemoteFlexibleLanded: existingRole.wfmRemoteFlexibleLanded || { ...emptyWorkArrangement },
        onSiteUK: existingRole.onSiteUK || { ...emptyWorkArrangement },
        onSiteLanded: existingRole.onSiteLanded || { ...emptyWorkArrangement },
        remoteUK: existingRole.remoteUK || { ...emptyWorkArrangement },
        returnerRemoteUK: existingRole.returnerRemoteUK || { ...emptyWorkArrangement }
      });

      const selected = workArrangements.filter(arr => {
        const val = existingRole[arr.key as keyof Role];
        return val && Object.values(val as WorkArrangementData).some(v => v !== "");
      }).map(arr => arr.key);

      setSelectedArrangements(selected);
    } else {
      // New blank
      setRoleData({
        roleName: "",
        roleSpecification: "",
        wfmRemoteFlexibleUK: { ...emptyWorkArrangement },
        wfmRemoteFlexibleLanded: { ...emptyWorkArrangement },
        onSiteUK: { ...emptyWorkArrangement },
        onSiteLanded: { ...emptyWorkArrangement },
        remoteUK: { ...emptyWorkArrangement },
        returnerRemoteUK: { ...emptyWorkArrangement }
      });
      setSelectedArrangements([]);
    }
  }, [existingRole, open]);


  const calculateBasicRate = (arrangement: WorkArrangementData) => {
    const dayRate = parseFloat(arrangement.dayRate) || 0;
    const deductions = [
      parseFloat(arrangement.tolerance) || 0,
      parseFloat(arrangement.tada) || 0,
      parseFloat(arrangement.nearDelivery) || 0,
      parseFloat(arrangement.mcbCrm) || 0,
      parseFloat(arrangement.dabDelphi) || 0,
      parseFloat(arrangement.dabApex) || 0,
      parseFloat(arrangement.dabBigData) || 0,
      parseFloat(arrangement.ws) || 0,
      parseFloat(arrangement.saiven) || 0,
      parseFloat(arrangement.bau) || 0,
      parseFloat(arrangement.spectrumProfit) || 0
    ];
    
    const totalDeductions = deductions.reduce((sum, val) => sum + val, 0);
    return Math.max(0, dayRate - totalDeductions).toString();
  };

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

    if (selectedArrangements.length === 0) {
      toast({
        title: "Error",
        description: "At least one work arrangement must be selected.",
        variant: "destructive"
      });
      return;
    }

    // Calculate basic rates for all arrangements
    const updatedRoleData = { ...roleData };
    selectedArrangements.forEach(arrangement => {
      const key = arrangement as keyof typeof roleData;
      if (typeof updatedRoleData[key] === 'object') {
        const arrangementData = updatedRoleData[key] as WorkArrangementData;
        arrangementData.basicRate = calculateBasicRate(arrangementData);
      }
    });

    const roleToSave: Role = {
      id: existingRole?.id || Date.now().toString(),
      ...updatedRoleData
    };

    onAddRole(roleToSave);
    
    toast({
      title: existingRole ? "Role Updated" : "Role Added",
      description: `${roleData.roleName} has been ${existingRole ? 'updated' : 'added'} successfully.`,
    });
    
    onOpenChange(false);
  };

  const handleBasicChange = (field: string, value: string) => {
    setRoleData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrangementChange = (arrangement: string, field: string, value: string) => {
    setRoleData(prev => ({
      ...prev,
      [arrangement]: {
        ...prev[arrangement as keyof typeof prev] as WorkArrangementData,
        [field]: value
      }
    }));
  };

  const handleArrangementSelect = (value: string) => {
    if (!selectedArrangements.includes(value)) {
      setSelectedArrangements(prev => [...prev, value]);
    }
  };

  const removeArrangement = (arrangement: string) => {
    setSelectedArrangements(prev => prev.filter(arr => arr !== arrangement));
    setRoleData(prev => ({
      ...prev,
      [arrangement]: { ...emptyWorkArrangement }
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{existingRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
          <DialogDescription>
            Define role details and work arrangement rates.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Role Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name *</Label>
              <Input
                id="roleName"
                value={roleData.roleName}
                onChange={(e) => handleBasicChange("roleName", e.target.value)}
                placeholder="Enter role name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roleSpecification">Role Specification</Label>
              <Input
                id="roleSpecification"
                value={roleData.roleSpecification}
                onChange={(e) => handleBasicChange("roleSpecification", e.target.value)}
                placeholder="Enter role specification"
              />
            </div>
          </div>

          {/* Work Arrangements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Work Arrangements *</Label>
              <Select value={undefined} key={selectedArrangements.join("-")} onValueChange={handleArrangementSelect}>
                <SelectTrigger className="w-64">
                  Add work arrangement
                </SelectTrigger>
                <SelectContent>
                  {workArrangements
                    .filter(arr => !selectedArrangements.includes(arr.key))
                    .map(arrangement => (
                      <SelectItem
                        key={arrangement.key}
                        value={arrangement.key}
                        className="[&_[data-state=checked]>svg]:hidden"
                      >
                        {arrangement.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {selectedArrangements.map(arrangement => {
              const arrangementConfig = workArrangements.find(arr => arr.key === arrangement);
              const arrangementData = roleData[arrangement as keyof typeof roleData] as WorkArrangementData;
              
              return (
                <Card key={arrangement}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{arrangementConfig?.label}</CardTitle>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrangement(arrangement)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Day Rate ($)</Label>
                        <Input
                          type="number"
                          value={arrangementData.dayRate}
                          onChange={(e) => handleArrangementChange(arrangement, "dayRate", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tolerance ($)</Label>
                        <Input
                          type="number"
                          value={arrangementData.tolerance}
                          onChange={(e) => handleArrangementChange(arrangement, "tolerance", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>TA & DA ($)</Label>
                        <Input
                          type="number"
                          value={arrangementData.tada}
                          onChange={(e) => handleArrangementChange(arrangement, "tada", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Near Delivery ($)</Label>
                        <Input
                          type="number"
                          value={arrangementData.nearDelivery}
                          onChange={(e) => handleArrangementChange(arrangement, "nearDelivery", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>MCB/CRM ($)</Label>
                        <Input
                          type="number"
                          value={arrangementData.mcbCrm}
                          onChange={(e) => handleArrangementChange(arrangement, "mcbCrm", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>WS ($)</Label>
                        <Input
                          type="number"
                          value={arrangementData.ws}
                          onChange={(e) => handleArrangementChange(arrangement, "ws", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* DAB Sub-fields */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">DAB</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-4 border-l-2 border-muted">
                        <div className="space-y-2">
                          <Label className="text-sm">Delphi ($)</Label>
                          <Input
                            type="number"
                            value={arrangementData.dabDelphi}
                            onChange={(e) => handleArrangementChange(arrangement, "dabDelphi", e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Apex ($)</Label>
                          <Input
                            type="number"
                            value={arrangementData.dabApex}
                            onChange={(e) => handleArrangementChange(arrangement, "dabApex", e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Big Data ($)</Label>
                          <Input
                            type="number"
                            value={arrangementData.dabBigData}
                            onChange={(e) => handleArrangementChange(arrangement, "dabBigData", e.target.value)}
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
                          value={arrangementData.saiven}
                          onChange={(e) => handleArrangementChange(arrangement, "saiven", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>BAU ($)</Label>
                        <Input
                          type="number"
                          value={arrangementData.bau}
                          onChange={(e) => handleArrangementChange(arrangement, "bau", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Spectrum Profit ($)</Label>
                        <Input
                          type="number"
                          value={arrangementData.spectrumProfit}
                          onChange={(e) => handleArrangementChange(arrangement, "spectrumProfit", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Basic Rate ($)</Label>
                        <Input
                          type="number"
                          value={calculateBasicRate(arrangementData)}
                          readOnly
                          className="bg-muted"
                          placeholder="Auto-calculated"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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