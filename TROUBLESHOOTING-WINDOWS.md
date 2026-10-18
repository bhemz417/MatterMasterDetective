# Windows setup & troubleshooting — Matter Detective 3.1

## Start the right application

This ZIP is **Matter-Detective-Kids-Edition**, with `package.json` name `matter-detective-oer` and Vite **6.x**. It is **not** the separately named `react-example` / Vite 8 project that appeared in an earlier PowerShell error. Do not copy this package.json into a different project.

1. Extract `Matter-Detective-Kids-Edition-v3.1.zip` into its own new folder.
2. Find **`package.json` in the extracted folder**; this is your project root.
3. Double-click **`START-WINDOWS.bat`** and follow the messages. The batch file detects incomplete installations.
4. Open **http://localhost:5173** while the terminal is running.

Or run manually from PowerShell:

```powershell
cd "C:\Projects\Matter-Detective-Kids-Edition"
node --version
npm.cmd install --no-audit --no-fund
npm.cmd run dev
```

Replace the example path with the directory where you extracted the project.

## Error: 'vite' is not recognized

The packages were not installed successfully or your `node_modules` folder is incomplete.

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm.cmd install --no-audit --no-fund
npm.cmd run dev
```

The installation command must finish without an error before you start the app.

## Error: npm ERESOLVE (esbuild 0.25 vs Vite 8)

The error originates from the *other* `react-example` project with a direct `esbuild@^0.25.0` dependency alongside `vite@^8.3.0`. The Vite 8 peer requires newer esbuild. This Matter Detective v3.1 project uses Vite 6 and **does not** declare esbuild directly, avoiding that conflict. Extract v3.1 into a clean folder; do not merge it into the old Vite 8 project.

## npm.ps1 cannot run because script execution is disabled

Use `npm.cmd`, not `npm`, in PowerShell. Do **not** change the execution policy just to run npm.

## `EADDRINUSE` / port already in use

Close other application terminals using port **3001** (API) or **5173** (React). Then restart. Do not run the production server alongside the development server on the same API port.

## Website opens but I only see a blank screen

1. Open the browser Developer Tools (F12) → Console and note any errors.
2. Confirm both the `WEB` and `API` start messages in PowerShell.
3. Run `npm.cmd run check` to test and compile the project.
4. Retry using a new private browser window; if that works, your original browser may have stale cached data.

## Test/production usage

```powershell
npm.cmd run smoke
npm.cmd run check
npm.cmd run build
npm.cmd start
```

After production start, open **http://localhost:3001**.

## Notes about saved progress

Badges, score, and certificate name are stored in local browser storage. Evidence Notebook entries are stored separately in the same browser. A different browser/device will not share progress. Clearing browser site data removes saved information. No cloud account is required.
