import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ClipboardCheck, BarChart3, FileUp, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { label: "Attendance", value: "87%", icon: ClipboardCheck, route: "/attendance", color: "text-success" },
  { label: "GPA", value: "3.72", icon: BarChart3, route: "/scores", color: "text-primary" },
  { label: "Pending", value: "3", icon: FileUp, route: "/assignments", color: "text-warning" },
  { label: "Upcoming", value: "5", icon: CalendarDays, route: "/calendar", color: "text-accent" },
];

const upcomingEvents = [
  { title: "Data Structures Exam", date: "Apr 2, 2026", type: "exam" },
  { title: "AI Assignment Due", date: "Apr 5, 2026", type: "assignment" },
  { title: "Spring Hackathon", date: "Apr 10, 2026", type: "event" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl text-foreground">Good morning, {user?.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground font-sans mt-1">
          {user?.department} · Year {user?.year}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(s.route)}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                  <span className="text-xs font-sans text-muted-foreground uppercase tracking-wide">
                    {s.label}
                  </span>
                </div>
                <p className="text-3xl font-serif text-foreground">{s.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((e) => (
                <div key={e.title} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                  <div>
                    <p className="text-sm font-sans font-medium text-foreground">{e.title}</p>
                    <p className="text-xs font-sans text-muted-foreground">{e.date}</p>
                  </div>
                  <span
                    className={`text-xs font-sans px-2 py-1 rounded-full ${
                      e.type === "exam"
                        ? "bg-destructive/10 text-destructive"
                        : e.type === "assignment"
                        ? "bg-warning/10 text-warning"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {e.type}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {[
                { label: "View Attendance", route: "/attendance", icon: ClipboardCheck },
                { label: "Check Scores", route: "/scores", icon: BarChart3 },
                { label: "Submit Work", route: "/assignments", icon: FileUp },
                { label: "View Calendar", route: "/calendar", icon: CalendarDays },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.route)}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors font-sans text-sm text-foreground"
                >
                  <a.icon className="w-5 h-5 text-primary" />
                  {a.label}
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
