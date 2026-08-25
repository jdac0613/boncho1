const LS = {
  scope:'herbStudyScopeV1',
  progress:'herbProgressV1',
  stats:'herbStatsV1',
  mistakes:'herbMistakesV1'
};
function getScope(){
  const raw=localStorage.getItem(LS.scope);
  if(raw===null)return [];
  try{const saved=JSON.parse(raw);return Array.isArray(saved)?saved:[]}catch(e){return []}
}
function setScope(arr){localStorage.setItem(LS.scope,JSON.stringify(arr))}
function getProgress(){return JSON.parse(localStorage.getItem(LS.progress)||'{}')}
function setProgress(obj){localStorage.setItem(LS.progress,JSON.stringify(obj))}
function addProgress(name, delta){const p=getProgress();p[name]=Math.max(0,Math.min(100,(p[name]||0)+delta));setProgress(p);return p[name]}
function setProgressValue(name,v){const p=getProgress();p[name]=Math.max(0,Math.min(100,v));setProgress(p)}
function getStats(){return JSON.parse(localStorage.getItem(LS.stats)||'{"color":{"correct":0,"total":0},"recall":{"correct":0,"total":0,"sessions":0}}')}
function saveStats(s){localStorage.setItem(LS.stats,JSON.stringify(s))}
function recordColor(ok){const s=getStats();s.color.total++;if(ok)s.color.correct++;saveStats(s)}
function recordRecall(correct,total){const s=getStats();s.recall.correct+=correct;s.recall.total+=total;s.recall.sessions++;saveStats(s)}
function getMistakes(){return JSON.parse(localStorage.getItem(LS.mistakes)||'{}')}
function saveMistakes(m){localStorage.setItem(LS.mistakes,JSON.stringify(m))}
function addMistake(herb){const m=getMistakes();m[herb]=(m[herb]||0)+1;saveMistakes(m)}
function reduceMistake(herb,amount=1){const m=getMistakes();if(!m[herb])return 0;m[herb]=Math.max(0,m[herb]-amount);if(!m[herb])delete m[herb];saveMistakes(m);return m[herb]||0}
function clearMistake(herb){const m=getMistakes();delete m[herb];saveMistakes(m)}
function leafKey(s){return s.name}
function scopeLeaves(){const allowed=new Set(getScope());return flattenSubcategories().filter(s=>allowed.has(s.name))}
function plainHerb(h){return h.replace(/\([^)]*\)/g,'').trim()}
function avgProgress(){const p=getProgress(), all=flattenSubcategories();return all.length?Math.round(all.reduce((a,s)=>a+(p[s.name]||0),0)/all.length):0}
function findHerbLeaf(herb){return flattenSubcategories().find(s=>s.herbs.includes(herb))||null}
function allMistakeItems(){const m=getMistakes();return Object.entries(m).map(([herb,count])=>({herb,count,leaf:findHerbLeaf(herb)})).filter(x=>x.leaf).sort((a,b)=>b.count-a.count)}
function ambience(){
  return `<div class="pond-ambience" aria-hidden="true">
    <span class="pond-object lotus o1"></span><span class="pond-object pad o2"></span>
    <span class="pond-object fish o3"></span><span class="pond-object pad o4"></span>
    <span class="pond-object pad o5"></span><span class="pond-object fish o6"></span>
    <span class="pond-bubble" style="width:20px;height:20px;left:18%;top:22%"></span>
    <span class="pond-bubble" style="width:11px;height:11px;right:18%;top:35%"></span>
    <span class="pond-bubble" style="width:28px;height:28px;left:78%;bottom:24%"></span>
  </div>`;
}
function nav(page){
  const items=[['toc','목차'],['memorize','암기'],['color-quiz','색칠퀴즈'],['recall','회상시험'],['review','오답모드'],['records','내 기록']];
  return `${ambience()}<header class="site-header"><nav class="nav"><a class="brand" href="index.html">본초학 익히기</a>${items.map(([id,label])=>`<a class="${page===id?'active':''}" href="${id}.html">${label}</a>`).join('')}</nav></header>`;
}
function mobileNav(){return `<nav class="mobile-nav"><a href="toc.html">목차</a><a href="memorize.html">암기</a><a href="color-quiz.html">색칠</a><a href="recall.html">회상</a><a href="review.html">오답</a><a href="records.html">기록</a></nav>`}
function withAlpha(hex, alpha){
  const h=hex.replace('#',''); const n=parseInt(h.length===3?h.split('').map(x=>x+x).join(''):h,16);
  const r=(n>>16)&255,g=(n>>8)&255,b=n&255; return `rgba(${r},${g},${b},${alpha})`;
}
