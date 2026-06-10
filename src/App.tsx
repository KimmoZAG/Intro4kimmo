import { useEffect, useMemo, useState } from "react"
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  CalendarDays,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Layers3,
  Mail,
  MapPin,
  Moon,
  Send,
  Sparkles,
  Sun,
  Target,
  Trophy,
  UserRound,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import "./App.css"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

type Project = {
  title: string
  tag: string
  role: string
  period: string
  link: string
  description: string
  highlights: string[]
  stack: string[]
}

type Education = {
  school: string
  degree: string
  college: string
  lab: string
  period: string
  gpa: string
}

type ResearchItem = {
  year: string
  title: string
  meta: string
  link?: string
}

const navItems = [
  { href: "#profile", label: "主页" },
  { href: "#strengths", label: "优势" },
  { href: "#education", label: "教育" },
  { href: "#projects", label: "项目" },
  { href: "#research", label: "科研" },
  { href: "#contact", label: "联系" },
]

const profile = {
  name: "张睿诚",
  englishName: "Kimmo Zhang",
  headline: "华中科技大学计算机硕士\nAgent Memory / AI Infra / AI 系统",
  role: "服务计算技术与系统教育部重点实验室\n金海-廖小飞系统组",
  location: "Wuhan, China\n2027.06 硕士毕业",
  email: "kimmozrc@qq.com",
  github: "https://github.com/KimmoZAG",
  repo: "https://github.com/KimmoZAG/Intro4kimmo",
  photo: `${import.meta.env.BASE_URL}profile-photo.png`,
  summary:
    "我关注智能体记忆、大模型KV缓存、推理编排与效能。参与国家科技重大专项子课题、国家自然科学基金项目和华为合作项目，负责从系统设计到工程落地的全栈研发工作。",
}

const features: Feature[] = [
  {
    icon: Target,
    title: "系统方向聚焦",
    description: "围绕 LLM Memory、Agent Workflow 和推理引擎形成连续项目线。",
  },
  {
    icon: Code2,
    title: "工程落地能力强",
    description: "熟悉 Python/C++ 混合开发、CI/CD、CLI 工具链与跨仓库协作。",
  },
  {
    icon: Sparkles,
    title: "科研产出可验证",
    description: "覆盖 SIGMOD、SCI、系统演示、软著与专利等可验证成果。",
  },
]

const education: Education[] = [
  {
    school: "华中科技大学",
    degree: "硕士 · 计算机科学与技术",
    college: "计算机科学与技术学院\n计算机07班",
    lab: "服务计算技术与系统教育部重点实验室\n金海-廖小飞系统组",
    period: "2024.09 — 2027.06（预计）",
    gpa: "GPA 3.72 / 4.0",
  },
  {
    school: "重庆邮电大学",
    degree: "本科 · 计算机科学与技术",
    college: "计算机科学与技术学院\n卓越工程师班",
    lab: "图像认知重庆市重点实验室\n高新波三维视觉组",
    period: "2020.09 — 2024.06",
    gpa: "GPA 3.45 / 4.0",
  },
]

