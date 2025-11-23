export type UnrestCode = "quiet" | "uneasy" | "tense" | "critical";


export interface UnrestLevel {
  code: UnrestCode;
  label: string;
  minCalls: number;
  maxCalls: number;
  remarks: string[];
}


export type SkillKey = "strength" | "compassion" | "tech";

export type Skill = "strength" | "compassion" | "tech";


export interface Hero {
  name: string;
  strength: number;
  compassion: number;
  tech: number;
}

export interface Encounter {
  title: string;
  description: string;
  neededSkill: Skill;
  difficulty: number;
  aftermath: {
    success: string[];
    failure: string[];
  };
}


export const FIRST_NAMES = [
  "Solar", "Iron", "Shadow", "Crimson", "Quantum", "Thunder", "Silver", "Neon",
  "Obsidian", "Voltage", "Aurora", "Static", "Flux", "Aether", "Chrome", "Blaze",
  "Echo", "Titan", "Ember", "Holo", "Cosmic", "Pulse", "Atlas", "Ion",
  "Spectral", "Frost", "Vanta", "Storm", "Rogue", "Prime", "Radiant", "Glitch",
  "Pyro", "Astral", "Onyx", "Cipher", "Drift", "Solaris", "Vortex", "Quark",
  "Helix", "Catalyst", "Prism", "Zenith", "Hyperion", "Nebula", "Tundra", "Cobalt",
];
export const LAST_NAMES = [
  "Falcon", "Knight", "Warden", "Specter", "Guardian", "Bolt", "Nova", "Sentinel",
  "Vanguard", "Phantom", "Rider", "Breaker", "Hunter", "Strider", "Shade",
  "Vector", "Blitz", "Stryker", "Revenant", "Shifter", "Enforcer", "Harbinger",
  "Pilot", "Wing", "Forge", "Controller", "Surge", "Drifter", "Axis", "Charger",
  "Beacon", "Runner", "Blade", "Caster", "Reactor", "Howler", "Caster",
  "Glaive", "Circuit", "Pulse", "Echo", "Ranger", "Tracer", "Raptor", "Captain",
  "Commander", "Shroud", "Lancer",
];


export const CALL_SUBJECTS = [
  "A distressed call",
  "A panicked civilian",
  "A trembling officer",
  "A rushed radio transmission",
  "A hoarse dispatcher",
  "A shaky video feed",
];

export const CALL_CHANNELS = [
  "comes through the main hotline",
  "breaks in over the emergency band",
  "crackles over your headset",
  "cuts through the background noise of the dispatch room",
  "bursts in from a redirected emergency line",
];

export const DISTRICTS = [
  "Neon Market District",
  "Old Harbor",
  "Skyline Loop",
  "Downtown Core",
  "East Rail Yards",
  "Riverside Block",
];

export const CALL_HOOKS: Record<SkillKey, string[]> = {
  strength: [
    "heavy impacts thunder in the background",
    "someone shouts that metal is tearing apart",
    "sirens and collapsing debris drown out the voices",
  ],
  compassion: [
    "you can hear people sobbing behind the caller",
    "someone keeps repeating that they don't want to die here",
    "crowd noise swells with fear and confusion",
  ],
  tech: [
    "warning tones and digital alarms scream in the background",
    "someone babbles about error codes and cascading failures",
    "static and glitching audio frame a frantic systems report",
  ],
};


