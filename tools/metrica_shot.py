# -*- coding: utf-8 -*-
import json, urllib.request, websocket, time, base64, sys

OUT = sys.argv[1]
URL = sys.argv[2] if len(sys.argv) > 2 else None
NAME = sys.argv[3] if len(sys.argv) > 3 else "shot"
WAIT = int(sys.argv[4]) if len(sys.argv) > 4 else 12

ts = json.loads(urllib.request.urlopen("http://127.0.0.1:9222/json").read().decode())
turl = None
for t in ts:
    if t.get("type") == "page" and "metrika.yandex.ru" in t.get("url", ""):
        turl = t["webSocketDebuggerUrl"]; break
if not turl:
    print("no tab"); sys.exit(1)
ws = websocket.create_connection(turl.replace("localhost", "127.0.0.1"), timeout=120, suppress_origin=True)
mid = 0
def cmd(method, params=None, to=120):
    global mid; mid += 1; i = mid
    ws.send(json.dumps({"id": i, "method": method, "params": params or {}}))
    ws.settimeout(to)
    while True:
        m = json.loads(ws.recv())
        if m.get("id") == i:
            return m.get("result", {})
cmd("Page.enable")
cmd("Runtime.enable")
try:
    cmd("Emulation.clearDeviceMetricsOverride")
except Exception:
    pass
cmd("Emulation.setDeviceMetricsOverride", {"width":1500,"height":1000,"deviceScaleFactor":1,"mobile":False})
if URL:
    cmd("Page.navigate", {"url": URL})
    time.sleep(WAIT)
r = cmd("Page.captureScreenshot", {"format":"png"})
open(OUT+"/"+NAME+".png","wb").write(base64.b64decode(r["data"]))
print("saved "+NAME)
ws.close()
