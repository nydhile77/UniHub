import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const grades = [
  { course: "Data Structures & Algorithms", code: "CS301", midterm: 88, final: null, assignments: 92, grade: "A-" },
  { course: "Artificial Intelligence", code: "CS405", midterm: 76, final: null, assignments: 85, grade: "B+" },
  { course: "Database Management", code: "CS303", midterm: 94, final: null, assignments: 90, grade: "A" },
  { course: "Computer Networks", code: "CS304", midterm: 72, final: null, assignments: 78, grade: "B" },
  { course: "Software Engineering", code: "CS306", midterm: 91, final: null, assignments: 95, grade: "A" },
];

const gradeColor = (g: string) => {
  if (g.startsWith("A")) return "bg-success/10 text-success border-success/20";
  if (g.startsWith("B")) return "bg-primary/10 text-primary border-primary/20";
  return "bg-warning/10 text-warning border-warning/20";
};

const Scores = () => (
  <div className="max-w-5xl mx-auto space-y-6">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-4xl text-foreground">Scores & Grades</h1>
      <p className="text-muted-foreground font-sans mt-1">Spring 2026 · Current GPA: 3.72</p>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-sans">Course</TableHead>
                <TableHead className="font-sans text-center">Midterm</TableHead>
                <TableHead className="font-sans text-center">Final</TableHead>
                <TableHead className="font-sans text-center">Assignments</TableHead>
                <TableHead className="font-sans text-center">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((g) => (
                <TableRow key={g.code}>
                  <TableCell>
                    <p className="font-sans font-medium text-foreground">{g.course}</p>
                    <p className="text-xs font-sans text-muted-foreground">{g.code}</p>
                  </TableCell>
                  <TableCell className="text-center font-sans">{g.midterm}</TableCell>
                  <TableCell className="text-center font-sans text-muted-foreground">
                    {g.final ?? "—"}
                  </TableCell>
                  <TableCell className="text-center font-sans">{g.assignments}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={`font-sans ${gradeColor(g.grade)}`}>
                      {g.grade}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  </div>
);

export default Scores;
