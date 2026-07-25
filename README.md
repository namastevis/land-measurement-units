# Indian Land Measurement Units Visualisation

A comprehensive, open-source visualisation of traditional land measurement units across India. All values are translated to square feet for clarity and comparability. Explore, compare, and help preserve India's remarkable diversity in land area units.

---

## 🌏 About the Project

India's land measurement traditions encompass dozens of unique units whose meaning and values can vary not only between states, but sometimes even within districts. This project aims to collate, visualise, and inform citizens and researchers about local and regional units, supporting transparency and cultural heritage.

**Key Features:**

- Interactive web dashboard covering all 28 states and 8 union territories.
- Consistent conversion: all units represented in square feet.
- Customisable visualisation: select and compare up to five units at a time.
- States are grouped by region by default (toggle to a plain A–Z list), so units that historically cluster geographically — the Bigha-Biswa belt, the Cent-Ground belt, the Kanal-Marla belt — are easier to spot side by side.
- Unverified/low-confidence figures are visually flagged rather than presented as fact.
- Mobile-friendly and accessible design.
- Community-edited: help us collect missing or hyper-local units!

---

## 📊 Data Sources and Community Contributions

- The database is a collaborative, ongoing effort. If your state, area, or unit isn't represented, or you spot an error, please help us improve!
- **To contribute:** open a pull request, use the Google Form linked on the site, or [drop us a line](mailto:namastevis@amitjena.com) with authoritative details, historical context, or data sources. See [CONTRIBUTING.md](CONTRIBUTING.md) for the details.
- Full citations for every figure, plus notes on what's still uncertain, are in [SOURCES.md](SOURCES.md).
- All data, code, and historical references are available in this GitHub repository for transparency and further research.

### Unverified entries

Some entries in `land_units_india.json` are flagged in `unverified_units.json` — these are the best estimate we could find, but they haven't been confirmed against an official or primary source (a few, like Manipur's historical units, are disputed even across sources). On the site, these render as dashed, lighter bars marked with an asterisk. See [SOURCES.md](SOURCES.md) for exactly which entries and why.

---

## 📜 License

This project is licensed under the MIT License.  
You are free to use, modify, and distribute this codebase and its data with proper attribution.
