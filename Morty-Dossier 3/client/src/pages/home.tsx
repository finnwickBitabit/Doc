import CharacterDossier from "@/components/CharacterDossier";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 gap-12">
      <div className="text-center">
        <h1 className="text-5xl font-black tracking-tighter mb-3 uppercase italic">Rick & Morty</h1>
        <p className="text-muted-foreground text-lg">Multi-Entity Dossier System</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
        <CharacterDossier initialId={1} />
        <CharacterDossier initialId={2} />
      </div>
    </div>
  );
}
