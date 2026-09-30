import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import {
  Activity, ArrowRight, BarChart3, Bot, BriefcaseBusiness, Building2, Check, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, CircleDollarSign, Clock3, Compass, Database, FileCheck2, Filter, Gauge,
  Handshake, Info, LayoutDashboard, Lightbulb, ListChecks, Menu, MessageSquareText, Moon, Network,
  Pause, Pencil, Play, RefreshCw, RotateCcw, Search, ShieldCheck, Sparkles, Sun, Target, TrendingUp,
  TriangleAlert, Users, X, XCircle,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  Radar, RadarChart, PolarAngleAxis, PolarGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  actionItems as initialActions, agents, dealDimensions, disclaimer, evidence, governanceControls,
  initialAudit, kpis, meetingBrief as initialBrief, opportunities, recommendation as initialRecommendation,
  stakeholders, walkthrough,
} from "./data";
import type { ActionItem, AuditEvent, MeetingBrief, Recommendation, Stakeholder as StakeholderType } from "./types";

const colors = ["#2563eb", "#7c3aed", "#10b981", "#f59e0b", "#ef4444", "#64748b"];
const navItems = [
  ["/", "Executive Dashboard", LayoutDashboard],
  ["/portfolio", "Opportunity Portfolio", BriefcaseBusiness],
  ["/deal/northstar", "Deal Command Centre", Compass],
  ["/health", "Deal Health", Gauge],
  ["/stakeholders", "Stakeholder Map", Users],
  ["/coaching", "Coaching Workspace", MessageSquareText],
  ["/meeting-prep", "Meeting Preparation", FileCheck2],
  ["/actions", "Action Plan", ListChecks],
  ["/outcomes", "Sales Outcomes", TrendingUp],
  ["/roi", "Value and ROI", CircleDollarSign],
  ["/architecture", "Microsoft Architecture", Network],
  ["/governance", "Governance and Controls", ShieldCheck],
] as const;

const chartData = [
  { name: "Healthy", value: 142, opportunities: 9 },
  { name: "Watch", value: 190, opportunities: 16 },
  { name: "At risk", value: 96, opportunities: 12 },
];
const trendData = [
  { month: "May", velocity: 81, winRate: 31, confidence: 58 },
  { month: "Jun", velocity: 78, winRate: 33, confidence: 61 },
  { month: "Jul", velocity: 75, winRate: 35, confidence: 65 },
  { month: "Aug", velocity: 71, winRate: 37, confidence: 69 },
  { month: "Sep", velocity: 67, winRate: 39, confidence: 74 },
];

function cx(...classes: (string | false | null | undefined)[]) { return classes.filter(Boolean).join(" "); }
function formatMoney(value: number) { return `$${value.toFixed(value < 10 ? 1 : 0)}M`; }

