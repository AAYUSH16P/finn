
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your account and system preferences</p>
      </div>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Settings and configuration options will be available soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This section will provide:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
            <li>Company profile management</li>
            <li>User account settings</li>
            <li>System preferences and defaults</li>
            <li>Integration settings</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
