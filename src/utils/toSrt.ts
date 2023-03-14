import { Subtitle } from "@/models/subtitle";

export function toSrt(arr: Subtitle[]): string {
  return arr.reduce((srt, item) => {
    return `${srt}${item.number}\n${item.startTime} --> ${item.endTime}\n${item.text}\n\n`;
  }, "");
}