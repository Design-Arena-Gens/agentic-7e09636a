'use client';

import { useMemo, useState } from "react";
import { buildScriptDocument, createTextExport, ScriptLength, ScriptLanguage } from "@/lib/scriptBuilder";

const genres = [
  "Drama",
  "Comedy",
  "Thriller",
  "Romance",
  "Sci-Fi",
  "Mystery",
  "Slice of Life",
];

const tones = ["Hopeful", "Gritty", "Playful", "Melancholic", "Inspirational"];

const defaultCharacters = "Aarzoo - spirited dreamer, Kabir - loyal friend, Rhea - bold rival";

const lengthOptions: { label: string; value: ScriptLength }[] = [
  { label: "Short · 3 acts", value: "short" },
  { label: "Medium · 4 acts", value: "medium" },
  { label: "Long · 5 acts", value: "long" },
];

const languageOptions: { label: string; value: ScriptLanguage }[] = [
  { label: "English", value: "english" },
  { label: "हिंदी", value: "hindi" },
];

function parseCharacters(input: string): string[] {
  return input
    .split(/[,\n]/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

export default function ScriptGenerator() {
  const [title, setTitle] = useState("Dil Se Digital");
  const [genre, setGenre] = useState(genres[0]);
  const [tone, setTone] = useState(tones[0]);
  const [language, setLanguage] = useState<ScriptLanguage>("hindi");
  const [setting, setSetting] = useState("Mumbai coworking studio");
  const [logline, setLogline] = useState(
    "A spirited creator races to shoot a viral short before the sun sets on her rooftop studio.",
  );
  const [characterNotes, setCharacterNotes] = useState(defaultCharacters);
  const [length, setLength] = useState<ScriptLength>("medium");
  const [copied, setCopied] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const characters = useMemo(() => parseCharacters(characterNotes), [characterNotes]);

  const scriptDocument = useMemo(
    () =>
      buildScriptDocument({
        title,
        genre,
        tone,
        language,
        setting,
        logline,
        characters,
        length,
      }),
    [title, genre, tone, language, setting, logline, characters, length],
  );

  const scriptText = useMemo(
    () => createTextExport(scriptDocument, language),
    [scriptDocument, language],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([scriptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = `${title.replace(/\s+/g, "_").toLowerCase()}.txt`;
    anchor.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      setDownloadUrl(null);
    }, 3000);
  };

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[380px,1fr] lg:gap-10">
      <section className="flex flex-col gap-5 rounded-3xl border border-zinc-200/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/15 dark:bg-zinc-900/70">
        <header className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
            Script Weaver
          </p>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            Spin a production-ready script in seconds.
          </h1>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Tweak the creative DNA and watch the beats auto-refresh. Designed for
            writers, creators, and social storytellers.
          </p>
        </header>

        <label className="space-y-2 text-sm">
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">Title</span>
          <input
            className="w-full rounded-xl border border-zinc-200/80 bg-white px-3 py-2.5 text-base font-medium text-zinc-900 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-white/20 dark:bg-zinc-800 dark:text-white"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">Logline</span>
          <textarea
            className="w-full rounded-xl border border-zinc-200/80 bg-white px-3 py-2.5 text-base font-medium leading-relaxed text-zinc-900 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-white/20 dark:bg-zinc-800 dark:text-white"
            rows={3}
            value={logline}
            onChange={(event) => setLogline(event.target.value)}
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">Genre</span>
            <select
              className="w-full rounded-xl border border-zinc-200/80 bg-white px-3 py-2.5 text-base font-medium text-zinc-900 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-white/20 dark:bg-zinc-800 dark:text-white"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            >
              {genres.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">Tone</span>
            <select
              className="w-full rounded-xl border border-zinc-200/80 bg-white px-3 py-2.5 text-base font-medium text-zinc-900 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-white/20 dark:bg-zinc-800 dark:text-white"
              value={tone}
              onChange={(event) => setTone(event.target.value)}
            >
              {tones.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="space-y-2 text-sm">
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">Setting</span>
          <input
            className="w-full rounded-xl border border-zinc-200/80 bg-white px-3 py-2.5 text-base font-medium text-zinc-900 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-white/20 dark:bg-zinc-800 dark:text-white"
            value={setting}
            onChange={(event) => setSetting(event.target.value)}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">
            Key characters (comma or new line separated)
          </span>
          <textarea
            className="w-full rounded-xl border border-zinc-200/80 bg-white px-3 py-2.5 text-base font-medium leading-relaxed text-zinc-900 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-white/20 dark:bg-zinc-800 dark:text-white"
            rows={4}
            value={characterNotes}
            onChange={(event) => setCharacterNotes(event.target.value)}
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">Script length</span>
            <select
              className="w-full rounded-xl border border-zinc-200/80 bg-white px-3 py-2.5 text-base font-medium text-zinc-900 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-white/20 dark:bg-zinc-800 dark:text-white"
              value={length}
              onChange={(event) => setLength(event.target.value as ScriptLength)}
            >
              {lengthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">Language</span>
            <select
              className="w-full rounded-xl border border-zinc-200/80 bg-white px-3 py-2.5 text-base font-medium text-zinc-900 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-white/20 dark:bg-zinc-800 dark:text-white"
              value={language}
              onChange={(event) => setLanguage(event.target.value as ScriptLanguage)}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600"
          >
            {copied ? "Copied!" : "Copy Script"}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 rounded-xl border border-emerald-200/60 bg-white px-4 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-500/40 dark:bg-transparent dark:text-emerald-300 dark:hover:bg-emerald-500/10"
          >
            Download TXT
          </button>
        </div>
        {downloadUrl && (
          <p className="text-center text-xs text-zinc-400">
            Preparing download…
          </p>
        )}
      </section>

      <section className="relative flex min-h-[520px] flex-col gap-6 overflow-hidden rounded-3xl border border-zinc-200/60 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-8 shadow-sm dark:border-white/10 dark:from-emerald-900/40 dark:via-zinc-950 dark:to-sky-900/30">
        <div className="pointer-events-none absolute -right-12 top-10 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/10" />
        <header className="relative z-10 flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
            Auto-updated Output
          </p>
          <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white">
            {scriptDocument.titlePage.title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-300">
            {scriptDocument.titlePage.logline}
          </p>
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-600">
            {scriptDocument.titlePage.genre} · {scriptDocument.titlePage.tone}
          </p>
        </header>

        <article className="relative z-10 flex flex-col gap-8 overflow-y-auto pr-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200 lg:max-h-[640px]">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
              {language === "english" ? "Summary" : "सार"}
            </h3>
            <p className="mt-2 whitespace-pre-line text-base font-medium text-zinc-800 dark:text-white">
              {scriptDocument.summary}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
              {language === "english" ? "Structure" : "संरचना"}
            </h3>
            <ul className="mt-3 space-y-3">
              {scriptDocument.structure.map((item) => (
                <li key={item.act} className="rounded-2xl border border-zinc-200/70 bg-white/80 p-4 shadow-sm dark:border-white/15 dark:bg-zinc-900/60">
                  <p className="text-sm font-semibold text-emerald-600">{item.act}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{item.focus}</p>
                  <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{item.stakes}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
              {language === "english" ? "Scenes" : "दृश्य"}
            </h3>
            <div className="mt-3 space-y-5">
              {scriptDocument.scenes.map((scene) => (
                <div key={scene.heading} className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm dark:border-white/15 dark:bg-zinc-900/60">
                  <p className="text-sm font-semibold text-emerald-600">{scene.heading}</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{scene.description}</p>
                  <div className="mt-3 space-y-2 text-sm">
                    {scene.beats.map((beat, index) => (
                      <div key={index} className="rounded-xl bg-emerald-50/60 px-3 py-2 text-emerald-950 shadow-inner dark:bg-emerald-500/10 dark:text-emerald-100">
                        {beat.type === "action" ? (
                          <p>{beat.content}</p>
                        ) : (
                          <p>
                            <span className="font-semibold uppercase tracking-wide">
                              {beat.speaker}
                            </span>
                            : {beat.content}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
              {language === "english" ? "Final Note" : "अंतिम नोट"}
            </h3>
            <p className="mt-2 rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-4 text-emerald-900 shadow-inner dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100">
              {scriptDocument.closing}
            </p>
          </section>
        </article>
      </section>
    </div>
  );
}