export const ENCOUNTERS = [
  {
    title: "Rampaging robot downtown",
    desc: "A large mechanical unit has gone haywire, smashing cars and threatening bystanders.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} tears into the rogue chassis, ripping out key actuators before it can level another car.",
        "Witnesses cheer as {hero} drives the unit face-first into the asphalt and kills its core.",
        "By the time local drones arrive, {hero} is standing over a heap of sparking metal, streets mostly intact.",
      ],
      failure: [
        "{hero} is forced to pull back as the robot plows through another row of parked vehicles.",
        "Even with {hero} on scene, the machine punches open a new escape route and vanishes into the side streets.",
        "Shattered glass and twisted steel mark every corner {hero} could not reach in time.",
      ],
    },
  },
  {
    title: "Bank robbery standoff",
    desc: "Armed criminals have taken hostages inside a bank. The situation is tense.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} slips in with precise timing, disarming the gunmen before a single hostage is harmed.",
        "Negotiations stall, but {hero}'s sudden breach ends the standoff in seconds.",
        "Hostages spill out of the bank in shaky relief, some chanting {hero}'s name as officers move in.",
      ],
      failure: [
        "Shots ring out before {hero} can secure every room and the scene breaks into chaotic fragments.",
        "Smoke, shouting, and scattered hostages leave {hero} fighting just to limit the damage.",
        "Later reports note that the robbers fled through an unsecured exit while {hero} was pinned down.",
      ],
    },
  },
  {
    title: "Cracked suspension bridge",
    desc: "A busy commuter bridge is starting to give way; people are still trapped on it.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} braces key support points, carving makeshift anchors while traffic is ushered off the bridge.",
        "Cables groan, but under {hero}'s guidance the last civilians make it to solid ground.",
        "From the riverbank, evacuees watch the bridge sag dangerously and stay standing thanks to {hero}.",
      ],
      failure: [
        "Despite {hero}'s efforts, one section of the bridge shears away and plunges into the water below.",
        "{hero} can only watch as stressed cables snap faster than they can reinforce them.",
        "The structure gives out in uneven stages, forcing {hero} into rescue mode instead of prevention.",
      ],
    },
  },
  {
    title: "Runaway train emergency",
    desc: "A train’s automated brakes malfunctioned. Someone must reach the engine room.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} fights their way to the engine room, slamming emergency brakes and rerouting power just in time.",
        "Sparks shower the control cabin as {hero} forces the system into a manual override.",
        "Passengers feel the momentum bleed away, the train crawling to a halt as {hero} locks the brakes.",
      ],
      failure: [
        "Control panels scream warning after warning as {hero} fails to wrestle the system back.",
        "The train barrels through several blocks before emergency track cutoffs finally slow it.",
        "Later diagnostics show that {hero} was only seconds away from stabilizing the core when it failed.",
      ],
    },
  },
  {
    title: "Hospital server blackout",
    desc: "The ICU monitoring network suddenly collapsed. Lives depend on a quick fix.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "Screens flicker back to life as {hero} reboots the critical nodes in the right sequence.",
        "ICU staff cheer when vital monitors stabilize, credits quietly assigned to {hero}'s patchwork fix.",
        "Backup clusters come online under {hero}'s command, knitting the network together in record time.",
      ],
      failure: [
        "Despite {hero}'s furious typing, dark monitors stay dark for agonizing minutes too long.",
        "Manual triage replaces digital readouts as {hero} admits they can not restore everything fast enough.",
        "Later, the hospital report lists partial data loss during blackout in small, clinical font.",
      ],
    },
  },
  {
    title: "Malfunctioning power grid",
    desc: "Half the district is flickering on and off. A catastrophic overload is possible.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} reroutes overloaded lines, bleeding off energy before the transformers can blow.",
        "Street by street, the lights stabilize as {hero} rewrites the grid's priorities on the fly.",
        "Engineers monitoring the grid map watch red zones cool to green under {hero}'s intervention.",
      ],
      failure: [
        "A chain of substations trips offline before {hero} finishes the last override.",
        "Neighborhoods fall into staggered darkness, leaving {hero} working by emergency lanterns.",
        "Reports later call it a rolling blackout narrowly contained, thanks to and in spite of {hero}.",
      ],
    },
  },
  {
    title: "Mass panic at city festival",
    desc: "A strange sound overhead sparked panic. People are scattering in fear.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} climbs a vendor stall and bellows instructions that cut through the chaos.",
        "Guided exits form where there was once a stampede, {hero} walking people out in tight groups.",
        "The festival grounds empty in controlled waves thanks largely to {hero}'s steady voice.",
      ],
      failure: [
        "Despite {hero}'s shouts, the crowd fractures into smaller, panicked swarms.",
        "People trip over abandoned booths as {hero} tries and fails to anchor a clear escape route.",
        "Hours later, abandoned stalls and scattered flyers mark where order slipped out of {hero}'s hands.",
      ],
    },
  },
  {
    title: "Missing child in megamall",
    desc: "A child disappeared in a busy shopping complex. Parents are in distress.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} coordinates with security, turning grainy camera feeds into a precise search pattern.",
        "A soft call of the child's name from {hero} breaks the tension as they are found hiding behind a kiosk.",
        "Parents collapse into relieved hugs while {hero} quietly confirms the all clear on comms.",
      ],
      failure: [
        "{hero} combs floor after floor with no clear lead, every second stretching.",
        "False sightings flood in, scattering {hero}'s search pattern until it is nearly useless.",
        "By the time a different team locates the child, {hero} is left feeling one step behind all along.",
      ],
    },
  },
  {
    title: "Traumatized survivor",
    desc: "A lone survivor refuses to evacuate the disaster zone, frozen in shock.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} sits with the survivor, trading silence and simple words until their breathing steadies.",
        "Bit by bit, {hero} walks them out of the danger zone without ever raising their voice.",
        "Later, responders note that the survivor only agreed to move once {hero} offered a hand.",
      ],
      failure: [
        "No matter what {hero} says, the survivor's gaze stays locked on the wreckage.",
        "Time runs out, forcing {hero} to call in others to carry the survivor against their wishes.",
        "Later, {hero} replays the conversation, wondering which moment they lost the fragile trust.",
      ],
    },
  },

  // 10
  {
    title: "High speed freeway pileup",
    desc: "Multiple vehicles have collided on an elevated freeway. Some cars dangle over the edge.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} wedges themselves between twisted metal, hauling cars back from the brink one by one.",
        "With brutal efficiency, {hero} tears open jammed doors and drags people to the safe lane.",
        "As tow crews arrive, they find wrecks already stabilized and a line of survivors resting under {hero}'s watch.",
      ],
      failure: [
        "A support rail gives way before {hero} can secure every car, sending debris raining down below.",
        "Smoke, fuel, and screeching metal turn the scene into a maze where {hero} cannot reach everyone.",
        "Later traffic cams capture {hero} standing in the wreckage, shoulders lowered in quiet frustration.",
      ],
    },
  },
  {
    title: "Collapsed warehouse scaffolding",
    desc: "Scaffolding has fallen during a late night shift, trapping workers under steel beams.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} lifts and braces beams like they were cardboard, clearing a path for medics.",
        "Workers cheer as {hero} peels away the last of the twisted frame pinning their supervisor.",
        "By sunrise, the floor is still a mess, but everyone alive is out thanks to {hero}.",
      ],
      failure: [
        "Each beam {hero} shifts seems to trigger another small collapse.",
        "Dust chokes the air as {hero} is forced to retreat from an unstable corner of the site.",
        "Rescue teams later mark off zones they reached too late, places where even {hero} could not dig fast enough.",
      ],
    },
  },
  {
    title: "Hijacked armored convoy",
    desc: "An armored truck convoy is under attack. Streets are blocked and civilians are nearby.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} lands in front of the convoy, turning incoming fire into twisted shrapnel with bare hands.",
        "Attackers scatter as {hero} flips one of their vehicles onto its side like a toy.",
        "By the time sirens close in, the only thing still moving is {hero} doing a last sweep for stragglers.",
      ],
      failure: [
        "{hero} reaches the convoy just in time to see one truck already smoking and overturned.",
        "Civilians are scattered in every direction, forcing {hero} to choose rescue over direct pursuit.",
        "Later, the report lists stolen assets and missing suspects under a single line: response delayed.",
      ],
    },
  },
  {
    title: "Overloaded construction crane",
    desc: "A crane has seized while carrying a container above a crowded street.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} climbs the crane frame in seconds, bracing the container with both hands.",
        "Workers shout directions as {hero} slowly muscles the load back toward a safe drop zone.",
        "When the container finally lands with a heavy thud, the only thing that falls after is everyone’s tension.",
      ],
      failure: [
        "The crane motor fails entirely, forcing {hero} to watch the load swing out of reach.",
        "A partial collapse sends the container into an empty side lot instead of the main street thanks to a rushed shove from {hero}.",
        "Later photos show the bent crane jib, with a small figure of {hero} framed against it mid strain.",
      ],
    },
  },
  {
    title: "Underground fight club raid",
    desc: "A brutal underground arena is mid session. The police need help to break it up safely.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} drops into the ring and ends the main bout with a single decisive blow.",
        "Spectators surge toward the exits as {hero} tears down the surrounding cages.",
        "By the time enforcement squads march in, most fighters are already unconscious or subdued by {hero}.",
      ],
      failure: [
        "The crowd turns hostile, forcing {hero} to hold back just to keep the chaos contained.",
        "Fog machines, strobe lights, and panicked bodies turn the arena into a blind brawl.",
        "When the lights finally come up, {hero} is ringed by groaning bodies but several key organizers are gone.",
      ],
    },
  },
  {
    title: "Derailed cargo tram",
    desc: "A heavy cargo tram has jumped its rails inside an industrial zone.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} digs their heels in, physically forcing the tram to a grinding halt.",
        "Sparks shower around {hero} as they lever the vehicle away from a chemical storage wall.",
        "Workers later replay the security feed of {hero} shoving several tons of metal sideways.",
      ],
      failure: [
        "The tram slides too far before {hero} can fully counter its momentum.",
        "Freight containers topple like dominoes, forcing {hero} to switch from stopping to shielding.",
        "In the incident log, someone notes that if {hero} had arrived any later, the entire depot would have gone.",
      ],
    },
  },
  {
    title: "Street brawl near fuel depot",
    desc: "A super powered street fight has broken out dangerously close to a fuel depot.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} wades into the fray, slamming combatants away from the fuel tanks.",
        "Every thrown punch from {hero} is angled to redirect shock waves upward instead of sideways.",
        "When the dust settles, the depot is scratched but still standing, and the fighters are zip tied at {hero}'s feet.",
      ],
      failure: [
        "A stray blast knocks a truck into a fuel line before {hero} can force the fight away.",
        "Fire crews race to contain the blaze while {hero} trades blows just to keep things from exploding further.",
        "Later, investigators mark blackened craters on the depot map, each one near where {hero} tried to make a stand.",
      ],
    },
  },
  {
    title: "Collapsed parking structure",
    desc: "An aging parking tower has partially collapsed after a tremor.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} turns crumbling ramps into improvised ramps and tunnels, carving evacuation routes through concrete.",
        "One by one, trapped drivers are hauled out of their crushed cars by {hero}'s steady grip.",
        "From the outside, the tower looks ready to fall, but the core where {hero} worked stays intact.",
      ],
      failure: [
        "Every section {hero} touches seems to drop new chunks of debris.",
        "Evacuation is slow and brutal as {hero} is forced to choose which trapped pockets to reach first.",
        "Days later, the tower is demolished entirely, but residents still talk about the lone figure hauling people out of the dust.",
      ],
    },
  },
  {
    title: "Flooded riverfront district",
    desc: "A sudden surge has flooded the riverfront. Residents are stranded on cars and rooftops.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} moves through the current like a human breakwater, carrying people in pairs.",
        "Floating debris bounces harmlessly off {hero} as they clear a path to higher ground.",
        "When the waters recede, locals point to soaked footprints on rooftops where {hero} stood.",
      ],
      failure: [
        "The current proves stronger than even {hero} expected, pushing them off course more than once.",
        "Visibility drops as oily water and debris cloud every move {hero} tries to make.",
        "Some rooftops stay unreachable before rafts arrive, and {hero} knows exactly which ones.",
      ],
    },
  },
  {
    title: "Runaway demolition mech",
    desc: "An autonomous demolition mech has gone off script in an old housing block.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} grabs the mech by its main armature and slams it through an empty wall.",
        "Control cores crack and spark as {hero} tears the machine apart piece by piece.",
        "Residents watch from a safe distance as the mech ends up in a silent scrap heap under {hero}'s boot.",
      ],
      failure: [
        "The mech's cutting torches stay just out of {hero}'s grip, carving new scars into the block.",
        "Each time {hero} corners it, the machine blasts through another empty apartment.",
        "When engineers finally shut it down remotely, {hero} is left standing in the wreckage it already made.",
      ],
    },
  },

  // 20
  {
    title: "Glitched traffic control system",
    desc: "All traffic lights downtown are blinking random patterns, causing chaos at intersections.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} dives into the control hub, rewriting faulty light cycles in minutes.",
        "Intersection cams show {hero} manually forcing an all red lockout while new code deploys.",
        "As patterns stabilize, drivers slowly return to normal speeds under {hero}'s corrected grid.",
      ],
      failure: [
        "Every time {hero} stabilizes one cluster, three more intersections bug out.",
        "Logs reveal layers of legacy code fighting {hero}'s patch at every step.",
        "By the end of the shift, manual traffic officers are still out there because the system never fully settles.",
      ],
    },
  },
  {
    title: "Data center fire suppression failure",
    desc: "A fire suppression system in a critical data center refuses to trigger.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} hot wires the control manifold, forcing suppressant into the burning aisles.",
        "Servers hiss under foam as {hero} shunts power away from melting racks.",
        "Techs later review logs that show a single override command from {hero} saving half the grid.",
      ],
      failure: [
        "The fire races along cable trays faster than {hero} can force the system online.",
        "{hero} reroutes power, but not before several mainframes slag into molten metal.",
        "Recovery teams spend weeks restoring data, with {hero}'s manual patches scattered through every report.",
      ],
    },
  },
  {
    title: "Rogue security drones",
    desc: "Security drones in a business park are targeting civilians as intruders.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} spoofs a master control signal, making the drones stand down mid flight.",
        "One by one, drones land around {hero} in a neat circle, blinking harmlessly.",
        "Engineers later comb through the command stream and find {hero}'s signature override.",
      ],
      failure: [
        "The drones adapt faster than {hero}'s spoofing, jumping between frequencies.",
        "A few units are disabled, but others scatter across the district before shutdown.",
        "Residents spend the evening dodging low flying hardware while {hero} scrambles to contain them.",
      ],
    },
  },
  {
    title: "Hyperloop tunnel malfunction",
    desc: "A high speed capsule is stuck between stations with life support in warning mode.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} forces a local reboot, tricking the system into thinking the capsule reached station.",
        "Pressure readouts stabilize as {hero} juggles airflow and battery draw remotely.",
        "When the capsule finally docks, passengers see {hero}'s face on the emergency display.",
      ],
      failure: [
        "Glitch after glitch keeps kicking {hero}'s commands back with cryptic errors.",
        "Life support hangs just above critical as backup teams scramble to cut open the tunnel by hand.",
        "The final report dedicates a paragraph to {hero}'s frantic but partially blocked override attempts.",
      ],
    },
  },
  {
    title: "Hacked billboard swarm",
    desc: "Citywide billboards are flashing seizure inducing patterns and hidden messages.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} hijacks the ad network and pushes a flat black screen citywide.",
        "One by one, the boards reboot into a calm city seal with a simple message: stand by.",
        "Later footage shows the chaotic strobe freeze mid pattern, cut short by {hero}'s kill command.",
      ],
      failure: [
        "The source of the hack keeps shifting, outpacing {hero}'s attempt to block each node.",
        "Some boards stay locked in dangerous loops, forcing authorities to shut off power at the street level.",
        "News outlets later show clips of the flashing chaos with {hero}'s name mentioned as one of the responders.",
      ],
    },
  },
  {
    title: "Smart home cascade failure",
    desc: "A cluster of smart homes is stuck in a reboot loop, trapping residents behind sealed doors.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} pushes a safe mode patch, forcing every system to unlock doors and windows.",
        "Residents stumble out while appliances beep in confused but harmless sync.",
        "In the system logs, {hero}'s patch is marked as a temporary but life saving fix.",
      ],
      failure: [
        "Each house responds differently, and {hero} cannot push one clean patch to all of them.",
        "Some doors open only to slam shut again as the loop continues.",
        "In the end, physical crews have to break several locks while {hero} fights the underlying code storm.",
      ],
    },
  },
  {
    title: "Experimental reactor spike",
    desc: "An experimental micro reactor shows a sudden power spike on diagnostic charts.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} slams the virtual control rods down, choking the reaction safely.",
        "Alarm sirens cut off mid howl as {hero} rebalances coolant flow and load.",
        "Scientists later watch replayed graphs dipping neatly back into the green under {hero}'s adjustments.",
      ],
      failure: [
        "Sensors drop offline before {hero} can get a full picture of the spike.",
        "Automatic safeties slam the system into full shutdown, freezing out {hero}'s last commands.",
        "The lab stays dark for days while technicians rebuild around the scare, with {hero}'s near miss in their notes.",
      ],
    },
  },
  {
    title: "Subway signaling ghost error",
    desc: "The subway control system insists a non existent train is occupying a busy track segment.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} finds the phantom entry and scrubs it from the schedule, clearing the block.",
        "Signals flip from locked red to healthy green after {hero} rebuilds the route table.",
        "Commuters only know that delays vanish a few minutes after {hero} plugs in.",
      ],
      failure: [
        "Every time {hero} deletes the ghost train, it reappears under a slightly different ID.",
        "The system refuses to clear the track, forcing manual shuttles and heavy delays.",
        "News tickers later mention mysterious software issues while showing a brief shot of {hero} in the control room.",
      ],
    },
  },
  {
    title: "Citywide drone delivery crash",
    desc: "A central server error has all delivery drones requesting landing at once.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} staggers the return queue, assigning each drone a safe time and zone to land.",
        "What was a cloud of confused hardware turns into a neat grid of descent paths on {hero}'s screen.",
        "Pedestrians watch hundreds of drones spiral down in orderly waves instead of a hailstorm.",
      ],
      failure: [
        "The air is crowded with spinning icons as {hero} fails to push a stable schedule in time.",
        "Some drones run out of battery and crash onto rooftops and empty streets.",
        "Cleanup crews later collect armfuls of broken rotors while {hero} continues isolating the root bug.",
      ],
    },
  },
  {
    title: "Compromised emergency network",
    desc: "Emergency call routing is randomly dropping or delaying distress calls.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} slices the network into isolated cells, stabilizing priority traffic first.",
        "Call queues clear as {hero} reroutes critical signals through backup nodes.",
        "Dispatchers quietly mouth thank you at the console displaying {hero}'s patch status.",
      ],
      failure: [
        "Every reroute {hero} attempts risks dropping another block of calls.",
        "Operators tap their desks in frustration as alerts blink in and out of reach.",
        "The post incident review reads like a maze of half fixed routes with {hero}'s name threaded through them.",
      ],
    },
  },

  // 30
  {
    title: "Overcrowded shelter dispute",
    desc: "A temporary shelter has reached capacity and tensions are boiling over.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} steps onto a table and lays out a clear, calm plan for rotating space and supplies.",
        "Arguments soften into tired nods as {hero} walks through the crowd, listening and redirecting.",
        "By lights out, the shelter is cramped but quiet, with {hero} still moving cot to cot checking on people.",
      ],
      failure: [
        "Voices keep rising no matter how many times {hero} repeats the same reassurances.",
        "Small arguments flare into shoving matches that pull {hero} in every direction.",
        "Staff later note that the shelter held, but only barely, and even {hero} could not cool everyone down.",
      ],
    },
  },
  {
    title: "Bridge jumper on suspension tower",
    desc: "A distraught person is perched on the outer edge of a high suspension tower.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} edges along the beam, talking about anything and everything until the tension breaks.",
        "A quiet joke from {hero} finally earns a weak laugh, and a shaky hand reaches back toward safety.",
        "Rescuers secure the harness only after the person is already stepping back inside with {hero}.",
      ],
      failure: [
        "Every word {hero} tries feels like it lands a second too late.",
        "Wind, height, and raw panic drown out {hero}'s careful phrases.",
        "The scene ends with harnesses and rescue nets instead of a calm walk back, and {hero} knows why.",
      ],
    },
  },
  {
    title: "Evacuation of burning apartment block",
    desc: "A fire has broken out in a tall, crowded apartment building.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} moves door to door, keeping residents calm and organized as they descend smoky stairwells.",
        "Children cling to {hero}'s coat as they are guided down through the haze.",
        "Outside, evacuees gather in tight clusters around {hero}, still listening for their next instruction.",
      ],
      failure: [
        "Crowded hallways choke with people and smoke faster than {hero} can keep up.",
        "Some residents run back for belongings despite {hero}'s shouted warnings.",
        "The final headcount is better than it could have been, but not as good as {hero} wanted.",
      ],
    },
  },
  {
    title: "Panic on stalled ferris wheel",
    desc: "A giant ferris wheel has stopped with several cars at the top, passengers panicking.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} keeps a steady line of chatter going over the loudspeakers, walking each car through breathing and waiting.",
        "By the time emergency crews get the wheel moving again, most riders are talking calmly with {hero}.",
        "Once on the ground, people line up to shake {hero}'s hand before they leave.",
      ],
      failure: [
        "Nothing {hero} says seems to penetrate the rising tide of fear inside the highest cars.",
        "Screams and frantic movements make the wheel sway more than engineers like.",
        "When passengers finally touch down, many are safe but shaken, and {hero} looks just as drained.",
      ],
    },
  },
  {
    title: "Riot at sports championship",
    desc: "A heated championship game has spilled into the streets as rival fans clash.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} channels the crowd into chants and controlled marches instead of random brawls.",
        "Tensions bleed off as people follow {hero}'s lead, turning shoves into songs.",
        "Police later admit that the night went better than expected because someone gave the crowd a voice.",
      ],
      failure: [
        "Bottles and flares fly faster than {hero} can redirect.",
        "Every pocket of calm {hero} creates seems to collapse the moment they turn away.",
        "The streets are not a full riot, but they are far from peaceful when the night finally ends.",
      ],
    },
  },
  {
    title: "Overloaded clinic hallway",
    desc: "A small neighborhood clinic is overrun after a nearby accident.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} sets up a quick triage queue, turning chaos into a rough but workable flow.",
        "Patients follow {hero}'s gestures and calm tone more than the shouted announcements.",
        "Staff later say they would have been buried without {hero} playing traffic controller.",
      ],
      failure: [
        "People push past each other in the hallways no matter how many lines {hero} draws on the floor.",
        "Arguments over who goes first drown out {hero}'s attempts at structure.",
        "The clinic makes it through the surge, but with more frayed nerves than {hero} hoped for.",
      ],
    },
  },
  {
    title: "Stranded protest group in storm",
    desc: "A protest march is caught in a sudden, dangerous storm far from shelter.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} rallies the group into tight formations, moving them under overpasses and into safe lots.",
        "Chants turn into coordinated movements as {hero} calls out shelter points.",
        "Later, soaked but safe protesters still carry their signs, many with {hero}'s name added.",
      ],
      failure: [
        "Rain, wind, and fear drown out {hero}'s directions.",
        "Some splinter groups break off in random directions, forcing {hero} to choose which way to follow.",
        "Emergency crews find scattered clusters of people later, and {hero} is still counting faces.",
      ],
    },
  },
  {
    title: "Runaway crowd at mall opening",
    desc: "A hyped product launch has created a dangerous stampede at a mall entrance.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} convinces security to stagger entry, then broadcasts calm instructions over the intercom.",
        "A few firm but fair rules from {hero} turn the crush into a slow moving line.",
        "Inside, staff watch the security feeds in relief as the main doors finally look normal.",
      ],
      failure: [
        "No matter how many times {hero} explains the plan, someone always rushes the door.",
        "Barricades shift and buckle as the crowd pulses forward.",
        "In the aftermath, scattered shoe prints and broken signs show where {hero} could not hold the line.",
      ],
    },
  },
  {
    title: "Isolated elder in blackout",
    desc: "An elderly resident is alone and terrified during a citywide blackout.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} arrives with lanterns and a calm voice, turning the dark apartment into a small island of light.",
        "They sit and talk while emergency crews work, with {hero} occasionally checking the window and the radio.",
        "By the time the power returns, the elder is telling stories instead of watching the clock.",
      ],
      failure: [
        "Traffic and chaos delay {hero} longer than anyone wanted.",
        "By the time {hero} arrives, the elder has already panicked and tried to leave alone.",
        "They are safe in a neighbor's apartment, but {hero} still wishes they had knocked a little sooner.",
      ],
    },
  },
  {
    title: "School lockdown scare",
    desc: "A suspicious noise has put a school into lockdown. Students are frightened.",
    skill: "compassion" as Skill,
    aftermath: {
      success: [
        "{hero} moves classroom to classroom, explaining the situation in plain, steady language.",
        "Teachers relax a fraction as students focus more on {hero}'s calm than their own imaginations.",
        "When the all clear comes, it feels like a controlled release instead of an explosion of fear.",
      ],
      failure: [
        "Texts and rumors race ahead of {hero}, painting pictures far worse than the reality.",
        "Some students hide in closets and refuse to come out even when {hero} reassures them.",
        "The incident ends without physical harm, but the tension hangs in the halls and so does {hero}'s worry.",
      ],
    },
  },

  // 40
  {
    title: "Chemical spill on ring road",
    desc: "A tanker has leaked hazardous chemicals onto a major ring road.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} taps into traffic systems, sealing off access and guiding vehicles away from the plume.",
        "Dynamic signs flash evacuation routes that {hero} just programmed seconds before.",
        "Air quality sensors show the worst of the cloud dissipating far from trapped commuters.",
      ],
      failure: [
        "Route recalculations lag behind the spread of the fumes.",
        "A few unlucky drivers follow old GPS data straight into the affected zone.",
        "Hazmat teams later praise {hero}'s help but note that the system fought them every step.",
      ],
    },
  },
  {
    title: "Sabotaged water treatment plant",
    desc: "A city water plant shows signs of digital sabotage.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} isolates poisoned routines, forcing the plant into a safe bypass cycle.",
        "Contaminated batches are diverted and flushed before reaching the main lines.",
        "Public alerts later thank unnamed technicians; only a few know {hero} wrote the fix.",
      ],
      failure: [
        "The attack is deeper than {hero} expected, hidden in low level firmware.",
        "Some questionable water still leaves the plant before the main valves close.",
        "Several neighborhoods receive boil notices while {hero} keeps hunting for backdoors.",
      ],
    },
  },
  {
    title: "Rooftop hostage drone",
    desc: "A hacked quadcopter is keeping people pinned down on a rooftop.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} leaps from a nearby building, snatching the drone out of the air.",
        "The device crumples in {hero}'s hand as they shield the hostages with their body.",
        "Later, only a twisted frame and a few spinning rotors remain on the roof gravel.",
      ],
      failure: [
        "The drone darts and weaves just out of {hero}'s reach.",
        "Each pass sprays the roof with non lethal rounds that still hurt enough to keep people flat.",
        "When the signal finally cuts, {hero} is left with more bruises than answers.",
      ],
    },
  },
  {
    title: "Tunnel collapse threat",
    desc: "Sensors detect micro fractures in an old traffic tunnel during heavy use.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} braces key choke points, physically holding beams as cars reverse out.",
        "Cracks rain dust on {hero}'s shoulders, but the ceiling does not fall.",
        "Drivers who make it out see the tunnel in their rear view mirrors and the silhouette still holding it up.",
      ],
      failure: [
        "Plaster and concrete rain down faster than {hero} can prop things up.",
        "Sections of the tunnel are lost, sealed off by emergency crews.",
        "Rumors later say a lone figure kept one part from going entirely, but it is hard to prove through the rubble.",
      ],
    },
  },
  {
    title: "Runaway exosuit thief",
    desc: "A thief has stolen a powered exosuit and is tearing through a shopping street.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} meets the exosuit head on, locking its limbs and ripping free the power core.",
        "The suit slumps like a puppet with cut strings as {hero} yanks the thief out by the collar.",
        "Storefronts are cracked but still standing, with a neat trail of boot prints between each dent.",
      ],
      failure: [
        "The exosuit's servos outpace {hero}'s grabs again and again.",
        "Every hit {hero} lands still sends shockwaves into nearby glass and masonry.",
        "By the time the suit finally overheats and dies, the street looks like a war zone.",
      ],
    },
  },
  {
    title: "Breakout at meta containment wing",
    desc: "Several enhanced detainees are attempting a breakout from a secure wing.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} slams into the escape route, turning the corridor into a one person barricade.",
        "One by one, the would be escapees hit the floor or the walls under {hero}'s counters.",
        "When the alarms stop, {hero} is still there, breathing hard but unbroken.",
      ],
      failure: [
        "The detainees coordinate better than expected, forcing {hero} into a retreat.",
        "Power dampeners flicker on and off, making every move a gamble.",
        "Later, a few cells are notably empty while repair crews weld new doors back into place.",
      ],
    },
  },
  {
    title: "Submerged metro station",
    desc: "A broken main has turned an underground metro stop into a rising pool.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} hauls people up stairwells two at a time, wading waist deep without slowing.",
        "Benches, kiosks, and signs become stepping stones under {hero}'s quick rearrangement.",
        "When pumps finally engage, the only things left in the water are abandoned bags.",
      ],
      failure: [
        "Water climbs each step faster than {hero} can clear the platforms.",
        "Some passengers are forced to cling to high ledges until boats arrive.",
        "Later, security footage shows a soaked {hero} still moving long after others gave up.",
      ],
    },
  },
  {
    title: "Sinkhole in market square",
    desc: "A sudden sinkhole has opened in the middle of a crowded open air market.",
    skill: "strength" as Skill,
    aftermath: {
      success: [
        "{hero} anchors themselves at the edge, grabbing people as the ground crumbles beneath them.",
        "Stalls and carts are hauled back from the brink with almost casual swings.",
        "When the dust settles, the hole is big, but the casualty count is small thanks to {hero}.",
      ],
      failure: [
        "The ground keeps giving way in unpredictable patches, forcing {hero} to pull back.",
        "Several stalls vanish into the dark before ropes and barriers can be set.",
        "Rescue crews mark the area as stable hours later, but {hero} still remembers each hand they missed.",
      ],
    },
  },
  {
    title: "Toxic cloud in warehouse district",
    desc: "A chemical reaction has released a toxic cloud between tall, windless buildings.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} commandeers rooftop fans and vents, building a makeshift airflow corridor.",
        "The cloud thins and drifts upward as {hero} reshapes the local wind with machinery alone.",
        "Emergency sensors go from red to yellow while {hero} watches the readings like a hawk.",
      ],
      failure: [
        "Some vents push the fumes into unexpected pockets instead of out of the district.",
        "Visibility cameras show patches of cloud lingering despite {hero}'s plan.",
        "Hazmat teams have to finish the job on the ground while {hero} tunes fans in the background.",
      ],
    },
  },
  {
    title: "Hack at neonatal ward monitors",
    desc: "Monitors in a neonatal ward are displaying scrambled data.",
    skill: "tech" as Skill,
    aftermath: {
      success: [
        "{hero} isolates the ward on a clean subnet and spins up simple, robust readouts.",
        "Nurses breathe easier as heartbeats and oxygen levels reappear clearly.",
        "By morning, a more permanent fix is in place, but everyone remembers {hero}'s midnight patch.",
      ],
      failure: [
        "Each time {hero} thinks they have a clean feed, the data corrupts again.",
        "Staff are forced to rely on manual checks and backup devices.",
        "The babies stay safe, but {hero} leaves knowing they wrestled the system more than they fixed it.",
      ],
    },
  },
];



