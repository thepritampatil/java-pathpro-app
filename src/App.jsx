import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  CheckCircle,
  Circle,
  Trophy,
  BarChart3,
  Code2,
  Terminal,
  Database,
  Globe,
  Cpu,
  Github,
  ExternalLink,
  ChevronRight,
  LayoutDashboard,
  Clock,
  Flame,
  Award,
  Settings,
  Target,
  TrendingUp,
  Zap,
  Calendar,
  Star,
  Medal,
  Rocket,
  Search,
  ChevronDown,
  ChevronUp,
  Book,
  GraduationCap,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Plus,
  X,
  Edit2,
  Save,
  Timer,
  Activity,
  Bookmark,
  Hash,
  ArrowRight,
  Brain,
  Coffee,
  Upload,
  Eye,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { COMPLETE_ROADMAP, LEARNING_TECHNIQUES } from "./data/roadmapData";

// ==================== UTILITY FUNCTIONS ====================
const getIconComponent = (iconName) => {
  const icons = { Terminal, Database, Globe, Cpu, Award };
  return icons[iconName] || Terminal;
};

const calculateProgress = (topics) => {
  if (!topics || topics.length === 0) return 0;
  const completed = topics.filter((t) => t.completed).length;
  return Math.round((completed / topics.length) * 100);
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

// ==================== REUSABLE COMPONENTS ====================

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  disabled,
  className = "",
}) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20",
    secondary:
      "bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    ghost: "bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className={`bg-gray-900 rounded-2xl border border-gray-800 w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const ProgressBar = ({
  progress,
  color = "blue",
  showLabel = true,
  height = "h-2.5",
}) => {
  const colorMap = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1 text-xs text-gray-400">
          <span>Progress</span>
          <span className="font-bold">{progress}%</span>
        </div>
      )}
      <div
        className={`w-full bg-gray-700 rounded-full ${height} overflow-hidden`}
      >
        <div
          className={`${colorMap[color]} ${height} rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
      active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    {badge && (
      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
        {badge}
      </span>
    )}
  </button>
);

