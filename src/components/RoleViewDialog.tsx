import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

interface RoleViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
  onEdit: (role: Role) => void;
}

const RoleViewDialog = ({ open, onOpenChange, role, onEdit }: RoleViewDialogProps) => {
  if (!role) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Role Details</DialogTitle>
          <DialogDescription>
            View role specifications and rates for {role.roleName}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Role Name</Label>
            <div className="p-2 bg-muted rounded-md">{role.roleName}</div>
          </div>

          <div className="space-y-2">
            <Label>Role Specification</Label>
            <div className="p-2 bg-muted rounded-md">{role.roleSpecification || "Not specified"}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Day Rate</Label>
              <div className="p-2 bg-muted rounded-md">${role.dayRate}</div>
            </div>
            <div className="space-y-2">
              <Label>BAU</Label>
              <div className="p-2 bg-muted rounded-md">${role.bau}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Saiven</Label>
              <div className="p-2 bg-muted rounded-md">${role.saiven}</div>
            </div>
            <div className="space-y-2">
              <Label>Spectrum Profit</Label>
              <div className="p-2 bg-muted rounded-md">${role.spectrumProfit}</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Basic Rate</Label>
            <div className="p-2 bg-muted rounded-md">${role.basicRate}</div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={() => onEdit(role)}>
              Edit Role
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleViewDialog;