import { ChevronDown, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PLANETS } from "@/data/planets";

export function PlanetMenu({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const current = PLANETS.find((p) => p.id === selectedId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="pointer-events-auto gap-2 border border-white/10 bg-black/45 backdrop-blur-md"
        >
          <Orbit className="size-4" />
          {current ? current.name : "Choose a planet"}
          <ChevronDown className="size-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Planets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {PLANETS.map((planet) => (
          <DropdownMenuItem
            key={planet.id}
            onSelect={() => onSelect(planet.id)}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: planet.palette[0] }}
              />
              {planet.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {planet.moons?.length ?? 0} moons
            </span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => onSelect(null)}>
          Whole solar system
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
