import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskCardProps {
  complete: boolean;
  description: string;
}

export default function TaskCard(props: TaskCardProps) {
    const {complete, description} = props;

    return <Card className="p-3">
        <CardContent className="flex px-2 items-center gap-4">
            <Checkbox checked={complete}/>
            {description}
        </CardContent>
    </Card>
}