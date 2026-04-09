export const RANKS = [
  // Tier 1 — Bronze
  { name:"Cloud Novice", minXP:0, icon:"\u2601\uFE0F", color:"#8b95a8", tier:1 },
  { name:"Data Apprentice", minXP:200, icon:"\uD83D\uDCCA", color:"#4a9eff", tier:1 },
  { name:"Pipeline Builder", minXP:500, icon:"\uD83D\uDD27", color:"#2dd4a0", tier:1 },
  { name:"Query Master", minXP:1000, icon:"\u26A1", color:"#8fff6a", tier:1 },
  { name:"Cloud Architect", minXP:1800, icon:"\uD83C\uDFD7\uFE0F", color:"#0fbfa3", tier:1 },
  { name:"Data Engineer Pro", minXP:3000, icon:"\uD83C\uDFAF", color:"#ffb733", tier:1 },
  { name:"GCP Legend", minXP:5000, icon:"\uD83D\uDC51", color:"#d4930a", tier:1 },
  // Tier 2 — Silver
  { name:"Cloud Novice II", minXP:7500, icon:"\u2601\uFE0F", color:"#9aa3b8", tier:2 },
  { name:"Data Apprentice II", minXP:10500, icon:"\uD83D\uDCCA", color:"#5eaaff", tier:2 },
  { name:"Pipeline Builder II", minXP:14500, icon:"\uD83D\uDD27", color:"#44ddb0", tier:2 },
  { name:"Query Master II", minXP:19500, icon:"\u26A1", color:"#a0ff80", tier:2 },
  { name:"Cloud Architect II", minXP:26000, icon:"\uD83C\uDFD7\uFE0F", color:"#22ccb3", tier:2 },
  { name:"Data Engineer Pro II", minXP:34000, icon:"\uD83C\uDFAF", color:"#ffc44d", tier:2 },
  { name:"GCP Legend II", minXP:44000, icon:"\uD83D\uDC51", color:"#e0a020", tier:2 },
  // Tier 3 — Gold
  { name:"Cloud Novice III", minXP:56000, icon:"\u2601\uFE0F", color:"#b0b8c8", tier:3 },
  { name:"Data Apprentice III", minXP:70000, icon:"\uD83D\uDCCA", color:"#72b4ff", tier:3 },
  { name:"Pipeline Builder III", minXP:88000, icon:"\uD83D\uDD27", color:"#5de8c0", tier:3 },
  { name:"Query Master III", minXP:110000, icon:"\u26A1", color:"#b0ff96", tier:3 },
  { name:"Cloud Architect III", minXP:138000, icon:"\uD83C\uDFD7\uFE0F", color:"#36d9c0", tier:3 },
  { name:"Data Engineer Pro III", minXP:172000, icon:"\uD83C\uDFAF", color:"#ffd066", tier:3 },
  { name:"GCP Legend III", minXP:215000, icon:"\uD83D\uDC51", color:"#f0b030", tier:3 },
  // Apex
  { name:"Certified Mythic", minXP:275000, icon:"\uD83C\uDF1F", color:"#ff6af0", tier:4 },
];