export const UNREST_LEVELS: UnrestLevel[] = [
  {
    code: "quiet",
    label: "Low",
    minCalls: 1,
    maxCalls: 2,
    remarks: [
      "The city is quiet today. Lines hum instead of scream.",
      "Dispatch boards look calm - almost suspiciously so.",
      "You can hear the vending machine louder than the phone.",
    ],
  },
  {
    code: "uneasy",
    label: "Uneasy",
    minCalls: 2,
    maxCalls: 3,
    remarks: [
      "There’s a subtle tension in the air - enough to keep you on edge.",
      "Nothing is on fire yet, but the chatter feels one nudge from chaos.",
      "Operators swap glances. It’s not bad, but it’s not exactly calm either.",
    ],
  },
  {
    code: "tense",
    label: "High",
    minCalls: 3,
    maxCalls: 4,
    remarks: [
      "Trouble is bubbling; every light on the board feels ready to flash.",
      "You can already hear sirens outside before your shift fully starts.",
      "The city feels restless - like it knows something’s about to go wrong.",
    ],
  },
  {
    code: "critical",
    label: "Critical",
    minCalls: 4,
    maxCalls: 5,
    remarks: [
      "The city is buzzing with emergencies - your headset may not get a break.",
      "Alarms, chatter, and overlapping calls hit you the second you sit down.",
      "Everything feels one bad decision away from total overload.",
    ],
  },
];
