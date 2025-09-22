import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter } from "../types";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
        <div className="relative inline-flex">
            <Button variant="secondary" size="icon">
                <ListFilter/>
            </Button>
            {filter !== null && <Badge
                className={`absolute -top-1 -right-1 h-3 w-3 p-0 flex items-center justify-center rounded-full text-xs ${filter === "complete" ? "bg-green-300" : filter === "incomplete" ? "bg-orange-300" : ""}`}
            />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter By</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={filter === null}
          onClick={() => {handleFilterChange(null)}}
        >
          No filter
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
