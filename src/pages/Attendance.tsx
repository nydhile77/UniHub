import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const courses = [
  { name: "Data Structures & Algorithms", code: "CS301", attended: 28, total: 32, percentage: 87.5 },
  { name: "Artificial Intelligence", code: "CS405", attended: 24, total: 28, percentage: 85.7 },
  { name: "Database Management", code: "CS303", attended: 30, total: 32, percentage: 93.8 },
  { name: "Computer Networks", code: "CS304", attended: 22, total: 28, percentage: 78.6 },
  { name: "Software Engineering", code: "CS306", attended: 26, total: 30, percentage: 86.7 },
];

const Attendance = () => {
  const overall = Math.round(
    courses.reduce((acc, c) => acc + c.percentage, 0) / courses.length
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl text-foreground">Attendance</h1>
        <p className="text-muted-foreground font-sans mt-1">Spring 2026 Semester</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardContent className="p-6 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center">
              <span className="text-2xl font-serif text-primary">{overall}%</span>
            </div>
            <div>
              <p className="text-lg font-serif text-foreground">Overall Attendance</p>
              <p className="text-sm font-sans text-muted-foreground">
                {overall >= 85 ? "You're in good standing" : "Attendance needs improvement"}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-3">
        {courses.map((course, i) => (
          <motion.div
            key={course.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-sans font-medium text-foreground">{course.name}</p>
                    <p className="text-xs font-sans text-muted-foreground">{course.code}</p>
                  </div>
                  <span
                    className={`text-sm font-sans font-medium ${
                      course.percentage >= 85
                        ? "text-success"
                        : course.percentage >= 75
                        ? "text-warning"
                        : "text-destructive"
                    }`}
                  >
                    {course.percentage.toFixed(1)}%
                  </span>
                </div>
                <Progress value={course.percentage} className="h-2" />
                <p className="text-xs font-sans text-muted-foreground mt-2">
                  {course.attended} / {course.total} classes attended
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
