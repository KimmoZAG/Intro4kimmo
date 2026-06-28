import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronUp,
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
  linkLabel?: string
  extraLabel?: string
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
  { href: "#projects", label: "项目" },
  { href: "#education", label: "教育" },
  { href: "#research", label: "科研" },
  { href: "#strengths", label: "优势" },
  { href: "#contact", label: "联系" },
]

const profile = {
  name: "张睿诚",
  englishName: "Kimmo Zhang",
  headline: "华中科技大学计算机硕士\nAgent Memory / AI Infra / AI 系统",
  role: "服务计算技术与系统教育部重点实验室\n金海-廖小飞系统组",
  email: "kimmozrc@qq.com",
  github: "https://github.com/KimmoZAG",
  repo: "https://github.com/KimmoZAG/Intro4kimmo",
  photo: `${import.meta.env.BASE_URL}profile-photo.png`,
  summary:
    "我关注智能体记忆、大模型KV缓存、推理编排与效能。参与国家科技重大专项子课题、国家自然科学基金项目和华为合作项目，负责从系统设计到工程落地的全栈研发工作。",
}

// Rotating role keywords shown under the name with a typing effect.
const rotatingRoles = [
  "Agent Memory 记忆智能体",
  "AI Infra 推理系统",
  "KV Cache 缓存优化",
  "Dataflow 编排框架",
  "国产芯片推理引擎",
]

const features: Feature[] = [
  {
    icon: Target,
    title: "系统方向聚焦",
    description: "将记忆评测、KV Cache 管理、Agent 编排串成端到端链路，在算法效果与系统开销之间做可度量的权衡。",
  },
  {
    icon: Code2,
    title: "工程落地能力强",
    description: "Python/C++ 混合开发，搭配 Git 多仓库协作与 CI/CD 流水线，形成从原型到交付的工程规范闭环。",
  },
  {
    icon: Sparkles,
    title: "科研产出可验证",
    description: "学术论文覆盖 SIGMOD、ICML、Signal Processing，知识产权覆盖软著与专利，双线并行且均有正式编号可验证。",
  },
]

