import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Upload, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "pending" | "submitted" | "late" | "graded";
  grade?: string;
}

const initialAssignments: Assignment[] = [
  { id: "1", title: "Binary Tree Implementation", course: "CS301", dueDate: "Apr 1, 2026", status: "pending" },
  { id: "2", title: "Neural Network Report", course: "CS405", dueDate: "Apr 5, 2026", status: "pending" },
  { id: "3", title: "ER Diagram Design", course: "CS303", dueDate: "Apr 8, 2026", status: "pending" },
  { id: "4", title: "TCP/IP Analysis", course: "CS304", dueDate: "Mar 20, 2026", status: "submitted" },
  { id: "5", title: "UML Class Diagrams", course: "CS306", dueDate: "Mar 15, 2026", status: "graded", grade: "95/100" },
];

const statusConfig = {
  pending: { icon: Clock, label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  submitted: { icon: CheckCircle2, label: "Submitted", className: "bg-success/10 text-success border-success/20" },
  late: { icon: AlertCircle, label: "Late", className: "bg-destructive/10 text-destructive border-destructive/20" },
  graded: { icon: CheckCircle2, label: "Graded", className: "bg-primary/10 text-primary border-primary/20" },
};

const Assignments = () => {
  const [assignments, setAssignments] = useState(initialAssignments);

  const handleSubmit = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "submitted" as const } : a))
    );
    toast.success("Assignment submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl text-foreground">Assignments</h1>
        <p className="text-muted-foreground font-sans mt-1">Manage and submit your coursework</p>
      </motion.div>

      <div className="space-y-3">
        {assignments.map((a, i) => {
          const config = statusConfig[a.status];
          const StatusIcon = config.icon;

          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-sans font-medium text-foreground">{a.title}</p>
                        <Badge variant="outline" className={`font-sans text-xs ${config.className}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-xs font-sans text-muted-foreground">
                        {a.course} · Due: {a.dueDate}
                        {a.grade && ` · Grade: ${a.grade}`}
                      </p>
                    </div>

                    {a.status === "pending" && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSubmit(a.id)}
                          className="font-sans text-xs"
                        >
                          <Upload className="w-3 h-3 mr-1" />
                          Submit
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Assignments;
