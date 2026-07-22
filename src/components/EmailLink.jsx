export default function EmailLink() {
  return (
    <div className="hidden lg:flex flex-col items-center gap-6 fixed right-8 bottom-0 pb-8 z-10">
      <a
        href="mailto:eaphoney@gmail.com"
        className="[writing-mode:vertical-rl] font-mono text-xs tracking-widest text-muted hover:text-primary hover:-translate-y-1 transition"
      >
        eaphoney@gmail.com
      </a>
      <span className="w-px h-24 bg-muted-soft" aria-hidden="true" />
    </div>
  )
}
