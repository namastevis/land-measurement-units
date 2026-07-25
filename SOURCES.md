# Data Sources & Notes

This file documents where each figure in `land_units_india.json` came from and flags anything that's still uncertain. It also explains why a few states/UTs are intentionally left empty rather than filled with guessed numbers.

The dataset now covers all 36 states and union territories (28 states + 8 UTs). Six were missing entirely before this update: **Chhattisgarh, Maharashtra, Manipur, Telangana, Andaman & Nicobar Islands, and Dadra & Nagar Haveli and Daman & Diu.**

## How "unverified" works

Rather than leave a gap wherever the data is uncertain, `land_units_india.json` includes the best available figure for anything a source at least suggested — and `unverified_units.json` lists exactly which `State.Unit` entries that applies to. On the site, those entries render as a dashed, lighter bar with an asterisk on the label, and a hover tooltip pointing back here. The goal is to make gaps visibly correctable rather than silently missing or silently authoritative — if you can confirm or correct one of these, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Primary-source verification pass

A second research pass went beyond real-estate aggregator sites to check actual government sources where they exist: state Land Revenue Acts (via indiacode.nic.in), official department circulars, and a government-commissioned evaluation study. Findings below; this section supersedes anything the same states say further down that was written before this pass.

**Tripura — full unit hierarchy confirmed.** India Code hosts an official Tripura government circular titled *"Unit of Land Measurement in Tripura"* (upload.indiacode.nic.in, filename `uom_land_trp.pdf`) that gives the complete local-unit ladder directly: 1 Dhur = 3.6 sq ft, 20 Dhur = 1 Kranta (72 sq ft), 3 Kranta = 1 Kara (216 sq ft), 4 Kara = 1 Ganda (864 sq ft), 20 Ganda = 1 Kani (17,280 sq ft), 16 Kani = 1 Drone (2,76,480 sq ft). This is about as authoritative as it gets, so Dhur is no longer flagged unverified, and Kranta/Kara/Ganda/Kani/Drone have been added as fully sourced. [Unit of Land Measurement in Tripura — India Code](https://upload.indiacode.nic.in/showfile?actid=AC_TR_87_1283_00001_00001_1593504604426&type=circular&filename=uom_land_trp.pdf)

**Assam — added Kani.** Multiple independent sources (Bajaj Finserv, areaconvert.com, Dwello, 99acres) converge on 1 Kani = 5 Bigha = 72,000 sq ft, which is also internally consistent with the existing Bigha figure (14,400 × 5 = 72,000 exactly). Added as sourced. Lecha remains flagged: the same sources consistently give 144 sq ft, but Wikipedia's note that the related "Lessa" unit's conversion "is still debated to this day" is specific enough that it's kept flagged rather than cleared — worth a closer look if anyone has a primary Assam source.

**Sikkim — stronger confirmation it's genuinely metric-only.** Sikkim's own Land Revenue & Disaster Management Department runs a live Revenue Calculator (ilrms.sikkim.gov.in) for property transactions, and its only area input field is "Area being sold in hectare." That's about as direct as evidence gets that Sikkim's official system has no local unit in current use. [ILRMS Revenue Calculator — Government of Sikkim](https://ilrms.sikkim.gov.in/RevenueCalculator.aspx)

**Meghalaya, Mizoram, Nagaland, Arunachal Pradesh — corroborated by a government evaluation study.** The Indian Institute of Public Administration's *"Evaluation Study on the Quality of Land Records in North East India"* (hosted on s3waas.gov.in, a government cloud domain) reports landholding sizes exclusively in hectares throughout its Meghalaya, Nagaland, Mizoram and Arunachal Pradesh sections, and explicitly describes land in these states as governed by customary/clan/village tenure under the Sixth Schedule rather than measured in standardized units. This matches and strengthens the earlier "left empty" reasoning. [Evaluation Study on Quality of Land Records in NE India — s3waas.gov.in](https://cdnbbsr.s3waas.gov.in/s3d69116f8b0140cdeb1f99a4d5096ffe4/uploads/2025/08/20250811312044441.pdf)

**Andaman & Nicobar Islands — named the actual regulation.** The governing law is the *Andaman and Nicobar Islands Land Revenue and Land Reforms Regulation, 1966* and its 1968 Rules; Form F records under it use Hectare/Are/Square Metre only, no local unit. [The A&N Islands Land Revenue and Land Reforms Rules, 1968 — India Code](https://upload.indiacode.nic.in/showfile?actid=AC_AN_91_1361_00003_00003_1615402237856&type=rule&filename=1_9_6_8.pdf)

**Dadra & Nagar Haveli and Daman & Diu — named the actual regulations, still no distinct unit.** Two separate legal histories apply here: Dadra & Nagar Haveli is governed by the *Dadra and Nagar Haveli Land Reforms Regulation, 1971* (which deals in Portuguese-era "Alwara" leases but no numeric local unit could be found); Daman & Diu falls under the *Goa, Daman and Diu Land Revenue Code, 1968* — the same metric-only (hectare-based) code Goa uses. No distinct traditional unit surfaced for either half of the UT.

**Rajasthan / Gujarat Bigha corrected: 17216 → 17424.** Multiple independent sources describe the standard "Kachha Bigha" (based on a 132-foot measuring rod, historically associated with Jodhpur state) as exactly 132 × 132 = 17,424 sq ft — a cleaner, better-attested figure than the dataset's previous 17,216. Note for transparency: I fetched the actual Rajasthan Land Revenue Act, 1956 text directly and it does **not** numerically define Bigha or Biswa anywhere in it — like most of these Acts, it sets up administrative machinery (settlement operations, revenue courts) rather than enumerating local unit conversions, which historically lived in district-level Settlement Reports instead. So this correction rests on converging secondary sources plus clean, verifiable arithmetic (132×132), not a located primary-law citation — flagged here for full honesty even though it isn't in `unverified_units.json` (confidence is still reasonably high). [Bigha — Grokipedia](https://grokipedia.com/page/Bigha), [Rajasthan Land Revenue Act, 1956 — India Code](https://www.indiacode.nic.in/bitstream/123456789/18761/1/the_rajasthan_land_revenue_act._1956.pdf) (fetched directly, confirms the Act itself has no unit schedule)

**Manipur — conflicting figures found, not adopted.** A second pass turned up a generic unit-converter site giving Pari = 108,900 sq ft and Sangam = 27,225 sq ft directly (rather than derived from the Pari≈hectare approximation). That Sangam figure is suspicious: 27,225 is exactly the common north-Indian "Pucca Bigha" value that appears everywhere else in this dataset, which reads more like a generic/reused number than a Manipur-specific one, and the site itself isn't an authoritative source. Kept the existing hectare-derived figures rather than switch to a less-principled and internally-suspicious alternative.

**Bihar — an even smaller subunit exists but wasn't added.** Some sources mention a "Dhurki" (≈3.4 sq ft, 1/20 of a Dhur) as an official sub-subunit in parts of Bihar. Left out for now to avoid cluttering the unit list with increasingly obscure subdivisions — flagging here in case it's worth adding later.

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
| Rajasthan | Biswa, Biswa Pucca | 960, 1365 | Pre-existing figures. Rajasthan's Bigha is notoriously inconsistent between districts (Kachha vs Pucca variants differ by region), so these are plausible but not verified against one authoritative source. (Rajasthan's main Bigha figure was corrected in the primary-source pass above — see there.) |
| Himachal Pradesh / Uttarakhand | Bishwa | 45 | Pre-existing figures; possibly a smaller local subunit distinct from "Biswa," but no source confirms the exact value. |

Tripura's Dhur was previously listed here but has since been confirmed by an official government circular — see the primary-source verification section above.

## Left empty on purpose

For these, no traditional numeric unit appears to exist at all — not just "unconfirmed," but genuinely not applicable, since official land records use only metric units (Acre/Hectare/Are/Square Metre) and, for the Northeast especially, land has historically been held under customary/community tenure rather than measured this way. Forcing a number in here would misrepresent the land tenure system itself, so these stay empty. See the primary-source verification section above for the specific government sources behind each of these (Sikkim's official revenue calculator, the government NE land records study, and the named regulations for A&N and DNH&DD):

- **Meghalaya, Mizoram, Nagaland** — customary/community (clan or village) land tenure, not standardized area units.
- **Sikkim** — no distinct traditional unit found; land records use Acre/Hectare.
- **Andaman and Nicobar Islands** — official records (Form F) use Acre/Hectare/Are/Square Metre only.
- **Dadra and Nagar Haveli and Daman and Diu** — no distinct unit found; small UT, likely follows neighboring Gujarat/Maharashtra informally but nothing confirmed.

## General sources used throughout

[Bhumi Calculator (state-by-state)](https://bhumicalculator.com/), [Bajaj Finserv land measurement guides](https://www.bajajfinserv.in/), [Civil Sir](https://civilsir.com/), [Wikipedia – Bigha](https://en.wikipedia.org/wiki/Bigha), [Wikipedia – Katha (unit)](https://en.wikipedia.org/wiki/Katha_(unit)), [Wikipedia – Marla](https://en.wikipedia.org/wiki/Marla_(unit)), [Wikipedia – Gunta](https://en.wikipedia.org/wiki/Gunta).

Land units in India are inherently regional and often vary by district, not just state — treat every figure here as a reasonable reference point, not a legal or survey-grade conversion.
