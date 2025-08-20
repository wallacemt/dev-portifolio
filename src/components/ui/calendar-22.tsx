"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./dropdown-menu";

interface CalendarProps {
  title: string;
  onChange: (date: Date | undefined) => void;
  initialDate?: Date;
}

export function Calendar22({ title, onChange, initialDate }: CalendarProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(initialDate ? new Date(initialDate) : undefined);
  React.useEffect(() => {
    if (initialDate) {
      const newDate = new Date(initialDate);
      setDate(newDate);
    }
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate);
    setOpen(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {title}
      </Label>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" id="date" className="w-full justify-between font-normal">
            {date ? formatDate(date) : "Selecionar data"}
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full overflow-hidden p-0 " align="start">
          <Calendar mode="single" selected={date} captionLayout="dropdown" onSelect={handleDateSelect} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
