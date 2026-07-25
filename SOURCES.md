# Data Sources & Notes

This file documents where each figure in `land_units_india.json` came from and flags anything that's still uncertain. It also explains why a few states/UTs are intentionally left empty rather than filled with guessed numbers.

The dataset now covers all 36 states and union territories (28 states + 8 UTs). Six were missing entirely before this update: **Chhattisgarh, Maharashtra, Manipur, Telangana, Andaman & Nicobar Islands, and Dadra & Nagar Haveli and Daman & Diu.**

## How "unverified" works

Rather than leave a gap wherever the data is uncertain, `land_units_india.json` includes the best available figure for anything a source at least suggested — and `unverified_units.json` lists exactly which `State.Unit` entries that applies to. On the site, those entries render as a dashed, lighter bar with an asterisk on the label, and a hover tooltip pointing back here. The goal is to make gaps visibly correctable rather than silently missing or silently authoritative — if you can confirm or correct one of these, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Corrections to existing data

| State | Old value | New value | Why |
|---|---|---|---|
| Bihar | `Biswa: 436`, `Biswa Pucca: 1365` | `Katha: 1361.25`, `Dhur: 68.06` | Bihar doesn't traditionally use "Biswa" — its subunits are Katha (1/20 Bigha) and Dhur (1/20 Katha). The old `Biswa: 436` figure doesn't match any documented Bihar unit; it looks like it was accidentally copied from the Himachal/Uttarakhand Biswa value. Renamed to the terms actually used in Bihar land records (Katha, Dhur), values derived from Bigha Pucca (27,225 sq ft) ÷ 20 ÷ 20. [Civil Sir – Dhur to sq ft in Bihar](https://civilsir.com/1-dhur-is-equal-to-square-feet-in-bihar/), [Civil Sir – Katha to sq ft in Bihar](https://civilsir.com/1-katha-sq-ft-in-bihar/)
| Himachal Pradesh | `Biswa: 436` | `Biswa: 435.6` | Precision fix — HP's Bigha (8,712 sq ft) ÷ 20 Biswa = exactly 435.6, not 436. [Bhumi Calculator – Himachal Pradesh](https://bhumicalculator.com/states/himachal-pradesh/)
| Uttarakhand | `Biswa: 436` | `Biswa: 435.6` | Same fix as HP — Uttarakhand shares HP's Bigha/Biswa system. |
| West Bengal | `Decimal: 436` | `Decimal: 435.6` | A Decimal is defined as 1/100 acre = 435.6 sq ft exactly. [Bajaj Finserv – Land measurement in West Bengal](https://www.bajajfinserv.in/land-measurement-in-west-bengal)

## Newly filled states/UTs — sourced, not flagged unverified

| State/UT | Units added | Source |
|---|---|---|
| Chandigarh | Kanal 5445, Marla 272.25 | [Bhumi Calculator – Chandigarh](https://bhumicalculator.com/states/chandigarh/) |
| Chhattisgarh | Bigha 27225 | [Godrej Properties – land measurement guide](https://www.godrejproperties.com/blog/list-of-land-measurement-units-in-india) (1 bigha ≈ 2,529 sq m ≈ 27,225 sq ft, same as the standard Pucca Bigha used in UP/Bihar/Punjab) |
| Delhi | Bigha 27225, Biswa 450 | [Bhumi Calculator – Delhi](https://bhumicalculator.com/states/delhi/) |
| Goa | Guntha 1089, Are 1076.39 | Goa uses Guntha regionally (same as Maharashtra/Karnataka) plus the metric Are (100 sq m) used in Portuguese-era survey records. No distinct indigenous Goan unit was found. |
| Gujarat | added Guntha 1089 | Guntha is used alongside Bigha in parts of Gujarat. [Bajaj Finserv – Guntha to acre](https://www.bajajfinserv.in/guntha-to-acre) |
| Jammu and Kashmir | Kanal 5445, Marla 272.25 | [Bhumi Calculator – J&K](https://bhumicalculator.com/states/jammu-kashmir/), [Wikipedia – Marla](https://en.wikipedia.org/wiki/Marla_(unit)) |
| Ladakh | Kanal 5445, Marla 272.25 | Same Kanal/Marla system as J&K, still in use post-2019 UT split. [areaconvert.com – Kanal/Marla in J&K and Ladakh](https://www.areaconvert.com/2019/08/kanaal-to-square-feet-in-jammu-kashmir.html) |
| Maharashtra | Guntha 1089, Are 1076.39 | [Bhumicalculator – Maharashtra](https://bhumicalculator.com/states/maharashtra/) |
| Odisha | Guntha 1089, Decimal 435.6 | [Bhumi Calculator – Odisha](https://bhumicalculator.com/states/odisha/) |
| Puducherry | Cent 435.6, Ground 2400, Kuzhi 144, Kani 57600 | Kani = 400 Kuzhi. [Bhumi Calculator – Puducherry](https://bhumicalculator.com/states/puducherry/) |
| Tamil Nadu | added Kuzhi 144 | [Verified.RealEstate – TN land measurement units](https://community.verified.realestate/article/land-measurement-units-in-tamil-nadu-ground-cent-acre-hectare-kuzhi-ma-veli-and-official-record-conversions-explained/) |
| Telangana | Ankanam 72, Guntha 1089, Kuncham 4356, Cent 435.6 | Same base units as Andhra Pradesh (Telangana was part of AP until 2014). Note: one source quoted Kuncham as "484 sq ft," but cross-checking showed that figure is actually 484 *Gajam* (square yards) — 484 × 9 = 4,356 sq ft, matching AP's existing figure. [areaconvert.com – Kuncham in Andhra Pradesh](https://www.areaconvert.com/2019/11/kuncham-to-square-feet-kuncham-to.html) |
| Jharkhand | added Decimal 435.6 | Standard eastern-India Decimal, in addition to the existing Dhur figure. |

## Flagged `unverified` — best estimate, not independently confirmed

These entries have a real source behind them, but not one strong or consistent enough to present as settled fact. They're included in `land_units_india.json` (so the gap doesn't just look empty) but listed in `unverified_units.json`, which renders them as dashed bars on the site.

| State/UT | Unit(s) | Value(s) | Why it's flagged |
|---|---|---|---|
| Arunachal Pradesh | Bigha | 14400 | Used informally in some border areas, borrowed from Assam usage — not an Arunachal-specific or officially standardized unit. |
| Assam | Lecha | 144 | Pre-existing figure; the related "Lessa" unit has a Wikipedia note saying its conversion "is still debated to this day." Kept the original value but flagged it given that ambiguity. |
| Jharkhand | Katha | 720 | Sources give wildly different values across Jharkhand districts (720–2,535 sq ft). 720 is the commonly-cited Ranchi figure, used as a representative estimate — not a statewide standard. [ranchiportal.com – Jharkhand land units](https://ranchiportal.com/jharkhand-land-unit-converter-kattha-to-sqft/) |
| Lakshadweep | Cent | 435.6 | Administratively close to Kerala, which uses Cent, but no authoritative source confirms Lakshadweep itself uses it. |
| Manipur | Pari, Lourak, Sangam, Loukhai, Loushal | 107639, 53820, 26910, 13455, 6727 | Historical unit system, effectively obsolete since mid-20th-century metrication. Wikipedia describes 1 Pari as only "approximately" 1 hectare, and other sources gave inconsistent values for the subunits — the figures above are derived proportionally from the Pari≈hectare approximation (Pari ÷ 2, ÷ 4, ÷ 8, ÷ 16) rather than independently confirmed. [Wikipedia – Pari (unit)](https://en.wikipedia.org/wiki/Pari_(unit)), [Wikipedia – Sana lamjel](https://en.wikipedia.org/wiki/Sana_lamjel) |
| Rajasthan | Biswa, Biswa Pucca | 960, 1365 | Pre-existing figures. Rajasthan's Bigha is notoriously inconsistent between districts (Kachha vs Pucca variants differ by region), so these are plausible but not verified against one authoritative source. |
| Tripura | Dhur | 3.6 | Pre-existing figure, could not be independently confirmed. 3.6 sq ft is unusually small for a Dhur (compare Bihar's 68 sq ft). |
| Himachal Pradesh / Uttarakhand | Bishwa | 45 | Pre-existing figures; possibly a smaller local subunit distinct from "Biswa," but no source confirms the exact value. |

## Left empty on purpose

For these, no traditional numeric unit appears to exist at all — not just "unconfirmed," but genuinely not applicable, since official land records use only metric units (Acre/Hectare/Are/Square Metre) and, for the Northeast especially, land has historically been held under customary/community tenure rather than measured this way. Forcing a number in here would misrepresent the land tenure system itself, so these stay empty:

- **Meghalaya, Mizoram, Nagaland** — customary/community (clan or village) land tenure, not standardized area units.
- **Sikkim** — no distinct traditional unit found; land records use Acre/Hectare.
- **Andaman and Nicobar Islands** — official records (Form F) use Acre/Hectare/Are/Square Metre only.
- **Dadra and Nagar Haveli and Daman and Diu** — no distinct unit found; small UT, likely follows neighboring Gujarat/Maharashtra informally but nothing confirmed.

## General sources used throughout

[Bhumi Calculator (state-by-state)](https://bhumicalculator.com/), [Bajaj Finserv land measurement guides](https://www.bajajfinserv.in/), [Civil Sir](https://civilsir.com/), [Wikipedia – Bigha](https://en.wikipedia.org/wiki/Bigha), [Wikipedia – Katha (unit)](https://en.wikipedia.org/wiki/Katha_(unit)), [Wikipedia – Marla](https://en.wikipedia.org/wiki/Marla_(unit)), [Wikipedia – Gunta](https://en.wikipedia.org/wiki/Gunta).

Land units in India are inherently regional and often vary by district, not just state — treat every figure here as a reasonable reference point, not a legal or survey-grade conversion.
