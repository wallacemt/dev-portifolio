"use client";

import * as React from "react";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { addDays, format, isAfter, isBefore, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxDays?: number;
  minDate?: Date;
  maxDate?: Date;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Selecione o período",
  className,
  disabled = false,
  maxDays,
  minDate,
  maxDate = new Date(),
}: DateRangePickerProps) {
  const [range, setRange] = React.useState<DateRange | undefined>(value);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const validateDateRange = React.useCallback(
    (dateRange: DateRange | undefined): string[] => {
      const validationErrors: string[] = [];

      if (!dateRange?.from || !dateRange?.to) {
        return validationErrors;
      }

      if (!isValid(dateRange.from)) {
        validationErrors.push("Data de início deve ser uma data válida");
      }

      if (!isValid(dateRange.to)) {
        validationErrors.push("Data de fim deve ser uma data válida");
      }
      if (validationErrors.length > 0) {
        return validationErrors;
      }
      if (!isAfter(dateRange.to, dateRange.from) && dateRange.from.getTime() !== dateRange.to.getTime()) {
        validationErrors.push("Data de fim deve ser posterior à data de início");
      }
      if (maxDays) {
        const daysDifference = Math.abs(dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24);
        if (daysDifference > maxDays) {
          validationErrors.push(`O período não pode exceder ${maxDays} dias`);
        }
      }
      if (minDate && isBefore(dateRange.from, minDate)) {
        validationErrors.push(
          `Data de início não pode ser anterior a ${format(minDate, "dd/MM/yyyy", { locale: ptBR })}`
        );
      }
      if (maxDate && isAfter(dateRange.to, maxDate)) {
        validationErrors.push(
          `Data de fim não pode ser posterior a ${format(maxDate, "dd/MM/yyyy", { locale: ptBR })}`
        );
      }

      return validationErrors;
    },
    [maxDays, minDate, maxDate] 
  );

  React.useEffect(() => {
    const validationErrors = validateDateRange(range);
    setErrors(validationErrors);
  }, [range, validateDateRange]);

  React.useEffect(
    () => {
      if (value !== range) {
        setRange(value);
      }
    },
    [value] 
  );

  const handleRangeSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange);

    const validationErrors = validateDateRange(selectedRange);
    if (validationErrors.length === 0 && selectedRange?.from && selectedRange?.to) {
      onChange?.(selectedRange);
      setIsOpen(false);
    }
  };

  const formatDisplayText = () => {
    if (!range?.from) {
      return placeholder;
    }

    if (range.to) {
      return `${format(range.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(range.to, "dd/MM/yyyy", {
        locale: ptBR,
      })}`;
    }

    return format(range.from, "dd/MM/yyyy", { locale: ptBR });
  };

  const setQuickRange = (days: number) => {
    const to = new Date();
    const from = addDays(to, -days);
    const quickRange = { from, to };

    const validationErrors = validateDateRange(quickRange);
    if (validationErrors.length === 0) {
      setRange(quickRange);
      onChange?.(quickRange);
      setIsOpen(false);
    }
  };

  const hasValidRange = range?.from && range?.to && errors.length === 0;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-range"
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !range && "text-muted-foreground",
              errors.length > 0 && "border-red-500 focus:border-red-500",
              hasValidRange && "border-green-500"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDisplayText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <div className="flex flex-wrap gap-2 mb-3">
              <Button variant="outline" size="sm" onClick={() => setQuickRange(7)} className="text-xs">
                7 dias
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuickRange(30)} className="text-xs">
                30 dias
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuickRange(90)} className="text-xs">
                90 dias
              </Button>
            </div>
            <Calendar
              mode="range"
              defaultMonth={range?.from}
              selected={range}
              onSelect={handleRangeSelect}
              numberOfMonths={2}
              disabled={
                disabled
                  ? true
                  : (date) => {
                      if (maxDate && isAfter(date, maxDate)) return true;
                      if (minDate && isBefore(date, minDate)) return true;
                      return false;
                    }
              }
            />

            {errors.length > 0 && (
              <div className="mt-3">
                {errors.map((error, index) => (
                  <Alert key={index} variant="destructive" className="mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {hasValidRange && (
              <div className="mt-3 flex justify-end">
                <Button
                  size="sm"
                  onClick={() => {
                    onChange?.(range);
                    setIsOpen(false);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Aplicar
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Exibe erros fora do popover também */}
      {errors.length > 0 && !isOpen && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
