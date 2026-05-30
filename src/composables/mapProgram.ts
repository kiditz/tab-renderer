export type MidiInstrument = {
  program: number; // 1–128 (GM display style)
  name: string;
  banks?: Record<number, string>; // bank number → variation name
};
export const MIDI_PROGRAM_MAP: MidiInstrument[] = [
  {
    program: 1,
    name: "Acoustic Grand Piano",
    banks: { 0: "Standard", 1: "Wide Acoustic Grand", 2: "Dark Acoustic Grand" },
  },
  {
    program: 2,
    name: "Bright Acoustic Piano",
    banks: { 0: "Standard", 1: "Wide Bright Acoustic" },
  },
  {
    program: 3,
    name: "Electric Grand Piano",
    banks: { 0: "Standard", 1: "Wide Electric Grand" },
  },
  {
    program: 4,
    name: "Honky-tonk Piano",
    banks: { 0: "Standard", 1: "Wide Honky-tonk" },
  },
  {
    program: 5,
    name: "Electric Piano 1",
    banks: {
      0: "Rhodes Piano",
      1: "Detuned Electric Piano 1",
      2: "Electric Piano 1 Variation",
      3: "60’s Electric Piano",
    },
  },
  {
    program: 6,
    name: "Electric Piano 2",
    banks: {
      0: "Chorused Electric Piano",
      1: "Detuned Electric Piano 2",
      2: "Electric Piano 2 Variation",
      3: "Electric Piano Legend",
      4: "Electric Piano Phase",
    },
  },
  {
    program: 7,
    name: "Harpsichord",
    banks: {
      0: "Standard",
      1: "Coupled Harpsichord",
      2: "Wide Harpsichord",
      3: "Open Harpsichord",
    },
  },
  {
    program: 8,
    name: "Clavinet",
    banks: { 0: "Standard", 1: "Pulse Clavinet" },
  },

  {
    program: 9,
    name: "Celesta",
    banks: { 0: "Standard" },
  },
  {
    program: 10,
    name: "Glockenspiel",
    banks: { 0: "Standard" },
  },
  {
    program: 11,
    name: "Music Box",
    banks: { 0: "Standard" },
  },
  {
    program: 12,
    name: "Vibraphone",
    banks: { 0: "Standard", 1: "Wet Vibraphone" },
  },
  {
    program: 13,
    name: "Marimba",
    banks: { 0: "Standard", 1: "Wide Marimba" },
  },
  {
    program: 14,
    name: "Xylophone",
    banks: { 0: "Standard" },
  },
  {
    program: 15,
    name: "Tubular Bell",
    banks: { 0: "Standard", 1: "Church Bell", 2: "Carillon" },
  },
  {
    program: 16,
    name: "Dulcimer/Santur",
    banks: { 0: "Standard" },
  },

  {
    program: 17,
    name: "Drawbar Organ",
    banks: { 0: "Standard", 1: "Detuned Organ 1", 2: "60’s Organ 1", 3: "Organ 4" },
  },
  {
    program: 18,
    name: "Percussive B3 Organ",
    banks: { 0: "Standard", 1: "Detuned Organ 2", 2: "Organ 5" },
  },
  {
    program: 19,
    name: "Rock Organ",
    banks: { 0: "Standard" },
  },
  {
    program: 20,
    name: "Church Organ",
    banks: { 0: "Church Organ 1", 1: "Church Organ 2", 2: "Church Organ 3" },
  },
  {
    program: 21,
    name: "Reed Organ",
    banks: { 0: "Standard", 1: "Puff Organ" },
  },
  {
    program: 22,
    name: "Accordion",
    banks: { 0: "French Accordion", 1: "Italian Accordion" },
  },
  {
    program: 23,
    name: "Harmonica",
    banks: { 0: "Standard" },
  },
  {
    program: 24,
    name: "Bandoneon",
    banks: { 0: "Standard" },
  },

  {
    program: 25,
    name: "Nylon-String Guitar",
    banks: { 0: "Nylon Standard", 1: "Ukulele", 2: "Open Nylon Guitar", 3: "Nylon Guitar 2" },
  },
  {
    program: 26,
    name: "Steel-String Guitar",
    banks: { 0: "Steel Standard", 1: "12-String Guitar", 2: "Mandolin", 3: "Steel + Body" },
  },
  {
    program: 27,
    name: "Jazz Guitar",
    banks: { 0: "Jazz Standard", 1: "Hawaiian Guitar" },
  },
  {
    program: 28,
    name: "Clean Electric Guitar",
    banks: { 0: "Clean", 1: "Chorus Guitar", 2: "Mid Tone Guitar" },
  },
  {
    program: 29,
    name: "Muted Electric Guitar",
    banks: { 0: "Muted", 1: "Funk Guitar", 2: "Funk Guitar 2", 3: "Jazz Man" },
  },
  {
    program: 30,
    name: "Overdriven Guitar",
    banks: { 0: "Standard", 1: "Guitar Pinch" },
  },
  {
    program: 31,
    name: "Distortion Guitar",
    banks: { 0: "Standard", 1: "Feedback Guitar", 2: "Distortion Rtm Guitar" },
  },
  {
    program: 32,
    name: "Guitar Harmonics",
    banks: { 0: "Standard", 1: "Guitar Feedback" },
  },

  {
    program: 33,
    name: "Acoustic Bass",
    banks: { 0: "Standard" },
  },
  {
    program: 34,
    name: "Fingered Bass",
    banks: { 0: "Standard", 1: "Finger Slap" },
  },
  {
    program: 35,
    name: "Picked Bass",
    banks: { 0: "Standard" },
  },
  {
    program: 36,
    name: "Fretless Bass",
    banks: { 0: "Standard" },
  },
  {
    program: 37,
    name: "Slap Bass 1",
    banks: { 0: "Standard" },
  },
  {
    program: 38,
    name: "Slap Bass 2",
    banks: { 0: "Standard" },
  },
  {
    program: 39,
    name: "Synth Bass 1",
    banks: { 0: "Standard", 1: "Synth Bass 101", 2: "Synth Bass 3", 3: "Clavi Bass", 4: "Hammer" },
  },
  {
    program: 40,
    name: "Synth Bass 2",
    banks: { 0: "Standard", 1: "Synth Bass 4", 2: "Rubber Bass", 3: "Attack Pulse" },
  },

  {
    program: 41,
    name: "Violin",
    banks: { 0: "Standard", 1: "Slow Violin" },
  },
  {
    program: 42,
    name: "Viola",
    banks: { 0: "Standard" },
  },
  {
    program: 43,
    name: "Cello",
    banks: { 0: "Standard" },
  },
  {
    program: 44,
    name: "Contrabass",
    banks: { 0: "Standard" },
  },
  {
    program: 45,
    name: "Tremolo Strings",
    banks: { 0: "Standard" },
  },
  {
    program: 46,
    name: "Pizzicato Strings",
    banks: { 0: "Standard" },
  },
  {
    program: 47,
    name: "Harp",
    banks: { 0: "Standard", 1: "Yang Qin" },
  },
  {
    program: 48,
    name: "Timpani",
    banks: { 0: "Standard" },
  },

  {
    program: 49,
    name: "String Ensemble",
    banks: { 0: "Standard", 1: "Orchestra Strings", 2: "60’s Strings" },
  },
  {
    program: 50,
    name: "Slow String Ensemble",
    banks: { 0: "Standard" },
  },
  {
    program: 51,
    name: "Synth Strings 1",
    banks: { 0: "Standard", 1: "Synth Strings 3" },
  },
  {
    program: 52,
    name: "Synth Strings 2",
    banks: { 0: "Standard" },
  },
  {
    program: 53,
    name: "Choir Aahs",
    banks: { 0: "Standard", 1: "Choir Aahs 2" },
  },
  {
    program: 54,
    name: "Voice Oohs",
    banks: { 0: "Standard", 1: "Humming" },
  },
  {
    program: 55,
    name: "Synth Voice",
    banks: { 0: "Standard", 1: "Analog Voice" },
  },
  {
    program: 56,
    name: "Orchestra Hit",
    banks: { 0: "Standard", 1: "Bass Hit", 2: "6th Hit", 3: "Euro Hit" },
  },

  {
    program: 57,
    name: "Trumpet",
    banks: { 0: "Standard", 1: "Dark Trumpet" },
  },
  {
    program: 58,
    name: "Trombone",
    banks: { 0: "Standard", 1: "Trombone 2", 2: "Bright Trombone" },
  },
  {
    program: 59,
    name: "Tuba",
    banks: { 0: "Standard" },
  },
  {
    program: 60,
    name: "Muted Trumpet",
    banks: { 0: "Standard", 1: "Muted Trumpet 2" },
  },
  {
    program: 61,
    name: "French Horns",
    banks: { 0: "Standard", 1: "French Horns 2" },
  },
  {
    program: 62,
    name: "Brass Section 1",
    banks: { 0: "Standard", 1: "Brass Section 2" },
  },
  {
    program: 63,
    name: "Synth Brass 1",
    banks: { 0: "Standard", 1: "Synth Brass 3", 2: "Analog Brass 1", 3: "Jump Brass" },
  },
  {
    program: 64,
    name: "Synth Brass 2",
    banks: { 0: "Standard", 1: "Synth Brass 4", 2: "Analog Brass 2" },
  },

  {
    program: 65,
    name: "Soprano Sax",
    banks: { 0: "Standard" },
  },
  {
    program: 66,
    name: "Alto Sax",
    banks: { 0: "Standard" },
  },
  {
    program: 67,
    name: "Tenor Sax",
    banks: { 0: "Standard" },
  },
  {
    program: 68,
    name: "Baritone Sax",
    banks: { 0: "Standard" },
  },
  {
    program: 69,
    name: "Oboe",
    banks: { 0: "Standard" },
  },
  {
    program: 70,
    name: "English Horn",
    banks: { 0: "Standard" },
  },
  {
    program: 71,
    name: "Bassoon",
    banks: { 0: "Standard" },
  },
  {
    program: 72,
    name: "Clarinet",
    banks: { 0: "Standard" },
  },

  {
    program: 73,
    name: "Piccolo",
    banks: { 0: "Standard" },
  },
  {
    program: 74,
    name: "Flute",
    banks: { 0: "Standard" },
  },
  {
    program: 75,
    name: "Recorder",
    banks: { 0: "Standard" },
  },
  {
    program: 76,
    name: "Pan Flute",
    banks: { 0: "Standard" },
  },
  {
    program: 77,
    name: "Bottle Blow",
    banks: { 0: "Standard" },
  },
  {
    program: 78,
    name: "Shakuhachi",
    banks: { 0: "Standard" },
  },
  {
    program: 79,
    name: "Whistle",
    banks: { 0: "Standard" },
  },
  {
    program: 80,
    name: "Ocarina",
    banks: { 0: "Standard" },
  },

  {
    program: 81,
    name: "Square Lead",
    banks: { 0: "Square Wave", 1: "Sine Wave" },
  },
  {
    program: 82,
    name: "Saw Lead",
    banks: { 0: "Saw Wave", 1: "Doctor Solo", 2: "Natural Lead", 3: "Sequenced Saw" },
  },
  {
    program: 83,
    name: "Synth Calliope",
    banks: { 0: "Standard" },
  },
  {
    program: 84,
    name: "Chiffer Lead",
    banks: { 0: "Standard" },
  },
  {
    program: 85,
    name: "Charang",
    banks: { 0: "Wire Lead" },
  },
  {
    program: 86,
    name: "Solo Synth Vox",
    banks: { 0: "Standard" },
  },
  {
    program: 87,
    name: "5th Saw Wave",
    banks: { 0: "Standard" },
  },
  {
    program: 88,
    name: "Bass & Lead",
    banks: { 0: "Standard", 1: "Delayed Lead" },
  },

  {
    program: 89,
    name: "Fantasia Pad",
    banks: { 0: "Standard" },
  },
  {
    program: 90,
    name: "Warm Pad",
    banks: { 0: "Standard", 1: "Sine Pad" },
  },
  {
    program: 91,
    name: "Polysynth Pad",
    banks: { 0: "Standard" },
  },
  {
    program: 92,
    name: "Space Voice Pad",
    banks: { 0: "Standard", 1: "Itopia" },
  },
  {
    program: 93,
    name: "Bowed Glass Pad",
    banks: { 0: "Standard" },
  },
  {
    program: 94,
    name: "Metal Pad",
    banks: { 0: "Standard" },
  },
  {
    program: 95,
    name: "Halo Pad",
    banks: { 0: "Standard" },
  },
  {
    program: 96,
    name: "Sweep Pad",
    banks: { 0: "Standard" },
  },

  {
    program: 97,
    name: "Ice Rain",
    banks: { 0: "Standard" },
  },
  {
    program: 98,
    name: "Soundtrack",
    banks: { 0: "Standard" },
  },
  {
    program: 99,
    name: "Crystal",
    banks: { 0: "Standard", 1: "Synth Mallet" },
  },
  {
    program: 100,
    name: "Atmosphere",
    banks: { 0: "Standard" },
  },
  {
    program: 101,
    name: "Brightness",
    banks: { 0: "Standard" },
  },
  {
    program: 102,
    name: "Goblin",
    banks: { 0: "Standard" },
  },
  {
    program: 103,
    name: "Echo Drops",
    banks: { 0: "Standard", 1: "Echo Bell", 2: "Echo Pan" },
  },
  {
    program: 104,
    name: "Star Theme",
    banks: { 0: "Standard" },
  },

  {
    program: 105,
    name: "Sitar",
    banks: { 0: "Standard", 1: "Sitar 2" },
  },
  {
    program: 106,
    name: "Banjo",
    banks: { 0: "Standard" },
  },
  {
    program: 107,
    name: "Shamisen",
    banks: { 0: "Standard" },
  },
  {
    program: 108,
    name: "Koto",
    banks: { 0: "Standard", 1: "Taisho Koto" },
  },
  {
    program: 109,
    name: "Kalimba",
    banks: { 0: "Standard" },
  },
  {
    program: 110,
    name: "Bagpipe",
    banks: { 0: "Standard" },
  },
  {
    program: 111,
    name: "Fiddle",
    banks: { 0: "Standard" },
  },
  {
    program: 112,
    name: "Shanai",
    banks: { 0: "Standard" },
  },

  {
    program: 113,
    name: "Tinkle Bell",
    banks: { 0: "Standard" },
  },
  {
    program: 114,
    name: "Agogo",
    banks: { 0: "Standard" },
  },
  {
    program: 115,
    name: "Steel Drums",
    banks: { 0: "Standard" },
  },
  {
    program: 116,
    name: "Woodblock",
    banks: { 0: "Standard", 1: "Castanets" },
  },
  {
    program: 117,
    name: "Taiko",
    banks: { 0: "Standard", 1: "Concert Bass Drum" },
  },
  {
    program: 118,
    name: "Melodic Tom 1",
    banks: { 0: "Standard", 1: "Melodic Tom 2" },
  },
  {
    program: 119,
    name: "Synth Drum",
    banks: { 0: "Standard", 1: "808 Tom", 2: "Electric Percussion" },
  },
  {
    program: 120,
    name: "Reverse Cymbal",
    banks: { 0: "Standard" },
  },

  {
    program: 121,
    name: "Guitar Fret Noise",
    banks: { 0: "Standard", 1: "Guitar Cut Noise", 2: "String Slap" },
  },
  {
    program: 122,
    name: "Breath Noise",
    banks: { 0: "Standard", 1: "Flute Key Click" },
  },
  {
    program: 123,
    name: "Seashore",
    banks: { 0: "Standard", 1: "Rain", 2: "Thunder", 3: "Wind", 4: "Stream", 5: "Bubble" },
  },
  {
    program: 124,
    name: "Bird",
    banks: { 0: "Standard", 1: "Dog", 2: "Horse-Gallop", 3: "Bird 2" },
  },
  {
    program: 125,
    name: "Telephone",
    banks: { 0: "Telephone 1", 1: "Telephone 2", 2: "Door Creaking", 3: "Door Closing", 4: "Scratch", 5: "Wind Chimes" },
  },
  {
    program: 126,
    name: "Helicopter",
    banks: {
      0: "Standard",
      1: "Car Engine",
      2: "Car Stop",
      3: "Car Pass",
      4: "Car Crash",
      5: "Siren",
      6: "Train",
      7: "Jetplane",
      8: "Starship",
      9: "Burst Noise",
    },
  },
  {
    program: 127,
    name: "Applause",
    banks: { 0: "Standard", 1: "Laughing", 2: "Screaming", 3: "Punch", 4: "Heartbeat", 5: "Footsteps" },
  },
  {
    program: 128,
    name: "Gunshot",
    banks: { 0: "Standard", 1: "Machine Gun", 2: "Lasergun", 3: "Explosion" },
  },
];
export function getInstrumentName(program: number, bank = 0) {
  const inst = MIDI_PROGRAM_MAP[program];
  if (!inst) return `Unknown Program ${program}`;

  const variation = inst.banks?.[bank];
  return variation ? `${inst.name}` : inst.name;
}