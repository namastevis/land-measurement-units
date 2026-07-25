# Contributing

Thanks for helping make this dataset more accurate and complete. Land units in India vary by state and often by district, so local knowledge is genuinely valuable here.

## Ways to contribute

1. **Submit a pull request** (preferred for anyone comfortable with GitHub). Edit `land_units_india.json` directly and open a PR. Please also add a line to `SOURCES.md` citing where your figure comes from — a state land revenue department page, an official gazette, a district administration site, or a textbook/academic source. Real-estate aggregator sites (99acres, Bhumi Calculator, etc.) are fine as a starting point but an official or primary source is stronger.
2. **Use the Google Form** linked from the live site if you're not on GitHub — the maintainers will fold submissions into the dataset.
3. **Open an issue** if you spot a value that looks wrong but you're not sure of the correct one — flagging it is still useful even without a fix in hand.

## What's most needed right now

Several states/UTs currently have no data because no reliably documented distinct traditional unit was found: Meghalaya, Mizoram, Nagaland, Sikkim, Lakshadweep, Andaman & Nicobar Islands, and Dadra & Nagar Haveli and Daman & Diu. If you have local knowledge of land units (or can confirm there genuinely isn't a distinct one) for any of these, that's the highest-value contribution.

A few existing figures are also flagged as uncertain in `SOURCES.md` (Tripura's Dhur, Rajasthan's Biswa figures, HP/Uttarakhand's Bishwa) — corrections with a source are welcome.

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

## License

By contributing, you agree your contribution is released under this project's MIT License.