const projects: Project[] = [
  {
    title: "多级内存架构的流式记忆智能体",
    tag: "LLM Memory",
    role: "项目研发负责人（Python）",
    period: "2025.06 — 2026.01",
    link: "https://github.com/intellistream/neuromem",
    description: "华为盘古合作项目。面向大模型记忆能力，构建流式评测基准和多级内存智能体。",
    highlights: [
      "提出索引与存储解耦的记忆管理架构，降低记忆表单构建复杂度。",
      "构建流式记忆评测 Pipeline，复现 MemoryBank、MemGPT、Mem0 等系统。",
      "组合多级记忆结构并优化处理路径，探索效率与准确度最优的记忆体。",
    ],
    stack: ["Python", "LLM Memory", "Benchmark", "Agent"],
  },
  {
    title: "复合型 AI 推理编排框架 Sage",
    tag: "AI Workflow",
    role: "编排与中间件开发工程师 · Python/C++ 混合开发",
    period: "2024.10 — 至今",
    link: "https://github.com/intellistream/SAGE",
    description: "B 类国家自然科学基金项目，开发用于科学探索的分布式复合型大模型应用开发框架。",
    highlights: [
      "设计类 Flink 流式数据流编排 API，支持灵活组装 RAG、Agent 等 Workflow，平均减少约 60% 编排时代码量。",
      "动态解析 DAG 并实例化物理算子，引入有界队列通信机制，缓解高负载任务积压导致的系统假死。",
      "基于 PyBind11 封装 C++ 内核，设计 Service 接入规范，支撑 4 项科研项目快速落地。",
    ],
    stack: ["Python", "C++", "PyBind11", "DAG", "RAG"],
  },
  {
    title: "面向国产芯片的大模型推理引擎 SageLLM",
    tag: "Inference Engine",
    role: "开发工程师（Python）",
    period: "2025.10 — 至今",
    link: "https://github.com/intellistream/SAGE",
    description: "国家科技重大专项子课题。开发适配 Ascend、MetaX 等国产芯片的大模型推理引擎。",
    highlights: [
      "开发 SageModelLoader，支持 Safetensors、GGUF 解析和 Ascend 910B 权重适配。",
      "研发异构芯片 CLI 工具，集成 PyPI 发布与环境预检，冷启动延迟降低 70%。",
      "搭建 CI/CD 测试流水线，支撑 13 个核心仓库与 20 人团队协作。",
    ],
    stack: ["Python", "Ascend", "Safetensors", "CI/CD", "CLI"],
  },
  {
    title: "重黎号火星车视觉系统开发与设计",
    tag: "Robotics Vision",
    role: "机器人调试工程师 · Python 开发",
    period: "2023.09 — 2024.05",
    link: "https://news.cqnews.net/1/detail/1078102377734504448/web/content_1078102377734504448.html",
    description: "国家重点研发计划，在模拟场地下为重黎号火星车设计并开发视觉系统。",
    highlights: [
      "基于 ROS2 构建多节点数据采集框架，实现 Image、PointCloud、TF 等异构数据实时通信与融合。",
      "统一多传感器时间戳到系统时钟基准，显著缩短数据对齐时间。",
      "完成双目相机标定、校园场景采集流程与多模态原始数据规范化整理。",
    ],
    stack: ["Python", "ROS2", "PointCloud", "Stereo Vision"],
  },
  {
    title: "基于三维卷积和扩散模型的点云处理系统",
    tag: "3D Vision",
    role: "项目研发负责人（Python）",
    period: "2022.12 — 2023.10",
    link: "https://github.com/KimmoZAG/ZRCGraduationProject",
    description: "本科毕业设计项目。开发点云识别、分割与图像到点云生成软件。",
    highlights: [
      "集成 PointNet++、Point-E，实现 3D 识别、点云分割与点云生成。",
      "使用 Qt Designer 与 PyQt5 开发桌面端，支持用户认证与点云可视化。",
      "系统用于本科视觉课程教学，积累端到端软件开发经验。",
    ],
    stack: ["Python", "PyQt5", "PointNet++", "Point-E"],
  },
]

const researchItems: ResearchItem[] = [
  {
    year: "2026",
    title: "Neuromem: Decomposition of the Streaming Lifecycle in LLMs Memory",
    meta: "ICML 投稿 · 排名第一",
  },
  {
    year: "2025",
    title: "大模型推理框架 SAGE",
    meta: "NDBC 最佳系统演示奖 · 四人学生作者之一",
  },
  {
    year: "2025",
    title: "Neuromem for LLMs Memory",
    meta: "NDBC 系统演示报告 · 排名第一",
  },
  {
    year: "2025",
    title: "LLMs Memory Operators and Data Structures",
    meta: "ChinaStorage 系统演示报告 · 排名第一",
  },
  {
    year: "2025",
    title: "Benchmarking In-Memory Continuous ANNS",
    meta: "SIGMOD 2026 · CCF A · 排名第三",
    link: "https://github.com/CGCL-codes/CANDOR-Bench",
  },
  {
    year: "2024",
    title: "Cf3d: Category Fused 3d Point Cloud Retrieval",
    meta: "Signal Processing · SCI 二区 · 第一学生作者",
    link: "https://www.sciencedirect.com/science/article/pii/S0165168424004250",
  },
  {
    year: "2023",
    title: "多模态点云处理系统软件著作权 / 点云配准方法专利",
    meta: "软著排名第一 · 专利排名第三",
  },
]