const education: Education[] = [
  {
    school: "华中科技大学",
    degree: "硕士 · 计算机科学与技术",
    college: "计算机科学与技术学院\n计算机07班",
    lab: "服务计算技术与系统教育部重点实验室\n金海-廖小飞系统组",
    period: "2024.09 — 2027.06",
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
    tag: "Agent Memory",
    role: "项目研发负责人（Python）",
    period: "2025.06 — 2026.01",
    link: "https://github.com/intellistream/neuromem",
    extraLabel: "华为合作 · ICML 26",
    description: "华为合作项目。构建首个面向大模型记忆能力的流式评测基准，并研发支持动态读写的多级内存智能体。",
    highlights: [
      "设计可组合记忆管理框架，解耦记忆索引与存储，解决高度耦合难编程问题，大幅简化记忆构建流程。",
      "构建流式记忆评测 Benchmark，支持 Locomo、LongMemEval 在流式下的标准化评测，组合 MemoryBank、MemGPT、Mem0 等主流语义算子与数据结构。",
      "通过多层记忆数据结构优化语义处理策略，分别得到执行效率与准确度最优的记忆体。",
    ],
    stack: ["Python", "Agent Memory", "Benchmark", "ICML 26"],
  },
  {
    title: "复合型 AI 推理编排框架 Sage",
    tag: "AI Workflow",
    role: "开发工程师 · Python/C++ 混合开发",
    period: "2024.10 — 至今",
    link: "https://github.com/intellistream/SAGE",
    extraLabel: "国自然 B 类 · ICML 26",
    description: "B 类国家自然科学基金项目。开发用于 24 小时不间断科学探索多智能体的分布式复合型智能体框架。",
    highlights: [
      "设计 DataStream 编排 API，支持灵活组装 RAG、Self-LOOP 等多种智能体，相较 LangGraph 平均减少约 60% 编排代码量。",
      "动态解析用户定义 DAG 拓扑并实例化物理算子，注入有界队列缓存通信机制，确保高负载下的服务稳定性。",
      "基于 PyBind11 将多个 C++ 项目封装为 Python 模块，统一 CMake 依赖消除编译冲突，设计中间件接入规范，支撑 4 项科研项目快速落地。",
      "推动工程规范化：建立分层架构依赖约束，通过 pre-commit hook 强制单向依赖，统一 toml 依赖管理，规范 15 人团队提交流程。",
    ],
    stack: ["Python", "C++", "PyBind11", "DAG", "RAG"],
  },
  {
    title: "KV Cache 管理系统 LMCache",
    tag: "KV Cache",
    role: "开发工程师（Python）",
    period: "2026.05 — 2026.08",
    link: "https://github.com/LMCache/LMCache",
    extraLabel: "腾讯实习",
    description: "腾讯实习。为大模型推理引擎设计的 KV Cache 管理系统，主攻可观测性与容量规划。",
    highlights: [
      "设计事件驱动的 MP 可观测性管线，含 40+ 事件类型的统一 EventBus 调度与无锁异步发布，实现 L1/L2/CacheBlend 全链路指标覆盖与订阅者异常隔离。",
      "设计 chunk hash 请求级日志记录器与 token 级全局命中率指标，支撑按模型/租户分片的实时监控与离线 trace replay。",
      "设计 LRU 缓存模拟器，重放线上日志计算不同容量下的命中率曲线，推动录制-重放-分析的容量规划闭环。",
    ],
    stack: ["Python", "KV Cache", "EventBus", "Observability"],
  },
  {
    title: "面向国产芯片的大模型推理引擎 vLLM-HUST",
    tag: "Inference Engine",
    role: "开发工程师（Python）",
    period: "2025.10 — 至今",
    link: "https://github.com/vLLM-HUST/vllm-hust",
    extraLabel: "国家科技重大专项",
    description: "国家科技重大专项子课题。开发支撑 AI4SCI 与华为 Ascend 的大模型推理引擎。",
    highlights: [
      "开发高性能统一加载架构 ModelLoader，支持 Safetensors、GGUF 等异构格式解析；通过零拷贝读取与内存映射适配 Ascend 910B 权重布局，最高降低 TTFT 延迟 14%。",
      "研发面向异构芯片的 CLI 运维工具，集成 PyPI 自动化发布与环境预检；通过软硬件栈原子化探测与状态缓存，将冷启动延迟降低 70%，并统一多子模块跨仓库依赖管理。",
      "搭建自动化 CI/CD 测试流水线，支持 13 个核心仓库的并行开发与回归测试，支撑 20+ 人团队高效协同。",
    ],
    stack: ["Python", "Ascend", "Safetensors", "CI/CD", "CLI"],
  },
  {
    title: "基于 Hadoop-HDFS 的主动预热系统",
    tag: "Distributed Storage",
    role: "代码开发、调试工程师（JAVA）",
    period: "2024.09 — 2024.11",
    link: "",
    extraLabel: "校企合作",
    description: "校企合作项目。为 HDFS 开发 HDD-SSD 主动预热系统。",
    highlights: [
      "设计主动预热 Pipeline，包含缓存元数据管理与预热进度追踪，可在指定流量下进行分区级别的预热。",
      "设计多粒度缓存重试机制，预防 DN 间读写平衡导致的 block 迁移及动态分区带来的预热失败，确保目标分区缓存完整度。",
      "设计客户端跟踪日志与数据透视面板，推动开发-DEBUG 闭环。",
    ],
    stack: ["JAVA", "Hadoop", "HDFS", "Cache"],
  },
  {
    title: "重黎号火星车视觉系统开发与设计",
    tag: "Robotics Vision",
    role: "机器人调试工程师 · Python 开发",
    period: "2023.09 — 2024.05",
    link: "https://news.cqnews.net/1/detail/1078102377734504448/web/content_1078102377734504448.html",
    linkLabel: "查看项目报道",
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

// Project filter buckets — each maps to one or more project tags.
const projectFilters: { id: string; label: string; tags: string[] }[] = [
  { id: "all", label: "全部", tags: [] },
  { id: "llm", label: "LLM 系统", tags: ["Agent Memory", "AI Workflow", "KV Cache", "Inference Engine"] },
  { id: "storage", label: "系统与存储", tags: ["Distributed Storage"] },
  { id: "vision", label: "视觉与机器人", tags: ["Robotics Vision", "3D Vision"] },
]

const researchItems: ResearchItem[] = [
  {
    year: "2026",
    title: "Neuromem: Decomposition of the Streaming Lifecycle in LLMs Memory",
    meta: "ICML 26 · CCF A · 排名第一",
    link: "https://icml.cc/virtual/2026/poster/61844",
  },
  {
    year: "2026",
    title: "SAGE: A Dataflow-Native Framework for Modular, Controllable, and Transparent LLM-Augmented Reasoning",
    meta: "ICML 26 · CCF A · 排名第三",
    link: "https://icml.cc/virtual/2026/poster/63809",
  },
  {
    year: "2025",
    title: "大模型推理框架 SAGE",
    meta: "NDBC 最佳系统演示奖 · 四人学生作者之一",
    link: "https://sage.org.ai/",
  },
  {
    year: "2025",
    title: "LLMs Memory Operators and Data Structures",
    meta: "ChinaStorage 系统演示报告 · 排名第一",
  },
  {
    year: "2025",
    title: "CANDOR-Bench: Benchmarking In-Memory Continuous ANNS under Dynamic Open-World Streams",
    meta: "SIGMOD 2026 · CCF A · 排名第三",
    link: "https://dl.acm.org/doi/10.1145/3786630",
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
    link: "https://patentimages.storage.googleapis.com/b5/ed/b7/60aa3f198da2bd/CN117095033B.pdf",
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
  "Agent Memory / Agent / RAG Workflow",
  "大模型推理引擎 / 异构 AI 芯片适配",
  "CLI 工具链 / CI/CD / 跨仓库依赖管理",
  "ROS2 / 3D Vision / Point Cloud Processing",
  "CET-6 · 熟练阅读英文学术论文",
]

const stats = [
  { value: 7, suffix: "", label: "核心项目" },
  { value: 3, suffix: "篇", label: "CCF A 成果" },
  { value: 2, suffix: "项", label: "软著与专利" },
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

const sectionIds = navItems.map((item) => item.href.replace("#", ""))

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// Typing/deleting carousel over a list of phrases.
function useTypingRotator(phrases: string[], { typeSpeed = 90, deleteSpeed = 45, hold = 1500 } = {}) {
  const reduced = prefersReducedMotion()
  const [text, setText] = useState(() => (reduced ? (phrases[0] ?? "") : ""))
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing")

  useEffect(() => {
    if (reduced) {
      return
    }

    const current = phrases[index % phrases.length] ?? ""
    let timer: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed)
      } else {
        timer = setTimeout(() => setPhase("holding"), hold)
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), hold)
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed)
      } else {
        timer = setTimeout(() => {
          setIndex((value) => (value + 1) % phrases.length)
          setPhase("typing")
        }, deleteSpeed)
      }
    }

    return () => clearTimeout(timer)
  }, [text, phase, index, phrases, typeSpeed, deleteSpeed, hold, reduced])

  return text
}

