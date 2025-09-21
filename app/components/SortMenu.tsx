"use client"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
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
import { ListSortBy, SortDirection } from "../types"

interface SortMenuProps {
    sortBy: ListSortBy;
    onChangeSortBy: (sortBy: ListSortBy) => void;
    direction: SortDirection;
    onChangeDirection: (direction: SortDirection) => void;
}

export default function SortMenu(props: SortMenuProps) {
  const {direction, sortBy, onChangeSortBy, onChangeDirection} = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon"><ArrowUpDown/></Button>
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
          checked={sortBy === "title"}
          onClick={(e) => {e.preventDefault(); onChangeSortBy("title")}}
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