export const ACHIEVEMENTS = [
  { id:"first_blood", name:"First Blood", desc:"Acierta tu primera pregunta", icon:"\uD83C\uDFAF", cond:s=>s.correct>=1 },
  { id:"streak3", name:"On Fire!", desc:"Racha de 3", icon:"\uD83D\uDD25", cond:s=>s.maxStreak>=3 },
  { id:"streak5", name:"Unstoppable", desc:"Racha de 5", icon:"\uD83D\uDCA5", cond:s=>s.maxStreak>=5 },
  { id:"streak10", name:"Legendary", desc:"Racha de 10", icon:"\uD83C\uDF1F", cond:s=>s.maxStreak>=10 },
  { id:"speed", name:"Speed Demon", desc:"Correcta en <8s", icon:"\u26A1", cond:s=>s.fastCorrect>=1 },
  { id:"ten", name:"Scholar", desc:"50 correctas total", icon:"\uD83D\uDCDA", cond:s=>s.correct>=50 },
  { id:"twenty", name:"Expert", desc:"100 correctas", icon:"\uD83C\uDF93", cond:s=>s.correct>=100 },
  { id:"master", name:"Grand Master", desc:"200 correctas", icon:"\uD83D\uDC51", cond:s=>s.correct>=200 },
  { id:"hard5", name:"Hard Master", desc:"5 dif\u00EDciles correctas", icon:"\uD83C\uDFC6", cond:s=>s.hardCorrect>=5 },
  { id:"jackpot", name:"Jackpot!", desc:"Premio mayor ruleta", icon:"\uD83C\uDFB0", cond:s=>s.jackpot },
  { id:"topics", name:"Polymath", desc:"Acierta en 10+ temas", icon:"\uD83E\uDDE0", cond:s=>s.topicsOk>=10 },
  { id:"collector", name:"Collector", desc:"Abre 5 cofres", icon:"\uD83D\uDCE6", cond:s=>s.chestsOpened>=5 },
  { id:"scratch", name:"Scratcher", desc:"3 rasca y ganas", icon:"\uD83C\uDF9F\uFE0F", cond:s=>s.scratchUsed>=3 },
  { id:"powerup", name:"Power User", desc:"Usa 3 power-ups", icon:"\uD83E\uDDEA", cond:s=>s.powerupsUsed>=3 },
  { id:"boss_win", name:"Boss Slayer", desc:"Gana una batalla boss", icon:"\uD83D\uDC09", cond:s=>s.bossWins>=1 },
  { id:"boss5", name:"Dragon Hunter", desc:"Gana 5 batallas boss", icon:"\u2694\uFE0F", cond:s=>s.bossWins>=5 },
  { id:"boss15", name:"Dragonbane", desc:"Gana 15 batallas boss", icon:"\uD83D\uDDE1\uFE0F", cond:s=>s.bossWins>=15 },
  { id:"boss_t3", name:"Wyrm Slayer", desc:"Derrota un dragon tier 3+", icon:"\uD83D\uDD25", cond:s=>s.highestTierDefeated>=3 },
  { id:"boss_t5", name:"Colossus Killer", desc:"Derrota al Certified Colossus", icon:"\uD83D\uDC80", cond:s=>s.highestTierDefeated>=5 },
  { id:"boss_dmg", name:"1000 Damage", desc:"Inflige 1000 de dano total", icon:"\uD83D\uDCA5", cond:s=>s.totalBossDmgDealt>=1000 },
  { id:"boss_flawless", name:"Flawless", desc:"Gana sin fallar una pregunta", icon:"\u2728", cond:s=>s.flawlessBossWin },
  { id:"tier2", name:"Silver Era", desc:"Alcanza Tier 2", icon:"\uD83E\uDD48", cond:s=>s.xp>=7500 },
  { id:"tier3", name:"Golden Age", desc:"Alcanza Tier 3", icon:"\uD83E\uDD47", cond:s=>s.xp>=56000 },
  { id:"apex", name:"Mythic Ascension", desc:"Alcanza Certified Mythic", icon:"\uD83C\uDF1F", cond:s=>s.xp>=275000 },
];

export const WHEEL_SEGMENTS = [
  { label:"+50 XP", xp:50, color:"#4a9eff", w:22 },
  { label:"+100 XP", xp:100, color:"#0fbfa3", w:18 },
  { label:"+200 XP", xp:200, color:"#8fff6a", w:10 },
  { label:"\uD83D\uDC8E +500", xp:500, color:"#ffb733", w:4, jackpot:true },
  { label:"x2 Next", mult:2, color:"#2dd4a0", w:14 },
  { label:"x3 Next", mult:3, color:"#0d9e87", w:7 },
  { label:"\uD83C\uDF9F\uFE0F Rasca", scratch:true, color:"#d4930a", w:10 },
  { label:"\uD83D\uDCE6 Cofre", chest:true, color:"#b37a08", w:8 },
  { label:"\uD83E\uDDEA Power", power:true, color:"#f0605a", w:7 },
];

