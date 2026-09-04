import type { Localized } from "@/lib/i18n";

export interface Person {
  id: string;
  fullName: string;
  nickname?: Localized;
  birthYear?: number;
  deathYear?: number;
  birthPlace?: string;
  role?: Localized;
  bio?: Localized;
  photo?: string;
  /** Punto de interés para el recorte de la miniatura, p. ej. "70% 18%". */
  photoPosition?: string;
  photoCaption?: Localized;
  photoNote?: Localized;
  fatherId?: string;
  motherId?: string;
  generation: 1 | 2 | 3 | 4 | 5 | 6;
  /** Quien queda fuera del tronco de Guelma: la rama que no salió de Rusia,
   *  la familia de Lydia y la valenciana con la que se casó Eric. */
  branch?: "ucrania" | "guez" | "consortes" | "valenciana";
}

export interface FamilyEvent {
  id: string;
  title: Localized;
  description?: Localized;
  year: number;
  dateLabel?: Localized;
  location?: Localized;
  documented?: boolean;
  key?: boolean;
}

export interface Place {
  id: string;
  city: string;
  country: Localized;
  lat: number;
  lng: number;
  yearArrived?: number;
  yearLabel?: Localized;
  note?: Localized;
  onRoute?: boolean;
  order?: number;
}

export interface MediaItem {
  id: string;
  decade: number;
  type: "photo" | "letter" | "document";
  url: string;
  caption: Localized;
  detail?: Localized;
  retouched?: Localized;
}

export interface Tradition {
  id: string;
  category: "recipe" | "anecdote" | "object";
  title: Localized;
  content: Localized;
}
