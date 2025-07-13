import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Role {
  id: string;
  roleName: string;
  roleSpecification: string;
  workArrangement: string;
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

interface RoleViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
  onEdit: (role: Role) => void;
}

const workArrangementOptions = [
  "(WFM/Remote - Flexible) UK",
  "(WFM/Remote - Flexible) Landed",
  "(On-Site) - UK",
  "(On-Site) - Landed",
  "(Remote) - UK",
  "(Returner remote) - UK",
];

const workArrangementDataMap: Record<string, WorkArrangementData> = {
  "(WFM/Remote - Flexible) UK": {
    dayRate: "500",
    tolerance: "10%",
    tada: "50",
    nearDelivery: "30",
    mcbCrm: "20",
    dabDelphi: "15",
    dabApex: "12",
    dabBigData: "18",
    ws: "8",
    saiven: "5",
    bau: "7",
    spectrumProfit: "12",
    basicRate: "400",
  },
  "(WFM/Remote - Flexible) Landed": {
    dayRate: "600",
    tolerance: "10%",
    tada: "50",
    nearDelivery: "30",
    mcbCrm: "20",
    dabDelphi: "15",
    dabApex: "12",
    dabBigData: "18",
    ws: "8",
    saiven: "5",
    bau: "7",
    spectrumProfit: "12",
    basicRate: "400",
  },
  "(On-Site) - UK": {
    dayRate: "700",
    tolerance: "10%",
    tada: "50",
    nearDelivery: "30",
    mcbCrm: "20",
    dabDelphi: "15",
    dabApex: "12",
    dabBigData: "18",
    ws: "8",
    saiven: "5",
    bau: "7",
    spectrumProfit: "12",
    basicRate: "400",
  },
  "(On-Site) - Landed": {
    dayRate: "900",
    tolerance: "10%",
    tada: "50",
    nearDelivery: "30",
    mcbCrm: "20",
    dabDelphi: "15",
    dabApex: "12",
    dabBigData: "18",
    ws: "8",
    saiven: "5",
    bau: "7",
    spectrumProfit: "12",
    basicRate: "400",
  },
  "(Remote) - UK": {
    dayRate: "800",
    tolerance: "10%",
    tada: "50",
    nearDelivery: "30",
    mcbCrm: "20",
    dabDelphi: "15",
    dabApex: "12",
    dabBigData: "18",
    ws: "8",
    saiven: "5",
    bau: "7",
    spectrumProfit: "12",
    basicRate: "400",
  },
  "(Returner remote) - UK": {
    dayRate: "750",
    tolerance: "10%",
    tada: "50",
    nearDelivery: "30",
    mcbCrm: "20",
    dabDelphi: "15",
    dabApex: "12",
    dabBigData: "18",
    ws: "8",
    saiven: "5",
    bau: "7",
    spectrumProfit: "12",
    basicRate: "400",
  },
};

const RoleViewDialog = ({
  open,
  onOpenChange,
  role,
  onEdit,
}: RoleViewDialogProps) => {
  const [selectedArrangement, setSelectedArrangement] = useState<string>(
    role?.workArrangement || ""
  );
  const arrangementData = selectedArrangement
    ? workArrangementDataMap[selectedArrangement]
    : null;

  if (!role) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl max-h-[80vh] flex flex-col p-6">
        <DialogHeader>
          <DialogTitle>Role Details</DialogTitle>
          <DialogDescription>
            View role specifications and rates for {role.roleName}.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <div className="space-y-2">
            <Label>Role Name</Label>
            <div className="p-2 bg-muted rounded-md">{role.roleName}</div>
          </div>

          <div className="space-y-2">
            <Label>Role Specification</Label>
            <div className="p-2 bg-muted rounded-md">
              {role.roleSpecification || "Not specified"}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-6">
            <Label>Work Arrangement</Label>
            <div className="w-2/3">
              <Select
                value={selectedArrangement}
                onValueChange={setSelectedArrangement}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select arrangement" />
                </SelectTrigger>
                <SelectContent>
                  {workArrangementOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {arrangementData && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(arrangementData).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label>{formatLabel(key)}</Label>
                    <div className="p-2 bg-muted rounded-md">
                      {formatValue(key, value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            onClick={() =>
              onEdit({ ...role, workArrangement: selectedArrangement })
            }
          >
            Edit Role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper to format labels nicely
function formatLabel(key: string) {
  const map: Record<string, string> = {
    dayRate: "Day Rate",
    tolerance: "Tolerance",
    tada: "TADA",
    nearDelivery: "Near Delivery",
    mcbCrm: "MCB CRM",
    dabDelphi: "Delphi",
    dabApex: "Apex",
    dabBigData: "Big Data",
    ws: "WS",
    saiven: "Saiven",
    bau: "BAU",
    spectrumProfit: "Spectrum Profit",
    basicRate: "Basic Rate",
  };
  return map[key] || key;
}

// Add $ or % where needed
function formatValue(key: string, value: string) {
  if (key === "dayRate" || key === "basicRate") return `$${value}`;
  if (
    key === "tolerance" ||
    key === "bau" ||
    key === "spectrumProfit" ||
    key.includes("dab") ||
    key === "saiven"
  )
    return `${value}%`;
  return value;
}

export default RoleViewDialog;
