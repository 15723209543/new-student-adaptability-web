/*
 * 26-3 班大学适应性问卷
 * 纯前端，无数据库、无外部脚本、无联网提交。
 * 从 code/questions.js 读取用户提供的三份 Markdown 所对应题目。
 */
'use strict';
(() => {
  const sections = window.SURVEY_SECTIONS;
  if (!Array.isArray(sections) || sections.length !== 3) {
    document.getElementById('app-content').textContent = '题目文件未正确加载，请确保 main.html 与 code 文件夹在同一级目录。';
    return;
  }
  const title = '智能软件工程学院26-3班新生大学适应性情况收集';
  const app = document.getElementById('app-content');
  const key = 'hfut-26-3-adaptation-v1';
  const fields = [
    {id:'name', title:'姓名', placeholder:'请输入真实姓名', hint:'必填，用于对应个人反馈', inputMode:'text'},
    {id:'studentId', title:'学号', placeholder:'请输入学号（数字）', hint:'仅允许填写数字', inputMode:'numeric'},
    {id:'dorm', title:'宿舍号', placeholder:'例如：5号楼 308', hint:'填写楼栋与房间号', inputMode:'text'}
  ];
  const emptyState = () => ({stage:0, identity:{name:'',studentId:'',dorm:''}, answers:{}});
  let state=emptyState();
  try {
    const s=JSON.parse(sessionStorage.getItem(key)||'null');
    if (s && s.identity && s.answers && Number.isInteger(s.stage) && s.stage>=0 && s.stage<=4) state=s;
  }catch(e){ /* 浏览器限制存储时，直接以内存运行 */ }
  const esc = x => String(x??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const save = () => {try{sessionStorage.setItem(key,JSON.stringify(state))}catch(e){}};
  const answersFor = q => state.answers[q.id]||{};
  const valsFor = q => {const v=answersFor(q).value;return q.type==='multi'?(Array.isArray(v)?v:[]):(typeof v==='string'?v:'');};
  const relevantDetail = q => {
    if(!q.followup) return false;
    const val=valsFor(q);
    if(q.followup.when==='not-none'){
      const chosen=Array.isArray(val)?val:[val];
      return chosen.length>0 && chosen.some(x=>x && !q.followup.exclusive.includes(x));
    }
    if(q.followup.when==='has') return (Array.isArray(val)?val:[val]).some(x=>q.followup.match.includes(x));
    return false;
  };
  const isFilled = q => {
    if (!q.required) return true;
    const v=valsFor(q);
    if (q.type==='multi') return v.length>0;
    if (q.type==='text' && q.id==='s3q5') return /^\d+$/.test(v.trim());
    return !!v.trim();
  };
  const isFollowupFilled = q => String(answersFor(q).detail||'').trim().length>0;
  const stageStat = () => {
    if(state.stage===0){
      const valid=fields.filter(f=>{
        const v=String(state.identity[f.id]||'').trim();
        return f.id==='studentId'?/^\d+$/.test(v):!!v;
      }).length;
      return {required:3, completed:valid};
    }
    if(state.stage>=1 && state.stage<=3){
      const list=sections[state.stage-1].questions.filter(q=>q.required);
      // A conditional description becomes compulsory as soon as its option is selected.
      const visibleFollowups=list.filter(q=>q.followup && relevantDetail(q));
      return {
        required:list.length+visibleFollowups.length,
        completed:list.filter(isFilled).length+visibleFollowups.filter(isFollowupFilled).length
      };
    }
    return {required:0,completed:0};
  };
  const canNext = () => { const {required,completed}=stageStat(); return required===completed; };
  function hero(pageLabel='',thankYou=false){
    return `<section class="panel border-red hero" aria-label="调查问卷标题">
      <div class="kicker">HFUT · CLASS OF 2026 · 26-3</div>
      <h1><span class="art-text">${esc(title)}</span>${pageLabel?`<span class="section-prefix"> · ${esc(pageLabel)}</span>`:''}</h1>
      ${thankYou?'<span class="hero-thanks">感谢你认真完成本次问卷！</span>':'<p>学习成长 · 实践探索 · 校园生活</p>'}
    </section>`;
  }
  function navigation(){
    const stat=stageStat();const complete=stat.required===stat.completed;
    return `<div class="navigation" aria-label="页面导航">
       <div class="validation-status" role="status" id="completion-message"><span class="status-dot ${complete?'complete':''}" aria-hidden="true"></span><span>${complete?'本页必填项已全部完成':`已完成 ${stat.completed} / ${stat.required} 项必填内容`}</span></div>
       <div class="nav-buttons">${state.stage>0?'<button class="btn secondary" id="previous-button" type="button">← 上一页</button>':''}<button class="btn next" id="next-button" type="button" ${complete?'':'disabled'}>${state.stage===3?'完成并查看导出':'下一页'} <span aria-hidden="true">→</span></button></div>
    </div>`;
  }
  function renderIntro(){
    return `${hero()}
     <section class="panel border-blue intro">
       <div class="panel-heading"><span class="heading-icon" aria-hidden="true">✦</span>为什么开展这次问卷？</div>
       <p>为了更好地了解智能软件工程学院26-3班同学近期的课程学习情况、实验室与科研竞赛参与情况、校园文体活动及大学生活适应情况，特开展本次问卷。</p>
       <p class="purpose-lead">本次问卷目的有三个：</p>
       <ol class="purpose-list">
        <li>1-帮助导航员、生涯讲师和班级后续有针对性地组织答疑、经验分享与交流活动。</li>
        <li>2-部分题目将作为实验室后续培训指导依据</li>
        <li>3-了解各位同学的兴趣爱好，更好地开展后续的竞赛、文艺活动</li>
       </ol>
       <p>我们希望通过大家的真实反馈，发现共性问题，希望大家认真填写，我们会对所有填写内容保密。</p>
       <p class="privacy">填写提示：问卷仅在本地运行，不会自动向网络上传信息；请填写完成后按班级要求保存并提交 CSV 或 TXT 文件。</p>
     </section>
     <section class="panel border-green form-panel">
      <div class="section-top"><div><h2>01 / 基本信息</h2><p>请先填写个人信息，三个问题均为必填</p></div><span class="section-pill">必填 3 项</span></div>
      <div class="identity-grid">${fields.map(f=>`<div class="field-item"><label for="identity-${f.id}">${f.title}<span class="required-mark">*</span></label><input id="identity-${f.id}" autocomplete="off" data-field="${f.id}" inputmode="${f.inputMode}" placeholder="${esc(f.placeholder)}" value="${esc(state.identity[f.id]||'')}"><span class="input-hint">${esc(f.hint)}</span></div>`).join('')}</div>
     </section>${navigation()}`;
  }
  const optionBlock=(q,opt,index)=>{
    const v=valsFor(q);
    const checked=Array.isArray(v)?v.includes(opt):v===opt;
    const type=q.type==='multi'?'checkbox':'radio';
    return `<label class="option-item ${checked?'selected':''}" for="choice-${esc(q.id)}-${index}"><input type="${type}" id="choice-${esc(q.id)}-${index}" name="choice-${esc(q.id)}" data-qid="${esc(q.id)}" data-role="option" value="${esc(opt)}" ${checked?'checked':''}><span>${esc(opt)}</span></label>`;
  };
  function renderQuestion(q){
    const a=answersFor(q);
    const isText=q.type==='text';
    const optionalTag=q.required?'<span class="question-meta is-required">必填</span>':'<span class="question-meta">选填</span>';
    const inputHTML=isText?`<textarea class="text-input ${q.id==='s3q5'?'number-input':''}" rows="${q.id==='s3q5'?1:3}" id="${q.id}" data-qid="${q.id}" data-role="answer" ${q.id==='s3q5'?'inputmode="numeric" placeholder="请输入数字，例如：12"':'placeholder="如有需要，请在这里填写……"'}>${esc(a.value||'')}</textarea>`:
       `<div class="options-grid" role="group" aria-label="${esc(q.title)}">${q.options.map((opt,i)=>optionBlock(q,opt,i)).join('')}</div>`;
    let detail='';
    if(q.followup){
      const open=relevantDetail(q);
      detail=`<div class="detail-area is-required ${open?'':'is-hidden'}" data-followup="${q.id}"><label for="detail-${q.id}">${esc(q.followup.label)}<span class="required-mark">*</span></label><textarea class="detail-input" rows="2" data-qid="${q.id}" data-role="detail" id="detail-${q.id}" ${open?'required aria-required="true"':''} placeholder="${esc(q.followup.placeholder)}">${esc(a.detail||'')}</textarea><div class="detail-requirement">选中以上选项后，该补充说明为必填项</div></div>`;
    }
    return `<section class="question-card" id="card-${q.id}"><div class="question-head"><span class="question-number">${String(q.number).padStart(2,'0')}</span><div class="question-title">${esc(q.title)}</div>${optionalTag}</div>${inputHTML}${detail}</section>`;
  }
  function renderSection(){
    const sec=sections[state.stage-1];
    const required=sec.questions.filter(q=>q.required).length;
    return `${hero(`第${state.stage}板块：${sec.name}`)}
    <section class="panel border-green form-panel"><div class="section-top"><div><h2>${esc(sec.name)}</h2><p>按真实情况填写；单选只能选一项，多选至少选一项。出现的补充填空框也必须填写</p></div><span class="section-pill">共 ${sec.questions.length} 题 · 必填 ${required} 题</span></div>
    <div class="questions-stack">${sec.questions.map(renderQuestion).join('')}</div></section>${navigation()}`;
  }
  function renderFinish(){
    const count=sections.reduce((acc,s)=>acc+s.questions.length,0);
    return `${hero('',true)}
      <div class="export-panel" aria-label="结果保存">
       <button class="export-card" id="download-csv" type="button"><span class="export-icon" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9l-6-6H8z"/><path d="M14 3v7h7M7 13h10M7 17h10"/></svg></span><h3>保存为 CSV 文件</h3><p>所有题目横向排列 · 每人一行 · 每题一格</p><span class="export-action">↓ 保存 CSV</span></button>
       <button class="export-card" id="download-txt" type="button"><span class="export-icon" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9l-6-6H8z"/><path d="M8 14h8M8 18h6M14 3v6h6"/></svg></span><h3>保存为 TXT 文件</h3><p>逐题保留原题目与作答 · 阅读方便</p><span class="export-action">↓ 保存 TXT</span></button>
      </div><div class="final-footer"><button class="btn secondary" type="button" id="previous-button">← 返回修改</button><small>本次填写共包含 ${count} 道调查题目；可重复保存不同格式的文件</small></div>`;
  }
  function render(){
    document.getElementById('stage-indicator').textContent=String(state.stage+1).padStart(2,'0')+' / 05';
    document.getElementById('progress-fill').style.width=`${(state.stage+1)*20}%`;
    app.innerHTML=state.stage===0?renderIntro():state.stage===4?renderFinish():renderSection();
    const next=document.getElementById('next-button');if(next)next.addEventListener('click',()=>{if(!canNext())return;state.stage=Math.min(state.stage+1,4);save();render();window.scrollTo(0,0)});
    const prev=document.getElementById('previous-button');if(prev)prev.addEventListener('click',()=>{state.stage=Math.max(state.stage-1,0);save();render();window.scrollTo(0,0)});
    const csv=document.getElementById('download-csv');if(csv)csv.addEventListener('click',()=>exportFile('csv'));
    const txt=document.getElementById('download-txt');if(txt)txt.addEventListener('click',()=>exportFile('txt'));
    updateValidation();
  }
  function updateValidation(){
    if(state.stage===4)return;
    const stat=stageStat(),done=canNext();
    const next=document.getElementById('next-button');if(next)next.disabled=!done;
    const message=document.getElementById('completion-message');
    if(message) message.innerHTML=`<span class="status-dot ${done?'complete':''}" aria-hidden="true"></span><span>${done?'本页必填项已全部完成':`已完成 ${stat.completed} / ${stat.required} 项必填内容`}</span>`;
  }
  function currentQuestions(){return state.stage>=1&&state.stage<=3?sections[state.stage-1].questions:[];}
  function refreshQuestion(q){
    const card=document.getElementById(`card-${q.id}`);
    if(!card)return;
    const val=valsFor(q);
    card.querySelectorAll('input[data-role="option"]').forEach(el=>{
      const checked=Array.isArray(val)?val.includes(el.value):val===el.value;
      el.checked=checked;
      el.closest('label')?.classList.toggle('selected',checked);
    });
    const follow=card.querySelector('[data-followup]');
    if(follow){
      const open=relevantDetail(q);
      follow.classList.toggle('is-hidden',!open);
      const textarea=follow.querySelector('textarea');
      if(textarea){textarea.required=open;textarea.setAttribute('aria-required',String(open));}
    }
  }
  app.addEventListener('input',ev=>{
    const el=ev.target;
    if(el.dataset.field){state.identity[el.dataset.field]=el.value;save();updateValidation();return;}
    const qid=el.dataset.qid;
    if(!qid || el.dataset.role==='option')return;
    const q=currentQuestions().find(x=>x.id===qid);if(!q)return;
    const record=state.answers[qid]||(state.answers[qid]={});
    if(el.dataset.role==='detail')record.detail=el.value;
    if(el.dataset.role==='answer')record.value=el.value;
    save();updateValidation();
  });
  app.addEventListener('change',ev=>{
    const el=ev.target;
    if(el.dataset.role!=='option')return;
    const q=currentQuestions().find(x=>x.id===el.dataset.qid);
    if(!q)return;
    const record=state.answers[q.id]||(state.answers[q.id]={});
    if(q.type==='multi'){
      let selected=Array.isArray(record.value)?record.value.slice():[];
      if(el.checked){
        if((q.exclusive||[]).includes(el.value))selected=[el.value];
        else{selected=selected.filter(v=>!(q.exclusive||[]).includes(v));if(!selected.includes(el.value))selected.push(el.value)}
      } else {selected=selected.filter(v=>v!==el.value)}
      // Keep checkbox value order matching the Markdown choices.
      record.value=q.options.filter(v=>selected.includes(v));
    }else record.value=el.value;
    refreshQuestion(q);save();updateValidation();
  });
  const fmt = q => {
    const a=answersFor(q),v=valsFor(q);
    const choice=Array.isArray(v)?v.join('；'):v;
    const detail=relevantDetail(q)?String(a.detail||'').trim():'';
    // One question = one CSV cell. Newlines are replaced to preserve a single physical row.
    const first=String(choice||'').replace(/\r?\n/g,' / ');
    const second=detail.replace(/\r?\n/g,' / ');
    return second?`（${first}）：（${second}）`:first;
  };
  const allQuestions=()=>sections.flatMap((s,si)=>s.questions.map(q=>({section:si+1,q})));
  function csvCell(value){
    let s=String(value??'').replace(/\r?\n/g,' / ');
    // Prevent a typed cell from being interpreted as a formula by Excel.
    if(/^[=+\-@\t\r]/.test(s))s="'"+s;
    return '"'+s.replace(/"/g,'""')+'"';
  }
  function exportFile(kind){
    if(state.stage!==4)return;
    const all=allQuestions();
    const id=state.identity;
    const headings=['姓名','学号','宿舍号',...all.map(({section,q})=>`第${section}板块·第${q.number}题：${q.title}`)];
    const values=[id.name,id.studentId,id.dorm,...all.map(({q})=>fmt(q))];
    let body, mime;
    if(kind==='csv'){
      body='\uFEFF'+[headings,values].map(row=>row.map(csvCell).join(',')).join('\r\n')+'\r\n';
      mime='text/csv;charset=utf-8';
    }else{
      let output=[title,'','【基本信息】',`姓名：${id.name}`,`学号：${id.studentId}`,`宿舍号：${id.dorm}`];
      for(let si=0;si<sections.length;si++){
        output.push('','【第'+(si+1)+'板块：'+sections[si].name+'】');
        for(const q of sections[si].questions){output.push('',`${q.number}. ${q.title}`,`作答：${fmt(q)||'（未填写）'}`)}
      }
      body='\uFEFF'+output.join('\r\n')+'\r\n';
      mime='text/plain;charset=utf-8';
    }
    const safe=x=>String(x).trim().replace(/[\\/:*?"<>|\s]+/g,'_').slice(0,35)||'未命名';
    const name=`26-3班_适应性问卷_${safe(id.name)}_${safe(id.studentId)}.${kind}`;
    const obj=new Blob([body],{type:mime});const url=URL.createObjectURL(obj);const a=document.createElement('a');
    a.href=url;a.download=name;a.style.display='none';document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),30000);
  }
  // The optional local Go server can stop automatically after browser inactivity.
  if(location.protocol==='http:'&&location.hostname==='127.0.0.1'){
    const ping=()=>fetch('/__ping',{cache:'no-store'}).catch(()=>{});
    ping();setInterval(ping,45_000);
  }
  render();
})();
