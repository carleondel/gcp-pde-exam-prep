export const RANKS = [
  { name:"Cloud Novice", minXP:0, icon:"\u2601\uFE0F", color:"#8b95a8" },
  { name:"Data Apprentice", minXP:200, icon:"\uD83D\uDCCA", color:"#4a9eff" },
  { name:"Pipeline Builder", minXP:500, icon:"\uD83D\uDD27", color:"#2dd4a0" },
  { name:"Query Master", minXP:1000, icon:"\u26A1", color:"#8fff6a" },
  { name:"Cloud Architect", minXP:1800, icon:"\uD83C\uDFD7\uFE0F", color:"#0fbfa3" },
  { name:"Data Engineer Pro", minXP:3000, icon:"\uD83C\uDFAF", color:"#ffb733" },
  { name:"GCP Legend", minXP:5000, icon:"\uD83D\uDC51", color:"#d4930a" },
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
