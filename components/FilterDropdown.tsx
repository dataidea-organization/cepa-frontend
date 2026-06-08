"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label?: string;
  value: string;
  options: string[] | FilterOption[];
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const glassSurfaceClasses =
  "bg-white/40 border border-white/50 backdrop-blur-sm shadow-sm";

function normalizeOptions(options: string[] | FilterOption[]): FilterOption[] {
  return options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option
  );
}

export function FilterDropdown({
  label = "Filter by",
  value,
  options,
  onChange,
  className,
  placeholder = "Select",
}: FilterDropdownProps) {
  const normalized = normalizeOptions(options);
  const selected = normalized.find((option) => option.value === value);

  if (normalized.length <= 1) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "min-w-[220px] justify-between gap-3 h-11 px-4 font-medium text-gray-700",
              glassSurfaceClasses,
              "hover:bg-white/50 hover:border-white/60 hover:text-gray-900 transition-colors duration-200"
            )}
          >
            <span className="flex items-center gap-2 truncate">
              <SlidersHorizontal className="w-4 h-4 text-[#800020] shrink-0" />
              <span className="truncate">{selected?.label || placeholder}</span>
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={cn(
            "w-[min(100vw-2rem,280px)] max-h-72 overflow-y-auto",
            glassSurfaceClasses
          )}
        >
          <DropdownMenuLabel className="text-xs text-gray-600 font-normal">
            Choose {label.toLowerCase()}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/40" />
          <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
            {normalized.map((option) => (
              <DropdownMenuRadioItem
                key={option.value}
                value={option.value}
                className="cursor-pointer py-2.5 text-gray-700 focus:bg-white/30 focus:text-gray-900 data-[state=checked]:text-[#800020] data-[state=checked]:font-medium"
              >
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