function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation>(initialRecommendation);
  const [actions, setActions] = useState<ActionItem[]>(initialActions);
  const [brief, setBrief] = useState<MeetingBrief>(initialBrief);
  const [audit, setAudit] = useState<AuditEvent[]>(initialAudit);
  const [analysisRun, setAnalysisRun] = useState(false);
  const [progressUpdated, setProgressUpdated] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  const log = (event: string, detail: string, actor = "Authorized user") =>
    setAudit((items) => [...items, { id: crypto.randomUUID(), timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), actor, event, detail }]);
  const reset = () => {
    setRecommendation(initialRecommendation); setActions(initialActions); setBrief(initialBrief);
    setAudit(initialAudit); setAnalysisRun(false); setProgressUpdated(false); setWalkthroughOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 transition-colors dark:bg-[#07111f] dark:text-slate-100">
      <Header dark={dark} setDark={setDark} menuOpen={menuOpen} setMenuOpen={setMenuOpen} openWalkthrough={() => setWalkthroughOpen(true)} reset={reset} />
      <div className="mx-auto flex max-w-[1800px]">
        <Sidebar open={menuOpen} close={() => setMenuOpen(false)} />
        <main className="min-w-0 flex-1 px-4 pb-16 pt-24 sm:px-6 lg:ml-64 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard openWalkthrough={() => setWalkthroughOpen(true)} />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/deal/:id" element={<DealCentre analysisRun={analysisRun} setAnalysisRun={setAnalysisRun} log={log} />} />
            <Route path="/health" element={<DealHealth />} />
            <Route path="/stakeholders" element={<StakeholderMap log={log} />} />
            <Route path="/coaching" element={<Coaching recommendation={recommendation} setRecommendation={setRecommendation} brief={brief} log={log} />} />
            <Route path="/meeting-prep" element={<MeetingPrep brief={brief} setBrief={setBrief} log={log} />} />
            <Route path="/actions" element={<ActionPlan actions={actions} setActions={setActions} log={log} />} />
            <Route path="/outcomes" element={<Outcomes updated={progressUpdated} setUpdated={setProgressUpdated} log={log} />} />
            <Route path="/roi" element={<ROI />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/governance" element={<Governance audit={audit} />} />
          </Routes>
        </main>
      </div>
      <Footer />
      {walkthroughOpen && <Walkthrough close={() => setWalkthroughOpen(false)} />}
    </div>
  );
}

function Header({ dark, setDark, menuOpen, setMenuOpen, openWalkthrough, reset }: { dark: boolean; setDark: (v:boolean)=>void; menuOpen:boolean; setMenuOpen:(v:boolean)=>void; openWalkthrough:()=>void; reset:()=>void }) {
  return <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#081422]/95 text-white backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-[1800px] items-center gap-3 px-4 sm:px-6">
      <button className="focus-ring rounded-lg p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Menu /></button>
      <Link to="/" className="focus-ring flex min-w-0 items-center gap-3 rounded-lg">
        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/25"><Sparkles className="size-5" /></div>
        <div className="min-w-0"><div className="truncate font-semibold">Enterprise Sales Coach</div><div className="hidden text-[11px] text-slate-400 sm:block">Read the deal. Find the gap. Coach the next move.</div></div>
      </Link>
      <div className="ml-auto hidden items-center gap-2 xl:flex"><span className="status-dot bg-emerald-400" /><span className="text-xs text-slate-300">Deal Intelligence Active</span><Badge>Synthetic Data</Badge></div>
      <button onClick={openWalkthrough} className="focus-ring ml-auto inline-flex items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-xs font-semibold shadow-lg shadow-violet-600/20 hover:bg-violet-500 xl:ml-3 sm:text-sm"><Play className="size-4" /><span className="hidden sm:inline">Executive Demo</span></button>
      <button onClick={reset} className="focus-ring icon-button" aria-label="Reset demo"><RotateCcw className="size-4" /></button>
      <button onClick={() => setDark(!dark)} className="focus-ring icon-button" aria-label="Toggle color theme">{dark ? <Sun className="size-4" /> : <Moon className="size-4" />}</button>
    </div>
  </header>;
}

function Sidebar({ open, close }: { open:boolean; close:()=>void }) {
  return <>
    {open && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden" onClick={close} />}
    <aside className={cx("fixed bottom-0 left-0 top-16 z-30 w-64 overflow-y-auto border-r border-slate-200 bg-white p-3 transition-transform dark:border-white/10 dark:bg-[#0a1728] lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <nav className="space-y-1" aria-label="Primary navigation">
        {navItems.map(([to,label,Icon]) => <NavLink key={to} to={to} end={to === "/"} onClick={close} className={({isActive}) => cx("focus-ring flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition", isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5")}><Icon className="size-4 shrink-0" />{label}</NavLink>)}
      </nav>
      <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-violet-500">Primary scenario</div>
        <div className="mt-2 text-sm font-semibold">Northstar Telecom Transformation</div>
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">$28.5M · Health 54 · Best case</div>
      </div>
    </aside>
  </>;
}

function Page({ eyebrow, title, description, actions, children }: { eyebrow:string; title:string; description:string; actions?:ReactNode; children:ReactNode }) {
  return <div className="animate-in">
    <div className="mb-7 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div><div className="eyebrow">{eyebrow}</div><h1 className="mt-2 max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1><p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">{description}</p></div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
    {children}
  </div>;
}
function Card({ children, className, title, action }: { children:ReactNode; className?:string; title?:string; action?:ReactNode }) {
  return <section className={cx("panel", className)}>{title && <div className="mb-4 flex items-center justify-between gap-3"><h2 className="font-semibold">{title}</h2>{action}</div>}{children}</section>;
}
function Badge({ children, tone="slate" }: { children:ReactNode; tone?:"slate"|"blue"|"green"|"amber"|"red"|"violet" }) {
  const styles = { slate:"bg-slate-500/10 text-slate-600 dark:text-slate-300", blue:"bg-blue-500/10 text-blue-600 dark:text-blue-300", green:"bg-emerald-500/10 text-emerald-600 dark:text-emerald-300", amber:"bg-amber-500/10 text-amber-700 dark:text-amber-300", red:"bg-red-500/10 text-red-600 dark:text-red-300", violet:"bg-violet-500/10 text-violet-600 dark:text-violet-300" };
  return <span className={cx("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold", styles[tone])}>{children}</span>;
}
function Button({ children, onClick, variant="primary", disabled=false, type="button" }: { children:ReactNode; onClick?:()=>void; variant?:"primary"|"secondary"|"danger"|"success"; disabled?:boolean; type?:"button"|"submit" }) {
  const styles={primary:"bg-blue-600 text-white hover:bg-blue-500",secondary:"border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10",danger:"bg-red-600 text-white hover:bg-red-500",success:"bg-emerald-600 text-white hover:bg-emerald-500"};
  return <button type={type} disabled={disabled} onClick={onClick} className={cx("focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50", styles[variant])}>{children}</button>;
}
function Metric({ label, value, detail, tone="blue" }: {label:string; value:string; detail:string; tone?:string}) {
  return <div className="panel relative overflow-hidden"><div className={cx("absolute left-0 top-0 h-1 w-full", tone==="green"?"bg-emerald-500":tone==="amber"?"bg-amber-500":tone==="red"?"bg-red-500":tone==="violet"?"bg-violet-500":"bg-blue-500")} /><div className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</div><div className="mt-2 text-2xl font-bold">{value}</div><div className="mt-1 text-xs text-slate-500">{detail} · Simulated</div></div>;
}
function Progress({ value, color="bg-blue-500" }: {value:number;color?:string}) { return <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"><div className={cx("h-full rounded-full transition-all",color)} style={{width:`${value}%`}} /></div>; }
function Disclaimer({ compact=false }: {compact?:boolean}) { return <div className={cx("rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-900 dark:text-amber-200",compact?"p-3 text-[11px]":"p-4 text-xs leading-5")}><Info className="mr-2 inline size-4" />{disclaimer}</div>; }

function Dashboard({ openWalkthrough }: {openWalkthrough:()=>void}) {
  const navigate=useNavigate();
  return <Page eyebrow="Executive sales intelligence" title="Turn Deal Signals into Confident Next Moves" description="Agentic AI helps sales teams diagnose complex opportunities, strengthen stakeholder alignment, and coach evidence-backed actions." actions={<><Button onClick={()=>navigate("/deal/northstar")}><Target className="size-4"/>Start Strategic Deal Demo</Button><Button variant="secondary" onClick={openWalkthrough}><Play className="size-4"/>Walkthrough</Button></>}>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">{kpis.map((k,i)=><Metric key={k.label} {...k} tone={["blue","red","violet","amber","green"][i%5]} />)}</div>
    <div className="mt-6 grid gap-6 xl:grid-cols-3">
      <Card title="Pipeline by health status" className="xl:col-span-1"><div className="h-64"><ResponsiveContainer><PieChart><Pie data={chartData} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={4}>{chartData.map((_,i)=><Cell key={i} fill={[colors[2],colors[3],colors[4]][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer></div></Card>
      <Card title="Sales velocity, win rate and forecast confidence" className="xl:col-span-2"><div className="h-64"><ResponsiveContainer><LineChart data={trendData}><CartesianGrid strokeDasharray="3 3" opacity={0.15}/><XAxis dataKey="month"/><YAxis/><Tooltip/><Legend/><Line type="monotone" dataKey="velocity" stroke={colors[0]} strokeWidth={3}/><Line type="monotone" dataKey="winRate" stroke={colors[2]} strokeWidth={3}/><Line type="monotone" dataKey="confidence" stroke={colors[1]} strokeWidth={3}/></LineChart></ResponsiveContainer></div></Card>
    </div>
    <Card className="mt-6 overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-600 to-violet-700 text-white">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><div className="text-xs font-semibold uppercase tracking-[.18em] text-blue-100">Executive narrative</div><p className="mt-3 max-w-5xl text-xl font-semibold leading-8">The largest simulated risk pool is concentrated in opportunities where technical engagement is strong but executive sponsorship and economic-buyer access are incomplete.</p><p className="mt-2 text-sm text-blue-100">The greatest near-term opportunity is accelerating deals with confirmed customer problems and credible champions but no agreed decision process.</p></div><Button variant="secondary" onClick={()=>navigate("/portfolio")}>Inspect portfolio <ArrowRight className="size-4"/></Button></div>
    </Card>
    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      <Card title="Deals requiring intervention">{opportunities.slice(0,4).map(o=><Link to={`/deal/${o.id}`} key={o.id} className="focus-ring mb-2 flex items-center justify-between rounded-xl border border-slate-200 p-3 hover:border-blue-500 dark:border-white/10"><div><div className="text-sm font-semibold">{o.account.name}</div><div className="text-xs text-slate-500">{o.blocker}</div></div><Badge tone={o.coachingStatus==="Urgent"?"red":"amber"}>{o.health}</Badge></Link>)}</Card>
      <Card title="Common stakeholder gaps"><List rows={[["Economic buyer not engaged","42%"],["Procurement coverage incomplete","38%"],["Finance value case unvalidated","34%"],["Executive sponsor indirect","29%"]]} /></Card>
      <Card title="Recommended leadership actions"><List rows={[["Sponsor executive access","12 deals"],["Validate decision discipline","9 deals"],["Focus coaching on commitments","8 deals"],["Review competitive exposure","7 deals"]]} /></Card>
    </div>
    <div className="mt-6"><Disclaimer /></div>
  </Page>;
}

function List({ rows }:{rows:string[][]}) { return <div className="space-y-3">{rows.map(([a,b])=><div key={a} className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 last:border-0 dark:border-white/10"><span className="text-sm">{a}</span><span className="text-sm font-semibold text-blue-600 dark:text-blue-300">{b}</span></div>)}</div>; }

function Portfolio() {
  const [query,setQuery]=useState(""); const [stage,setStage]=useState("All"); const [sort,setSort]=useState("Highest value");
  const filtered=useMemo(()=>opportunities.filter(o=>(stage==="All"||o.stage===stage)&&`${o.account.name} ${o.name}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==="Lowest deal health"?a.health-b.health:sort==="Longest time in stage"?b.daysInStage-a.daysInStage:sort==="Lowest stakeholder coverage"?a.stakeholderCoverage-b.stakeholderCoverage:b.value-a.value),[query,stage,sort]);
  return <Page eyebrow="Opportunity portfolio" title="Focus coaching on the deals where evidence matters most" description="Filter and sort stable synthetic opportunities by value, health, stakeholder coverage, momentum, and coaching need.">
    <Card className="mb-5"><div className="grid gap-3 md:grid-cols-3"><label className="input-wrap"><Search className="size-4"/><input aria-label="Search opportunities" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search account or opportunity"/></label><Select value={stage} onChange={setStage} options={["All","Discovery","Qualification","Solution validation","Business case","Negotiation"]}/><Select value={sort} onChange={setSort} options={["Highest value","Lowest deal health","Longest time in stage","Lowest stakeholder coverage"]}/></div></Card>
    <div className="grid gap-4 xl:grid-cols-2">{filtered.map(o=><Link to={`/deal/${o.id}`} key={o.id} className="panel focus-ring group hover:-translate-y-0.5 hover:border-blue-500/50">
      <div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap gap-2"><Badge tone={o.coachingStatus==="Urgent"?"red":o.coachingStatus==="Recommended"?"amber":"green"}>{o.coachingStatus}</Badge><Badge>{o.forecast}</Badge></div><h2 className="mt-3 text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-300">{o.account.name}</h2><p className="text-sm text-slate-500">{o.name}</p></div><div className="text-right"><div className="text-xl font-bold">{formatMoney(o.value)}</div><div className="text-xs text-slate-500">Simulated</div></div></div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-xs"><div><span className="text-slate-500">Health</span><div className="mt-1 font-semibold">{o.health}/100</div></div><div><span className="text-slate-500">In stage</span><div className="mt-1 font-semibold">{o.daysInStage} days</div></div><div><span className="text-slate-500">Coverage</span><div className="mt-1 font-semibold">{o.stakeholderCoverage}%</div></div></div>
      <div className="mt-4"><Progress value={o.health} color={o.health<55?"bg-red-500":o.health<70?"bg-amber-500":"bg-emerald-500"}/></div>
      <div className="mt-4 flex items-center justify-between text-xs"><span className="text-slate-500">{o.blocker}</span><span className="font-semibold text-blue-600 dark:text-blue-300">Open deal <ArrowRight className="inline size-3"/></span></div>
    </Link>)}</div>
  </Page>;
}

function Select({value,onChange,options}:{value:string;onChange:(v:string)=>void;options:string[]}) { return <label className="input-wrap"><Filter className="size-4"/><select aria-label="Filter or sort" value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select><ChevronDown className="ml-auto size-4"/></label>; }

function DealCentre({analysisRun,setAnalysisRun,log}:{analysisRun:boolean;setAnalysisRun:(v:boolean)=>void;log:(a:string,b:string,c?:string)=>void}) {
  const [running,setRunning]=useState(false); const [activeAgent,setActiveAgent]=useState(-1); const [openEvidence,setOpenEvidence]=useState<string|null>("e10");
  const run=()=>{setRunning(true);setAnalysisRun(false);setActiveAgent(0);log("Deal analysis started","Five specialist agents began read-only analysis.","Sales Coach Supervisor Agent");};
  useEffect(()=>{if(!running)return; if(activeAgent>=agents.length){setRunning(false);setAnalysisRun(true);log("Deal analysis completed","Recommendation prepared for seller and manager review.","Sales Coach Supervisor Agent");return;} const t=setTimeout(()=>setActiveAgent(v=>v+1),900);return()=>clearTimeout(t)},[running,activeAgent]);
  return <Page eyebrow="Deal command centre · Synthetic opportunity" title="Northstar Telecom Transformation" description="Strong technical momentum is not translating into a customer-owned decision. Diagnose the gap before adding more activity." actions={<Button onClick={run} disabled={running}>{running?<RefreshCw className="size-4 animate-spin"/>:<Bot className="size-4"/>}{running?"Agents analysing...":analysisRun?"Run analysis again":"Run Deal Analysis"}</Button>}>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Opportunity value" value="$28.5M" detail="Best case"/><Metric label="Deal health" value="54 / 100" detail="Medium-low confidence" tone="red"/><Metric label="Time in stage" value="47 days" detail="Solution validation" tone="amber"/><Metric label="Last commitment" value="24 days" detail="Value model requested" tone="violet"/></div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
      <Card title="Opportunity summary"><div className="grid gap-4 sm:grid-cols-2"><Detail label="Account" value="Northstar Communications"/><Detail label="Scope" value="AI-enabled customer and network transformation"/><Detail label="Customer priorities" value="Service quality, operating efficiency, network resilience"/><Detail label="Competitive position" value="Active incumbent cloud provider"/><Detail label="Economic buyer" value="Maya Desai, COO — identified, not engaged"/><Detail label="Next meeting" value="No executive meeting confirmed"/></div><div className="mt-5"><Disclaimer compact/></div></Card>
      <Card title="Coach diagnosis"><div className="rounded-2xl bg-blue-600 p-5 text-white"><Lightbulb/><p className="mt-3 font-semibold leading-6">The opportunity has strong technical momentum but insufficient commercial and executive validation.</p><p className="mt-2 text-sm text-blue-100">Secure an executive value-alignment meeting, confirm the decision process, and validate the business case before adding more technical activity.</p></div><div className="mt-4 grid grid-cols-2 gap-3"><Detail label="Momentum" value="Declining"/><Detail label="Forecast" value="Best case"/><Detail label="Budget" value="Indicative"/><Detail label="Procurement" value="Not started"/></div></Card>
    </div>
    <Card title="Agent team" className="mt-6" action={<Badge tone={analysisRun?"green":running?"violet":"slate"}>{analysisRun?"Analysis complete":running?"Analysis active":"Ready"}</Badge>}>
      <div className="grid gap-3 lg:grid-cols-5">{agents.map((a,i)=>{const complete=analysisRun||activeAgent>i;const active=running&&activeAgent===i;return <div key={a.id} className={cx("rounded-2xl border p-4 transition-all",active?"border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10":complete?"border-emerald-500/30 bg-emerald-500/5":"border-slate-200 dark:border-white/10")}><div className="flex items-center justify-between">{complete?<CheckCircle2 className="size-5 text-emerald-500"/>:active?<RefreshCw className="size-5 animate-spin text-violet-500"/>:<Bot className="size-5 text-slate-400"/>}<span className="text-xs font-semibold">{a.confidence}%</span></div><div className="mt-3 text-sm font-semibold">{a.name}</div><div className="mt-2 text-xs leading-5 text-slate-500">{active?a.task:complete?a.output:"Waiting for analysis"}</div></div>})}</div>
    </Card>
    <Card title="Evidence timeline" className="mt-6">{evidence.map((e,i)=><div key={e.id} className="relative ml-3 border-l border-slate-200 pb-5 pl-6 last:pb-0 dark:border-white/10"><span className={cx("absolute -left-1.5 top-1 size-3 rounded-full",e.status==="supporting"?"bg-emerald-500":e.status==="conflicting"?"bg-amber-500":"bg-slate-400")}/><button className="focus-ring w-full rounded-lg text-left" onClick={()=>setOpenEvidence(openEvidence===e.id?null:e.id)}><div className="flex flex-wrap items-center justify-between gap-2"><div><span className="mr-3 text-xs text-slate-500">{e.date}</span><span className="text-sm font-semibold">{e.title}</span></div><Badge tone={e.status==="supporting"?"green":e.status==="conflicting"?"amber":"slate"}>{e.source.type}</Badge></div>{openEvidence===e.id&&<div className="mt-3 rounded-xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">{e.detail}<div className="mt-2 text-xs font-semibold">Evidence confidence: {e.confidence}%</div></div>}</button></div>)}</Card>
  </Page>;
}
function Detail({label,value}:{label:string;value:string}) { return <div><div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</div><div className="mt-1 text-sm font-medium">{value}</div></div>; }

function DealHealth() {
  const [view,setView]=useState("Executive"); const [selected,setSelected]=useState(dealDimensions[4]);
  const radar=dealDimensions.map(d=>({dimension:d.name.split(" ")[0],score:d.score}));
  return <Page eyebrow="Transparent deal health" title="Separate demonstrated progress from sales activity" description="The illustrative score explains what is known, conflicting, missing, and most important to validate next." actions={<div className="flex flex-wrap gap-2">{["Executive","Seller","Manager coaching","Audit"].map(v=><button key={v} onClick={()=>setView(v)} className={cx("focus-ring rounded-xl px-3 py-2 text-xs font-semibold",view===v?"bg-blue-600 text-white":"bg-white text-slate-600 dark:bg-white/5 dark:text-slate-300")}>{v}</button>)}</div>}>
    <div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]"><Card title="Overall illustrative score"><div className="grid place-items-center"><div className="relative grid size-44 place-items-center rounded-full" style={{background:"conic-gradient(#f59e0b 0 54%, rgba(148,163,184,.18) 54% 100%)"}}><div className="grid size-36 place-items-center rounded-full bg-white dark:bg-[#0d1b2d]"><div className="text-center"><div className="text-5xl font-bold">54</div><div className="text-xs text-slate-500">out of 100</div></div></div></div><Badge tone="amber">Medium-low forecast confidence</Badge></div><p className="mt-5 text-center text-sm text-slate-500">Not a guaranteed predictor. The score summarizes available synthetic evidence.</p></Card>
    <Card title="Health dimensions"><div className="h-72"><ResponsiveContainer><RadarChart data={radar}><PolarGrid/><PolarAngleAxis dataKey="dimension" tick={{fontSize:11}}/><Radar dataKey="score" stroke={colors[0]} fill={colors[0]} fillOpacity={.25}/><Tooltip/></RadarChart></ResponsiveContainer></div></Card></div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[.8fr_1.2fr]"><Card title="Eight dimensions"><div className="space-y-2">{dealDimensions.map(d=><button key={d.id} onClick={()=>setSelected(d)} className={cx("focus-ring w-full rounded-xl border p-3 text-left",selected.id===d.id?"border-blue-500 bg-blue-500/10":"border-slate-200 dark:border-white/10")}><div className="flex justify-between gap-3 text-sm"><span className="font-semibold">{d.name}</span><span>{d.score}</span></div><div className="mt-2"><Progress value={d.score} color={d.score<40?"bg-red-500":d.score<65?"bg-amber-500":"bg-emerald-500"}/></div></button>)}</div></Card>
    <Card title={`Why this score? · ${view} view`}><div className="grid gap-4 sm:grid-cols-2"><EvidenceBox title="Supporting evidence" icon={<CheckCircle2/>} tone="green" text={selected.supporting}/><EvidenceBox title="Conflicting evidence" icon={<TriangleAlert/>} tone="amber" text={selected.conflicting}/><EvidenceBox title="Missing evidence" icon={<Search/>} tone="slate" text={selected.missing}/><EvidenceBox title="Recommended action" icon={<Target/>} tone="blue" text={selected.action}/></div><div className="mt-5 grid grid-cols-3 gap-3"><Detail label="Score" value={`${selected.score}/100`}/><Detail label="Confidence" value={`${selected.confidence}%`}/><Detail label="Recent change" value={`${selected.change>0?"+":""}${selected.change} pts`}/></div></Card></div>
    <div className="mt-6"><Disclaimer/></div>
  </Page>;
}
function EvidenceBox({title,icon,tone,text}:{title:string;icon:ReactNode;tone:string;text:string}) { return <div className={cx("rounded-2xl border p-4",tone==="green"?"border-emerald-500/20 bg-emerald-500/5":tone==="amber"?"border-amber-500/20 bg-amber-500/5":tone==="blue"?"border-blue-500/20 bg-blue-500/5":"border-slate-200 bg-slate-500/5 dark:border-white/10")}><div className="flex items-center gap-2 text-sm font-semibold">{icon}{title}</div><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{text}</p></div>; }

function StakeholderMap({log}:{log:(a:string,b:string,c?:string)=>void}) {
  const [selected,setSelected]=useState<StakeholderType>(stakeholders[0]); const [desired,setDesired]=useState(false); const [planned,setPlanned]=useState<string[]>([]);
  const plan=()=>{setPlanned(p=>p.includes(selected.id)?p:[...p,selected.id]);log("Stakeholder engagement planned",`${selected.buyingRole}: ${selected.recommendedEngagement}`)};
  return <Page eyebrow="Buying-group intelligence" title="Find the relationship gap that technical activity cannot solve" description="Explore known and assumed relationships, then compare current coverage with the desired buying group." actions={<Button variant="secondary" onClick={()=>setDesired(!desired)}>{desired?"Show current map":"Compare desired map"}</Button>}>
    <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]"><Card title={desired?"Desired stakeholder coverage":"Current stakeholder coverage"}><div className="relative min-h-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#081422]">
      <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">{stakeholders.slice(1).map((s,i)=><line key={s.id} x1="50%" y1="47%" x2={`${s.x}%`} y2={`${s.y}%`} stroke={desired||s.relationship!=="Unknown"?"#60a5fa":"#94a3b8"} strokeDasharray={s.relationship==="Unknown"?"5 5":"0"} />)}</svg>
      {stakeholders.map(s=><button key={s.id} onClick={()=>setSelected(s)} style={{left:`${s.x}%`,top:`${s.y}%`}} className={cx("focus-ring absolute w-28 -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-3 text-center shadow-lg transition hover:scale-105",selected.id===s.id?"z-10 border-blue-500 bg-blue-600 text-white":desired&&s.relationship==="Unknown"?"border-violet-400 bg-violet-100 text-violet-950 dark:bg-violet-500/20 dark:text-violet-100":s.relationship==="Strong"?"border-emerald-400 bg-white dark:bg-[#102239]":"border-slate-300 bg-white dark:border-white/20 dark:bg-[#102239]")}><div className="truncate text-xs font-semibold">{s.name}</div><div className={cx("mt-1 truncate text-[10px]",selected.id===s.id?"text-blue-100":"text-slate-500")}>{s.buyingRole}</div>{planned.includes(s.id)&&<CheckCircle2 className="mx-auto mt-1 size-3 text-emerald-400"/>}</button>)}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2"><Badge tone="green">Strong technical champion</Badge><Badge tone="red">Economic buyer not engaged</Badge><Badge tone="amber">Procurement not engaged</Badge></div>
    </div></Card>
    <Card title="Stakeholder detail"><Badge tone={selected.relationship==="Strong"?"green":selected.relationship==="Unknown"?"red":"amber"}>{selected.relationship} relationship</Badge><h2 className="mt-3 text-xl font-bold">{selected.name}</h2><p className="text-sm text-slate-500">{selected.title}</p><div className="mt-5 grid grid-cols-2 gap-4"><Detail label="Buying role" value={selected.buyingRole}/><Detail label="Influence" value={selected.influence}/><Detail label="Authority" value={selected.authority}/><Detail label="Confidence" value={`${selected.confidence}%`}/><Detail label="Engagement" value={selected.engagement}/><Detail label="Owner role" value={selected.ownerRole}/></div><div className="mt-5"><h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Priorities</h3><div className="mt-2 flex flex-wrap gap-2">{selected.priorities.map(p=><Badge key={p} tone="blue">{p}</Badge>)}</div></div><div className="mt-5 rounded-xl bg-amber-500/10 p-4 text-sm"><strong>Recommended:</strong> {selected.recommendedEngagement}</div><div className="mt-5 grid gap-2"><Button onClick={plan}><Handshake className="size-4"/>{planned.includes(selected.id)?"Engagement planned":"Add planned engagement"}</Button><Button variant="secondary" onClick={()=>log("Stakeholder validation requested",`${selected.name} marked as needing validation.`)}><Search className="size-4"/>Mark for validation</Button></div></Card></div>
  </Page>;
}

function Coaching({recommendation,setRecommendation,brief,log}:{recommendation:Recommendation;setRecommendation:(r:Recommendation)=>void;brief:MeetingBrief;log:(a:string,b:string,c?:string)=>void}) {
  const messages=[["Seller","The customer likes the solution, and the technical team keeps asking for more detail. I expected the deal to move by now."],["Coach","What customer-owned commitment confirms that the organization has agreed to move forward?"],["Seller","We have technical follow-ups, but we do not have a date for the executive decision meeting."],["Coach","Who owns the business outcome and controls the investment decision?"],["Seller","The COO is the economic buyer, but we have not met her directly."],["Coach","The critical gap is executive and commercial validation, not technical fit. What commitment should the next meeting produce?"]] as const;
  const [step,setStep]=useState(1); const [editing,setEditing]=useState(false); const [title,setTitle]=useState(recommendation.title); const [rejecting,setRejecting]=useState(false); const [reason,setReason]=useState("");
  const decide=(status:Recommendation["status"])=>{setRecommendation({...recommendation,title,status});log(`Recommendation ${status}`,status==="rejected"?reason:title);setEditing(false);setRejecting(false)};
  return <Page eyebrow="Manager and seller coaching" title="Turn deal evidence into one clear next move" description="Use evidence-led questions to distinguish more activity from the customer commitment that will reduce uncertainty.">
    <div className="grid gap-6 2xl:grid-cols-[.75fr_1fr_1fr]"><Card title="Deal evidence"><div className="space-y-4"><MetricLine label="Deal health" value="54 / 100" percent={54}/><MetricLine label="Stakeholder coverage" value="56%" percent={56}/><MetricLine label="Forecast confidence" value="46%" percent={46}/><Detail label="Opportunity value" value="$28.5M simulated"/><Detail label="Time in stage" value="47 days"/><Detail label="Customer commitment" value="No decision meeting confirmed"/><Detail label="Competition" value="Active incumbent"/></div></Card>
    <Card title="Coaching conversation"><div className="max-h-[560px] space-y-3 overflow-y-auto pr-1">{messages.slice(0,step+1).map(([speaker,text],i)=><div key={i} className={cx("rounded-2xl p-4 text-sm leading-6",speaker==="Coach"?"mr-6 bg-violet-500/10 text-slate-700 dark:text-slate-200":"ml-6 bg-blue-600 text-white")}><div className="mb-1 text-[10px] font-bold uppercase tracking-wider opacity-70">{speaker}</div>{text}</div>)}</div><div className="mt-4 flex justify-between"><Button variant="secondary" disabled={step<=1} onClick={()=>setStep(s=>s-1)}><ChevronLeft className="size-4"/>Back</Button><Button disabled={step>=messages.length-1} onClick={()=>setStep(s=>s+1)}>Next question<ChevronRight className="size-4"/></Button></div></Card>
    <Card title="Recommended move" action={<Badge tone={recommendation.status==="accepted"?"green":recommendation.status==="rejected"?"red":recommendation.status==="modified"?"violet":"blue"}>{recommendation.status}</Badge>}><div className="rounded-2xl bg-blue-600 p-5 text-white"><Target/><h2 className="mt-3 text-lg font-bold">{recommendation.title}</h2><p className="mt-2 text-sm text-blue-100">{recommendation.whyNow}</p></div>{editing&&<input className="mt-4 w-full rounded-xl border border-blue-500 bg-transparent p-3 text-sm" value={title} onChange={e=>setTitle(e.target.value)} aria-label="Modify recommendation"/>}<div className="mt-5"><div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Expected customer commitment</div><p className="mt-2 text-sm leading-6">{recommendation.commitment}</p></div><div className="mt-4 grid grid-cols-2 gap-3"><Detail label="Confidence" value={`${recommendation.confidence}%`}/><Detail label="Owner by role" value={recommendation.ownerRole}/></div>{rejecting&&<textarea value={reason} onChange={e=>setReason(e.target.value)} placeholder="Reason for rejection" className="mt-4 min-h-24 w-full rounded-xl border border-red-500 bg-transparent p-3 text-sm" aria-label="Rejection reason"/>}<div className="mt-5 grid grid-cols-2 gap-2"><Button variant="success" onClick={()=>decide("accepted")}><Check/>Accept</Button><Button variant="secondary" onClick={()=>editing?decide("modified"):setEditing(true)}><Pencil className="size-4"/>{editing?"Save change":"Modify"}</Button><Button variant="secondary" onClick={()=>log("Manager input requested","Recommendation routed for simulated manager review.")}><Users className="size-4"/>Manager input</Button><Button variant="danger" onClick={()=>rejecting?decide("rejected"):setRejecting(true)}><XCircle className="size-4"/>{rejecting?"Confirm reject":"Reject"}</Button></div><Link to="/meeting-prep" className="focus-ring mt-2 flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white"><FileCheck2 className="size-4"/>Create meeting brief</Link></Card></div>
    <div className="mt-6"><Disclaimer/></div>
  </Page>;
}
function MetricLine({label,value,percent}:{label:string;value:string;percent:number}) { return <div><div className="mb-2 flex justify-between text-sm"><span>{label}</span><strong>{value}</strong></div><Progress value={percent} color={percent<55?"bg-red-500":"bg-amber-500"}/></div>; }

function MeetingPrep({brief,setBrief,log}:{brief:MeetingBrief;setBrief:(b:MeetingBrief)=>void;log:(a:string,b:string,c?:string)=>void}) {
  const [question,setQuestion]=useState(""); const [ready,setReady]=useState(false);
  const add=()=>{if(question.trim()){setBrief({...brief,questions:[...brief.questions,question.trim()]});setQuestion("")}};
  return <Page eyebrow="Executive meeting preparation" title="Convert deal evidence into an outcome-led executive conversation" description="Prepare for the COO, CIO, and transformation champion without presenting inference as customer fact." actions={<Button variant={ready?"success":"primary"} onClick={()=>{setReady(true);log("Meeting brief marked ready","Seller confirmed the simulated brief is ready for review.","Seller role")}}>{ready?<CheckCircle2 className="size-4"/>:<FileCheck2 className="size-4"/>}{ready?"Ready for review":"Mark ready for review"}</Button>}>
    <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]"><Card title="Meeting objective"><textarea className="min-h-24 w-full rounded-xl border border-slate-200 bg-transparent p-3 text-sm leading-6 dark:border-white/10" value={brief.objective} onChange={e=>setBrief({...brief,objective:e.target.value})}/><div className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Audience</div><div className="mt-2 flex flex-wrap gap-2">{brief.audience.map(a=><Badge key={a} tone="blue">{a}</Badge>)}</div><Button variant="secondary" onClick={()=>setBrief({...brief,audience:[...brief.audience,"Elena Ruiz — CFO"]})}><Users className="size-4"/>Add CFO</Button></Card>
    <Card title="Desired customer commitment"><div className="rounded-2xl bg-emerald-500/10 p-5"><Handshake className="text-emerald-500"/><p className="mt-3 text-sm font-semibold leading-6">{brief.ask}</p></div><div className="mt-4 space-y-2">{brief.commitments.map(c=><div key={c} className="flex gap-2 text-sm"><CheckCircle2 className="size-4 shrink-0 text-emerald-500"/>{c}</div>)}</div></Card></div>
    <div className="mt-6 grid gap-6 xl:grid-cols-2"><Card title="Executive narrative">{brief.narrative.map((n,i)=><div key={n} className="flex items-center gap-3 border-b border-slate-200 py-3 last:border-0 dark:border-white/10"><span className="grid size-7 place-items-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-600">{i+1}</span><span className="text-sm font-medium">{n}</span></div>)}</Card>
    <Card title="Discovery questions"><div className="space-y-2">{brief.questions.map((q,i)=><div key={`${q}-${i}`} className="flex items-start gap-3 rounded-xl bg-slate-100 p-3 dark:bg-white/5"><span className="text-xs font-bold text-blue-600">{i+1}</span><span className="flex-1 text-sm">{q}</span><button className="focus-ring rounded text-slate-400 hover:text-red-500" onClick={()=>setBrief({...brief,questions:brief.questions.filter((_,x)=>x!==i)})} aria-label={`Remove question ${i+1}`}><X className="size-4"/></button></div>)}</div><div className="mt-3 flex gap-2"><input value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Add a discovery question" className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-transparent px-3 text-sm dark:border-white/10"/><Button onClick={add}>Add</Button></div></Card></div>
    <Card title="Likely objections and evidence-based responses" className="mt-6"><div className="grid gap-3 md:grid-cols-2">{brief.objections.map(o=><details key={o.title} className="rounded-xl border border-slate-200 p-4 dark:border-white/10"><summary className="cursor-pointer text-sm font-semibold">{o.title}</summary><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{o.response}</p></details>)}</div></Card>
    <div className="mt-6"><Disclaimer/></div>
  </Page>;
}

function ActionPlan({actions,setActions,log}:{actions:ActionItem[];setActions:(a:ActionItem[])=>void;log:(a:string,b:string,c?:string)=>void}) {
  const [generated,setGenerated]=useState(false); const completion=Math.round(actions.filter(a=>a.status==="Complete").length/actions.length*100);
  const update=(item:ActionItem)=>{const next=item.status==="Not started"?"In progress":item.status==="In progress"?"Complete":"Not started";setActions(actions.map(a=>a.id===item.id?{...a,status:next}:a));log("Action status updated",`${item.action}: ${next}`,item.ownerRole)};
  return <Page eyebrow="Cross-functional execution" title="Turn the agreed coaching move into accountable team action" description="Actions are assigned to roles, not named employees, and remain simulated until authorized in existing enterprise systems." actions={<Button onClick={()=>{setGenerated(true);log("Action plan generated","Cross-functional simulated plan created from the accepted recommendation.")}}><Sparkles className="size-4"/>{generated?"Regenerate plan":"Generate simulated action plan"}</Button>}>
    <Card className="mb-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><div className="flex-1"><div className="flex justify-between text-sm"><strong>Plan completion</strong><span>{completion}%</span></div><div className="mt-2"><Progress value={completion} color="bg-emerald-500"/></div></div><Badge tone="violet">{actions.length} accountable actions</Badge></div></Card>
    <div className="space-y-5">{Array.from(new Set(actions.map(a=>a.workstream))).map(w=><Card key={w} title={w}>{actions.filter(a=>a.workstream===w).map(a=><button key={a.id} onClick={()=>update(a)} className="focus-ring grid w-full gap-3 border-b border-slate-200 py-4 text-left last:border-0 dark:border-white/10 sm:grid-cols-[auto_1.5fr_1fr_1fr] sm:items-center"><span className={cx("grid size-7 place-items-center rounded-full border",a.status==="Complete"?"border-emerald-500 bg-emerald-500 text-white":a.status==="In progress"?"border-blue-500 bg-blue-500/10 text-blue-500":"border-slate-300 dark:border-white/20")}>{a.status==="Complete"?<Check className="size-4"/>:a.status==="In progress"?<Clock3 className="size-4"/>:""}</span><span><span className="block text-sm font-semibold">{a.action}</span><span className="text-xs text-slate-500">{a.evidence}</span></span><span className="text-xs"><strong>Due:</strong> {a.due}<br/><strong>Owner:</strong> {a.ownerRole}</span><span className="text-xs"><strong>Dependency:</strong> {a.dependency}</span></button>)}</Card>)}</div>
  </Page>;
}

function Outcomes({updated,setUpdated,log}:{updated:boolean;setUpdated:(v:boolean)=>void;log:(a:string,b:string,c?:string)=>void}) {
  const metrics=[["Economic-buyer access",58,updated?66:58],["Stakeholder coverage",64,updated?72:64],["Customer commitments",49,updated?61:49],["Forecast confidence",74,updated?79:74],["Action completion",68,updated?76:68],["Win rate",32,updated?39:32]];
  return <Page eyebrow="Outcome measurement" title="Measure whether coaching changed the deal" description="Aggregate opportunity and team metrics show movement without ranking or evaluating individual employees." actions={<Button onClick={()=>{setUpdated(true);log("Opportunity progress updated","Simulated outcomes refreshed after customer commitment.")}}><RefreshCw className="size-4"/>Update simulated progress</Button>}>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{metrics.map(([label,before,after])=><Card key={String(label)}><div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div><div className="mt-2 flex items-end gap-3"><span className="text-3xl font-bold">{after}%</span>{updated&&after!==before&&<Badge tone="green">+{Number(after)-Number(before)} pts</Badge>}</div><div className="mt-3"><Progress value={Number(after)} color="bg-emerald-500"/></div><div className="mt-2 text-xs text-slate-500">Aggregated · Simulated</div></Card>)}</div>
    <div className="mt-6 grid gap-6 xl:grid-cols-2"><Card title="Deal progression"><div className="h-72"><ResponsiveContainer><AreaChart data={trendData}><defs><linearGradient id="fillBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={colors[0]} stopOpacity={.4}/><stop offset="95%" stopColor={colors[0]} stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" opacity={.15}/><XAxis dataKey="month"/><YAxis/><Tooltip/><Area type="monotone" dataKey="confidence" stroke={colors[0]} fill="url(#fillBlue)" strokeWidth={3}/></AreaChart></ResponsiveContainer></div></Card>
    <Card title="Coaching outcomes"><div className="h-72"><ResponsiveContainer><BarChart data={[{name:"Accepted",value:62},{name:"Modified",value:20},{name:"Deferred",value:11},{name:"Rejected",value:7}]}><CartesianGrid strokeDasharray="3 3" opacity={.15}/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" radius={[8,8,0,0]}>{colors.slice(0,4).map((c,i)=><Cell key={c} fill={c}/>)}</Bar></BarChart></ResponsiveContainer></div></Card></div>
    <div className="mt-6"><Disclaimer/></div>
  </Page>;
}

function ROI() {
  const [annual,setAnnual]=useState(120);const [value,setValue]=useState(8.5);const [win,setWin]=useState(28);const [lift,setLift]=useState(4);const [sellerHours,setSellerHours]=useState(6);const [managerHours,setManagerHours]=useState(3);const [cost,setCost]=useState(145);const [margin,setMargin]=useState(32);const [operating,setOperating]=useState(1.2);const [investment,setInvestment]=useState(2.4);const [scenario,setScenario]=useState("Base");
  const factor=scenario==="Conservative"?.7:scenario==="Upside"?1.35:1; const wins=annual*win/100;const incremental=annual*(lift*factor)/100;const revenue=incremental*value;const marginValue=revenue*margin/100;const time=(annual*(sellerHours+managerHours)*cost)/1_000_000;const total=marginValue+time;const net=total-operating;const roi=net/investment;const payback=investment/(Math.max(net,0.1)/12);
  return <Page eyebrow="Illustrative value model" title="Test the assumptions behind the business case" description="Edit every assumption and compare conservative, base, and upside scenarios. Outputs are illustrative, not commitments.">
    <div className="mb-6 flex flex-wrap gap-2">{["Conservative","Base","Upside"].map(s=><button key={s} onClick={()=>setScenario(s)} className={cx("focus-ring rounded-xl px-4 py-2 text-sm font-semibold",scenario===s?"bg-blue-600 text-white":"bg-white dark:bg-white/5")}>{s}</button>)}</div>
    <div className="grid gap-6 xl:grid-cols-[.85fr_1.15fr]"><Card title="Editable assumptions"><div className="grid gap-4 sm:grid-cols-2"><NumberInput label="Annual strategic opportunities" value={annual} set={setAnnual}/><NumberInput label="Average opportunity value ($M)" value={value} set={setValue}/><NumberInput label="Baseline win rate (%)" value={win} set={setWin}/><NumberInput label="Expected win-rate lift (pts)" value={lift} set={setLift}/><NumberInput label="Seller review hours" value={sellerHours} set={setSellerHours}/><NumberInput label="Manager review hours" value={managerHours} set={setManagerHours}/><NumberInput label="Loaded hourly cost ($)" value={cost} set={setCost}/><NumberInput label="Margin contribution (%)" value={margin} set={setMargin}/><NumberInput label="Annual platform cost ($M)" value={operating} set={setOperating}/><NumberInput label="Implementation investment ($M)" value={investment} set={setInvestment}/></div></Card>
    <div><div className="grid gap-4 sm:grid-cols-2"><Metric label="Baseline wins" value={wins.toFixed(1)} detail="Annual opportunities"/><Metric label="Incremental wins" value={incremental.toFixed(1)} detail={`${scenario} scenario`} tone="green"/><Metric label="Incremental won revenue" value={`$${revenue.toFixed(1)}M`} detail="Illustrative" tone="violet"/><Metric label="Margin contribution" value={`$${marginValue.toFixed(1)}M`} detail="Illustrative" tone="green"/><Metric label="Net estimated value" value={`$${net.toFixed(1)}M`} detail="After annual operating cost" tone="blue"/><Metric label="ROI / Payback" value={`${roi.toFixed(1)}x / ${payback.toFixed(1)} mo`} detail="Illustrative" tone="amber"/></div><div className="mt-4"><Disclaimer/></div></div></div>
  </Page>;
}
function NumberInput({label,value,set}:{label:string;value:number;set:(v:number)=>void}) { return <label><span className="text-xs font-semibold text-slate-500">{label}</span><input type="number" value={value} onChange={e=>set(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-white/10"/></label>; }

function Architecture() {
  const layers=[
    ["Experience layer",["Microsoft 365 Copilot","Microsoft Teams","Outlook","Dynamics 365 Sales","Seller web workspace","Power BI executive reporting"],"blue"],
    ["Agent orchestration",["Microsoft Foundry","Azure OpenAI","Sales Coach Supervisor Agent","Specialist agents","Human approval workflow","Observability"],"violet"],
    ["Intelligence layer",["Azure Machine Learning","Opportunity-health models","Momentum detection","Recommendation ranking","Evidence extraction","Model monitoring"],"green"],
    ["Data foundation",["Microsoft Fabric","OneLake","Azure AI Search","Approved sales knowledge","Opportunity history","Aggregated activity evidence"],"amber"],
    ["Security and governance",["Microsoft Entra ID","Microsoft Purview","Azure Key Vault","RBAC","Audit logging","Data residency controls"],"red"],
  ];
  return <Page eyebrow="Proposed Microsoft architecture" title="Connect authorized evidence, governed reasoning, and seller experience" description="A conceptual Microsoft foundation for a production solution. No live integrations are implemented or implied in this demonstration.">
    <Card className="mb-6"><div className="flex flex-wrap items-center justify-center gap-2 text-center text-xs font-semibold">{["CRM, customer, meeting and opportunity evidence","Microsoft Fabric and OneLake","Approved knowledge and intelligence","Microsoft Foundry agent orchestration","Seller and manager review","Meeting prep and action plan","Outcome measurement"].map((x,i)=><span key={x} className="contents"><span className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-white/5">{x}</span>{i<6&&<ArrowRight className="size-4 text-blue-500"/>}</span>)}</div></Card>
    <div className="space-y-4">{layers.map(([title,items,tone])=><Card key={title as string} title={title as string}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{(items as string[]).map(item=><div key={item} className={cx("rounded-xl border p-3 text-sm font-medium",tone==="blue"?"border-blue-500/20 bg-blue-500/5":tone==="violet"?"border-violet-500/20 bg-violet-500/5":tone==="green"?"border-emerald-500/20 bg-emerald-500/5":tone==="amber"?"border-amber-500/20 bg-amber-500/5":"border-red-500/20 bg-red-500/5")}>{item}</div>)}</div></Card>)}</div>
    <Card title="Integration and authority boundary" className="mt-6"><div className="grid gap-4 md:grid-cols-3"><EvidenceBox title="Observe and diagnose" icon={<Search/>} tone="blue" text="Read only authorized opportunity evidence and identify gaps, risks, and uncertainty."/><EvidenceBox title="Recommend and prepare" icon={<Lightbulb/>} tone="amber" text="Suggest an explainable next move and prepare seller-controlled materials."/><EvidenceBox title="Approve and execute" icon={<ShieldCheck/>} tone="green" text="Authorized people approve; existing enterprise systems perform approved activities."/></div></Card>
    <div className="mt-6"><Disclaimer/></div>
  </Page>;
}

function Governance({audit}:{audit:AuditEvent[]}) {
  return <Page eyebrow="Responsible AI and operating controls" title="Agents recommend. Sales teams decide." description="Human authority, evidence transparency, least privilege, auditability, and purpose limitation govern every simulated recommendation.">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{governanceControls.map(c=><Card key={c.id}><div className="flex items-start justify-between gap-3"><ShieldCheck className={cx("size-5",c.status==="Active"?"text-emerald-500":c.status==="Review"?"text-amber-500":"text-blue-500")}/><Badge tone={c.status==="Active"?"green":c.status==="Review"?"amber":"blue"}>{c.status}</Badge></div><h2 className="mt-3 text-sm font-semibold">{c.name}</h2><p className="mt-2 text-xs leading-5 text-slate-500">{c.detail}</p><div className="mt-3 text-[11px] font-semibold">Owner: {c.owner}</div></Card>)}</div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[.9fr_1.1fr]"><Card title="Authority model">{["Observe authorized evidence","Diagnose gaps and risks","Recommend the best next move","Prepare a brief and action plan","Approve through seller or manager","Execute in existing systems","Measure opportunity movement"].map((x,i)=><div key={x} className="flex items-center gap-3 border-b border-slate-200 py-3 last:border-0 dark:border-white/10"><span className="grid size-7 place-items-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-600">{i+1}</span><span className="text-sm">{x}</span></div>)}</Card>
    <Card title="Audit record"><div className="max-h-[480px] space-y-3 overflow-y-auto">{audit.map(a=><div key={a.id} className="rounded-xl border border-slate-200 p-4 dark:border-white/10"><div className="flex justify-between gap-3"><span className="text-sm font-semibold">{a.event}</span><span className="text-xs text-slate-500">{a.timestamp}</span></div><div className="mt-1 text-xs font-medium text-blue-600 dark:text-blue-300">{a.actor}</div><p className="mt-2 text-xs leading-5 text-slate-500">{a.detail}</p></div>)}</div></Card></div>
    <Card title="Prohibited uses" className="mt-6"><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{["No autonomous CRM changes","No autonomous customer contact","No employee ranking or leaderboards","No protected-characteristic use","No guaranteed forecasts or financial outcomes","No inference presented as customer fact","No unnecessary raw communications exposure","No material action without human approval"].map(x=><div key={x} className="flex gap-2 rounded-xl bg-red-500/5 p-3 text-sm"><XCircle className="size-4 shrink-0 text-red-500"/>{x}</div>)}</div></Card>
    <div className="mt-6"><Disclaimer/></div>
  </Page>;
}

function Walkthrough({close}:{close:()=>void}) {
  const [step,setStep]=useState<number|null>(null);const [playing,setPlaying]=useState(false);const navigate=useNavigate();
  useEffect(()=>{if(!playing||step===null)return;const t=setTimeout(()=>{if(step>=walkthrough.length-1)setPlaying(false);else setStep(step+1)},4000);return()=>clearTimeout(t)},[playing,step]);
  const open=(i:number)=>{setStep(i);navigate(walkthrough[i][3])};
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050d18]/98 text-white backdrop-blur-xl"><div className="mx-auto min-h-screen max-w-7xl p-4 sm:p-8">
    <div className="flex items-center justify-between gap-4"><div><div className="eyebrow text-violet-300">Executive Demo Walkthrough</div><h2 className="mt-2 text-2xl font-bold">{step===null?"Choose any step or start the guided story":"Guided strategic deal story"}</h2></div><button onClick={close} className="focus-ring rounded-xl bg-white/10 p-3 hover:bg-white/20" aria-label="Exit walkthrough"><X/></button></div>
    {step===null?<div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{walkthrough.map((w,i)=><button key={w[0]} onClick={()=>open(i)} className="focus-ring group rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:-translate-y-1 hover:border-violet-400 hover:bg-white/10"><div className="flex items-center justify-between"><span className="grid size-9 place-items-center rounded-full bg-violet-600 text-sm font-bold">{i+1}</span><ArrowRight className="size-5 text-slate-500 group-hover:text-violet-300"/></div><div className="mt-5 text-xs font-semibold uppercase tracking-wider text-violet-300">{w[0]}</div><div className="mt-2 text-lg font-bold">{w[1]}</div><p className="mt-2 text-sm leading-6 text-slate-400">{w[2]}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-300">Open Step <ChevronRight className="size-4"/></span></button>)}</div>:
    <div className="mt-12 grid min-h-[65vh] place-items-center"><div className="w-full max-w-4xl text-center"><span className="grid size-14 place-items-center rounded-full bg-violet-600 text-xl font-bold mx-auto">{step+1}</span><div className="mt-6 text-sm font-semibold uppercase tracking-[.2em] text-violet-300">{walkthrough[step][0]}</div><h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">{walkthrough[step][1]}</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">{walkthrough[step][2]}</p><div className="mt-10 flex flex-wrap justify-center gap-3"><Button variant="secondary" disabled={step===0} onClick={()=>open(step-1)}><ChevronLeft className="size-4"/>Previous</Button><Button variant="secondary" onClick={()=>setPlaying(!playing)}>{playing?<Pause className="size-4"/>:<Play className="size-4"/>}{playing?"Pause":"Auto Play"}</Button><Button variant="secondary" onClick={()=>{setStep(0);setPlaying(false);navigate(walkthrough[0][3])}}><RefreshCw className="size-4"/>Restart</Button><Button variant="secondary" onClick={()=>{setStep(null);setPlaying(false)}}><LayoutDashboard className="size-4"/>Return to Tiles</Button><Button disabled={step===walkthrough.length-1} onClick={()=>open(step+1)}>Next<ChevronRight className="size-4"/></Button></div><div className="mt-8 text-xs text-slate-500">This step has focused the related application section behind the walkthrough.</div></div></div>}
  </div></div>;
}

function Footer() { return <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center dark:border-white/10 dark:bg-[#081422] lg:pl-72"><div className="mx-auto max-w-6xl"><div className="text-sm font-semibold">Enterprise Sales Coach · Deal Dynamics Coach</div><p className="mt-3 text-[11px] leading-5 text-slate-500">{disclaimer}</p></div></footer>; }

export default App;
