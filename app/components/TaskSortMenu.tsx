import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { TaskSortBy, SortDirection } from "../types"

interface TaskSortMenuProps {
    sortBy: TaskSortBy;
    onChangeSortBy: (sortBy: TaskSortBy) => void;
    direction: SortDirection;
    onChangeDirection: (direction: SortDirection) => void;
}

export default function TaskSortMenu(props: TaskSortMenuProps) {
  const {direction, sortBy, onChangeSortBy, onChangeDirection} = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon"><ArrowUpDown/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={sortBy === 'createdAt'}
          onClick={(e) => {e.preventDefault(); onChangeSortBy("createdAt")}}
        >
          Created At
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy === "description"}
          onClick={(e) => {e.preventDefault(); onChangeSortBy("description")}}
        >
          Title
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Direction</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={direction === "asc"}
          onClick={(e) => {e.preventDefault(); onChangeDirection("asc")}}
        >
          Ascending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={direction === "desc"}
          onClick={(e) => {e.preventDefault(); onChangeDirection("desc")}}
        >
          Descending
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
