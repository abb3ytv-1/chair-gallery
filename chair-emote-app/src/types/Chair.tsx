import type { StaticImageData } from "next/image";

export type ChairMood =
  | "Founding"
  | "Cozy"
  | "Chaotic"
  | "Ceremonial"
  | "Radiant"
  | "Robotic";

export type Chair = {
  id: string;
  name: string;
  emoji: string;
  mood: ChairMood;
  owner: string;
  decree: string;
  detail: string;
  image?: string | StaticImageData;
};
