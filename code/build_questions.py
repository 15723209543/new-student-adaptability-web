from pathlib import Path
import re, json
root = Path(__file__).resolve().parent.parent
files = [root/'doc'/'板块1：学习方面.md', root/'doc'/'板块2：实验室、科研及学科竞赛方面.md', root/'doc'/'板块3：文体活动参与和生活适应及身心状态方面.md']
sections=[]
labels=['学习方面','实验室、科研及学科竞赛方面','文体活动参与和生活适应及身心状态方面']
for sindex, p in enumerate(files):
    contents=p.read_text(encoding='utf-8-sig').replace('\r\n','\n').splitlines()
    questions=[]; current=None
    for raw in contents:
        line=raw.replace('\u200b','').replace('\ufeff','').strip()
        if line.startswith('```') or line.startswith('说明：'):
            break
        m=re.match(r'^(\d+)\.\s*(.*)',line)
        if m:
            if current:questions.append(current)
            num=int(m.group(1))
            body=m.group(2).strip()
            typ='multi' if '【多选】' in body else 'single' if '【单选】' in body else 'text' if '【填空】' in body else ('multi' if (sindex == 0 and num == 3) else 'single')
            body=re.sub(r'【(?:多选|单选|填空)】','',body).strip()
            current={'id':f's{sindex+1}q{num}', 'number':num,'title':body, 'type':typ,'options':[], 'required': num <= 6 if sindex!=2 else num not in (6,15,16)}
            continue
        if current and line and not line.startswith('#'):
            option=line.lstrip('-').strip()
            option=re.sub(r'`([^`]+)`',r'\1',option)
            if option:
                current['options'].append(option)
    if current:questions.append(current)
    assert len(questions)==[7,7,16][sindex],(p,len(questions))
    for i,q in enumerate(questions,1):
        assert q['number']==i,(sindex,i,q)
        if q['type']!='text':
            assert q['options'],q
        else: assert not q['options'],q
        # 2026-10-26 revision: all conditional follow-ups must be filled when visible.
        if sindex==0 and i in (1,2,3,4):
            q['followup']={'when':'not-none','exclusive':['暂无'],'label':'请具体说明遇到的问题（必填）', 'placeholder':'例如：哪部分听不懂、哪道题不会、希望怎样讲解……'}
        if sindex==1 and i in (1,2,3,4,5,6):
            details={1:('请填写当前学习进度（必填）',['未参加']),2:('请填写当前的科研想法（必填）',['否']),3:('请填写当前参与的竞赛（必填）',['否']),4:('请填写感兴趣的方向或想法（必填）',['否']),5:('请具体说明没听懂的问题（必填）',['暂无']),6:('请说明自己在相关项目中的优势（必填）',['不愿意'])}
            label,none=details[i]
            q['followup']={'when':'not-none','exclusive':none,'label':label,'placeholder':'可以简要写下你的进度、想法或需要的帮助……'}
        if sindex==2 and i in (1,2,3,4,13,14):
            follow_labels={1:'请填写目前担任的班级职务（必填）',2:'请填写目前参与的学生组织及职务（必填）',3:'请填写目前参加的体育活动（必填）',4:'请填写目前参加的文体活动（必填）',13:'请说明具体不满意的方面（必填）',14:'请说明具体不满意的方面（必填）'}
            none=['否'] if i<=4 else ['全部非常满意']
            q['followup']={'when':'not-none','exclusive':none,'label':follow_labels[i], 'placeholder':'请根据实际情况补充说明……'}
        if q['type']=='multi':
            exclusive=[x for x in q['options'] if x.startswith('暂无') or x=='未参加']
            if exclusive: q['exclusive']=exclusive
    for q in questions:
        if 'followup' in q: q['followup']['required_when_visible']=True
    sections.append({'id':f's{sindex+1}','name':labels[sindex], 'questions':questions})
assert [len(s['questions']) for s in sections]==[7,7,16]
(root/'code'/'questions.js').write_text('/* 本文件由 code/build_questions.py 根据 doc/ 三份原始 Markdown 生成。 */\nwindow.SURVEY_SECTIONS = '+json.dumps(sections,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
print('questions',sum(len(s['questions']) for s in sections), 'options',sum(len(q['options']) for s in sections for q in s['questions']))
