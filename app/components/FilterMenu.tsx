import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter } from "../types";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

interface FilterMenuProps {
    filter: Filter | null;
    onChangeFilter: (filter: Filter | null) => void;
}

export default function FilterMenu(props: FilterMenuProps) {
    const {filter, onChangeFilter} = props;

    const handleFilterChange = (newFilter: Filter | null) => {
        return newFilter === filter ? onChangeFilter(null) : onChangeFilter(newFilter)
    }

    return (
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon"><ListFilter/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter By</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={filter === null}
          onClick={() => {handleFilterChange(null)}}
        >
          None
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filter === "complete"}
          onClick={() => {handleFilterChange("complete")}}
        >
          Complete
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filter === "incomplete"}
          onClick={() => {handleFilterChange("incomplete")}}
        >
          Incomplete
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )

}