const TopicRow = ({ topic, onToggle, onExpand, isExpanded, onAddNote }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="mb-3">
      <div
        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all border border-gray-700 hover:border-gray-600 group"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => onToggle(topic.id)}
            className="shrink-0 transform hover:scale-110 transition-transform"
          >
            {topic.completed ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-500 group-hover:text-blue-500" />
            )}
          </button>
          <div className="flex-1">
            <span
              className={`${topic.completed ? "text-gray-400 line-through" : "text-gray-200"} font-medium`}
            >
              {topic.title}
            </span>
            {topic.subtopics && (
              <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  {topic.subtopics.length} subtopics
                </span>
                <span>•</span>
                <span>{topic.practiceQuestions} questions</span>
                {topic.notes && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-blue-400">
                      <Bookmark className="w-3 h-3" />
                      Has notes
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {showActions && !topic.completed && (
            <Button
              variant="ghost"
              size="sm"
              icon={<Edit2 className="w-3 h-3" />}
              onClick={() => onAddNote(topic)}
            >
              Note
            </Button>
          )}
          {!topic.completed && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onToggle(topic.id)}
            >
              Complete
            </Button>
          )}
          {topic.subtopics && (
            <button
              onClick={() => onExpand(topic.id)}
              className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded-lg"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {isExpanded && topic.subtopics && (
        <div className="mt-2 ml-10 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
          <h5 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Topics to Master
          </h5>
          <ul className="space-y-2">
            {topic.subtopics.map((subtopic, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-3 text-sm text-gray-300 p-2 rounded hover:bg-gray-800/50"
              >
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <span>{subtopic}</span>
              </li>
            ))}
          </ul>
          {topic.notes && (
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <h5 className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Your Notes
              </h5>
              <p className="text-sm text-gray-300 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                {topic.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project, onSubmit, onViewDetails }) => (
  <div className="bg-gray-900/40 p-5 rounded-2xl border border-dashed border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg group">
    <div className="flex items-start justify-between mb-3">
      <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">
        {project.name}
      </h4>
      <span
        className={`text-xs px-2 py-1 rounded font-bold ${
          project.difficulty === "Beginner"
            ? "bg-green-500/10 text-green-500"
            : project.difficulty === "Intermediate"
              ? "bg-yellow-500/10 text-yellow-500"
              : project.difficulty === "Advanced"
                ? "bg-orange-500/10 text-orange-500"
                : "bg-red-500/10 text-red-500"
        }`}
      >
        {project.difficulty}
      </span>
    </div>
    <p className="text-sm text-gray-400 mb-3">{project.description}</p>
    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
      <span className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {project.estimatedHours}h
      </span>
      <span className="flex items-center gap-1">
        <Code2 className="w-3 h-3" />
        {project.skills.length} skills
      </span>
    </div>
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        icon={<Eye className="w-3 h-3" />}
        onClick={() => onViewDetails(project)}
        className="flex-1"
      >
        Details
      </Button>
      <Button
        variant="primary"
        size="sm"
        icon={<Upload className="w-3 h-3" />}
        onClick={() => onSubmit(project)}
        className="flex-1"
      >
        Submit
      </Button>
    </div>
  </div>
);

const StatCard = ({ icon, value, label, color = "blue" }) => {
  const colorMap = {
    blue: "text-blue-500",
    purple: "text-purple-500",
    green: "text-green-500",
    yellow: "text-yellow-500",
    orange: "text-orange-500",
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all">
      <div className={`${colorMap[color]} mb-3`}>{icon}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
};

// ==================== FOCUS MODE COMPONENT ====================
const FocusMode = ({ isOpen, onClose, topics }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            alert("🎉 Focus session complete! Great work!");
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🎯 Focus Mode - Pomodoro Timer"
      size="md"
    >
      <div className="text-center space-y-6">
        <div className="text-8xl font-bold text-blue-500 mb-8 font-mono">
          {formatTime(minutes * 60 + seconds)}
        </div>
        <div className="flex justify-center gap-4">
          {!isActive ? (
            <Button
              variant="success"
              size="lg"
              icon={<Play className="w-5 h-5" />}
              onClick={() => setIsActive(true)}
            >
              Start Focus
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              icon={<Pause className="w-5 h-5" />}
              onClick={() => setIsActive(false)}
            >
              Pause
            </Button>
          )}
          <Button
            variant="ghost"
            size="lg"
            icon={<RotateCcw className="w-5 h-5" />}
            onClick={() => {
              setMinutes(25);
              setSeconds(0);
              setIsActive(false);
            }}
          >
            Reset
          </Button>
        </div>
        <div className="pt-6 border-t border-gray-800">
          <label className="block text-sm font-bold text-gray-400 mb-2">
            Focus Topic (Optional)
          </label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a topic...</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
};

// ==================== DAILY STUDY TRACKER COMPONENT ====================
const DailyStudyTracker = ({ isOpen, onClose }) => {
  const [todayHours, setTodayHours] = useState(0);
  const [todayTopics, setTodayTopics] = useState(0);
  const [notes, setNotes] = useState("");

  const handleLogActivity = () => {
    const today = new Date().toISOString().split("T")[0];
    const activityData = JSON.parse(
      localStorage.getItem("daily_activity") || "[]",
    );
    activityData.push({
      date: today,
      hours: todayHours,
      topics: todayTopics,
      notes,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("daily_activity", JSON.stringify(activityData));
    alert("✅ Daily activity logged successfully!");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📊 Daily Study Tracker"
      size="md"
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-6 rounded-xl border border-blue-800/50">
          <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h4>
          <p className="text-sm text-gray-300">
            Track your daily learning progress
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">
            Study Hours Today
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={todayHours}
              onChange={(e) => setTodayHours(parseFloat(e.target.value))}
              className="flex-1"
            />
            <div className="text-3xl font-bold text-blue-500 w-20 text-right">
              {todayHours}h
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">
            Topics Completed
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={todayTopics}
              onChange={(e) => setTodayTopics(parseInt(e.target.value))}
              className="flex-1"
            />
            <div className="text-3xl font-bold text-green-500 w-20 text-right">
              {todayTopics}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-300 mb-2">
            Notes & Reflections
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What did you learn today? Any challenges or breakthroughs?"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 resize-none"
            rows="4"
          />
        </div>

        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h5 className="text-sm font-bold text-gray-400 mb-2">Quick Stats</h5>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {todayHours}h
              </div>
              <div className="text-xs text-gray-500">Study Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {todayTopics}
              </div>
              <div className="text-xs text-gray-500">Topics Done</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleLogActivity}
            disabled={todayHours === 0 && todayTopics === 0}
            icon={<Save className="w-4 h-4" />}
            className="flex-1"
          >
            Log Activity
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// ==================== MAIN APP COMPONENT ====================
export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [phases, setPhases] = useState(() => {
    const saved = localStorage.getItem("javapath-phases");
    return saved ? JSON.parse(saved) : COMPLETE_ROADMAP;
  });

  const [expandedTopics, setExpandedTopics] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [showDailyTracker, setShowDailyTracker] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicNote, setTopicNote] = useState("");

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("javapath-stats");
    return saved
      ? JSON.parse(saved)
      : {
          totalLearningHours: 0,
          topicsCompleted: 0,
          projectsCompleted: 0,
          currentStreak: 0,
          longestStreak: 0,
        };
  });

  const [activityData] = useState([
    { day: "Mon", hrs: 2 },
    { day: "Tue", hrs: 4 },
    { day: "Wed", hrs: 3 },
    { day: "Thu", hrs: 6 },
    { day: "Fri", hrs: 2 },
    { day: "Sat", hrs: 8 },
    { day: "Sun", hrs: 5 },
  ]);

  useEffect(() => {
    localStorage.setItem("javapath-phases", JSON.stringify(phases));
  }, [phases]);

  useEffect(() => {
    localStorage.setItem("javapath-stats", JSON.stringify(stats));
  }, [stats]);

  const overallStats = useMemo(() => {
    let totalTopics = 0,
      completedTopics = 0,
      totalProjects = 0;
    phases.forEach((phase) => {
      totalTopics += phase.topics.length;
      completedTopics += phase.topics.filter((t) => t.completed).length;
      totalProjects += phase.projects.length;
    });
    return {
      percent:
        totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
      completed: completedTopics,
      total: totalTopics,
      totalProjects,
    };
  }, [phases]);

  const toggleTopic = (topicId) => {
    setPhases((prev) =>
      prev.map((phase) => ({
        ...phase,
        topics: phase.topics.map((t) => {
          if (t.id === topicId) {
            const newCompleted = !t.completed;
            setStats((s) => ({
              ...s,
              topicsCompleted: newCompleted
                ? s.topicsCompleted + 1
                : Math.max(0, s.topicsCompleted - 1),
            }));
            return { ...t, completed: newCompleted };
          }
          return t;
        }),
      })),
    );
  };

  const handleAddNote = (topic) => {
    setSelectedTopic(topic);
    setTopicNote(topic.notes || "");
    setShowNoteModal(true);
  };

  const saveTopicNote = () => {
    setPhases((prev) =>
      prev.map((phase) => ({
        ...phase,
        topics: phase.topics.map((t) =>
          t.id === selectedTopic.id ? { ...t, notes: topicNote } : t,
        ),
      })),
    );
    setShowNoteModal(false);
  };

  const allTopics = useMemo(() => {
    return phases.flatMap((phase) =>
      phase.topics.map((t) => ({ ...t, phase: phase.title })),
    );
  }, [phases]);

  const allProjects = useMemo(() => {
    return phases
      .flatMap((phase) =>
        phase.projects.map((p) => ({ ...p, phase: phase.title })),
      )
      .filter((p) => {
        const matchesSearch = p.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesDifficulty =
          filterDifficulty === "all" || p.difficulty === filterDifficulty;
        return matchesSearch && matchesDifficulty;
      });
  }, [phases, searchQuery, filterDifficulty]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex font-sans">
      <FocusMode
        isOpen={showFocusMode}
        onClose={() => setShowFocusMode(false)}
        topics={allTopics}
      />
      <DailyStudyTracker
        isOpen={showDailyTracker}
        onClose={() => setShowDailyTracker(false)}
      />

      {/* Note Modal */}
      <Modal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        title={`Notes: ${selectedTopic?.title}`}
        size="md"
      >
        <div className="space-y-4">
          <textarea
            value={topicNote}
            onChange={(e) => setTopicNote(e.target.value)}
            placeholder="Add your notes, insights, or questions..."
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 resize-none"
            rows="6"
          />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowNoteModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={saveTopicNote}
              icon={<Save className="w-4 h-4" />}
              className="flex-1"
            >
              Save Note
            </Button>
          </div>
        </div>
      </Modal>

      {/* Project Modal */}
      <Modal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        title={`Submit: ${selectedProject?.name}`}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              GitHub Repository URL
            </label>
            <input
              type="url"
              placeholder="https://github.com/username/project"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Live Demo URL
            </label>
            <input
              type="url"
              placeholder="https://project.vercel.app"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setStats((s) => ({
                ...s,
                projectsCompleted: s.projectsCompleted + 1,
              }));
              setShowProjectModal(false);
              alert("✅ Project submitted!");
            }}
            icon={<Upload className="w-4 h-4" />}
            className="w-full"
            size="lg"
          >
            Submit Project
          </Button>
        </div>
      </Modal>

      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 flex flex-col p-6 space-y-6 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center space-x-3 px-2">
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-2 rounded-lg shadow-lg">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold">
            JavaPath <span className="text-blue-500">Pro</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarItem
            icon={<BookOpen className="w-5 h-5" />}
            label="Roadmap"
            active={activeTab === "roadmap"}
            onClick={() => setActiveTab("roadmap")}
            badge={`${overallStats.percent}%`}
          />
          <SidebarItem
            icon={<Code2 className="w-5 h-5" />}
            label="Projects"
            active={activeTab === "projects"}
            onClick={() => setActiveTab("projects")}
            badge={allProjects.length}
          />
          <SidebarItem
            icon={<GraduationCap className="w-5 h-5" />}
            label="Learning Guide"
            active={activeTab === "techniques"}
            onClick={() => setActiveTab("techniques")}
          />
          <SidebarItem
            icon={<Target className="w-5 h-5" />}
            label="Goals"
            active={activeTab === "goals"}
            onClick={() => setActiveTab("goals")}
          />

          <div className="pt-4 border-t border-gray-800">
            <Button
              variant="primary"
              size="md"
              icon={<Timer className="w-4 h-4" />}
              onClick={() => setShowFocusMode(true)}
              className="w-full mb-2"
            >
              Focus Mode
            </Button>
            <Button
              variant="success"
              size="md"
              icon={<Activity className="w-4 h-4" />}
              onClick={() => setShowDailyTracker(true)}
              className="w-full"
            >
              Daily Tracker
            </Button>
          </div>
        </nav>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-semibold uppercase">
              Progress
            </span>
            <span className="text-blue-500 font-bold text-lg">
              {overallStats.percent}%
            </span>
          </div>
          <ProgressBar progress={overallStats.percent} showLabel={false} />
          <div className="mt-3 text-xs text-gray-500">
            {overallStats.completed} of {overallStats.total} topics
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-orange-500/10 text-orange-500 px-4 py-3 rounded-full border border-orange-500/20">
          <Flame className="w-4 h-4" />
          <span className="font-bold">{stats.currentStreak} Day Streak</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3">
              {activeTab === "dashboard" && (
                <>
                  <Activity className="w-8 h-8 text-blue-500" /> Dashboard
                </>
              )}
              {activeTab === "roadmap" && (
                <>
                  <BookOpen className="w-8 h-8 text-blue-500" /> Roadmap
                </>
              )}
              {activeTab === "projects" && (
                <>
                  <Code2 className="w-8 h-8 text-blue-500" /> Projects
                </>
              )}
              {activeTab === "techniques" && (
                <>
                  <Brain className="w-8 h-8 text-blue-500" /> Learning Guide
                </>
              )}
              {activeTab === "goals" && (
                <>
                  <Target className="w-8 h-8 text-blue-500" /> Goals
                </>
              )}
            </h2>
            <p className="text-gray-400 mt-1">
              {activeTab === "dashboard" && "Track your learning progress"}
              {activeTab === "roadmap" && "Master Java Full Stack Development"}
              {activeTab === "projects" && "Build real-world projects"}
              {activeTab === "techniques" && "Learn from senior engineers"}
              {activeTab === "goals" && "Achieve your milestones"}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center font-bold shadow-lg text-lg">
            JD
          </div>
        </header>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<Timer className="w-5 h-5" />}
                onClick={() => setShowFocusMode(true)}
                className="h-20"
              >
                Start Focus Session
              </Button>
              <Button
                variant="success"
                size="lg"
                icon={<Activity className="w-5 h-5" />}
                onClick={() => setShowDailyTracker(true)}
                className="h-20"
              >
                Log Today's Study
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<BookOpen className="w-5 h-5" />}
                onClick={() => setActiveTab("roadmap")}
                className="h-20"
              >
                Continue Learning
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-blue-500" /> Study Hours
                    (Last 7 Days)
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activityData}>
                        <defs>
                          <linearGradient
                            id="colorHrs"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#3b82f6"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3b82f6"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="day" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#111827",
                            borderColor: "#374151",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="hrs"
                          stroke="#3b82f6"
                          fillOpacity={1}
                          fill="url(#colorHrs)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <StatCard
                    icon={<Clock className="w-6 h-6" />}
                    value={`${stats.totalLearningHours}h`}
                    label="Total Study Time"
                    color="purple"
                  />
                  <StatCard
                    icon={<Trophy className="w-6 h-6" />}
                    value={`${overallStats.completed}/${overallStats.total}`}
                    label="Topics Completed"
                    color="yellow"
                  />
                  <StatCard
                    icon={<Code2 className="w-6 h-6" />}
                    value={`${stats.projectsCompleted}/${overallStats.totalProjects}`}
                    label="Projects Done"
                    color="green"
                  />
                  <StatCard
                    icon={<Flame className="w-6 h-6" />}
                    value={stats.longestStreak}
                    label="Longest Streak"
                    color="orange"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-6 rounded-2xl border border-blue-800/50">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" /> Today's Focus
                  </h3>
                  <div className="space-y-3">
                    {allTopics
                      .filter((t) => !t.completed)
                      .slice(0, 2)
                      .map((topic) => (
                        <div
                          key={topic.id}
                          className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 cursor-pointer"
                        >
                          <div className="text-sm font-medium">
                            {topic.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {topic.phase}
                          </div>
                        </div>
                      ))}
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveTab("roadmap")}
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full mt-4"
                  >
                    Start Learning
                  </Button>
                </div>

                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Medal className="w-5 h-5 text-yellow-500" /> Achievements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                      <div>
                        <div className="text-sm font-bold">First Steps</div>
                        <div className="text-xs text-gray-500">
                          Complete 1 topic
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Roadmap */}
        {activeTab === "roadmap" && (
          <div className="space-y-8">
            {phases.map((phase) => (
              <div key={phase.id}>
                <div className="flex items-center justify-between mb-6 p-6 bg-gray-900 rounded-xl border border-gray-800">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-xl ${phase.color === "blue" ? "bg-blue-600/20 text-blue-500" : phase.color === "green" ? "bg-green-600/20 text-green-500" : "bg-purple-600/20 text-purple-500"}`}
                    >
                      {React.createElement(getIconComponent(phase.icon), {
                        className: "w-6 h-6",
                      })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{phase.title}</h3>
                      <p className="text-sm text-gray-500">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {phase.deadline}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-400">
                      {calculateProgress(phase.topics)}%
                    </div>
                    <div className="text-xs text-gray-500">Complete</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {phase.topics.map((topic) => (
                      <TopicRow
                        key={topic.id}
                        topic={topic}
                        onToggle={toggleTopic}
                        onExpand={(id) =>
                          setExpandedTopics((prev) => ({
                            ...prev,
                            [id]: !prev[id],
                          }))
                        }
                        isExpanded={expandedTopics[topic.id]}
                        onAddNote={handleAddNote}
                      />
                    ))}
                  </div>

                  <div className="space-y-4">
                    {phase.projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onSubmit={(p) => {
                          setSelectedProject(p);
                          setShowProjectModal(true);
                        }}
                        onViewDetails={(p) => setSelectedProject(p)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {activeTab === "projects" && (
          <div className="max-w-6xl space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSubmit={(p) => {
                    setSelectedProject(p);
                    setShowProjectModal(true);
                  }}
                  onViewDetails={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Learning Guide */}
        {activeTab === "techniques" && (
          <div className="max-w-6xl space-y-8">
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-8 rounded-2xl border border-blue-800/50">
              <h3 className="text-2xl font-bold mb-4">
                Professional Learning Strategies
              </h3>
              <p className="text-gray-300">
                Master techniques from senior engineers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEARNING_TECHNIQUES.map((technique) => (
                <div
                  key={technique.id}
                  className="p-6 bg-gray-900 rounded-2xl border border-gray-800"
                >
                  <h4 className="font-bold text-lg mb-2">{technique.title}</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    {technique.description}
                  </p>
                  {technique.tips && (
                    <ul className="space-y-2">
                      {technique.tips.map((tip, idx) => (
                        <li
                          key={idx}
                          className="flex items-start space-x-2 text-xs text-gray-500"
                        >
                          <Zap className="w-3 h-3 mt-0.5 text-yellow-500 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Goals */}
        {activeTab === "goals" && (
          <div className="max-w-4xl">
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-lg font-bold mb-4">Current Sprint</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  Complete 5 topics this week
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  Build first project
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
{
  /* Footer */
}
<footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <div>© {new Date().getFullYear()} JavaPath Pro. All rights reserved.</div>

    <div className="flex items-center gap-4">
      <a
        href="https://github.com/thepritampatil"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors flex items-center gap-1"
      >
        <Github className="w-4 h-4" />
        GitHub
      </a>

      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors flex items-center gap-1"
      >
        <ExternalLink className="w-4 h-4" />
        LinkedIn
      </a>
    </div>
  </div>

  <div className="mt-4 text-xs text-gray-600">
    Developed by{"❤️ by Pritam Patil"}
    <span className="text-blue-500 font-semibold">Pritam Patil</span>
  </div>
</footer>;
