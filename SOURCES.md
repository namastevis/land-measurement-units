# Data Sources & Notes

This file documents where each figure in `land_units_india.json` came from and flags anything that's still uncertain. It also explains why some states/UTs are intentionally left empty rather than filled with guessed numbers.

The dataset now covers all 36 states and union territories (28 states + 8 UTs). Six were missing entirely before this update: **Chhattisgarh, Maharashtra, Manipur, Telangana, Andaman & Nicobar Islands, and Dadra & Nagar Haveli and Daman & Diu.**

## Corrections to existing data

| State | Old value | New value | Why |
|---|---|---|---|
| Bihar | `Biswa: 436`, `Biswa Pucca: 1365` | `Katha: 1361.25`, `Dhur: 68.06` | Bihar doesn't traditionally use "Biswa" — its subunits are Katha (1/20 Bigha) and Dhur (1/20 Katha). The old `Biswa: 436` figure doesn't match any documented Bihar unit; it looks like it was accidentally copied from the Himachal/Uttarakhand Biswa value. Renamed to the terms actually used in Bihar land records (Katha, Dhur), values derived from Bigha Pucca (27,225 sq ft) ÷ 20 ÷ 20. [Civil Sir – Dhur to sq ft in Bihar](https://civilsir.com/1-dhur-is-equal-to-square-feet-in-bihar/), [Civil Sir – Katha to sq ft in Bihar](https://civilsir.com/1-katha-sq-ft-in-bihar/)
| Himachal Pradesh | `Biswa: 436` | `Biswa: 435.6` | Precision fix — HP's Bigha (8,712 sq ft) ÷ 20 Biswa = exactly 435.6, not 436. [Bhumi Calculator – Himachal Pradesh](https://bhumicalculator.com/states/himachal-pradesh/)
| Uttarakhand | `Biswa: 436` | `Biswa: 435.6` | Same fix as HP — Uttarakhand shares HP's Bigha/Biswa system. |
| West Bengal | `Decimal: 436` | `Decimal: 435.6` | A Decimal is defined as 1/100 acre = 435.6 sq ft exactly. [Bajaj Finserv – Land measurement in West Bengal](https://www.bajajfinserv.in/land-measurement-in-west-bengal)

## Newly filled states/UTs

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
| Manipur | Pari ≈107639 | Historical unit, **approximate and effectively obsolete since mid-20th-century metrication**. Wikipedia describes 1 Pari as "approximately 1 hectare" (not exact), so the figure carries more uncertainty than everything else in the dataset. Included as a cultural/historical reference rather than a precise modern conversion. Subunits (Lourak, Sangam, Loukhai, Loushal, Tong) exist but conflicting sources gave inconsistent values, so they were left out rather than guessed. [Wikipedia – Pari (unit)](https://en.wikipedia.org/wiki/Pari_(unit)), [Wikipedia – Sana lamjel](https://en.wikipedia.org/wiki/Sana_lamjel) |
| Odisha | Guntha 1089, Decimal 435.6 | [Bhumi Calculator – Odisha](https://bhumicalculator.com/states/odisha/) |
| Puducherry | Cent 435.6, Ground 2400, Kuzhi 144, Kani 57600 | Kani = 400 Kuzhi. [Bhumi Calculator – Puducherry](https://bhumicalculator.com/states/puducherry/) |
| Tamil Nadu | added Kuzhi 144 | [Verified.RealEstate – TN land measurement units](https://community.verified.realestate/article/land-measurement-units-in-tamil-nadu-ground-cent-acre-hectare-kuzhi-ma-veli-and-official-record-conversions-explained/) |
| Telangana | Ankanam 72, Guntha 1089, Kuncham 4356, Cent 435.6 | Same base units as Andhra Pradesh (Telangana was part of AP until 2014). Note: one source quoted Kuncham as "484 sq ft," but cross-checking showed that figure is actually 484 *Gajam* (square yards) — 484 × 9 = 4,356 sq ft, matching AP's existing figure. [areaconvert.com – Kuncham in Andhra Pradesh](https://www.areaconvert.com/2019/11/kuncham-to-square-feet-kuncham-to.html) |
| Jharkhand | added Decimal 435.6 | Standard eastern-India Decimal, in addition to the existing Dhur figure. Katha was deliberately not added — sources give wildly different values across Jharkhand districts (720 to 2,535 sq ft), so no single number could be cited reliably. [ranchiportal.com – Jharkhand land units](https://ranchiportal.com/jharkhand-land-unit-converter-kattha-to-sqft/) |

## Left empty on purpose

These states/UTs were researched but no reliably documented, distinct traditional unit could be found — official land records for all of them use only metric units (Acre/Hectare/Are/Square Metre). Rather than invent numbers, they're left as empty entries so the gap is visible and someone with local knowledge can fill it in:

- **Arunachal Pradesh** — Bigha (14,400 sq ft) is used informally in some border areas, borrowed from Assam, but is not an Arunachal-specific or officially standardized unit.
- **Meghalaya, Mizoram, Nagaland** — land in much of the Northeast is held under customary/community (clan or village) tenure rather than measured in standardized area units historically.
- **Sikkim** — no distinct traditional unit found; land records use Acre/Hectare.
- **Lakshadweep** — administratively close to Kerala, may informally use Cent, but this isn't confirmed by an authoritative source.
- **Andaman and Nicobar Islands** — official records (Form F) use Acre/Hectare/Are/Square Metre only.
- **Dadra and Nagar Haveli and Daman and Diu** — no distinct unit found; small UT, likely follows neighboring Gujarat/Maharashtra informally but nothing confirmed.

## Still worth double-checking

- **Rajasthan** (`Biswa: 960`, `Biswa Pucca: 1365`) — Rajasthan's Bigha is famously inconsistent between districts (Kachha vs Pucca variants differ by region), so these figures are plausible but not verified against a single authoritative source the way most other entries are.
- **Tripura** (`Dhur: 3.6`) — this figure was already in the dataset before this update and could not be independently confirmed. 3.6 sq ft is unusually small for a Dhur (compare Bihar's 68 sq ft); worth checking against a Tripura-specific land revenue source if anyone has access to one.
- **Himachal Pradesh / Uttarakhand** (`Bishwa: 45`) — also pre-existing and unverified; possibly a smaller local subunit distinct from "Biswa," but no source was found confirming the exact value.

## General sources used throughout

[Bhumi Calculator (state-by-state)](https://bhumicalculator.com/), [Bajaj Finserv land measurement guides](https://www.bajajfinserv.in/), [Civil Sir](https://civilsir.com/), [Wikipedia – Bigha](https://en.wikipedia.org/wiki/Bigha), [Wikipedia – Katha (unit)](https://en.wikipedia.org/wiki/Katha_(unit)), [Wikipedia – Marla](https://en.wikipedia.org/wiki/Marla_(unit)), [Wikipedia – Gunta](https://en.wikipedia.org/wiki/Gunta).

Land units in India are inherently regional and often vary by district, not just state — treat every figure here as a reasonable reference point, not a legal or survey-grade conversion.
