# -*- coding: utf-8 -*-
import json, urllib.request, websocket, time
CDP="http://127.0.0.1:9222"
def http(p): return json.loads(urllib.request.urlopen(CDP+p).read().decode())
def ws_connect(u):
    return websocket.create_connection(u.replace("localhost","127.0.0.1"), timeout=60, suppress_origin=True)
class WS:
    def __init__(s,u): s.ws=ws_connect(u); s._id=0
    def cmd(s,m,p=None,timeout=60):
        s._id+=1; mid=s._id
        s.ws.send(json.dumps({"id":mid,"method":m,"params":p or {}}))
        s.ws.settimeout(timeout)
        while True:
            x=json.loads(s.ws.recv())
            if x.get("id")==mid:
                if "error" in x: raise RuntimeError(x["error"])
                return x.get("result",{})
    def ev(s,expr,timeout=40):
        r=s.cmd("Runtime.evaluate",{"expression":expr,"returnByValue":True,"awaitPromise":True},timeout=timeout)
        if "exceptionDetails" in r: return {"__exc":str(r["exceptionDetails"])[:200]}
        return r.get("result",{}).get("value")

if __name__=="__main__":
    URL="https://www.figma.com/design/7FkQtMfKX8eVLRVBJa11kY/Untitled?node-id=12001-10"
    # browser-level ws
    ver=http("/json/version"); bws=WS(ver["webSocketDebuggerUrl"])
    tgt=bws.cmd("Target.createTarget",{"url":URL})["targetId"]
    print("новый target:", tgt)
    time.sleep(3)
    # найти page ws этого таргета
    page=[t for t in http("/json") if t.get("id")==tgt][0]
    open("tools/_last_target.txt","w").write(page["webSocketDebuggerUrl"]+"\n"+tgt)
    print("ws найден, жду загрузку Figma 35с...")
    tab=WS(page["webSocketDebuggerUrl"]); tab.cmd("Runtime.enable")
    for i in range(7):
        time.sleep(5)
        try:
            ok=tab.ev('!!document.querySelector("canvas")', timeout=15)
            ttl=tab.ev('document.title', timeout=15)
            print(f"  +{(i+1)*5}s canvas={ok} title={str(ttl)[:40]}")
            if ok: break
        except Exception as e: print("  poll err", str(e)[:40])
    print("href:", tab.ev('location.href', timeout=15))
    print("login wall?", tab.ev('location.href.includes("/login")||document.body.innerText.toLowerCase().includes("sign up for free")', timeout=15))
