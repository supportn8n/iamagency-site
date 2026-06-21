# -*- coding: utf-8 -*-
# Экспорт узла Figma по node-id через браузер (CDP). Возвращает путь к скачанному PNG.
import sys, io, time, glob, os, json, zipfile
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace',line_buffering=True)
from open_tab import WS, http

DL='C:/Users/gromo/Downloads'
def newest_after(t0, patt='*'):
    fs=[f for f in glob.glob(DL+'/'+patt) if os.path.getmtime(f)>t0 and not f.endswith('.crdownload')]
    return sorted(fs,key=os.path.getmtime)

def export(node_id, scale='2x'):
    url=f'https://www.figma.com/design/7FkQtMfKX8eVLRVBJa11kY/IAM-WEB?node-id={node_id.replace(":","-")}'
    ver=http('/json/version'); b=WS(ver['webSocketDebuggerUrl'])
    tgt=b.cmd('Target.createTarget',{'url':url})['targetId']; b.cmd('Target.activateTarget',{'targetId':tgt})
    time.sleep(3)
    page=[t for t in http('/json') if t.get('id')==tgt][0]
    tab=WS(page['webSocketDebuggerUrl']); tab.cmd('Runtime.enable'); tab.cmd('Page.enable'); tab.cmd('Page.bringToFront')
    # ждать загрузку
    for _ in range(12):
        time.sleep(5)
        if tab.ev('!!document.querySelector("canvas")', timeout=15): break
    time.sleep(3)
    # выйти из Dev Mode
    if tab.ev('document.body.innerText.includes("Code & measurements")', timeout=15):
        def key(t,k,c,v,m=0): tab.cmd('Input.dispatchKeyEvent',{'type':t,'key':k,'code':c,'windowsVirtualKeyCode':v,'modifiers':m})
        key('keyDown','Shift','ShiftLeft',16,8); key('keyDown','D','KeyD',68,8); key('keyUp','D','KeyD',68,8); key('keyUp','Shift','ShiftLeft',16,0); time.sleep(2)
    # выбрать узел: пробуем клики по холсту (центр и смещения), пока 1 item selected
    def selcount():
        s=tab.ev('(()=>{const i=[...document.querySelectorAll("input")].find(e=>/item.{0,3}selected/i.test(e.getAttribute("aria-label")||""));return i?i.getAttribute("aria-label"):""})()',timeout=15) or ''
        return s
    rect=tab.ev('(()=>{const c=document.querySelector("canvas");const r=c.getBoundingClientRect();return [r.left,r.top,r.width,r.height]})()',timeout=15)
    cx0=rect[0]+rect[2]/2; cy0=rect[1]+rect[3]/2
    sel=''
    for dx,dy in [(0,0),(-0.2,-0.2),(0.2,0.2),(-0.25,0.1),(0.25,-0.1),(0,-0.25)]:
        x=cx0+dx*rect[2]; y=cy0+dy*rect[3]
        for t in ['mousePressed','mouseReleased']:
            tab.cmd('Input.dispatchMouseEvent',{'type':t,'x':x,'y':y,'button':'left','clickCount':1,'buttons':1 if t=='mousePressed' else 0})
        time.sleep(0.6); sel=selcount()
        if '1 item' in sel: break
    print('selection:', sel)
    if '1 item' not in sel:
        print('НЕ ВЫБРАЛОСЬ', node_id); return None
    # add export + 2x + trigger
    tab.ev('(()=>{const b=[...document.querySelectorAll("button")].find(e=>(e.getAttribute("aria-label")||"").toLowerCase().includes("add export"));if(b)b.click();})()'); time.sleep(1)
    if scale!='1x':
        tab.ev('''(()=>{const inp=[...document.querySelectorAll("input")].find(e=>(e.getAttribute("aria-label")||"").includes("Export constraints"));if(inp){const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set;inp.focus();s.call(inp,"%s");inp.dispatchEvent(new Event("input",{bubbles:true}));inp.dispatchEvent(new Event("change",{bubbles:true}));inp.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",keyCode:13,bubbles:true}));inp.blur();}})()'''%scale); time.sleep(0.5)
    t0=time.time()-2
    trg=tab.ev('JSON.stringify([...document.querySelectorAll("button")].filter(e=>/^Export /.test((e.textContent||"").trim())).map(e=>(e.textContent||"").trim()))')
    print('триггер:', trg)
    tab.ev('(()=>{const b=[...document.querySelectorAll("button")].find(e=>/^Export /.test((e.textContent||"").trim()));if(b)b.click();})()')
    # ждать файл
    for _ in range(20):
        time.sleep(2)
        got=newest_after(t0)
        got=[g for g in got if g.lower().endswith(('.png','.zip'))]
        if got:
            f=got[-1]
            # если zip — распаковать первый png
            if f.lower().endswith('.zip'):
                try:
                    z=zipfile.ZipFile(f); pngs=[n for n in z.namelist() if n.lower().endswith('.png')]
                    if pngs:
                        z.extract(pngs[0], DL+'/_ex'); f=DL+'/_ex/'+pngs[0]
                except Exception as e: print('zip err',e)
            try: b.cmd('Target.closeTarget',{'targetId':tgt})
            except: pass
            return f
    try: b.cmd('Target.closeTarget',{'targetId':tgt})
    except: pass
    return None

if __name__=='__main__':
    nid=sys.argv[1]; scale=sys.argv[2] if len(sys.argv)>2 else '2x'
    f=export(nid, scale)
    print('РЕЗУЛЬТАТ:', f)
    if f:
        from PIL import Image
        im=Image.open(f); print('размер', im.size, im.mode)