// Counts up to a target number when the element scrolls into view.
function useCountUp(target: number, duration = 1400) {
  const reduced = prefersReducedMotion()
  const [value, setValue] = useState(() => (reduced ? target : 0))
  const ref = useRef<HTMLDivElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setValue(Math.round(eased * target))
              if (progress < 1) {
                requestAnimationFrame(tick)
              }
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, reduced])

  return { ref, value }
}

function StatChip({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: animated } = useCountUp(value)

  return (
    <div ref={ref} className="stat-chip glass-panel rounded-3xl p-4 text-center">
      <div className="text-2xl font-black text-slate-950 dark:text-white">
        {animated}
        {suffix}
      </div>
      <div className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  )
}

// Reveal-on-scroll: adds .is-visible to any [data-reveal] element when it enters the viewport.
function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    if (elements.length === 0) {
      return
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// Tracks scroll progress (0-1) for the top progress bar.
function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const scrollTop = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? Math.min(scrollTop / height, 1) : 0)
    }
    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return progress
}

// Highlights the nav item for the section currently in view.
function useActiveSection() {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          setActive(visible.target.id)
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return active
}

// Soft pointer-follow glow + per-card 3D tilt.
function useCursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      return
    }
    const glow = glowRef.current
    let frame = 0
    let nextX = 0
    let nextY = 0

    const apply = () => {
      frame = 0
      if (glow) {
        glow.style.setProperty("--glow-x", `${nextX}px`)
        glow.style.setProperty("--glow-y", `${nextY}px`)
        glow.classList.add("is-active")
      }
    }

    const onMove = (event: PointerEvent) => {
      nextX = event.clientX
      nextY = event.clientY
      if (!frame) {
        frame = window.requestAnimationFrame(apply)
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return glowRef
}

// Applies a subtle 3D tilt + inner spotlight as the pointer moves over a card.
function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    const el = ref.current
    if (!el || window.matchMedia("(hover: none)").matches) {
      return
    }
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    const max = 6
    el.style.setProperty("--tilt-y", `${(px - 0.5) * max * 2}deg`)
    el.style.setProperty("--tilt-x", `${(0.5 - py) * max * 2}deg`)
    el.style.setProperty("--mx", `${px * 100}%`)
    el.style.setProperty("--my", `${py * 100}%`)
  }, [])

  const onPointerLeave = useCallback(() => {
    const el = ref.current
    if (!el) {
      return
    }
    el.style.setProperty("--tilt-x", "0deg")
    el.style.setProperty("--tilt-y", "0deg")
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLElement>()

  // Reveal on mount so cards entering via the filter animate in too.
  useEffect(() => {
    const el = ref.current
    if (!el) {
      return
    }
    const frame = requestAnimationFrame(() => el.classList.add("is-visible"))
    return () => cancelAnimationFrame(frame)
  }, [ref])

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-reveal
      style={{ ["--reveal-delay" as string]: `${(index % 2) * 80}ms` }}
      className="tilt-card group glass-panel relative flex flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-950/5 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-600/15 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-300/50"
    >
      <div className="tilt-inner flex flex-1 flex-col">
        <div className="absolute inset-x-5 top-0 h-1 rounded-b-full bg-gradient-to-r from-blue-600 via-cyan-400 to-slate-950 opacity-80 dark:to-white" />
        <div className="flex items-center justify-between gap-4">
          <Badge variant="outline" className="rounded-full border-slate-200 bg-white/70 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">{project.tag}</Badge>
          <span className="flex size-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-400/10 dark:text-blue-300 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
            <Layers3 className="size-4 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
          </span>
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
            <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600 transition-colors duration-200 group-hover:border-blue-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-6">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full text-sm font-black text-blue-600 transition-colors duration-200 hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-300">
              {project.linkLabel || "查看项目链接"}
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          ) : (
            <div />
          )}
          {project.extraLabel && (
            <Badge variant="outline" className="rounded-full border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200">
              {project.extraLabel}
            </Badge>
          )}
        </div>
      </div>
    </article>
  )
}

