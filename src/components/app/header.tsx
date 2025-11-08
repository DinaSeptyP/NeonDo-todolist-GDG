import { Logo } from "./logo";

export function AppHeader() {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/20 bg-background/50 backdrop-blur-sm sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
      </div>
    </header>
  );
}
