# -*- coding: utf-8 -*-
import json, urllib.request, websocket
CDP="http://127.0.0.1:9222"
def targets(): return json.loads(urllib.request.urlopen(CDP+"/json").read().decode())
def pick_figma():
    ps=[t for t in targets() if t.get("type")=="page"]
    for t in ps:
        if "figma.com" in t.get("url",""): return t
    return ps[0] if ps else None
class Tab:
    def __init__(self, ws_url):
        self.ws=websocket.create_connection(ws_url.replace("localhost","127.0.0.1"), timeout=60, suppress_origin=True)
        self._id=0
    def cmd(self, method, params=None, timeout=60):
        self._id+=1; mid=self._id
        self.ws.send(json.dumps({"id":mid,"method":method,"params":params or {}}))
        self.ws.settimeout(timeout)
        while True:
            m=json.loads(self.ws.recv())
            if m.get("id")==mid:
                if "error" in m: raise RuntimeError(m["error"])
                return m.get("result",{})
    def ev(self, expr, timeout=60, awaitp=True):
        r=self.cmd("Runtime.evaluate",{"expression":expr,"returnByValue":True,"awaitPromise":awaitp},timeout=timeout)
        if "exceptionDetails" in r:
            d=r["exceptionDetails"]; return {"__exc": str(d.get("exception",{}).get("description") or d.get("text"))}
        return r.get("result",{}).get("value")
def connect():
    t=pick_figma(); 
    if not t: raise SystemExit("нет figma вкладки")
    tab=Tab(t["webSocketDebuggerUrl"]); tab.cmd("Page.enable"); tab.cmd("Runtime.enable")
    return tab,t
