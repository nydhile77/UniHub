import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ClassRecord {
  date: string;
  topic: string;
  present: boolean;
}

interface Course {
  name: string;
  code: string;
  attended: number;
  total: number;
  percentage: number;
  classes: ClassRecord[];
}

const courses: Course[] = [
  {
    name: "Data Structures & Algorithms", code: "CS301", attended: 28, total: 32, percentage: 87.5,
    classes: [
      { date: "Mar 24", topic: "AVL Trees", present: true },
      { date: "Mar 22", topic: "Binary Search Trees", present: true },
      { date: "Mar 20", topic: "Tree Traversals", present: false },
      { date: "Mar 18", topic: "Heaps & Priority Queues", present: true },
      { date: "Mar 15", topic: "Hash Tables", present: true },
      { date: "Mar 13", topic: "Graph Basics", present: false },
      { date: "Mar 11", topic: "BFS & DFS", present: true },
      { date: "Mar 8", topic: "Sorting Algorithms", present: true },
    ],
  },
  {
    name: "Artificial Intelligence", code: "CS405", attended: 24, total: 28, percentage: 85.7,
    classes: [
      { date: "Mar 25", topic: "Neural Networks Intro", present: true },
      { date: "Mar 23", topic: "Backpropagation", present: false },
      { date: "Mar 20", topic: "Decision Trees", present: true },
      { date: "Mar 18", topic: "Random Forests", present: true },
      { date: "Mar 16", topic: "SVM", present: true },
      { date: "Mar 13", topic: "K-Means Clustering", present: false },
    ],
  },
  {
    name: "Database Management", code: "CS303", attended: 30, total: 32, percentage: 93.8,
    classes: [
      { date: "Mar 25", topic: "Indexing & B+ Trees", present: true },
      { date: "Mar 23", topic: "Query Optimization", present: true },
      { date: "Mar 20", topic: "Normalization", present: true },
      { date: "Mar 18", topic: "ER Diagrams", present: true },
      { date: "Mar 15", topic: "SQL Joins", present: false },
      { date: "Mar 13", topic: "Transactions & ACID", present: true },
    ],
  },
  {
    name: "Computer Networks", code: "CS304", attended: 22, total: 28, percentage: 78.6,
    classes: [
      { date: "Mar 24", topic: "TCP/IP Model", present: true },
      { date: "Mar 22", topic: "UDP Protocol", present: false },
      { date: "Mar 20", topic: "Routing Algorithms", present: true },
      { date: "Mar 18", topic: "Subnetting", present: false },
      { date: "Mar 15", topic: "DNS", present: true },
      { date: "Mar 13", topic: "HTTP/HTTPS", present: true },
    ],
  },
  {
    name: "Software Engineering", code: "CS306", attended: 26, total: 30, percentage: 86.7,
    classes: [
      { date: "Mar 25", topic: "Agile Methodology", present: true },
      { date: "Mar 23", topic: "Scrum Framework", present: true },
      { date: "Mar 20", topic: "UML Diagrams", present: true },
      { date: "Mar 18", topic: "Design Patterns", present: false },
      { date: "Mar 15", topic: "Testing Strategies", present: true },
      { date: "Mar 13", topic: "CI/CD Pipelines", present: true },
    ],
  },
];

const Attendance = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const overall = Math.round(
    courses.reduce((acc, c) => acc + c.percentage, 0) / courses.length
  );

  if (selectedCourse) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCourse(null)}
            className="mb-2 font-sans text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to all courses
          </Button>
          <h1 className="text-4xl text-foreground">{selectedCourse.name}</h1>
          <p className="text-muted-foreground font-sans mt-1">
            {selectedCourse.code} · {selectedCourse.attended}/{selectedCourse.total} classes attended
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-6 flex items-center gap-6">
              <div
                className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                  selectedCourse.percentage >= 85
                    ? "border-success"
                    : selectedCourse.percentage >= 75
                    ? "border-warning"
                    : "border-destructive"
                }`}
              >
                <span className="text-2xl font-serif text-foreground">
                  {selectedCourse.percentage.toFixed(1)}%
                </span>
              </div>
              <div>
                <p className="text-lg font-serif text-foreground">Subject Attendance</p>
                <p className="text-sm font-sans text-muted-foreground">
                  {selectedCourse.percentage >= 85
                    ? "Good standing"
                    : selectedCourse.percentage >= 75
                    ? "Needs improvement"
                    : "Below minimum requirement"}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div>
          <h2 className="text-xl font-serif text-foreground mb-3">Class-by-Class Record</h2>
          <div className="space-y-2">
            {selectedCourse.classes.map((cls, i) => (
              <motion.div
                key={cls.date + cls.topic}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.03 }}
              >
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {cls.present ? (
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive shrink-0" />
                      )}
                      <div>
                        <p className="font-sans text-sm font-medium text-foreground">{cls.topic}</p>
                        <p className="font-sans text-xs text-muted-foreground">{cls.date}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`font-sans text-xs ${
                        cls.present
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }`}
                    >
                      {cls.present ? "Present" : "Absent"}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl text-foreground">Attendance</h1>
        <p className="text-muted-foreground font-sans mt-1">Spring 2026 Semester · Tap a course for details</p>
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
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedCourse(course)}
            >
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
