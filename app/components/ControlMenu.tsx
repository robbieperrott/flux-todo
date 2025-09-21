import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SlidersHorizontal } from "lucide-react"
import { Filter, SortBy, SortDirection } from "../types"

interface ControlMenuProps {
    filter: Filter | null;
    onChangeFilter: (filter: Filter | null) => void;
    sortBy: SortBy;
    onChangeSortBy: (sortBy: SortBy) => void;
    direction: SortDirection;
    onChangeDirection: (direction: SortDirection) => void;
    textFieldName: string;  // E.g. "title" or "description"
}

export default function ControlMenu(props: ControlMenuProps) {
  const {direction, filter, onChangeFilter, sortBy, onChangeSortBy, onChangeDirection, textFieldName} = props;

  const handleFilterChange = (newFilter: Filter) => {
    newFilter === filter ? onChangeFilter(null) : onChangeFilter(newFilter)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon"><SlidersHorizontal/></Button>
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
          checked={sortBy === "text"}
          onClick={(e) => {e.preventDefault(); onChangeSortBy("text")}}
        >
          {textFieldName}
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

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Filter By</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={filter === "complete"}
          onClick={(e) => {e.preventDefault(); handleFilterChange("complete")}}
        >
          Complete
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filter === "incomplete"}
          onClick={(e) => {e.preventDefault(); handleFilterChange("incomplete")}}
        >
          Incomplete
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
