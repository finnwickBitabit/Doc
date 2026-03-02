import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CharacterDossier({ initialId = 1 }: { initialId?: number }) {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isDead, setIsDead] = useState<boolean>(false);
  
  const [searchId, setSearchId] = useState<string>(initialId.toString());
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchCharacter = async (id: string | number) => {
    try {
      setLoading(true);
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if (!response.ok) {
        throw new Error("Character not found");
      }
      const data = await response.json();
      
      setName(data.name);
      setStatus(data.status);
      setImage(data.image);
      setIsDead(data.status === "Dead");
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 1. INITIAL DATA FETCH
  useEffect(() => {
    fetchCharacter(initialId);
  }, [initialId]);

  const handleFetchClick = () => {
    if (searchId) {
      fetchCharacter(searchId);
    }
  };

  const handleStatusToggle = () => {
    // C) Status Toggle Button:
    // - On click, toggle between "Alive" and "Dead"
    const newStatus = status === "Alive" ? "Dead" : "Alive";
    // - Update status state accordingly
    setStatus(newStatus);
    // - Recalculate isDead based on new status
    setIsDead(newStatus === "Dead");
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* 2. BASE UI COMPONENT & 4. CONDITIONAL STYLING */}
      <Card 
        style={{ 
          backgroundColor: isDead ? "#808080" : "var(--color-card)", 
          transition: "background-color 0.3s ease" 
        }}
        className={isDead ? "text-white border-gray-600" : ""}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{loading ? "Loading..." : name}</CardTitle>
          <CardDescription className={isDead ? "text-gray-200" : "text-muted-foreground"}>
            Status: <span className="font-semibold">{status}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col gap-6">
          {/* Character Image */}
          {image && (
            <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg border-2 border-transparent">
              <img 
                src={image} 
                alt={name} 
                style={{ 
                  filter: isDead ? "grayscale(100%)" : "none",
                  transition: "filter 0.3s ease"
                }}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* 3. INTERACTIVE CONTROLS */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex gap-2">
              {/* A) ID Search Input */}
              <Input 
                type="number" 
                value={searchId} 
                onChange={(e) => setSearchId(e.target.value)} 
                placeholder="Enter ID (e.g. 1)"
                min="1"
                className={`flex-1 ${isDead ? "bg-gray-700 border-gray-500 text-white placeholder:text-gray-400" : ""}`}
              />
              {/* B) Fetch Character Button */}
              <Button 
                onClick={handleFetchClick} 
                disabled={loading} 
                variant={isDead ? "secondary" : "default"}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Fetch
              </Button>
            </div>
            
            {/* C) Status Toggle Button */}
            <Button 
              onClick={handleStatusToggle} 
              variant={isDead ? "outline" : "outline"}
              className={`w-full ${isDead ? "bg-transparent border-gray-400 text-white hover:bg-gray-700 hover:text-white" : ""}`}
            >
              Toggle Status (Currently {status})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
