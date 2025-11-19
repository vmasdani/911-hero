<template>
  <div class="app">
    <div class="terminal">
      <h1>SUPERHERO DISPATCH - WEB EDITION</h1>
      <p class="subtitle">You manage a small team of heroes. Each day, random emergencies appear.</p>

      <!-- Intro screen -->
      <div v-if="phase === 'intro'" class="panel">
        <p>Dispatch the right hero and keep the city safe.</p>
        <button @click="startGame">Begin Shift</button>
      </div>

      <!-- Day start screen -->
      <div v-else-if="phase === 'dayStart'" class="panel">
        <h2>=== DAY {{ day }} - SHIFT START ===</h2>
        <p>Your hero roster:</p>
        <ul class="hero-list">
          <li v-for="(h, idx) in heroes" :key="h.name">
            {{ idx + 1 }}. {{ h.name }}
            (skills: strength {{ h.strength }}, compassion {{ h.compassion }}, tech {{ h.tech }})
          </li>
        </ul>
        <p>You will handle {{ callsPerDay }} calls today.</p>
        <button @click="beginCallsForDay">Start Handling Calls</button>
      </div>

      <!-- Picking hero for encounter -->
      <div v-else-if="phase === 'pickingHero'" class="panel">
        <h2>Incoming Call!</h2>
        <hr />
        <p><strong>Situation:</strong> {{ currentEncounter?.title }}</p>
        <p class="desc">{{ currentEncounter?.description }}</p>
        <p><strong>Estimated difficulty:</strong> {{ currentEncounter?.difficulty }}</p>

        <p class="section-title">Select hero to dispatch:</p>
        <ul class="hero-list">
          <li
            v-for="(h, idx) in heroes"
            :key="h.name"
          >
            <button @click="handleHeroChoice(idx)">
              {{ idx + 1 }}. {{ h.name }}
              (strength {{ h.strength }}, compassion {{ h.compassion }}, tech {{ h.tech }})
            </button>
          </li>
        </ul>
        <button class="skip" @click="handleHeroChoice(null)">
          0. Skip this call (automatic failure)
        </button>
      </div>

      <!-- Mission result -->
      <div v-else-if="phase === 'missionResult'" class="panel">
        <h2>Mission Report</h2>
        <pre class="result-text">{{ lastResultMessage }}</pre>
        <button @click="continueAfterResult">Continue</button>
      </div>

      <!-- Day summary -->
      <div v-else-if="phase === 'daySummary'" class="panel">
        <h2>=== END OF DAY {{ day }} ===</h2>
        <p>Total calls handled: {{ totalCalls }}</p>
        <p>Successful dispatches: {{ successfulCalls }}</p>
        <p>Failed dispatches: {{ totalCalls - successfulCalls }}</p>
        <p>Success rate: {{ successRate.toFixed(1) }}%</p>

        <p class="section-title">What next?</p>
        <div class="actions-row">
          <button @click="nextDay">1. Continue to next day</button>
          <button @click="retire">2. Retire from duty (quit)</button>
        </div>
      </div>

      <!-- Game over -->
      <div v-else-if="phase === 'gameOver'" class="panel">
        <h2>Dispatcher Retired</h2>
        <p>You hang up your headset and retire from dispatch duty.</p>
        <p>Final success rate: {{ successRate.toFixed(1) }}% over {{ totalCalls }} calls.</p>
        <p>Thanks for playing!</p>
        <button @click="restart">Restart Game</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

/* ─────────────────────────────
 * Types
 * ───────────────────────────── */
type Skill = "strength" | "compassion" | "tech";

interface Hero {
  name: string;
  strength: number;
  compassion: number;
  tech: number;
}

interface Encounter {
  title: string;
  description: string;
  neededSkill: Skill;
  difficulty: number;
}

type Phase = "intro" | "dayStart" | "pickingHero" | "missionResult" | "daySummary" | "gameOver";

/* ─────────────────────────────
 * Utility helpers
 * ───────────────────────────── */
