import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Database, Settings, PieChart, LineChart,
  Cpu, Users, TrendingUp, FileText, Moon, Sun, Menu, X,
  ArrowUpRight, ArrowDownRight, Sparkles, ChevronRight,
  Upload, Filter, Calculator, Target, Zap, BookOpen
} from 'lucide-react';

/* ─── Types ───────────────────────────────────────────────────────── */
interface KpiProps {
  title: string;
  value: string;
  delta?: string;
  positive?: boolean;
  icon: React.ReactNode;
}

/* ─── Reusable KPI Card ──────────────────────────────────────────── */
function KpiCard({ title, value, delta, positive, icon }: KpiProps) {
  return (
    <div className="group relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full" />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{title}</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-800 dark:text-white">{value}</p>
          {delta && (
            <span className={`mt-2 inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${positive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
              {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {delta}
            </span>
          )}
        </div>
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ─── Workflow Stepper ───────────────────────────────────────────── */
function WorkflowStepper() {
  const steps = [
    'Data Collection', 'Data Cleaning', 'Feature Engineering',
    'EDA', 'Visualization', 'Model Building', 'Evaluation', 'Reporting'
  ];
  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">{i + 1}</span>
            {s}
          </div>
          {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />}
        </div>
      ))}
    </div>
  );
}

/* ─── Page: Home ─────────────────────────────────────────────────── */
function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-10 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <span className="text-sm font-semibold text-blue-200 uppercase tracking-wider">Data Science &amp; AI Foundation Project</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Retail Sales<br />Analysis
          </h1>
          <p className="mt-4 text-lg text-blue-100 leading-relaxed">
            A modern analytics platform that processes, analyzes and visualizes retail transaction data to identify business patterns and predict transaction-level Total Amount by comparing Linear, Decision Tree, Random Forest and Gradient Boosting regression.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-20 top-10 w-40 h-40 rounded-full bg-purple-400/10 blur-2xl" />
      </div>

      {/* Central Question */}
      <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2">Central Question</h3>
        <p className="text-slate-700 dark:text-slate-200 text-lg font-medium italic">
          "How can retail transaction data be systematically cleaned, explored, visualized and modelled to identify purchasing patterns and predict transaction-level Total Amount?"
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Revenue" value="$2.4M" delta="+12.5% MoM" positive icon={<TrendingUp className="w-5 h-5" />} />
        <KpiCard title="Transactions" value="14,209" delta="+5.2% MoM" positive icon={<Target className="w-5 h-5" />} />
        <KpiCard title="Avg Order Value" value="$168.90" delta="-1.2% MoM" positive={false} icon={<Calculator className="w-5 h-5" />} />
        <KpiCard title="Top Category" value="Electronics" icon={<Zap className="w-5 h-5" />} />
      </div>

      {/* Workflow */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Project Workflow</h3>
        <WorkflowStepper />
      </div>

      {/* Objectives */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Objectives</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Collect & Load Data', 'Clean & Preprocess', 'Engineer Features', 'Explore & Visualize', 'Build ML Models', 'Evaluate & Compare', 'Customer Segmentation', 'Forecast Sales', 'Generate Reports'].map((obj, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold">{i + 1}</span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-1">{obj}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Page: Data Cleaning ────────────────────────────────────────── */
function DataCleaningPage() {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'missing', label: 'Missing Values' },
    { key: 'duplicates', label: 'Duplicates' },
    { key: 'outliers', label: 'Outlier Detection' },
    { key: 'stats', label: 'Statistics' }
  ];
  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-10 text-center bg-white dark:bg-slate-800 hover:border-blue-400 transition-colors cursor-pointer">
        <Upload className="w-12 h-12 text-slate-300 dark:text-slate-500 mx-auto mb-4" />
        <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">Drag & drop your CSV here</p>
        <p className="text-sm text-slate-400 mt-1">or click to browse · retail_sales_dataset.csv</p>
        <button className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-colors">
          Upload CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveSubTab(t.key)} className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${activeSubTab === t.key ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content Placeholder */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 min-h-[300px]">
        <p className="text-slate-500 text-sm">Displaying: <strong>{activeSubTab}</strong> analysis. Upload a CSV to see results.</p>
        {/* Table skeleton */}
        <div className="mt-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-50 dark:bg-slate-700/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Page: EDA ──────────────────────────────────────────────────── */
function EDAPage() {
  const [activeChart, setActiveChart] = useState('category');
  const charts = [
    { key: 'category', label: 'Sales by Category' },
    { key: 'age', label: 'Age Distribution' },
    { key: 'gender', label: 'Gender Comparison' },
    { key: 'trends', label: 'Monthly Trend' },
    { key: 'correlation', label: 'Correlation Heatmap' },
    { key: 'pareto', label: 'Pareto 80/20' },
    { key: 'sunburst', label: 'Sunburst' },
  ];
  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2">
        {charts.map(c => (
          <button key={c.key} onClick={() => setActiveChart(c.key)} className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${activeChart === c.key ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300'}`}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <PieChart className="w-16 h-16 text-slate-200 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">
            Interactive Plotly chart: {charts.find(c => c.key === activeChart)?.label}
          </p>
          <p className="text-sm text-slate-400 mt-1">Will render when connected to the API</p>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Auto-Generated Insights</h3>
        </div>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li>• Insights will be computed from filtered data — no hardcoded values</li>
          <li>• Top performing categories, customer segments, and trends</li>
          <li>• Gender-based spending patterns and seasonal analysis</li>
        </ul>
      </div>
    </div>
  );
}

/* ─── Page: Model Training ───────────────────────────────────────── */
function ModelTrainingPage() {
  const [training, setTraining] = useState(false);
  const models = [
    { name: 'Linear Regression', desc: 'Simple, interpretable baseline model', status: 'ready' },
    { name: 'Decision Tree', desc: 'Non-linear splits, highly interpretable', status: 'ready' },
    { name: 'Random Forest', desc: 'Ensemble of 100 trees, robust predictions', status: 'ready' },
    { name: 'Gradient Boosting', desc: 'Sequential boosting, highest accuracy', status: 'ready' },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <button onClick={() => setTraining(!training)} className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${training ? 'bg-slate-200 dark:bg-slate-700 text-slate-500' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'}`}>
          {training ? 'Training...' : '🚀 Train All Models'}
        </button>
        <label className="flex items-center gap-2 text-sm text-slate-500">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
          Enable GridSearchCV Tuning
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-500">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
          Leakage-Free Mode
        </label>
      </div>

      {training && (
        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" style={{ width: '65%' }} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map(m => (
          <div key={m.name} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-slate-800 dark:text-white">{m.name}</h4>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 uppercase">{m.status}</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page: Model Evaluation ─────────────────────────────────────── */
function ModelEvaluationPage() {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase mb-1">Why R² ≈ 1.0?</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">Total Amount = Quantity × Price per Unit is a deterministic formula. Tree models learn this exactly. Enable Leakage-Free mode for realistic evaluation.</p>
      </div>

      {/* Leaderboard */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Model Leaderboard</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/50 text-left">
              <th className="px-5 py-3 font-semibold text-slate-500 dark:text-slate-400">Rank</th>
              <th className="px-5 py-3 font-semibold text-slate-500 dark:text-slate-400">Model</th>
              <th className="px-5 py-3 font-semibold text-slate-500 dark:text-slate-400">MAE</th>
              <th className="px-5 py-3 font-semibold text-slate-500 dark:text-slate-400">RMSE</th>
              <th className="px-5 py-3 font-semibold text-slate-500 dark:text-slate-400">R²</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rank: '🥇', name: 'Decision Tree', mae: '0.00', rmse: '0.00', r2: '1.000' },
              { rank: '🥈', name: 'Random Forest', mae: '0.00', rmse: '0.00', r2: '1.000' },
              { rank: '🥉', name: 'Gradient Boosting', mae: '1.23', rmse: '2.45', r2: '0.998' },
              { rank: '4', name: 'Linear Regression', mae: '45.12', rmse: '78.34', r2: '0.857' },
            ].map(r => (
              <tr key={r.name} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-5 py-4 text-lg">{r.rank}</td>
                <td className="px-5 py-4 font-semibold text-slate-800 dark:text-white">{r.name}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{r.mae}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{r.rmse}</td>
                <td className="px-5 py-4"><span className={`font-bold ${parseFloat(r.r2) >= 0.99 ? 'text-emerald-600' : 'text-amber-600'}`}>{r.r2}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Page: Customer Segmentation ────────────────────────────────── */
function SegmentationPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Number of Clusters (k):</label>
        <input type="range" min="2" max="8" defaultValue={4} className="w-48" />
        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm">Run K-Means</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 min-h-[300px] flex items-center justify-center">
          <p className="text-slate-400 text-sm">Elbow Curve / Silhouette Score Chart</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 min-h-[300px] flex items-center justify-center">
          <p className="text-slate-400 text-sm">2D PCA Cluster Scatter Plot</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['High Spenders', 'Frequent Buyers', 'Occasional Buyers', 'Low Value'].map(seg => (
          <div key={seg} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5 text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">{seg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page: Forecast ─────────────────────────────────────────────── */
function ForecastPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="w-16 h-16 text-slate-200 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-500">3-Month Sales Forecast</p>
          <p className="text-sm text-slate-400 mt-1">Plotly chart with historical data, forecast line, and confidence bands</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Page: Predict & What-If ────────────────────────────────────── */
function PredictPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 space-y-5">
        <h3 className="font-bold text-slate-800 dark:text-white text-lg">Predict Transaction Amount</h3>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Age</label><input type="range" min="18" max="70" defaultValue={30} className="w-full" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Gender</label><select className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"><option>Male</option><option>Female</option></select></div>
          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Category</label><select className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"><option>Electronics</option><option>Clothing</option><option>Beauty</option></select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">Quantity</label><input type="number" defaultValue={2} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">Price per Unit</label><input type="number" defaultValue={500} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm" /></div>
          </div>
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors">Predict</button>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <p className="text-sm text-blue-200">Predicted Total Amount</p>
          <p className="text-4xl font-black mt-1">$1,000.00</p>
          <p className="text-sm text-blue-200 mt-3">True Value (Qty × Price): $1,000.00</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
          <h4 className="font-bold text-slate-800 dark:text-white mb-4">What-If Simulator</h4>
          <div className="space-y-3">
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">Adjust Quantity (%)</label><input type="range" min="-50" max="50" defaultValue={0} className="w-full" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">Adjust Price (%)</label><input type="range" min="-50" max="50" defaultValue={0} className="w-full" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page: Reports ──────────────────────────────────────────────── */
function ReportsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: 'CSV Export', desc: 'Download cleaned dataset', icon: <Database className="w-8 h-8" />, color: 'from-emerald-500 to-teal-500' },
        { title: 'Excel Report', desc: 'Multi-sheet workbook with all results', icon: <FileText className="w-8 h-8" />, color: 'from-blue-500 to-indigo-500' },
        { title: 'PDF Report', desc: 'Professional report with charts & insights', icon: <BookOpen className="w-8 h-8" />, color: 'from-purple-500 to-pink-500' },
      ].map(r => (
        <div key={r.title} className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${r.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
            {r.icon}
          </div>
          <h4 className="font-bold text-lg text-slate-800 dark:text-white">{r.title}</h4>
          <p className="text-sm text-slate-500 mt-1">{r.desc}</p>
          <button className="mt-4 px-6 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors">
            Download
          </button>
        </div>
      ))}
    </div>
  );
}

/* ─── Page: Results & Conclusion ─────────────────────────────────── */
function ResultsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-3">Conclusion</h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li>• <strong>Linear Regression</strong> serves as a strong baseline (R² ≈ 0.857).</li>
          <li>• <strong>Decision Tree</strong> and <strong>Random Forest</strong> achieve R² ≈ 1.0 due to the deterministic relationship.</li>
          <li>• The simpler <strong>Decision Tree</strong> is preferred when performance is equivalent.</li>
        </ul>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-3">Future Scope</h3>
        <div className="flex flex-wrap gap-2">
          {['K-Means Segmentation', 'Sales Forecasting', 'Discount Analysis', 'Store Location', 'Payment Methods', 'Cloud Dashboard'].map(s => (
            <span key={s} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-200 dark:border-blue-800">{s}</span>
          ))}
        </div>
      </div>
      <div className="text-center py-8 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-500">Data Science & AI Foundation · B.E ECE · 2026-2027</p>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">Deeksha A (2503713810622011) · Shajin Santhosh S (2503713810621049)</p>
      </div>
    </div>
  );
}

/* ─── Feature Engineering Page ───────────────────────────────────── */
function FeatureEngineeringPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700"><h3 className="font-bold text-slate-800 dark:text-white">Feature Table</h3></div>
        <table className="w-full text-sm">
          <thead><tr className="bg-slate-50 dark:bg-slate-700/50 text-left"><th className="px-5 py-3 font-semibold text-slate-500">Feature</th><th className="px-5 py-3 font-semibold text-slate-500">Type</th><th className="px-5 py-3 font-semibold text-slate-500">Role</th></tr></thead>
          <tbody>
            {[
              ['Transaction ID','Categorical','Identifier'],['Date','Datetime','Temporal'],['Customer ID','Categorical','Identifier'],
              ['Gender','Categorical','Input'],['Age','Numeric','Input'],['Product Category','Categorical','Input'],
              ['Quantity','Numeric','Input'],['Price per Unit','Numeric','Input'],['Total Amount','Numeric','Target'],
            ].map(([f,t,r]) => (
              <tr key={f} className="border-t border-slate-100 dark:border-slate-700"><td className="px-5 py-3 font-medium text-slate-700 dark:text-slate-200">{f}</td><td className="px-5 py-3 text-slate-500">{t}</td>
              <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded text-xs font-semibold ${r==='Target'?'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400':r==='Identifier'?'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400':'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>{r}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">💡 Total Amount = Quantity × Price per Unit</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">This deterministic relationship means tree-based models will perfectly learn the formula, producing R² ≈ 1.0.</p>
      </div>
    </div>
  );
}


/* ─── MAIN APP SHELL ─────────────────────────────────────────────── */
export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const navItems = [
    { name: 'Home', icon: LayoutDashboard },
    { name: 'Data Cleaning', icon: Database },
    { name: 'Feature Engineering', icon: Settings },
    { name: 'EDA', icon: PieChart },
    { name: 'Model Training', icon: Cpu },
    { name: 'Model Evaluation', icon: LineChart },
    { name: 'Segmentation', icon: Users },
    { name: 'Forecasting', icon: TrendingUp },
    { name: 'Predict & What-If', icon: Calculator },
    { name: 'Reports', icon: FileText },
    { name: 'Results', icon: BookOpen },
  ];

  const pages: Record<string, React.ReactNode> = {
    'Home': <HomePage />,
    'Data Cleaning': <DataCleaningPage />,
    'Feature Engineering': <FeatureEngineeringPage />,
    'EDA': <EDAPage />,
    'Model Training': <ModelTrainingPage />,
    'Model Evaluation': <ModelEvaluationPage />,
    'Segmentation': <SegmentationPage />,
    'Forecasting': <ForecastPage />,
    'Predict & What-If': <PredictPage />,
    'Reports': <ReportsPage />,
    'Results': <ResultsPage />,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors duration-300">
      
      {/* Sidebar Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      
      {/* Sidebar */}
      <aside className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50 w-72 h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-extrabold text-slate-800 dark:text-white">Retail AI Pro</span>
          </div>
          <button className="lg:hidden p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.name}
              onClick={() => { setActiveTab(item.name); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === item.name ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}
            >
              <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="text-center">
            <p className="text-xs text-slate-400">B.E ECE · 2026-2027</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Deeksha A · Shajin Santhosh S</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select className="text-sm bg-transparent border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>All Dates</option><option>Last 30 Days</option><option>Last Quarter</option>
              </select>
              <select className="text-sm bg-transparent border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>All Genders</option><option>Male</option><option>Female</option>
              </select>
              <select className="text-sm bg-transparent border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>All Categories</option><option>Electronics</option><option>Clothing</option><option>Beauty</option>
              </select>
            </div>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle theme">
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-500" />}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {pages[activeTab] || <HomePage />}
        </main>
      </div>
    </div>
  );
}
