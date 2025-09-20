import { Card, CardContent } from "@/components/ui/card";

interface TaskCardProps {
  description: string;
}

export default function TaskCard(props: TaskCardProps) {
  const {description} = props;

  return <Card className="p-3">
    <CardContent>{description}</CardContent>
  </Card>
}