function randomInt(min: number, max: number): number {
  // inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ─────────────────────────────
 * Hero generation
 * ───────────────────────────── */
const FIRST_NAMES = ["Solar", "Iron", "Shadow", "Crimson", "Quantum", "Thunder", "Silver", "Neon"];
const LAST_NAMES = ["Falcon", "Knight", "Warden", "Specter", "Guardian", "Bolt", "Nova", "Sentinel"];

function createHero(): Hero {
  const name = `${pickRandom(FIRST_NAMES)} ${pickRandom(LAST_NAMES)}`;
  return {
    name,
    strength: randomInt(1, 5),
    compassion: randomInt(1, 5),
    tech: randomInt(1, 5),
  };
}

function createHeroRoster(n = 4): Hero[] {
  const heroes: Hero[] = [];
  const usedNames = new Set<string>();

  while (heroes.length < n) {
    const h = createHero();
    if (usedNames.has(h.name)) continue;
    usedNames.add(h.name);
    heroes.push(h);
  }
  return heroes;
}

/* ─────────────────────────────
 * Encounters
 * ───────────────────────────── */
const ENCOUNTERS = [
  {
    title: "Rampaging robot downtown",
    desc: "A large mechanical unit has gone haywire, smashing cars and threatening bystanders.",
    skill: "strength" as Skill,
  },
  {
    title: "Bank robbery standoff",
    desc: "Armed criminals have taken hostages inside a bank. The situation is tense.",
    skill: "strength" as Skill,
  },
  {
    title: "Cracked suspension bridge",
    desc: "A busy commuter bridge is starting to give way; people are still trapped on it.",
    skill: "strength" as Skill,
  },
  {
    title: "Runaway train emergency",
    desc: "A train’s automated brakes malfunctioned. Someone must reach the engine room.",
    skill: "tech" as Skill,
  },
  {
    title: "Hospital server blackout",
    desc: "The ICU monitoring network suddenly collapsed. Lives depend on a quick fix.",
    skill: "tech" as Skill,
  },
  {
    title: "Malfunctioning power grid",
    desc: "Half the district is flickering on and off. A catastrophic overload is possible.",
    skill: "tech" as Skill,
  },
  {
    title: "Mass panic at city festival",
    desc: "A strange sound overhead sparked panic. People are scattering in fear.",
    skill: "compassion" as Skill,
  },
  {
    title: "Missing child in megamall",
    desc: "A child disappeared in a busy shopping complex. Parents are in distress.",
    skill: "compassion" as Skill,
  },
  {
    title: "Traumatized survivor",
    desc: "A lone survivor refuses to evacuate the disaster zone, frozen in shock.",
    skill: "compassion" as Skill,
  },
];

function generateEncounter(): Encounter {
  const base = pickRandom(ENCOUNTERS);
  const difficulty = randomInt(3, 8);
  return {
    title: base.title,
    description: base.desc,
    neededSkill: base.skill,
    difficulty,
  };
}

/* ─────────────────────────────
 * Game state
 * ───────────────────────────── */
const phase = ref<Phase>("intro");
const heroes = ref<Hero[]>([]);
const day = ref(1);
const callsPerDay = 3;
const callsHandledToday = ref(0);
const totalCalls = ref(0);
const successfulCalls = ref(0);

const currentEncounter = ref<Encounter | null>(null);
const lastResultMessage = ref("");

const successRate = computed(() => {
  if (totalCalls.value === 0) return 0;
  return (successfulCalls.value / totalCalls.value) * 100;
});

/* ─────────────────────────────
 * Game logic
 * ───────────────────────────── */
function startGame() {
  heroes.value = createHeroRoster(4);
  day.value = 1;
  totalCalls.value = 0;
  successfulCalls.value = 0;
  callsHandledToday.value = 0;
  phase.value = "dayStart";
}

function beginCallsForDay() {
  callsHandledToday.value = 0;
  nextCall();
}

function nextCall() {
  currentEncounter.value = generateEncounter();
  phase.value = "pickingHero";
}

function resolveEncounter(hero: Hero | null, encounter: Encounter): string {
  if (!hero) {
    // skip = automatic failure
    return "No hero dispatched. The situation spiraled out of control...";
  }

  const needed = encounter.neededSkill;
  const heroSkillValue = hero[needed];
  const roll = randomInt(1, 4);
  const total = heroSkillValue + roll;
  const success = total >= encounter.difficulty;

  totalCalls.value += 1;
  if (success) {
    successfulCalls.value += 1;
    return (
      `${hero.name} rushes in!\n` +
      `${needed.toUpperCase()} check: ${heroSkillValue} + roll ${roll} = ${total}\n` +
      "The mission is a SUCCESS!"
    );
  } else {
    return (
      `${hero.name} tries their best...\n` +
      `${needed.toUpperCase()} check: ${heroSkillValue} + roll ${roll} = ${total}\n` +
      "The mission FAILED."
    );
  }
}

function handleHeroChoice(index: number | null) {
  if (!currentEncounter.value) return;

  let hero: Hero | null = null;
  if (index !== null && index >= 0 && index < heroes.value.length) {
    hero = heroes.value[index];
  }

  const msg = resolveEncounter(hero, currentEncounter.value);
  lastResultMessage.value = msg;
  callsHandledToday.value += 1;
  phase.value = "missionResult";
}

function continueAfterResult() {
  if (callsHandledToday.value < callsPerDay) {
    nextCall();
  } else {
    phase.value = "daySummary";
  }
}

function nextDay() {
  day.value += 1;
  callsHandledToday.value = 0;
  phase.value = "dayStart";
}

function retire() {
  phase.value = "gameOver";
}

function restart() {
  phase.value = "intro";
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
}

.terminal {
  width: 800px;
  max-width: 100%;
  background: #000;
  color: #00ff9c;
  font-family: "Fira Code", "JetBrains Mono", Menlo, Monaco, Consolas, "Courier New", monospace;
  border-radius: 8px;
  border: 1px solid #0f0;
  padding: 16px 20px 20px;
  box-shadow: 0 0 20px rgba(0, 255, 156, 0.3);
}

h1 {
  font-size: 1.4rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  margin-bottom: 1rem;
  color: #88ffcc;
}

.panel {
  border-top: 1px solid #0f0;
  padding-top: 12px;
  margin-top: 8px;
}

.hero-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1rem;
}

.hero-list li {
  margin: 4px 0;
}

button {
  background: #003322;
  color: #ccffdd;
  border: 1px solid #00ff9c;
  padding: 6px 10px;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 4px;
}

button:hover {
  background: #005533;
}

button.skip {
  margin-top: 10px;
  background: #331111;
  border-color: #ff5555;
  color: #ffcccc;
}

.section-title {
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
  font-weight: bold;
}

.actions-row {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.desc {
  margin-top: 4px;
  margin-bottom: 4px;
}

.result-text {
  background: #001b12;
  padding: 8px;
  border-radius: 4px;
  white-space: pre-wrap;
}
</style>
