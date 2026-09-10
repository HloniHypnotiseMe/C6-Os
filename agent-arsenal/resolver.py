import json, sys
from pathlib import Path

class C6Resolver:
    def __init__(self, empire_root=None):
        self.root = Path(empire_root or Path.home() / "ai-empire")
        self.registry = json.loads((self.root / "registry" / "empire.json").read_text())
        self.providers = self.registry.get("providers", {})

    def resolve(self, capability):
        cap = capability.lower()
        for key, info in self.providers.items():
            if cap in key or cap in info.get("capability","").lower() or cap == key:
                path = self.root / info["path"]
                status = "READY" if path.exists() else "MISSING - run setup-vps.sh"
                return {"capability": capability, "provider": info["repo"], "path": str(path), "info": info, "status": status}
        for repo_dir in (self.root / "repos").iterdir():
            if cap in repo_dir.name.lower():
                return {"capability": capability, "provider": repo_dir.name, "path": str(repo_dir), "status": "READY_FUZZY"}
        return {"capability": capability, "status": "NOT_FOUND"}

    def load(self, capability):
        res = self.resolve(capability)
        if res["status"].startswith("READY"):
            sys.path.insert(0, res["path"])
            sys.path.insert(0, str(self.root))
            prov = res.get("provider","?")
            p = res.get("path","?")
            print(f"C6 RESOLVED: {capability} -> {prov} at {p}")
            return res
        print(f"C6 FAILED: {capability} -> {res}")
        return res

    def list_capabilities(self):
        for k,v in self.providers.items():
            p = self.root / v["path"]
            status = "OK" if p.exists() else "NO"
            repo = v.get("repo","?")
            cap = v.get("capability","?")
            print(f"{status} {k:12} -> {repo:15} ({cap})")

if __name__ == "__main__":
    r = C6Resolver()
    print("=== C6 EMPIRE CAPABILITIES ===")
    r.list_capabilities()
