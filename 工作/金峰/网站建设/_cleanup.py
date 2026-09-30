# -*- coding: utf-8 -*-
import json, subprocess
DOCID = "https://doc.weixin.qq.com/smartsheet/s3_AMcAuHjyABYCNaUWSsdrZT62Cbtyr_a"
WECOM = r"C:/Users/DC/.workbuddy/binaries/node/cli-connector-packages/wecom-cli.cmd"

# 删除前先记录当前图表清单
def list_charts():
    r = subprocess.run([WECOM, "smartsheet", "charts", "list", "--docid", DOCID, "--sheet-id", "db_L9Phd0"],
                       capture_output=True, text=True, encoding="utf-8", timeout=120)
    j = json.loads(r.stdout)
    return {c['id']: c for c in j.get('charts', [])}

before = list_charts()
print("删除前图表数:", len(before))

# 删除 2 个已弃用任务的 numberCard
payload = {"docid": DOCID, "sheet_title": "进度仪表看板", "charts": [{"id": "dc_UASBZ"}, {"id": "dc_l6okw"}]}
r = subprocess.run([WECOM, "smartsheet", "charts", "delete", "--json", json.dumps(payload, ensure_ascii=False)],
                   capture_output=True, text=True, encoding="utf-8", timeout=120)
print("删除返回 errcode:", json.loads(r.stdout).get("errcode"))

after = list_charts()
print("删除后图表数:", len(after))

# 对比：除了 dc_UASBZ/dc_l6okw 之外，还有没有别的图丢了
lost = [cid for cid in before if cid not in after and cid not in ("dc_UASBZ", "dc_l6okw")]
print("意外丢失的图:", lost if lost else "无（只删了目标 2 张）")
