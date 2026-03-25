"use client";

import React, { useState, useRef } from "react";

function Calendar({
    value,
    onChange,
    onClose,
}: {
    value: Date | null;
    onChange: (d: Date) => void;
    onClose: () => void;
}) {
    const today = new Date();
    const [current, setCurrent] = useState(value || today);
    const year = current.getFullYear();
    const month = current.getMonth();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const cells: { day: number; type: "prev" | "cur" | "next" }[] = [];
    for (let i = firstDay - 1; i >= 0; i--)
        cells.push({ day: prevMonthDays - i, type: "prev" });
    for (let i = 1; i <= daysInMonth; i++)
        cells.push({ day: i, type: "cur" });
    while (cells.length < 42)
        cells.push({ day: cells.length - firstDay - daysInMonth + 1, type: "next" });

    const isSelected = (day: number) =>
        value &&
        value.getDate() === day &&
        value.getMonth() === month &&
        value.getFullYear() === year;

    const isToday = (day: number) =>
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;

    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 bg-[#1c1c1c] border border-white/10 rounded-xl shadow-2xl p-4 w-[260px]">
            <div className="flex items-center justify-between mb-3">
                <button
                    onClick={() => setCurrent(new Date(year, month - 1, 1))}
                    className="text-white/50 hover:text-white transition-colors text-lg w-7 h-7 flex items-center justify-center"
                >
                    ‹
                </button>
                <span className="text-white text-sm font-semibold">
                    {monthNames[month]} {year}
                </span>
                <button
                    onClick={() => setCurrent(new Date(year, month + 1, 1))}
                    className="text-white/50 hover:text-white transition-colors text-lg w-7 h-7 flex items-center justify-center"
                >
                    ›
                </button>
            </div>

            <div className="grid grid-cols-7 mb-1">
                {dayNames.map((d) => (
                    <div key={d} className="text-center text-white/40 text-[11px] font-medium py-1">
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {cells.map((cell, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (cell.type === "cur") {
                                onChange(new Date(year, month, cell.day));
                                onClose();
                            }
                        }}
                        className={`
                            text-center text-[12px] py-1.5 rounded-lg transition-colors leading-none
                            ${cell.type !== "cur" ? "text-white/20 cursor-default" : "text-white hover:bg-white/10 cursor-pointer"}
                            ${isSelected(cell.day) && cell.type === "cur" ? "!bg-[#F5A623] !text-black font-bold" : ""}
                            ${isToday(cell.day) && cell.type === "cur" && !isSelected(cell.day) ? "border border-[#F5A623]/60" : ""}
                        `}
                    >
                        {cell.day}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function DatePicker({ placeholder }: { placeholder: string }) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | null>(null);
    const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        if (leaveTimer.current) clearTimeout(leaveTimer.current);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        leaveTimer.current = setTimeout(() => setOpen(false), 150);
    };

    const formatDate = (d: Date) =>
        d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    return (
        <div
            className="relative flex-1 min-w-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center justify-between gap-2 px-5 py-4 cursor-pointer">
                <span className={`text-sm ${date ? "text-white" : "text-white/50"}`}>
                    {date ? formatDate(date) : placeholder}
                </span>
                <svg className="w-4 h-4 flex-shrink-0 text-[#F5A623]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
                </svg>
            </div>

            {open && (
                <Calendar
                    value={date}
                    onChange={(d) => {
                        setDate(d);
                        setOpen(false);
                    }}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    );
}