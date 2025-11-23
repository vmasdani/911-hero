<template>
  <div class="app">
    <div class="terminal">
      <div v-if="phase === 'intro'" class="intro-header">
        <pre class="ascii-title">
 ░▒▓██████▓▒░   ░▒▓█▓▒░  ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓███████▓▒░ ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓████▓▒░▒▓████▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░  ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
 ░▒▓███████▓▒░  ░▒▓█▓▒░  ░▒▓█▓▒░      ░▒▓████████▓▒░▒▓██████▓▒░ ░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░ 
       ░▒▓█▓▒░  ░▒▓█▓▒░  ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
       ░▒▓█▓▒░  ░▒▓█▓▒░  ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
 ░▒▓██████▓▒░   ░▒▓█▓▒░  ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░  
                                                                                            
                                                                                            
  </pre
        >

        <p class="subtitle">
          You manage a small team of heroes. Each day, random emergencies
          appear.<br />
          Dispatch the right hero and keep the city safe.
        </p>
      </div>

      <!-- Intro screen -->
      <div v-if="phase === 'intro'" class="panel">
        <!-- <p>Dispatch the right hero and keep the city safe.</p> -->
        <button @click="startGame">Begin Shift</button>
      </div>

      <!-- Day start screen -->
      <div v-else-if="phase === 'dayStart'" class="panel">
        <h2>=== DAY {{ day }} - SHIFT START ===</h2>

        <p v-if="currentUnrest" class="unrest-line">
          City unrest level: <strong>{{ currentUnrest.label }}</strong
          ><br />
          <span class="unrest-remark">{{ currentUnrestRemark }}</span>
        </p>

        <div class="roster-layout">
          <div class="roster-main">
            <p>Your hero roster:</p>

            <div class="hero-grid">
              <div v-for="(h, idx) in heroes" :key="h.name" class="hero-card">
                <div class="portrait-wrapper">
                  <img :src="portraitSrc(h)" alt="Hero portrait" />
                </div>

                <div class="hero-stats">
                  <div class="hero-name">{{ idx + 1 }}. {{ h.name }}</div>

                  <div class="stat-block">
                    <div class="stat-line-combo">
                      <span class="stat-label">strength</span>
                      <span class="stat-stars">{{ statBar(h.strength) }}</span>
                    </div>

                    <div class="stat-line-combo">
                      <span class="stat-label">compassion</span>
                      <span class="stat-stars">{{
                        statBar(h.compassion)
                      }}</span>
                    </div>

                    <div class="stat-line-combo">
                      <span class="stat-label">tech</span>
                      <span class="stat-stars">{{ statBar(h.tech) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="roster-bench">
            <p class="section-title">Benched Roster:</p>

            <div class="hero-grid bench">
              <div
                v-for="(h, idx) in benchedHeroes"
                :key="'bench-' + h.name"
                class="hero-card"
              >
                <div class="portrait-wrapper">
                  <img :src="portraitSrc(h)" alt="Hero portrait" />
                </div>

                <div class="hero-stats">
                  <div class="hero-name">
                    {{ idx + 1 }}. {{ h.name }} (Benched)
                  </div>

                  <div class="stat-block">
                    <div class="stat-line-combo">
                      <span class="stat-label">strength</span>
                      <span class="stat-stars">{{ statBar(h.strength) }}</span>
                    </div>

                    <div class="stat-line-combo">
                      <span class="stat-label">compassion</span>
                      <span class="stat-stars">{{
                        statBar(h.compassion)
                      }}</span>
                    </div>

                    <div class="stat-line-combo">
                      <span class="stat-label">tech</span>
                      <span class="stat-stars">{{ statBar(h.tech) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p>You will handle {{ callsPerDay }} calls today.</p>
        <button @click="beginCallsForDay">Start Handling Calls</button>
      </div>

      <!-- Picking hero for encounter -->
      <!-- Picking hero for encounter -->
      <!-- Picking hero for encounter -->
      <div v-else-if="phase === 'pickingHero'" class="panel">
        <h2>Incoming Call!</h2>
        <hr />

        <!-- NEW: radiant-style dynamic call line -->
        <p class="call-flavor">
          {{ currentCallFlavor }}
        </p>

        <p class="desc">{{ currentEncounter?.description }}</p>
        <p>
          <strong>Estimated difficulty:</strong>
          {{
            [...Array(currentEncounter?.difficulty ?? 0)]
              .map((_) => `★`)
              .join("")
          }}{{
            [...Array(10 - (currentEncounter?.difficulty ?? 0))]
              .map((_) => `☆`)
              .join("")
          }}
        </p>

        <p class="section-title">Select hero to dispatch:</p>
        <p class="small-hint">Click a portrait to send a hero.</p>

        <div class="hero-grid hero-pick-grid">
          <div
            v-for="(h, idx) in heroes"
            :key="'pick-' + h.name"
            class="hero-card hero-pick-card"
          >
            <div
              class="portrait-wrapper portrait-selectable"
              @click="handleHeroChoice(idx)"
            >
              <img :src="portraitSrc(h)" alt="Hero portrait" />
            </div>

            <div class="hero-stats">
              <div class="hero-name">{{ idx + 1 }}. {{ h.name }}</div>

              <div class="stat-block">
                <div class="stat-line-combo">
                  <span class="stat-label">strength</span>
                  <span class="stat-stars">{{ statBar(h.strength) }}</span>
                </div>

                <div class="stat-line-combo">
                  <span class="stat-label">compassion</span>
                  <span class="stat-stars">{{ statBar(h.compassion) }}</span>
                </div>

                <div class="stat-line-combo">
                  <span class="stat-label">tech</span>
                  <span class="stat-stars">{{ statBar(h.tech) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="skip" @click="handleHeroChoice(null)">
          Skip this call (automatic failure)
        </button>
      </div>

      <!-- Mission result -->
      <!-- Mission result -->
      <div v-else-if="phase === 'missionResult'" class="panel">
        <h2>Mission Report</h2>

        <pre class="result-text">{{ lastResultMessage }}</pre>

        <!-- NEW: hero portrait summary -->
        <div class="result-hero" v-if="lastHero">
          <p class="section-title">Dispatched Hero</p>
          <div class="hero-card result-hero-card">
            <div class="portrait-wrapper">
              <img :src="portraitSrc(lastHero)" alt="Hero portrait" />
            </div>
            <div class="hero-stats">
              <div class="hero-name">{{ lastHero.name }}</div>
              <div class="stat-block">
                <div class="stat-line-combo">
                  <span class="stat-label">strength</span>
                  <span class="stat-stars">{{
                    statBar(lastHero.strength)
                  }}</span>
                </div>
                <div class="stat-line-combo">
                  <span class="stat-label">compassion</span>
                  <span class="stat-stars">{{
                    statBar(lastHero.compassion)
                  }}</span>
                </div>
                <div class="stat-line-combo">
                  <span class="stat-label">tech</span>
                  <span class="stat-stars">{{ statBar(lastHero.tech) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="result-hero">
          <p>No hero was dispatched for this call.</p>
        </div>

        <button @click="continueAfterResult">Continue</button>
      </div>

      <!-- Day summary -->
      <!-- Day summary -->
      <div v-else-if="phase === 'daySummary'" class="panel">
        <h2>=== END OF DAY {{ day }} ===</h2>
        <p>Total calls handled: {{ totalCalls }}</p>
        <p>Successful dispatches: {{ successfulCalls }}</p>
        <p>Failed dispatches: {{ totalCalls - successfulCalls }}</p>
        <p>Success rate: {{ successRate.toFixed(1) }}%</p>

        <!-- NEW: per-hero end-of-day stats -->
        <p class="section-title">Hero performance today</p>
        <div class="hero-grid">
          <div
            v-for="(h, idx) in heroes"
            :key="'summary-' + h.name"
            class="hero-card summary-card"
          >
            <div class="portrait-wrapper">
              <img :src="portraitSrc(h)" alt="Hero portrait" />
            </div>

            <div class="hero-stats">
              <div class="hero-name">{{ idx + 1 }}. {{ h.name }}</div>
              <div class="stat-block">
                <div>dispatches today: {{ h.dispatchesToday }}</div>
                <div>total dispatched: {{ h.totalDispatches }}</div>
                <div>total success: {{ h.totalSuccesses }}</div>
                <div>
                  success rate:
                  <span :style="successRateStyle(heroSuccessRate(h))">
                    {{ heroSuccessRate(h).toFixed(1) }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="section-title">What next?</p>
        <div class="actions-row">
          <button @click="nextDay">Continue to next day</button>
          <button @click="retire">Retire from duty (quit)</button>
        </div>
      </div>

      <!-- Game over -->
      <div v-else-if="phase === 'gameOver'" class="panel">
        <h2>Dispatcher Retired</h2>
        <p>You hang up your headset and retire from dispatch duty.</p>
        <p>
          Final success rate: {{ successRate.toFixed(1) }}% over
          {{ totalCalls }} calls.
        </p>
        <p>Thanks for playing!</p>
        <button @click="restart">Restart Game</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  CALL_CHANNELS,
  CALL_HOOKS,
  CALL_SUBJECTS,
  DISTRICTS,
  Encounter,
  ENCOUNTERS,
  FIRST_NAMES,
  Hero,
  LAST_NAMES,
  SkillKey,
  UNREST_LEVELS,
  UnrestLevel,
} from "./statics";
import chroma from "chroma-js";

/* ─────────────────────────────
 * Types
 * ───────────────────────────── */

type Phase =
  | "intro"
  | "dayStart"
  | "pickingHero"
  | "missionResult"
  | "daySummary"
  | "gameOver";

// Extend the imported Hero type with a portrait index
type GameHero = Hero & {
  portraitIndex: number;
  dispatchesToday: number;
  totalDispatches: number;
  totalSuccesses: number;
};

interface ResolveResult {
  text: string;
  hero: GameHero | null;
  roll: number | null;
  total: number | null;
  success: boolean | null;
}

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

// scale 1–5 skills into 0–10 display
function toTenScale(stat: number): number {
  const scaled = stat * 2;
  if (scaled < 0) return 0;
  if (scaled > 10) return 10;
  return scaled;
}

// Stars (1–5) visualized
function statBar(valueOutOfFive: number): string {
  const total = 5;
  const v = Math.max(0, Math.min(total, valueOutOfFive));
  const filled = v;
  const empty = total - v;

  const filledChar = "★";
  const emptyChar = "☆";

  return filledChar.repeat(filled) + emptyChar.repeat(empty);
}

// Build portrait path (put the PNGs in /public/portrait)
function portraitSrc(h: GameHero): string {
  return `./src/portrait/portrait-no-border${h.portraitIndex}.png`;
}

/* ─────────────────────────────
 * Radiant-style call + aftermath flavor
 * ───────────────────────────── */

function buildCallFlavor(enc: Encounter): string {
  const subject = pickRandom(CALL_SUBJECTS);
  const channel = pickRandom(CALL_CHANNELS);
  const district = pickRandom(DISTRICTS);
  const skill = enc.neededSkill as SkillKey;
  const hook = pickRandom(CALL_HOOKS[skill]);

  return (
    `${subject} ${channel} from ${district}. ` +
    `${hook} The caller describes: "${enc.title.toLowerCase()}."`
  );
}

function buildAftermath(
  hero: GameHero | null,
  enc: Encounter,
  success: boolean | null
): string {
  if (!hero) {
    return [
      `With no hero dispatched to "${enc.title}", the incident spirals until local responders do what they can.`,
      "The city will remember this one as the call nobody answered in time.",
    ].join("\n");
  }

  if (success === null) return "";

  const pool = success ? enc.aftermath.success : enc.aftermath.failure;
  const line = pickRandom(pool);
  const district = pickRandom(DISTRICTS);

  return (
    line.replace("{hero}", hero.name) +
    `\nReports from ${district} trickle back into your log minutes later.`
  );
}


/* ─────────────────────────────
 * Hero generation
 * ───────────────────────────── */

/* ─────────────────────────────
 * Success rate coloring
 * ───────────────────────────── */

const successScale = chroma
  .scale(["#ff4d4d", "#ffe066", "#4dff88"])
  .domain([0, 100]);

function heroSuccessRate(h: GameHero): number {
  if (h.totalDispatches === 0) return 0;
  return (h.totalSuccesses / h.totalDispatches) * 100;
}

function successRateStyle(pct: number) {
  return {
    color: successScale(pct).hex(),
    "font-weight": "bold",
  };
}

function createHero(): GameHero {
  const name = `${pickRandom(FIRST_NAMES)} ${pickRandom(LAST_NAMES)}`;
  return {
    name,
    strength: randomInt(1, 5),
    compassion: randomInt(1, 5),
    tech: randomInt(1, 5),
    portraitIndex: randomInt(1, 200),
    dispatchesToday: 0,
    totalDispatches: 0,
    totalSuccesses: 0,
  };
}

function createHeroRoster(n = 4): GameHero[] {
  const heroes: GameHero[] = [];
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
 * Encounters (keep base list size as-is)
 * ───────────────────────────── */

function generateEncounter(): Encounter {
  const base = pickRandom(ENCOUNTERS);
  const difficulty = randomInt(3, 8);
  return {
    title: base.title,
    description: base.desc,
    neededSkill: base.skill,
    difficulty,
    aftermath: base.aftermath,
  };
}


/* ─────────────────────────────
 * Game state
 * ───────────────────────────── */
const phase = ref<Phase>("intro");

const day = ref(1);
const callsPerDay = ref(0);
const currentUnrest = ref<UnrestLevel | null>(null);
const currentUnrestRemark = ref<string>("");
const callsHandledToday = ref(0);
const totalCalls = ref(0);
const successfulCalls = ref(0);

const currentEncounter = ref<Encounter | null>(null);
const currentCallFlavor = ref(""); // NEW radiant-style call line
const lastResultMessage = ref("");

// mission tracking for result screen
const lastHero = ref<GameHero | null>(null);
const lastHeroRoll = ref<number | null>(null);
const lastHeroTotal = ref<number | null>(null);
const lastHeroSuccess = ref<boolean | null>(null);

const successRate = computed(() => {
  if (totalCalls.value === 0) return 0;
  return (successfulCalls.value / totalCalls.value) * 100;
});

/* ─────────────────────────────
 * Game logic
 * ───────────────────────────── */
const heroes = ref<GameHero[]>([]);
const benchedHeroes = ref<GameHero[]>([]); // bench roster

function rollUnrestForDay() {
  const lvl = pickRandom(UNREST_LEVELS);
  const calls = randomInt(lvl.minCalls, lvl.maxCalls);
  currentUnrest.value = lvl;
  callsPerDay.value = calls;
  currentUnrestRemark.value = pickRandom(lvl.remarks);
}

// ─────────────────────────────
// BGM singleton
// ─────────────────────────────
let bgm: HTMLAudioElement | null = null;

function ensureBgm() {
  if (!bgm) {
    bgm = new Audio("./src/theme.mp3");
    bgm.loop = true;
    bgm.volume = 0.5;
  }

  if (bgm.paused) {
    bgm.play();
  }
}

function reshuffleRosterForDay() {
  // Combine active + bench into one pool
  const pool: GameHero[] = [...heroes.value, ...benchedHeroes.value];

  if (pool.length === 0) return;

  // Fisher–Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // First 4 = active, rest = bench
  heroes.value = pool.slice(0, 4);
  benchedHeroes.value = pool.slice(4);
}


function startGame() {
  ensureBgm(); // ⬅️ only creates/starts once

  heroes.value = createHeroRoster(4);
  benchedHeroes.value = createHeroRoster(3);

  day.value = 1;
  totalCalls.value = 0;
  successfulCalls.value = 0;
  callsHandledToday.value = 0;

  rollUnrestForDay(); // ⬅️ new
    reshuffleRosterForDay(); // ⬅️ random choice for Day 1 as well


  phase.value = "dayStart";
}

function beginCallsForDay() {
  // ⬇️ reset only "today" stats
  heroes.value.forEach((h) => {
    h.dispatchesToday = 0;
  });

  callsHandledToday.value = 0;
  nextCall();
}

function nextCall() {
  const enc = generateEncounter();
  currentEncounter.value = enc;
  currentCallFlavor.value = buildCallFlavor(enc);
  phase.value = "pickingHero";
}

function resolveEncounter(
  hero: GameHero | null,
  encounter: Encounter
): ResolveResult {
  if (!hero) {
    // skip = automatic failure
    totalCalls.value += 1;
    const aftermath = buildAftermath(null, encounter, false);
    return {
      text:
        "No hero dispatched. The situation spiraled out of control...\n\n" +
        aftermath,
      hero: null,
      roll: null,
      total: null,
      success: false,
    };
  }

  const needed = encounter.neededSkill as SkillKey;
  const heroSkillValue = hero[needed];
  const roll = randomInt(1, 4);
  const total = heroSkillValue + roll;
  const success = total >= encounter.difficulty;

  totalCalls.value += 1;

  // ⬇️ NEW: update per-hero stats
  hero.dispatchesToday += 1;
  hero.totalDispatches += 1;
  if (success) {
    successfulCalls.value += 1;
    hero.totalSuccesses += 1;
  }

  const header =
    `${hero.name} rushes in!\n` +
    `${needed.toUpperCase()} check: ${heroSkillValue} + roll ${roll} = ${total} ` +
    `(DC ${encounter.difficulty})\n` +
    (success ? "The mission is a SUCCESS!\n\n" : "The mission FAILED.\n\n");

  const aftermath = buildAftermath(hero, encounter, success);

  return {
    text: header + aftermath,
    hero,
    roll,
    total,
    success,
  };
}

function handleHeroChoice(index: number | null) {
  if (!currentEncounter.value) return;

  let hero: GameHero | null = null;
  if (index !== null && index >= 0 && index < heroes.value.length) {
    hero = heroes.value[index];
  }

  const result = resolveEncounter(hero, currentEncounter.value);

  lastResultMessage.value = result.text;
  lastHero.value = result.hero;
  lastHeroRoll.value = result.roll;
  lastHeroTotal.value = result.total;
  lastHeroSuccess.value = result.success;

  callsHandledToday.value += 1;
  phase.value = "missionResult";
}

function continueAfterResult() {
  if (callsHandledToday.value < callsPerDay.value) {
    nextCall();
  } else {
    phase.value = "daySummary";
  }
}

function nextDay() {
  day.value += 1;
  callsHandledToday.value = 0;

  rollUnrestForDay();
  reshuffleRosterForDay(); // ⬅️ random hero choice each day

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
  margin: 0px;
  padding: 0px;
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
  font-family: "Fira Code", "JetBrains Mono", Menlo, Monaco, Consolas,
    "Courier New", monospace;
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

/* ───────── portraits + stats ───────── */

.hero-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}

.hero-card {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  width: calc(50% - 6px); /* two cards per row */
}

.portrait-wrapper img {
  width: 70px;
  height: 70px;
  border-radius: 4px;
  border: 1px solid #0f0;
  object-fit: cover;
}

.hero-stats {
  flex: 1;
}

.hero-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.stat-block {
  font-size: 0.8rem;
}

.stat-line {
  margin-top: 2px;
}

.stat-bar {
  margin: 0 0 4px 0;
  white-space: pre;
  font-size: 12px;

  border: 1px solid #00ff9c;

  /* NEW */
  display: inline-block; /* shrink to content width */
  padding: 0 2px; /* tiny breathing room around blocks */
}

/* ───────── buttons, etc ───────── */

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

.ascii-title {
  color: #00ff9c;
  font-size: 10px;
  margin-bottom: 8px;
}

.bench .hero-card {
  opacity: 0.65;
}

.roster-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.roster-main {
  flex: 2;
}

.roster-bench {
  flex: 1;
}

/* bench cards: one per row on the right */
.roster-bench .hero-card {
  width: 100%;
}

.bench .hero-card {
  opacity: 0.65;
}
.call-flavor {
  font-style: italic;
  margin-bottom: 6px;
  color: #88ffcc;
}

.result-hero {
  margin-top: 10px;
}

.result-hero-card {
  margin-top: 4px;
}

.summary-card .stat-block div {
  margin-bottom: 2px;
}

/* Selectable hero hover behavior */
.portrait-selectable {
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.portrait-selectable:hover {
  transform: scale(1.06);
  box-shadow: 0 0 10px rgba(0, 255, 156, 0.5);
}

.portrait-selectable:hover img {
  border-color: #00ff9c; /* same green as button hover */
  filter: brightness(1.25);
}
</style>
