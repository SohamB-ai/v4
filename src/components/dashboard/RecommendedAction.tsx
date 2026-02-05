import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface RecommendedActionProps {
  action: string;
}

export function RecommendedAction({ action }: RecommendedActionProps) {
  return (
    <Card id="output-action" className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-primary">
          <Lightbulb className="h-4 w-4" />
          Recommended Action
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-foreground">{action}</p>
      </CardContent>
    </Card>
  );
}