const honors = [
  "2025 华中科技大学校级学业一等奖学金",
  "2025 服务计算技术与系统教育部重点实验室一等奖学金",
  "2024 华中科技大学校级学业二等奖学金",
  "2023 重庆邮电大学三好学生、科研先进个人",
  "2022 MathorCup 高校大数据挑战赛国家三等奖、数学建模挑战赛国家二等奖",
  "2022 中国国际“互联网+”大学生创新创业大赛省级银奖",
  "2022 蓝桥杯软件和信息技术专业人才大赛省级二等奖",
  "2021 MathorCup 高校数学建模挑战赛全国三等奖",
  "2021 中国国际“互联网+”大学生创新创业大赛省级金奖",
]

const capabilities = [
  "Python / C++ / PyBind11 / CMake",
  "LLM Memory / Agent / RAG Workflow",
  "大模型推理引擎 / 异构 AI 芯片适配",
  "CLI 工具链 / CI/CD / 跨仓库依赖管理",
  "ROS2 / 3D Vision / Point Cloud Processing",
  "CET-6 · 熟练阅读英文学术论文",
]

const stats = [
  { value: "5", label: "核心项目" },
  { value: "3篇", label: "CCF A 成果" },
  { value: "2项", label: "软著与专利" },
]

function getInitialDarkMode() {
  if (typeof window === "undefined") {
    return true
  }

  const savedTheme = window.localStorage.getItem("theme")
  if (savedTheme) {
    return savedTheme === "dark"
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function LineBreakText({ text }: { text: string }) {
  const lines = text.split("\n")

  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ))
}

