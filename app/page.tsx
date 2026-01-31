import type React from "react";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Badge } from "@/lib/components/ui/badge";
import {
  BookOpen,
  Github,
  Twitter,
  Feather,
  Globe,
  Users,
  ChevronRight,
} from "lucide-react";
import AuthButton from "@/lib/components/auth/auth-button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline gap-8">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">Apricity</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Roadmap
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex gap-2 border-white/10 hover:bg-white/5 bg-transparent"
            >
              <Github className="h-4 w-4" />
              Star on GitHub
            </Button>
            <AuthButton text="Start Writing" />
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
            <div className="text-center">
              {/*<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium backdrop-blur-xl mb-8">
                <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none h-5 px-1.5">
                  Beta
                </Badge>
                <span className="text-muted-foreground">Open beta now available for authors.</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>*/}

              <h1 className="text-balance text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
                Forge Worlds, <br className="hidden sm:block" />
                <span className="text-white">Weave Stories</span>
              </h1>

              <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg font-medium text-muted-foreground sm:text-xl">
                The complete worldbuilding and writing tool for authors who
                craft intricate universes. Build
                <span className="text-foreground"> deep characters</span>, map
                complex plots, and bring your creative vision to life.
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <AuthButton
                  text="Start Writing Free"
                  classname="h-12 px-8 text-base bg-white text-black hover:bg-white/90"
                />
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10"
                >
                  View Demo Project
                </Button>
              </div>

              <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span className="text-white/40">✨</span>
                <span>No credit card required · Your data stays yours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section
          id="features"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title="Deep Characters"
              description="Track backstories, motivations, relationships, and character arcs seamlessly."
              metric="character building"
            />
            <FeatureCard
              icon={<Globe className="h-5 w-5" />}
              title="Rich Worlds"
              description="Detail cultures, histories, magic systems, and geography in one place."
              metric="worldbuilding"
            />
            <FeatureCard
              icon={<BookOpen className="h-5 w-5" />}
              title="Plot Mastery"
              description="Map intricate storylines with timeline views and interconnected events."
              metric="plotweaver"
            />
            <FeatureCard
              icon={<Feather className="h-5 w-5" />}
              title="Focused Writing"
              description="Distraction-free manuscript editor with integrated world reference."
              metric="manuscript"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Feather className="h-5 w-5 text-white" />
              <span className="text-lg font-bold tracking-tight">Apricity</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground">
                Community Guidelines
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/5"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/5"
              >
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            © 2026 Apricity. Empowering authors to build intricate universes.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  metric,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors group-hover:bg-white group-hover:text-black">
        {icon}
      </div>
      <div className="mb-1 text-2xl font-bold">{title}</div>
      <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {metric}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
