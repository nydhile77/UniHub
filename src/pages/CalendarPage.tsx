import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { motion } from "framer-motion";

interface CalendarEvent {
  date: string;
  title: string;
  type: "exam" | "assignment" | "event" | "holiday";
}

const events: CalendarEvent[] = [
  { date: "2026-04-02", title: "Data Structures Midterm", type: "exam" },
  { date: "2026-04-05", title: "AI Assignment Due", type: "assignment" },
  { date: "2026-04-08", title: "DB Assignment Due", type: "assignment" },
  { date: "2026-04-10", title: "Spring Hackathon", type: "event" },
  { date: "2026-04-14", title: "University Foundation Day", type: "holiday" },
  { date: "2026-04-18", title: "Networks Midterm", type: "exam" },
  { date: "2026-04-22", title: "Software Eng Presentation", type: "assignment" },
  { date: "2026-04-25", title: "Career Fair", type: "event" },
  { date: "2026-05-10", title: "Final Exams Begin", type: "exam" },
  { date: "2026-05-20", title: "Final Exams End", type: "exam" },
];

const typeConfig = {
  exam: { label: "Exam", className: "bg-destructive/10 text-destructive border-destructive/20" },
  assignment: { label: "Due", className: "bg-warning/10 text-warning border-warning/20" },
  event: { label: "Event", className: "bg-primary/10 text-primary border-primary/20" },
  holiday: { label: "Holiday", className: "bg-success/10 text-success border-success/20" },
};

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 3, 1));

  const eventDates = events.map((e) => new Date(e.date));

  const selectedEvents = selectedDate
    ? events.filter((e) => e.date === selectedDate.toISOString().split("T")[0])
    : [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl text-foreground">Calendar</h1>
        <p className="text-muted-foreground font-sans mt-1">Exams, deadlines & events</p>
      </motion.div>

      <div className="grid lg:grid-cols-[auto_1fr] gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                defaultMonth={new Date(2026, 3)}
                className="pointer-events-auto"
                modifiers={{ event: eventDates }}
                modifiersClassNames={{ event: "bg-primary/20 rounded-full font-bold" }}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="space-y-3">
            <h2 className="text-xl font-serif text-foreground">
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : "Select a date"}
            </h2>

            {selectedEvents.length > 0 ? (
              selectedEvents.map((e) => {
                const config = typeConfig[e.type];
                return (
                  <Card key={e.title}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <p className="font-sans font-medium text-foreground">{e.title}</p>
                      <Badge variant="outline" className={`font-sans ${config.className}`}>
                        {config.label}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <p className="text-sm font-sans text-muted-foreground">No events on this day</p>
            )}

            <h3 className="text-lg font-serif text-foreground mt-6">All Upcoming</h3>
            <div className="space-y-2">
              {events.map((e) => {
                const config = typeConfig[e.type];
                return (
                  <div
                    key={e.title + e.date}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/50"
                  >
                    <div>
                      <p className="text-sm font-sans font-medium text-foreground">{e.title}</p>
                      <p className="text-xs font-sans text-muted-foreground">
                        {new Date(e.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge variant="outline" className={`font-sans text-xs ${config.className}`}>
                      {config.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarPage;
