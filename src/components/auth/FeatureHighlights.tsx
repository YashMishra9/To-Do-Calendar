const FEATURES = [
    { title: "Calendar-first planning", desc: "See every task on the day it's due, at a glance." },
    { title: "Priorities & categories", desc: "Color-coded badges keep what matters visible." },
    { title: "Insights dashboard", desc: "Weekly progress and upcoming deadlines in one view." },
  ];
  
  export default function FeatureHighlights() {
    return (
      <section className="max-w-3xl mx-auto px-6 pb-16 grid sm:grid-cols-3 gap-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="border border-[var(--color-border)] rounded-lg bg-white p-5">
            <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
            <p className="text-xs text-[var(--color-muted)]">{f.desc}</p>
          </div>
        ))}
      </section>
    );
  }