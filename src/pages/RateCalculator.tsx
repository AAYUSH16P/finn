import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const RateCalculator = () => {
  const [submittedDayRate, setSubmittedDayRate] = useState<number>(3264);
  const [mcirCrm, setMcirCrm] = useState<number>(1000);
  const [nearDelivery, setNearDelivery] = useState<number>(1000);
  const [seven, setSeven] = useState<number>(150);
  const [dab, setDab] = useState<number>(150);
  const [spectrum, setSpectrum] = useState<number>(650);
  const [wb, setWb] = useState<number>(650);
  const [bau, setBau] = useState<number>(650);

  // Calculated values
  const [tolerance, setTolerance] = useState<number>(0);
  const [basicRate, setBasicRate] = useState<number>(0);
  const [acrRate, setAcrRate] = useState<number>(0);
  const [cirRate, setCirRate] = useState<number>(0);

  // Calculate all values when inputs change
  useEffect(() => {
    const calculatedTolerance = ((submittedDayRate - 150) / 1.25) * 0.05;
    const calculatedBasicRate = submittedDayRate - (150 + calculatedTolerance);
    const calculatedAcrRate = spectrum * 1.2;
    const calculatedCirRate = spectrum * 1.2;

    setTolerance(calculatedTolerance);
    setBasicRate(calculatedBasicRate);
    setAcrRate(calculatedAcrRate);
    setCirRate(calculatedCirRate);
  }, [submittedDayRate, spectrum]);

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  // Chart data for the donut chart
  const chartData = [
    { name: 'MCIR/CRM', value: 30, color: '#0ea5e9' },
    { name: 'Near Delivery', value: 15, color: '#06b6d4' },
    { name: 'DAB', value: 10, color: '#3b82f6' },
    { name: 'Seven', value: 5, color: '#8b5cf6' },
    { name: 'Spectrum', value: 15, color: '#1e40af' },
    { name: 'WB', value: 15, color: '#0f172a' },
    { name: 'BAU', value: 10, color: '#64748b' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-left space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            Rate Calculator
          </h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">Calculate profits using embedded financial formulas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Parameters - Left Column */}
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-800 dark:bg-blue-600 rounded flex items-center justify-center">
                  <Calculator className="w-3 h-3 text-white" />
                </div>
                Input Parameters
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-slate-400">
                Enter your rate and cost information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="submitted-day-rate" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  Submitted Day Rate
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-slate-400">Rs</span>
                  <Input
                    id="submitted-day-rate"
                    type="number"
                    value={submittedDayRate}
                    onChange={(e) => setSubmittedDayRate(Number(e.target.value))}
                    className="pl-8 text-right font-mono bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-1">
                    MCIR/CRM
                    <Info className="w-3 h-3 text-gray-400 dark:text-slate-500" />
                  </Label>
                  <Input
                    type="number"
                    value={mcirCrm}
                    onChange={(e) => setMcirCrm(Number(e.target.value))}
                    className="text-right font-mono text-sm bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-1">
                    Near Delivery
                    <Info className="w-3 h-3 text-gray-400 dark:text-slate-500" />
                  </Label>
                  <Input
                    type="number"
                    value={nearDelivery}
                    onChange={(e) => setNearDelivery(Number(e.target.value))}
                    className="text-right font-mono text-sm bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-1">
                    Seven
                    <Info className="w-3 h-3 text-gray-400 dark:text-slate-500" />
                  </Label>
                  <Input
                    type="number"
                    value={seven}
                    onChange={(e) => setSeven(Number(e.target.value))}
                    className="text-right font-mono text-sm bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-1">
                    DAB
                    <Info className="w-3 h-3 text-gray-400 dark:text-slate-500" />
                  </Label>
                  <Input
                    type="number"
                    value={dab}
                    onChange={(e) => setDab(Number(e.target.value))}
                    className="text-right font-mono text-sm bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-1">
                    WB
                    <Info className="w-3 h-3 text-gray-400 dark:text-slate-500" />
                  </Label>
                  <Input
                    type="number"
                    value={wb}
                    onChange={(e) => setWb(Number(e.target.value))}
                    className="text-right font-mono text-sm bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-1">
                    BAU
                    <Info className="w-3 h-3 text-gray-400 dark:text-slate-500" />
                  </Label>
                  <Input
                    type="number"
                    value={bau}
                    onChange={(e) => setBau(Number(e.target.value))}
                    className="text-right font-mono text-sm bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-1">
                  Spectrum
                  <Info className="w-3 h-3 text-gray-400 dark:text-slate-500" />
                </Label>
                <Input
                  type="number"
                  value={spectrum}
                  onChange={(e) => setSpectrum(Number(e.target.value))}
                  className="text-right font-mono text-sm bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Donut Chart - Middle Column */}
          <div className="flex flex-col items-center justify-center">
            <div className="h-80 w-80 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Chart labels positioned around the donut */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-center">
                  <div className="font-semibold text-sky-500">30</div>
                  <div className="text-gray-600 dark:text-slate-400">MCIR/CRM</div>
                </div>
                <div className="absolute top-12 right-8 text-xs text-center">
                  <div className="font-semibold text-cyan-500">15</div>
                  <div className="text-gray-600 dark:text-slate-400">Near</div>
                  <div className="text-gray-600 dark:text-slate-400">Delivery</div>
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-center">
                  <div className="font-semibold text-blue-500">10</div>
                  <div className="text-gray-600 dark:text-slate-400">DAB</div>
                </div>
                <div className="absolute bottom-12 right-8 text-xs text-center">
                  <div className="font-semibold text-purple-500">5</div>
                  <div className="text-gray-600 dark:text-slate-400">Seven</div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-center">
                  <div className="font-semibold text-blue-800">15</div>
                  <div className="text-gray-600 dark:text-slate-400">Spectrum</div>
                </div>
                <div className="absolute bottom-12 left-8 text-xs text-center">
                  <div className="font-semibold text-slate-800 dark:text-slate-400">15</div>
                  <div className="text-gray-600 dark:text-slate-400">WB</div>
                </div>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xs text-center">
                  <div className="font-semibold text-slate-600">10</div>
                  <div className="text-gray-600 dark:text-slate-400">BAU</div>
                </div>
              </div>
            </div>
            <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-8">
              Calculate
            </Button>
          </div>

          {/* Calculated Values - Right Column */}
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">Calculated Values</CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-slate-400">
                Live calculation results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-slate-700 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Tolerance (5%)</span>
                    <span className="font-mono text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(tolerance)}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-slate-500">
                    (Submitted Rate - Static Costs) / 1.25 × 0.05
                  </div>
                </div>

                <div className="border-b border-gray-200 dark:border-slate-700 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Basic Rate</span>
                    <span className="font-mono text-lg font-semibold text-cyan-500">{formatCurrency(basicRate)}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-slate-500">
                    Submitted Rate - (Static Costs + Tolerance)
                  </div>
                </div>

                <div className="border-b border-gray-200 dark:border-slate-700 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">ACR Rate</span>
                    <span className="font-mono text-lg font-semibold text-green-500">{formatCurrency(acrRate)}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-slate-500">
                    CIR Rate + 20%
                  </div>
                </div>

                <div className="pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">CIR Rate</span>
                    <span className="font-mono text-lg font-semibold text-purple-500">{formatCurrency(cirRate)}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-slate-500">
                    CIR Rate + 20%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formula Reference */}
        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">Formula Reference</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-slate-400">Understanding the calculations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-100 dark:border-slate-600">
                <h4 className="font-medium mb-2 text-gray-700 dark:text-slate-300">Tolerance</h4>
                <code className="text-xs bg-gray-100 dark:bg-slate-600 p-2 rounded block border border-gray-200 dark:border-slate-500 text-gray-700 dark:text-slate-300">
                  (Submitted Rate - Static Costs) / 1.25 × 0.05
                </code>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-100 dark:border-slate-600">
                <h4 className="font-medium mb-2 text-gray-700 dark:text-slate-300">Basic Rate</h4>
                <code className="text-xs bg-gray-100 dark:bg-slate-600 p-2 rounded block border border-gray-200 dark:border-slate-500 text-gray-700 dark:text-slate-300">
                  Submitted Rate - (Static Costs + Tolerance)
                </code>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-100 dark:border-slate-600">
                <h4 className="font-medium mb-2 text-gray-700 dark:text-slate-300">CIR Profit</h4>
                <code className="text-xs bg-gray-100 dark:bg-slate-600 p-2 rounded block border border-gray-200 dark:border-slate-500 text-gray-700 dark:text-slate-300">
                  Basic Rate - CIR Rate
                </code>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-100 dark:border-slate-600">
                <h4 className="font-medium mb-2 text-gray-700 dark:text-slate-300">ACR Profit</h4>
                <code className="text-xs bg-gray-100 dark:bg-slate-600 p-2 rounded block border border-gray-200 dark:border-slate-500 text-gray-700 dark:text-slate-300">
                  Basic Rate - (CIR Rate + 20%)
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RateCalculator;