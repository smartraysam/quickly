"use client";

import { useState, useMemo } from "react";
import { format, setDate, isBefore, addMonths, getDaysInMonth } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function PaymentDateChecker() {
  const [invoiceDueDate, setInvoiceDueDate] = useState<Date | undefined>();
  const [payCycleDate, setPayCycleDate] = useState<Date | undefined>();

  const nextPaymentDate = useMemo(() => {
    if (!invoiceDueDate || !payCycleDate) return null;

    const payCycleDay = payCycleDate.getDate();

    const safeDay = Math.min(payCycleDay, getDaysInMonth(invoiceDueDate));
    const currentMonthPayDate = setDate(invoiceDueDate, safeDay);

    if (isBefore(invoiceDueDate, currentMonthPayDate)) {
      return currentMonthPayDate;
    } else {
      const nextMonth = addMonths(invoiceDueDate, 1);
      const nextMonthSafeDay = Math.min(payCycleDay, getDaysInMonth(nextMonth));
      return setDate(nextMonth, nextMonthSafeDay);
    }
  }, [invoiceDueDate, payCycleDate]);

  return (
    <Card className="mt-4 p-2">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold">Payment Date Checker</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          <div>
            <Label className="mb-2 block">Invoice Due Date</Label>
            <Calendar
              mode="single"
              selected={invoiceDueDate}
              onSelect={setInvoiceDueDate}
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Pay Cycle Date (select any day, i.e 30th.)
            </Label>
            <Calendar
              mode="single"
              selected={payCycleDate}
              onSelect={setPayCycleDate}
            />
          </div>
        </div>
        {invoiceDueDate && payCycleDate && nextPaymentDate && (
          <div className="text-base text-center font-bold mt-4">
            Your invoice pay date will be:{" "}
            <span className="font-medium">
              {format(nextPaymentDate, "MMMM do, yyyy")}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