export const SCRATCH_PRIZES = [
  { label:"+30 XP", xp:30, rarity:"common" },
  { label:"+75 XP", xp:75, rarity:"common" },
  { label:"+150 XP", xp:150, rarity:"rare" },
  { label:"+300 XP", xp:300, rarity:"epic" },
  { label:"x2 Mult", mult:2, rarity:"rare" },
  { label:"x4 Mult", mult:4, rarity:"epic" },
  { label:"\uD83D\uDEE1\uFE0F Freeze", freeze:true, rarity:"rare" },
  { label:"\u23ED\uFE0F Skip", skip:true, rarity:"common" },
];

export const CHEST_ITEMS = [
  { name:"XP Potion", desc:"+100 XP instant", icon:"\uD83E\uDDEA", xp:100, rarity:"common" },
  { name:"Streak Shield", desc:"Protege tu racha 1 vez", icon:"\uD83D\uDEE1\uFE0F", freeze:true, rarity:"rare" },
  { name:"Double Down", desc:"x2 pr\u00F3ximos 3 aciertos", icon:"\u26A1", multDuration:3, rarity:"rare" },
  { name:"Time Crystal", desc:"+5s extra de bonus", icon:"\uD83D\uDC8E", timeBonus:5, rarity:"epic" },
  { name:"Golden Ticket", desc:"+1 giro de ruleta", icon:"\uD83C\uDF9F\uFE0F", spin:true, rarity:"epic" },
  { name:"Mega XP", desc:"+250 XP", icon:"\uD83D\uDCB0", xp:250, rarity:"legendary" },
  { name:"Boss Key", desc:"Desbloquea batalla boss", icon:"\uD83D\uDDDD\uFE0F", bossKey:true, rarity:"legendary" },
];

export const POWERUPS = [
  { id:"5050", name:"50/50", desc:"Elimina 2 opciones", icon:"\u2702\uFE0F", uses:1 },
  { id:"hint", name:"Pista", desc:"Muestra pista extra", icon:"\uD83D\uDCA1", uses:1 },
  { id:"shield", name:"Escudo", desc:"No pierdes racha si fallas", icon:"\uD83D\uDEE1\uFE0F", uses:1 },
  { id:"double", name:"Doble XP", desc:"x2 XP esta pregunta", icon:"\u26A1", uses:1 },
];

// --- XP Diminishing Returns ---

const XP_TIERS = [
  { minXp: 0, factor: 1.0 },
  { minXp: 5000, factor: 0.75 },
  { minXp: 44000, factor: 0.55 },
  { minXp: 215000, factor: 0.4 },
];

export function xpDiminishingFactor(totalXp) {
  for (let i = XP_TIERS.length - 1; i >= 0; i--) {
    if (totalXp >= XP_TIERS[i].minXp) return XP_TIERS[i].factor;
  }
  return 1.0;
}

export function applyDiminishing(rawXp, totalXp) {
  return Math.round(rawXp * xpDiminishingFactor(totalXp));
}

// --- Dragon Bestiary ---

const DRAGON_TIER_WEIGHTS = [40, 30, 20, 8, 2];

