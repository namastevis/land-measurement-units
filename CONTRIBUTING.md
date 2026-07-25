# Contributing

Thanks for helping make this dataset more accurate and complete. Land units in India vary by state and often by district, so local knowledge is genuinely valuable here.

## Ways to contribute

1. **Submit a pull request** (preferred for anyone comfortable with GitHub). Edit `land_units_india.json` directly and open a PR. Please also add a line to `SOURCES.md` citing where your figure comes from — a state land revenue department page, an official gazette, a district administration site, or a textbook/academic source. Real-estate aggregator sites (99acres, Bhumi Calculator, etc.) are fine as a starting point but an official or primary source is stronger.
2. **Use the Google Form** linked from the live site if you're not on GitHub — the maintainers will fold submissions into the dataset.
3. **Open an issue** if you spot a value that looks wrong but you're not sure of the correct one — flagging it is still useful even without a fix in hand.

## What's most needed right now

Two kinds of gaps, in order of priority:

1. **Confirming `unverified` entries.** Everything listed in `unverified_units.json` (e.g. Manipur's historical units, Jharkhand's Katha, Lakshadweep's Cent) is a best estimate, not a confirmed figure — a source-backed correction here removes the flag and is the highest-value contribution.
2. **Filling genuine gaps.** Meghalaya, Mizoram, Nagaland, Sikkim, Andaman & Nicobar Islands, and Dadra & Nagar Haveli and Daman & Diu have no entry at all because no traditional unit could be confirmed. If you have local knowledge (or can confirm there genuinely isn't a distinct one), that's very welcome too.

See `SOURCES.md` for the full reasoning behind every current entry, sourced or flagged.

## Data format

`land_units_india.json` is a flat object: state/UT name → unit name → value in square feet.

```json
{
  "State Name": {
    "Unit Name": 1234.5
  }
}
```

Keep unit names as they're locally known (e.g. "Bigha Pucca" vs "Bigha Kachha" where a state has both) rather than merging distinct units into one.

`unverified_units.json` is a flat list of `"State.Unit"` strings — anything in there renders as a dashed, flagged bar on the site instead of a normal one. If you're confirming a figure with a solid source, remove its entry from this list as part of your PR (and update the citation in `SOURCES.md`). If you're adding a new figure you're not fully confident in, add both the value to `land_units_india.json` and its key to this list, plus a note in `SOURCES.md` explaining why.

`state_regions.json` maps each state/UT name to one of the seven regions used for the chart's region-grouped view (see SOURCES.md for the methodology). If you add a new state/UT to `land_units_india.json`, add it here too, or it'll show up under an "Other" header on the site rather than its proper zone.

## License

By contributing, you agree your contribution is released under this project's MIT License.
