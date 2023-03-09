import { Subtitle } from "@/models/subtitle";

export function srtToJson(srt: string): Subtitle[] {
  // Split SRT text into individual subtitle blocks
  const subtitleBlocks = srt.trim().split("\n\n");

  // Create an array to store the converted JSON objects
  const subtitles: Subtitle[] = [];

  // Loop through each subtitle block
  for (let i = 0; i < subtitleBlocks.length; i++) {
    const block = subtitleBlocks[i];

    // Split the block into individual lines
    const lines = block.split("\n");

    // Extract the subtitle number and timecodes
    const subtitleNumber = parseInt(lines[0]);
    const timecodes = lines[1].split(" --> ");

    // Extract the subtitle text
    const text = lines.slice(2).join("\n");

    // Create a new subtitle object and add it to the array
    const subtitle: Subtitle = {
      number: subtitleNumber,
      startTime: timecodes[0],
      endTime: timecodes[1],
      text: text,
    };

    subtitles.push(subtitle);
  }

  // Return the array of subtitle objects as a JSON string
  return subtitles;
}
