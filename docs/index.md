# SPS Fullstack Projekt

Vítejte v dokumentaci fullstack aplikace vytvořené jako školní projekt. Tato dokumentace je vytvořená pomocí [VitePress](https://vitepress.dev/), aby působila profesionálně a přehledně.

## Co najdete v dokumentaci

- ✅ Strukturu projektu
- ✅ Popis API
- ✅ Návrh a implementaci databáze

Spuštění dokumentace:

```bash
npm add -D vitepress
npx vitepress init
npm run docs:dev

---

### 🧱 `structure.md`

```markdown
# Struktura projektu

Projekt je rozdělen do několika hlavních složek:

```bash
sps-fullstack/
├── public/         # statické HTML a assets
├── api/            # routování a logika backendu
├── database/       # databázové skripty a připojení
├── server.js       # hlavní serverový soubor
├── package.json    # závislosti a skripty
└── README.md       # základní popis projektu


---

### 🔌 `api.md`

```markdown
# API

Tato část popisuje endpointy dostupné na serveru.

## Přehled

Např.:

- `GET /api/users` – vrací seznam uživatelů
- `POST /api/login` – přihlášení uživatele

Kód se nachází v souborech uvnitř složky `/api`.
