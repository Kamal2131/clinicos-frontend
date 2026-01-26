"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-purple-500/30">

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 lg:px-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/25">
            C
          </div>
          <span className="text-xl font-bold tracking-tight">ClinicOS</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 group"
          >
            Launch Console
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-32 px-6 lg:px-20 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-3 h-3" />
          <span>v2.0 Now Available with AI Agents</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">Intelligence Layer</span> <br />
          for Modern Clinics.
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Turn your Mindbody data into revenue. ClinicOS uses AI to segment clients,
          automate re-engagment, and fill your calendar while you sleep.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 fill-current" />
            Start Automating
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-sm">
            View API Docs
          </button>
        </div>

        {/* Feature Cards / Floating UI */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <FeatureCard
            icon={Brain}
            title="AI Segmentation"
            desc="Automatically tags clients as 'VIP', 'At Risk', or 'High Potential' based on behavior."
            color="purple"
          />
          <FeatureCard
            icon={TrendingUp}
            title="Revenue Growth"
            desc="Recover lost revenue with automated re-engagement campaigns that actually convert."
            color="blue"
          />
          <FeatureCard
            icon={Zap}
            title="Instant Workflows"
            desc="Launch birthday offers, post-visit surveys, and follow-ups in one click."
            color="amber"
          />
        </div>
      </main>

    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color }: any) {
  const colors: any = {
    purple: "from-purple-500/20 to-indigo-500/20 text-purple-400",
    blue: "from-blue-500/20 to-cyan-500/20 text-blue-400",
    amber: "from-amber-500/20 to-orange-500/20 text-amber-400",
  };

  return (
    <div className="p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
      <div className="bg-[#0f172a]/80 backdrop-blur-xl p-8 rounded-xl h-full border border-white/5 hover:border-white/10 transition-all group">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
      </div>
    </div>
  );
}

import { Brain } from "lucide-react"; // Import missing icon