function App() {
  const [isDark, setIsDark] = useState(getInitialDarkMode)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    window.localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  const currentYear = useMemo(() => new Date().getFullYear(), [])

  const scrollProgress = useScrollProgress()
  const activeSection = useActiveSection()
  const glowRef = useCursorGlow()
  const typedRole = useTypingRotator(rotatingRoles)
  useScrollReveal()

  const showBackToTop = scrollProgress > 0.08

  const [activeFilter, setActiveFilter] = useState("all")
  const filteredProjects = useMemo(() => {
    const filter = projectFilters.find((item) => item.id === activeFilter)
    if (!filter || filter.tags.length === 0) {
      return projects
    }
    return projects.filter((project) => filter.tags.includes(project.tag))
  }, [activeFilter])

  return (
    <main className="app-shell min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950 transition-colors duration-300 dark:bg-[#06070d] dark:text-white">
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
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
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "")
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`nav-link rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-white dark:hover:text-slate-950 ${isActive ? "is-active" : "text-slate-600 dark:text-slate-300"}`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          <button type="button" onClick={() => setIsDark((value) => !value)} className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 transition-colors duration-200 hover:border-blue-400 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:hover:border-blue-300" aria-label="切换明暗主题">
            {isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
          </button>
        </nav>
      </header>

      <section id="profile" className="relative mx-auto flex min-h-screen max-w-6xl items-center px-5 pb-20 pt-32 sm:px-8 lg:px-10">
        <div className="floating-orbs" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise">
            <Badge variant="outline" className="mb-5 rounded-full border-blue-200 bg-blue-50 px-3 py-1 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200">
              <Sparkles className="size-3.5" aria-hidden="true" />
              AI Systems · AI Infra · Agent Memory
            </Badge>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              {profile.name}
              <span className="text-gradient block">{profile.englishName}</span>
            </h1>
            <p className="mt-5 flex min-h-[2rem] items-center text-lg font-bold text-slate-700 dark:text-slate-200 sm:text-xl">
              <span className="mr-2 text-blue-600 dark:text-blue-300">▹</span>
              <span>{typedRole}</span>
              <span className="typing-caret" aria-hidden="true" />
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a href={`mailto:${profile.email}`} className="contact-chip group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-blue-300/40 dark:hover:text-blue-200">
                <Mail className="size-3.5" aria-hidden="true" />
                {profile.email}
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="contact-chip group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-blue-300/40 dark:hover:text-blue-200">
                <Github className="size-3.5" aria-hidden="true" />
                KimmoZAG
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <MapPin className="size-3.5" aria-hidden="true" />
                Wuhan, China
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 cursor-pointer rounded-full bg-blue-600 px-6 text-base font-bold text-white shadow-xl shadow-blue-600/25 transition-all duration-200 hover:bg-blue-500 focus-visible:ring-blue-500">
                <a href="#projects">
                  查看代表项目
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 cursor-pointer rounded-full border-slate-300 bg-white/70 px-6 text-base font-bold text-slate-900 backdrop-blur-xl transition-colors duration-200 hover:border-slate-900 hover:bg-slate-950 hover:text-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-slate-950">
                <a href="#contact">
                  联系我
                  <Send className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((item) => (
                <StatChip key={item.label} value={item.value} suffix={item.suffix} label={item.label} />
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
              <div className="glass-panel rounded-[1.75rem] p-5 shadow-xl shadow-slate-950/5 dark:shadow-black/20">
                <div className="flex items-center gap-3 text-sm font-black text-blue-600 dark:text-blue-300">
                  <Cpu className="size-4" aria-hidden="true" />
                  Tech Stack
                </div>
                <p className="mt-3 text-base font-black leading-6 text-slate-950 dark:text-white">Python / C++ / JAVA</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Vibe coding · Skill · Agent</p>
              </div>
            </div>
          </div>

          <aside className="relative mx-auto w-full max-w-md lg:ml-auto" aria-label="个人名片预览">
            <div className="orbit-ring" aria-hidden="true" />
            <Card className="hero-portrait relative overflow-hidden border-white/60 bg-white/85 p-0 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 dark:shadow-blue-950/30">
              <div className="relative m-4 overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-900 sm:m-5">
                <img src={profile.photo} alt="张睿诚个人照片" className="h-[340px] w-full object-cover object-center sm:h-[380px]" fetchPriority="high" decoding="async" />
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

                <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                    <BookOpen className="size-4" aria-hidden="true" />
                    教育背景
                  </div>
                  <div className="mt-3 space-y-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-black text-slate-950 dark:text-white">华中科技大学 · 硕士</span>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-300">2024 — 2027</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">重庆邮电大学 · 本科</span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">2020 — 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      <section id="projects" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="section-label">Projects</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">代表项目</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="项目分类筛选">
            {projectFilters.map((filter) => {
              const count = filter.tags.length === 0 ? projects.length : projects.filter((p) => filter.tags.includes(p.tag)).length
              const isActive = activeFilter === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "border border-slate-200 bg-white/70 text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-300/40"
                  }`}
                >
                  {filter.label}
                  <span className={`text-xs font-black ${isActive ? "text-blue-100" : "text-slate-400 dark:text-slate-500"}`}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section id="education" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-10" data-reveal>
          <p className="section-label">Education</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">教育经历</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {education.map((item, index) => (
            <Card key={item.school} data-reveal style={{ ["--reveal-delay" as string]: `${index * 90}ms` }} className="glass-panel border-white/70 bg-white/80 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/5">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">{item.school}</h3>
                    <p className="mt-2 text-lg font-bold text-blue-600 dark:text-blue-300">{item.degree}</p>
                  </div>
                  <BookOpen className="size-7 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                </div>
                <div className="mt-6 space-y-3 text-base leading-7 text-slate-600 dark:text-slate-300">
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

      <div className="section-divider" aria-hidden="true" />

      <section id="research" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal>
            <p className="section-label">Research</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">科研经历与成果</h2>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              科研指导老师：张书豪、刘海坤、徐宗懿。
              <br />
              成果覆盖：记忆智能体、智能体推理框架、流式向量检索、点云检索与配准。
            </p>
          </div>

          <div className="relative space-y-4">
            <div className="timeline-line" aria-hidden="true" />
            {researchItems.map((item, index) => (
              <div key={`${item.year}-${item.title}`} data-reveal style={{ ["--reveal-delay" as string]: `${index * 70}ms` }} className="glass-panel relative ml-8 rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-950/5 dark:border-white/10 dark:bg-white/5">
                <div className="timeline-dot absolute -left-10 top-7 flex size-4 items-center justify-center rounded-full bg-blue-600 ring-8 ring-blue-100 dark:ring-blue-950" />
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

      <div className="section-divider" aria-hidden="true" />

      <section id="strengths" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="section-label">Strengths</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">从系统研发到科研产出</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} data-reveal style={{ ["--reveal-delay" as string]: `${index * 120}ms` }} className="tilt-card relative overflow-hidden glass-panel border-white/70 bg-white/80 shadow-xl shadow-slate-950/5 hover:border-blue-200 hover:shadow-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-300/40">
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

      <div className="section-divider" aria-hidden="true" />

      <section id="honors" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="section-label">Honors & Skills</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">荣誉与专业能力</h2>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Card data-reveal className="glass-panel border-white/70 bg-white/80 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/5">
            <CardContent className="p-6 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <Trophy className="size-6 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">个人荣誉</h3>
              </div>
              <div className="grid gap-3">
                {honors.map((honor) => (
                  <div key={honor} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-semibold leading-6 text-slate-600 transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-300/40 dark:hover:bg-blue-400/5">
                    {honor}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card data-reveal style={{ ["--reveal-delay" as string]: "100ms" }} className="glass-panel border-white/70 bg-white/80 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/5">
            <CardContent className="p-6 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <Cpu className="size-6 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">专业能力</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {capabilities.map((skill) => (
                  <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-blue-300/40 dark:hover:bg-blue-400/10 dark:hover:text-blue-200">
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

      <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10">
        <div data-reveal className="overflow-hidden rounded-[2.25rem] border border-blue-500/30 bg-blue-600 p-8 text-white shadow-2xl shadow-blue-600/25 dark:border-blue-400/20 dark:bg-blue-700 sm:p-10 lg:p-12">
          <div className="floating-orbs opacity-60" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="font-hand text-3xl text-blue-100">Let's build reliable AI systems</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">欢迎联系我</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50">
                欢迎通过邮箱或 GitHub 与我交流，期待你的来信。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
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

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="回到顶部"
        className={`back-to-top fixed bottom-6 right-6 z-50 inline-flex size-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${showBackToTop ? "is-visible" : ""}`}
      >
        <ChevronUp className="size-5" aria-hidden="true" />
      </button>
    </main>
  )
}

export default App
