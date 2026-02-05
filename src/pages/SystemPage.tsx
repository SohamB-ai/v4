import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { systemDomains } from "@/components/home/SystemsSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SensorInput } from "@/components/dashboard/SensorInput";
import { HealthGauge } from "@/components/dashboard/HealthGauge";
import { RiskBadge, RiskLevel } from "@/components/dashboard/RiskBadge";
import { TopSensors } from "@/components/dashboard/TopSensors";
import { RecommendedAction } from "@/components/dashboard/RecommendedAction";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Clock, AlertTriangle, TrendingUp } from "lucide-react";
import NeuralBackground from "@/components/ui/flow-field-background";

interface SensorConfig {
  id: string;
  label: string;
  unit: string;
  placeholder: string;
}

interface PredictionResult {
  rul: number;
  healthIndex: number;
  riskLevel: RiskLevel;
  precursorProb: number;
  confidence: number;
  failureMode: string;
  topSensors: { name: string; weight: number }[];
  action: string;
  driftDetected: boolean;
}

// Sensor configurations per system
const systemSensors: Record<string, SensorConfig[]> = {
  "wind-turbines": [
    { id: "input-windTurbine-gearVibration", label: "Gearbox Vibration", unit: "Hz", placeholder: "0-50" },
    { id: "input-windTurbine-powerOutput", label: "Power Output", unit: "kW", placeholder: "0-3000" },
    { id: "input-windTurbine-rotorSpeed", label: "Rotor Speed", unit: "RPM", placeholder: "0-20" },
    { id: "input-windTurbine-bladePitch", label: "Blade Pitch", unit: "°", placeholder: "0-90" },
    { id: "input-windTurbine-windSpeed", label: "Wind Speed", unit: "m/s", placeholder: "0-25" },
    { id: "input-windTurbine-generatorTemp", label: "Generator Temperature", unit: "°C", placeholder: "20-120" },
  ],
  "power-transformers": [
    { id: "input-powerTransformer-oilTemp", label: "Oil Temperature", unit: "°C", placeholder: "20-100" },
    { id: "input-powerTransformer-windingTemp", label: "Winding Temperature", unit: "°C", placeholder: "40-130" },
    { id: "input-powerTransformer-loadCurrent", label: "Load Current", unit: "A", placeholder: "0-2000" },
    { id: "input-powerTransformer-oilLevel", label: "Oil Level", unit: "%", placeholder: "0-100" },
    { id: "input-powerTransformer-dissolvedGas", label: "Dissolved Gas", unit: "ppm", placeholder: "0-500" },
  ],
  "industrial-motors": [
    { id: "input-industrialMotor-vibration", label: "Vibration Level", unit: "mm/s", placeholder: "0-25" },
    { id: "input-industrialMotor-current", label: "Motor Current", unit: "A", placeholder: "0-500" },
    { id: "input-industrialMotor-temperature", label: "Bearing Temperature", unit: "°C", placeholder: "20-100" },
    { id: "input-industrialMotor-speed", label: "Rotational Speed", unit: "RPM", placeholder: "0-3600" },
  ],
  "bridges": [
    { id: "input-bridge-strain", label: "Strain Level", unit: "με", placeholder: "0-1000" },
    { id: "input-bridge-displacement", label: "Displacement", unit: "mm", placeholder: "0-50" },
    { id: "input-bridge-temperature", label: "Surface Temperature", unit: "°C", placeholder: "-20-60" },
    { id: "input-bridge-cableTension", label: "Cable Tension", unit: "kN", placeholder: "0-5000" },
  ],
  "servers": [
    { id: "input-server-cpuTemp", label: "CPU Temperature", unit: "°C", placeholder: "20-100" },
    { id: "input-server-cpuLoad", label: "CPU Load", unit: "%", placeholder: "0-100" },
    { id: "input-server-memoryUsage", label: "Memory Usage", unit: "%", placeholder: "0-100" },
    { id: "input-server-diskHealth", label: "Disk Health", unit: "%", placeholder: "0-100" },
    { id: "input-server-fanSpeed", label: "Fan Speed", unit: "RPM", placeholder: "0-5000" },
  ],
  "icu-monitoring": [
    { id: "input-icu-heartRate", label: "Heart Rate", unit: "BPM", placeholder: "40-200" },
    { id: "input-icu-bloodPressure", label: "Blood Pressure", unit: "mmHg", placeholder: "60-180" },
    { id: "input-icu-oxygenSat", label: "Oxygen Saturation", unit: "%", placeholder: "70-100" },
    { id: "input-icu-temperature", label: "Body Temperature", unit: "°C", placeholder: "35-42" },
  ],
  "cnc-machines": [
    { id: "input-cnc-spindleVibration", label: "Spindle Vibration", unit: "mm/s", placeholder: "0-15" },
    { id: "input-cnc-toolWear", label: "Tool Wear Index", unit: "%", placeholder: "0-100" },
    { id: "input-cnc-spindleLoad", label: "Spindle Load", unit: "%", placeholder: "0-100" },
    { id: "input-cnc-coolantTemp", label: "Coolant Temperature", unit: "°C", placeholder: "10-40" },
  ],
  "hvac-systems": [
    { id: "input-hvac-compressorPressure", label: "Compressor Pressure", unit: "PSI", placeholder: "0-500" },
    { id: "input-hvac-refrigerantTemp", label: "Refrigerant Temperature", unit: "°C", placeholder: "-20-60" },
    { id: "input-hvac-airflowRate", label: "Airflow Rate", unit: "CFM", placeholder: "0-5000" },
    { id: "input-hvac-powerConsumption", label: "Power Consumption", unit: "kW", placeholder: "0-50" },
  ],
};