function App() {
  const [isDark, setIsDark] = useState(getInitialDarkMode)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    window.localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <main className="app-shell min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950 transition-colors duration-300 dark:bg-[#06070d] dark:text-white">
      <div className="mesh-background" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]" />

      <header className="fixed left-4 right-4 top-4 z-50 mx-auto max-w-6xl">
        <nav className="glass-panel flex items-center justify-between gap-3 rounded-full px-4 py-3 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl dark:shadow-black/30" aria-label="主导航">
          <a href="#profile" className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <span className="flex size-9 items-center justify-center rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
              <UserRound className="size-4" aria-hidden="true" />
            </span>
            <span className="hidden text-sm font-bold tracking-tight sm:inline">{profile.englishName}</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-300 dark:hover:bg-white dark:hover:text-slate-950">
                {item.label}
              </a>
            ))}
          </div>

          <button type="button" onClick={() => setIsDark((value) => !value)} className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 transition-colors duration-200 hover:border-blue-400 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:hover:border-blue-300" aria-label="切换明暗主题">
            {isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
          </button>
        </nav>
      </header>

      <section id="profile" className="relative mx-auto flex min-h-screen max-w-6xl items-center px-5 pb-20 pt-32 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise">
            <Badge variant="outline" className="mb-5 rounded-full border-blue-200 bg-blue-50 px-3 py-1 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200">
              <Sparkles className="size-3.5" aria-hidden="true" />
              AI Systems · AI Infra · Agent Memory
            </Badge>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              {profile.name}
              <span className="text-gradient block">{profile.englishName}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 cursor-pointer rounded-full bg-blue-600 px-6 text-base font-bold text-white shadow-xl shadow-blue-600/25 transition-all duration-200 hover:bg-blue-500 focus-visible:ring-blue-500">
                <a href="#projects">
                  查看代表项目
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 cursor-pointer rounded-full border-slate-300 bg-white/70 px-6 text-base font-bold text-slate-900 backdrop-blur-xl transition-colors duration-200 hover:border-slate-900 hover:bg-slate-950 hover:text-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-slate-950">
                <a href={`mailto:${profile.email}`}>
                  联系我
                  <Send className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((item) => (
                <div key={item.label} className="glass-panel rounded-3xl p-4 text-center">
                  <div className="text-2xl font-black text-slate-950 dark:text-white">{item.value}</div>
                  <div className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid max-w-xl gap-3 sm:grid-cols-[1.05fr_0.95fr]">
              <div className="glass-panel rounded-[1.75rem] p-5 shadow-xl shadow-slate-950/5 dark:shadow-black/20">
                <div className="flex items-center gap-3 text-sm font-black text-blue-600 dark:text-blue-300">
                  <Database className="size-4" aria-hidden="true" />
                  Current Focus
                </div>
                <p className="mt-3 text-base font-black leading-6 text-slate-950 dark:text-white">构建可靠的大模型系统</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">从记忆评测、推理编排到Agent搭建，关注KV Cache、系统抽象与可复现评测。</p>
              </div>
              <div className="grid gap-3">
                <div className="rounded-[1.5rem] bg-slate-950 p-4 text-white shadow-xl shadow-slate-950/15 dark:bg-white dark:text-slate-950">
                  <Cpu className="mb-3 size-5" aria-hidden="true" />
                  <p className="text-sm font-black leading-5">Python / C++ / JAVA<br />Vibe coding / Skill / Agent</p>
                </div>
                <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-[1.5rem] border border-slate-200 bg-white/75 p-4 text-slate-950 transition-colors duration-200 hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-blue-300/50">
                  <Github className="mb-3 size-5 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                  <p className="text-sm font-black leading-5">GitHub<br />KimmoZAG</p>
                </a>
              </div>
            </div>
          </div>

          <aside className="relative mx-auto w-full max-w-md lg:ml-auto" aria-label="个人名片预览">
            <div className="orbit-ring" aria-hidden="true" />
            <Card className="hero-portrait relative overflow-hidden border-white/60 bg-white/85 p-0 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 dark:shadow-blue-950/30">
              <div className="relative m-4 overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-900 sm:m-5">
                <img src={profile.photo} alt="张睿诚个人照片" className="h-[340px] w-full object-cover object-center sm:h-[380px]" loading="lazy" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-200">Profile</p>
                  <h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">{profile.name}</h2>
                  <p className="font-hand text-3xl text-blue-100">{profile.englishName}</p>
                </div>
              </div>

              <CardContent className="relative z-10 space-y-4 p-5 pt-0 sm:p-6 sm:pt-0">
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                    <Briefcase className="size-4" aria-hidden="true" />
                    当前定位
                  </div>
                  <p className="mt-3 text-xl font-black text-slate-950 dark:text-white"><LineBreakText text={profile.headline} /></p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300"><LineBreakText text={profile.role} /></p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                    <MapPin className="mb-3 size-5 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300"><LineBreakText text={profile.location} /></p>
                  </div>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-3xl border border-slate-200 bg-white/70 p-4 transition-colors duration-200 hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-300/50">
                    <Github className="mb-3 size-5 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">GitHub / KimmoZAG</p>
                  </a>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      <section id="strengths" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-label">Strengths</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">从系统研发到科研产出</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="glass-panel animate-rise border-white/70 bg-white/80 shadow-xl shadow-slate-950/5 transition-all duration-300 hover:border-blue-200 hover:shadow-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-300/40" style={{ animationDelay: `${index * 120}ms` }}>
                <CardContent className="p-6">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950 dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section id="education" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-10">
          <p className="section-label">Education</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">教育经历</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {education.map((item) => (
            <Card key={item.school} className="glass-panel border-white/70 bg-white/80 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/5">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">{item.school}</h3>
                    <p className="mt-2 text-base font-bold text-blue-600 dark:text-blue-300">{item.degree}</p>
                  </div>
                  <BookOpen className="size-6 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                </div>
                <div className="mt-6 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  <p><LineBreakText text={item.college} /></p>
                  <p><LineBreakText text={item.lab} /></p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="outline" className="rounded-full border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/5">{item.period}</Badge>
                    <Badge className="rounded-full bg-blue-600 text-white">{item.gpa}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="projects" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-label">Projects</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">代表项目</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            项目按与目标岗位相关度排序，重点突出系统设计、性能优化、跨语言工程化和团队协作。
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.title} className="group glass-panel relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-950/5 transition-all duration-300 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-300/50" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-slate-950 opacity-80 dark:to-white" />
              <div className="flex items-center justify-between gap-4">
                <Badge variant="outline" className="rounded-full border-slate-200 bg-white/70 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">{project.tag}</Badge>
                <Layers3 className="size-5 text-blue-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 dark:text-blue-300" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">{project.title}</h3>
              <div className="mt-3 grid gap-2 text-xs font-bold text-slate-500 sm:grid-cols-[auto_1fr] dark:text-slate-400">
                <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" aria-hidden="true" />{project.period}</span>
                <span className="sm:text-right">{project.role}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
              <ul className="mt-5 space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-300" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full text-sm font-black text-blue-600 transition-colors duration-200 hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-300">
                查看项目链接
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="research" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="section-label">Research</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">科研经历与成果</h2>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              科研指导老师：张书豪、刘海坤。成果覆盖大模型记忆、向量检索、点云检索、系统演示、软著与专利。
            </p>
          </div>

          <div className="relative space-y-4">
            <div className="timeline-line" aria-hidden="true" />
            {researchItems.map((item) => (
              <div key={`${item.year}-${item.title}`} className="glass-panel relative ml-8 rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-950/5 dark:border-white/10 dark:bg-white/5">
                <div className="absolute -left-10 top-7 flex size-4 items-center justify-center rounded-full bg-blue-600 ring-8 ring-blue-100 dark:ring-blue-950" />
                <div className="text-sm font-black text-blue-600 dark:text-blue-300">{item.year}</div>
                <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-slate-950 dark:text-white">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-blue-300">
                      {item.title}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="honors" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-label">Honors & Skills</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">荣誉与专业能力</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            保留高价值荣誉，并把技能从“语言列表”升级为更贴近系统研发岗位的能力标签。
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="glass-panel border-white/70 bg-white/80 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/5">
            <CardContent className="p-6 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <Trophy className="size-6 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">个人荣誉</h3>
              </div>
              <div className="grid gap-3">
                {honors.map((honor) => (
                  <div key={honor} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-semibold leading-6 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    {honor}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/70 bg-white/80 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/5">
            <CardContent className="p-6 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <Cpu className="size-6 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">专业能力</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {capabilities.map((skill) => (
                  <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-blue-600 p-5 text-white shadow-lg shadow-blue-600/25">
                  <Database className="mb-4 size-6" aria-hidden="true" />
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">Focus</p>
                  <p className="mt-2 text-xl font-black">LLM Systems</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
                  <Award className="mb-4 size-6 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Profile</p>
                  <p className="mt-2 text-xl font-black text-slate-950 dark:text-white">Research + Engineering</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2.25rem] border border-blue-500/30 bg-blue-600 p-8 text-white shadow-2xl shadow-blue-600/25 dark:border-blue-400/20 dark:bg-blue-700 sm:p-10 lg:p-12">
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="font-hand text-3xl text-blue-100">Let's build reliable AI systems</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">欢迎联系我</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50">
                欢迎通过邮箱或 GitHub 与我交流，期待你的来信。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button asChild size="lg" className="h-12 cursor-pointer rounded-full bg-white px-6 text-base font-black text-slate-950 transition-colors duration-200 hover:bg-blue-100">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="size-4" aria-hidden="true" />
                  {profile.email}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 cursor-pointer rounded-full border-white/20 bg-white/10 px-6 text-base font-black text-white transition-colors duration-200 hover:bg-white hover:text-slate-950">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github className="size-4" aria-hidden="true" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative mx-auto flex max-w-6xl flex-col gap-3 px-5 pb-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 dark:text-slate-400">
        <span>© {currentYear} {profile.englishName}. Built with React, TypeScript and Vite.</span>
        <a href="#profile" className="inline-flex w-fit items-center gap-2 rounded-full font-bold text-slate-700 transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-200 dark:hover:text-blue-300">
          回到顶部
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </footer>
    </main>
  )
}

export default App
