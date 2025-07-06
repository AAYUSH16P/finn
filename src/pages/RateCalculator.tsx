
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calculator, TrendingUp, TrendingDown, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const RateCalculator = () => {
  const [submittedRate, setSubmittedRate] = useState<number>(1000);
  const [staticCosts, setStaticCosts] = useState<number>(150);
  const [cirRate, setCirRate] = useState<number>(650);

  // Calculated values
  const [tolerance, setTolerance] = useState<number>(0);
  const [basicRate, setBasicRate] = useState<number>(0);
  const [acrRate, setAcrRate] = useState<number>(0);
  const [cirProfit, setCirProfit] = useState<number>(0);
  const [acrProfit, setAcrProfit] = useState<number>(0);

  // Calculate all values when inputs change
  useEffect(() => {
    const calculatedTolerance = ((submittedRate - staticCosts) / 1.25) * 0.05;
    const calculatedBasicRate = submittedRate - (staticCosts + calculatedTolerance);
    const calculatedAcrRate = cirRate * 1.2;
    const calculatedCirProfit = calculatedBasicRate - cirRate;
    const calculatedAcrProfit = calculatedBasicRate - calculatedAcrRate;

    setTolerance(calculatedTolerance);
    setBasicRate(calculatedBasicRate);
    setAcrRate(calculatedAcrRate);
    setCirProfit(calculatedCirProfit);
    setAcrProfit(calculatedAcrProfit);
  }, [submittedRate, staticCosts, cirRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getProfitColor = (profit: number) => {
    if (profit > 0) return "text-finance-profit";
    if (profit < 0) return "text-finance-loss";
    return "text-muted-foreground";
  };

  const getProfitBadgeVariant = (profit: number) => {
    if (profit > 0) return "default";
    if (profit < 0) return "destructive";
    return "secondary";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rate Calculator</h1>
        <p className="text-muted-foreground">Calculate profits using embedded financial formulas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Input Parameters
            </CardTitle>
            <CardDescription>Enter your rate and cost information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="submitted-rate" className="flex items-center gap-2">
                Submitted Day Rate
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The daily rate submitted to the client</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="submitted-rate"
                type="number"
                value={submittedRate}
                onChange={(e) => setSubmittedRate(Number(e.target.value))}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="static-costs" className="flex items-center gap-2">
                Static Costs
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Fixed costs including BAU, WestGate, Spectrum, etc.</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="static-costs"
                type="number"
                value={staticCosts}
                onChange={(e) => setStaticCosts(Number(e.target.value))}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cir-rate" className="flex items-center gap-2">
                CIR Rate
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Current Industry Rate for the resource</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="cir-rate"
                type="number"
                value={cirRate}
                onChange={(e) => setCirRate(Number(e.target.value))}
                className="text-right"
              />
            </div>
          </CardContent>
        </Card>

        {/* Calculation Results */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Calculated Values</CardTitle>
            <CardDescription>Live calculation results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tolerance (5%)</span>
                <span className="font-mono">{formatCurrency(tolerance)}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                (Submitted Rate - Static Costs) / 1.25 × 0.05
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Basic Rate</span>
                <span className="font-mono text-primary font-bold">{formatCurrency(basicRate)}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Submitted Rate - (Static Costs + Tolerance)
              </div>
            </div>

            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">ACR Rate</span>
                <span className="font-mono">{formatCurrency(acrRate)}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                CIR Rate + 20%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profit Analysis */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Profit Analysis</CardTitle>
            <CardDescription>CIR vs ACR profit comparison</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-card rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">CIR Profit</span>
                  <Badge 
                    variant={getProfitBadgeVariant(cirProfit)}
                    className={cirProfit > 0 ? "bg-finance-profit/10 text-finance-profit" : ""}
                  >
                    {cirProfit > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {formatCurrency(cirProfit)}
                  </Badge>
                </div>
                <Progress 
                  value={Math.abs(cirProfit) / basicRate * 100} 
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Basic Rate - CIR Rate
                </div>
              </div>

              <div className="p-4 bg-card rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">ACR Profit</span>
                  <Badge 
                    variant={getProfitBadgeVariant(acrProfit)}
                    className={acrProfit > 0 ? "bg-finance-profit/10 text-finance-profit" : ""}
                  >
                    {acrProfit > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {formatCurrency(acrProfit)}
                  </Badge>
                </div>
                <Progress 
                  value={Math.abs(acrProfit) / basicRate * 100} 
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Basic Rate - (CIR Rate + 20%)
                </div>
              </div>
            </div>

            {/* Profit Margin Indicator */}
            <div className="p-4 bg-muted/10 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Margin Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>CIR Margin:</span>
                  <span className={getProfitColor(cirProfit)}>
                    {((cirProfit / submittedRate) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>ACR Margin:</span>
                  <span className={getProfitColor(acrProfit)}>
                    {((acrProfit / submittedRate) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formula Reference */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Formula Reference</CardTitle>
          <CardDescription>Understanding the calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/20 rounded-lg">
              <h4 className="font-medium mb-2">Tolerance</h4>
              <code className="text-xs bg-background p-2 rounded block">
                (Submitted Rate - Static Costs) / 1.25 × 0.05
              </code>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg">
              <h4 className="font-medium mb-2">Basic Rate</h4>
              <code className="text-xs bg-background p-2 rounded block">
                Submitted Rate - (Static Costs + Tolerance)
              </code>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg">
              <h4 className="font-medium mb-2">CIR Profit</h4>
              <code className="text-xs bg-background p-2 rounded block">
                Basic Rate - CIR Rate
              </code>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg">
              <h4 className="font-medium mb-2">ACR Profit</h4>
              <code className="text-xs bg-background p-2 rounded block">
                Basic Rate - (CIR Rate + 20%)
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RateCalculator;
