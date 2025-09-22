import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DeleteTaskButtonProps {
  onDelete: () => Promise<void>;
}

export default function DeleteTaskButton(props: DeleteTaskButtonProps) {
  const { onDelete } = props;

  async function handleDelete(e: React.FormEvent) {
    e.stopPropagation();
    onDelete();
  }

  return (
    <Button className="text-inherit" variant="link" onClick={handleDelete}>
      <X size={18} />
    </Button>
  );
}