export const DRAGONS = [
  // Tier 1
  { id:"slime_dragon", name:"Slime Dragon", emoji:"\uD83D\uDC09", tier:1, minXp:0, hp:80, playerHp:100, dmgRange:[8,15], counterRange:[8,14], wrongDmgRange:[25,40], xpReward:400, topicFilter:null, difficultyFilter:null, enrageThreshold:0.25, enrageMultiplier:1.5 },
  // Tier 2
  { id:"bigquery_wyrm", name:"BigQuery Wyrm", emoji:"\uD83D\uDC32", tier:2, minXp:1000, hp:120, playerHp:100, dmgRange:[10,18], counterRange:[10,18], wrongDmgRange:[28,44], xpReward:600, topicFilter:"BigQuery", difficultyFilter:null, enrageThreshold:0.25, enrageMultiplier:1.5 },
  { id:"dataflow_serpent", name:"Dataflow Serpent", emoji:"\uD83D\uDC0D", tier:2, minXp:1000, hp:120, playerHp:100, dmgRange:[10,18], counterRange:[10,18], wrongDmgRange:[28,44], xpReward:600, topicFilter:"Dataflow", difficultyFilter:null, enrageThreshold:0.25, enrageMultiplier:1.5 },
  // Tier 3
  { id:"ml_hydra", name:"ML Hydra", emoji:"\uD83E\uDDE0", tier:3, minXp:5000, hp:180, playerHp:120, dmgRange:[12,20], counterRange:[12,22], wrongDmgRange:[30,48], xpReward:900, topicFilter:"ML", difficultyFilter:null, enrageThreshold:0.25, enrageMultiplier:1.5 },
  { id:"storage_golem", name:"Storage Golem", emoji:"\uD83D\uDDFF", tier:3, minXp:5000, hp:180, playerHp:120, dmgRange:[12,20], counterRange:[12,22], wrongDmgRange:[30,48], xpReward:900, topicFilter:"Storage", difficultyFilter:null, enrageThreshold:0.25, enrageMultiplier:1.5 },
  { id:"security_basilisk", name:"Security Basilisk", emoji:"\uD83D\uDC0D", tier:3, minXp:5000, hp:180, playerHp:120, dmgRange:[12,20], counterRange:[12,22], wrongDmgRange:[30,48], xpReward:900, topicFilter:"Security", difficultyFilter:null, enrageThreshold:0.25, enrageMultiplier:1.5 },
  // Tier 4
  { id:"pipeline_leviathan", name:"Pipeline Leviathan", emoji:"\uD83D\uDC33", tier:4, minXp:20000, hp:260, playerHp:150, dmgRange:[14,22], counterRange:[15,25], wrongDmgRange:[32,50], xpReward:1400, topicFilter:"Data", difficultyFilter:null, enrageThreshold:0.25, enrageMultiplier:1.5 },
  { id:"architect_phoenix", name:"Architect Phoenix", emoji:"\uD83D\uDD25", tier:4, minXp:20000, hp:260, playerHp:150, dmgRange:[14,22], counterRange:[15,25], wrongDmgRange:[32,50], xpReward:1400, topicFilter:"Architecture", difficultyFilter:null, enrageThreshold:0.25, enrageMultiplier:1.5 },
  // Tier 5
  { id:"certified_colossus", name:"Certified Colossus", emoji:"\uD83C\uDF0B", tier:5, minXp:50000, hp:400, playerHp:150, dmgRange:[15,24], counterRange:[18,30], wrongDmgRange:[35,55], xpReward:2200, topicFilter:null, difficultyFilter:3, enrageThreshold:0.25, enrageMultiplier:1.5 },
];

export function selectDragon(playerXp) {
  const eligible = DRAGONS.filter((d) => playerXp >= d.minXp);
  const weights = eligible.map((d) => DRAGON_TIER_WEIGHTS[d.tier - 1]);
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < eligible.length; i++) {
    r -= weights[i];
    if (r <= 0) return eligible[i];
  }
  return eligible[eligible.length - 1];
}

export function getBattleQuestions(allQuestions, dragon) {
  let pool = allQuestions;
  if (dragon.topicFilter) {
    pool = pool.filter((q) => q.topic.startsWith(dragon.topicFilter));
  }
  if (dragon.difficultyFilter) {
    pool = pool.filter((q) => q.difficulty === dragon.difficultyFilter);
  }
  if (pool.length === 0) pool = allQuestions;
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
