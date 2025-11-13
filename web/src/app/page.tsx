import ScriptGenerator from "@/components/ScriptGenerator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-emerald-50 p-6 font-sans text-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950 dark:text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-4 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
            Hello, कहानीकार
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Compose cinematic scripts instantly in English or हिंदी.
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            Tune the genre, tone, and characters—our generator stitches your brief into a ready-to-use script layout with acts, scenes, and dialogue beats.
          </p>
        </div>
        <ScriptGenerator />
      </main>
    </div>
  );
}