export default function SystemPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [sensorValues, setSensorValues] = useState<Record<string, string>>({});

  const system = systemDomains.find((s) => s.slug === slug);
  const sensors = systemSensors[slug || ""] || systemSensors["wind-turbines"];

  if (!system) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">System not found</p>
      </div>
    );
  }

  const Icon = system.icon;

  const handleRunPrediction = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock prediction based on first sensor value
    const firstValue = parseFloat(Object.values(sensorValues)[0] || "0");
    const healthIndex = Math.max(0, Math.min(100, 85 - firstValue * 1.5));
    const riskLevel: RiskLevel =
      healthIndex >= 70 ? "LOW" :
        healthIndex >= 50 ? "MEDIUM" :
          healthIndex >= 30 ? "HIGH" : "CRITICAL";

    setResult({
      rul: Math.round(healthIndex * 1.2),
      healthIndex: Math.round(healthIndex),
      riskLevel,
      precursorProb: Math.round((100 - healthIndex) / 100 * 100) / 100,
      confidence: 0.87,
      failureMode: healthIndex < 50 ? `${system.failures.split(",")[0]}` : "Normal Operation",
      topSensors: sensors.slice(0, 4).map((s, i) => ({
        name: s.label,
        weight: Math.max(10, 40 - i * 8 + Math.random() * 10),
      })),
      action: healthIndex < 50
        ? `Schedule immediate inspection for ${system.title}. Consider reducing operational load.`
        : `Continue normal operation. Next scheduled maintenance in ${Math.round(healthIndex / 2)} days.`,
      driftDetected: healthIndex < 40,
    });

    setIsLoading(false);
  };

  return (
    <div id={`system-page-${slug}`} className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <NeuralBackground
          color="#9d4edd"
          speed={0.8}
          trailOpacity={0.2}
          particleCount={600}
        />
      </div>

      <div className="relative z-10 pt-24 pb-12 px-6">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/systems")}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Systems
            </button>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{system.title}</h1>
                <p className="text-muted-foreground">{system.failures}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Panel */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Sensor Inputs</CardTitle>
                <CardDescription>Enter current sensor readings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {sensors.map((sensor) => (
                    <SensorInput
                      key={sensor.id}
                      id={sensor.id}
                      label={sensor.label}
                      unit={sensor.unit}
                      value={sensorValues[sensor.id] || ""}
                      onChange={(value) =>
                        setSensorValues((prev) => ({ ...prev, [sensor.id]: value }))
                      }
                      placeholder={sensor.placeholder}
                    />
                  ))}
                </div>

                <Button
                  id="runPredictBtn"
                  onClick={handleRunPrediction}
                  disabled={isLoading}
                  className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running Prediction...
                    </>
                  ) : (
                    "Run Health Prediction"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Panel */}
            <div id="outputPanel" className="space-y-4">
              {!result ? (
                <Card className="flex h-full min-h-[400px] items-center justify-center border-dashed border-border bg-card/50">
                  <div className="text-center px-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                      <TrendingUp className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Enter sensor values and run prediction to see results
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="animate-fade-in space-y-4">
                  {/* Key Metrics */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <MetricCard
                      id="output-RUL"
                      title="Remaining Useful Life"
                      value={`${result.rul} days`}
                      subtitle="Estimated time until maintenance"
                      icon={Clock}
                      variant={result.rul < 30 ? "critical" : result.rul < 60 ? "warning" : "success"}
                    />
                    <MetricCard
                      id="output-precursorProb"
                      title="Precursor Probability"
                      value={`${(result.precursorProb * 100).toFixed(0)}%`}
                      subtitle="Likelihood of early failure signs"
                      icon={AlertTriangle}
                      variant={result.precursorProb > 0.7 ? "critical" : result.precursorProb > 0.4 ? "warning" : "default"}
                    />
                  </div>

                  {/* Health Gauge & Risk */}
                  <Card className="border-border bg-card">
                    <CardContent className="space-y-4 pt-6">
                      <HealthGauge value={result.healthIndex} />
                      <div className="flex items-center justify-between border-t border-border pt-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Risk Level</p>
                          <RiskBadge level={result.riskLevel} />
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Confidence</p>
                          <p id="output-confidence" className="text-lg font-semibold text-foreground">
                            {(result.confidence * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Failure Mode & Drift */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="border-border bg-card">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          Predicted Failure Mode
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p id="output-failureMode" className="text-lg font-semibold text-foreground">
                          {result.failureMode}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className={`border-border bg-card ${result.driftDetected ? "border-warning/50" : ""}`}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          Data Drift Detected
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p
                          id="output-drift"
                          className={`text-lg font-semibold ${result.driftDetected ? "text-warning" : "text-success"
                            }`}
                        >
                          {result.driftDetected ? "Yes" : "No"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Top Sensors */}
                  <Card className="border-border bg-card">
                    <CardContent className="pt-6">
                      <TopSensors sensors={result.topSensors} />
                    </CardContent>
                  </Card>

                  {/* Recommended Action */}
                  <RecommendedAction action={result.action} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
