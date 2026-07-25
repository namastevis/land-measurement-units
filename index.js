function formatIndian(num) {
  const s = num.toString();
  const afterPoint = s.indexOf('.') > 0 ? s.slice(s.indexOf('.')) : '';
  let n = s.replace(afterPoint, '');
  const lastThree = n.slice(-3);
  const other = n.slice(0, -3);
  if (other !== '') n = other.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  else n = lastThree;
  return n + afterPoint;
}

// Full names are kept everywhere for data lookups and accessibility;
// only the on-chart label is shortened, since a few UT names are far
// longer than the state-label column can ever comfortably hold.
const stateDisplayNames = {
  "Andaman and Nicobar Islands": "Andaman & Nicobar",
  "Dadra and Nagar Haveli and Daman and Diu": "DNH & Daman-Diu",
};

Promise.all([
  d3.json("land_units_india.json"),
  d3.json("unverified_units.json")
]).then(([landData, unverifiedData]) => {
  const unverifiedSet = new Set((unverifiedData && unverifiedData.unverified) || []);
  const states = Object.keys(landData).sort();

  const allUnitsSet = new Set();
  for (const state of states) {
    for (const unit of Object.keys(landData[state])) {
      allUnitsSet.add(unit);
    }
  }
  const allUnits = Array.from(allUnitsSet).sort();

  // Mobile-first: start at 2 units on small phones and step up as there's
  // room, in step with the CSS breakpoints (550 / 850) rather than one
  // hard jump that leaves mid-size screens over- or under-restricted.
  function getMaxUnits() {
    const w = window.innerWidth;
    if (w < 550) return 2;
    if (w < 850) return 3;
    return 5;
  }

  let selectedUnits = ["Bigha"];
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const unitsDiv = d3.select("#units");
  const alertDiv = document.getElementById('unit-alert');

  function renderUnitButtons() {
    unitsDiv.selectAll("button")
      .data(allUnits)
      .join("button")
      .attr("class", d =>
        selectedUnits.includes(d) ? "unit-btn selected" : "unit-btn"
      )
      .attr("data-unit", d => d)
      .style("background-color", d =>
        selectedUnits.includes(d) ? color(d) : "#f0f0f0"
      )
      .style("border-color", d =>
        selectedUnits.includes(d) ? color(d) : "#888"
      )
      .text(d => d)
      .style("font-size", "0.88em")
      .on("click", function (event, d) {
        const maxUnits = getMaxUnits();
        if (!selectedUnits.includes(d) && selectedUnits.length >= maxUnits) {
          alertDiv.textContent = `Maximum ${maxUnits} units allowed. Unselect a unit to select another.`;
          setTimeout(() => { alertDiv.textContent = ''; }, 2200);
          return;
        }
        if (selectedUnits.includes(d)) {
          if (selectedUnits.length === 1) return;
          selectedUnits = selectedUnits.filter(u => u !== d);
        } else {
          selectedUnits.push(d);
        }
        alertDiv.textContent = '';
        renderUnitButtons();
        updateChart();
      });
  }

  function updateChart() {
    const container = document.querySelector('.svg-container') || document.body;
    const chartW = Math.max(container.clientWidth || 780, 320);

    // Label column and gaps shrink in steps as the screen narrows, so a
    // phone doesn't spend half its width on text before a single bar starts.
    const stateLabelWidth = chartW < 420 ? 92 : chartW < 700 ? 112 : 136;
    const spacer = chartW < 420 ? 10 : chartW < 700 ? 20 : 32;
    const barGap = chartW < 420 ? 4 : 6;
    const margin = {
      top: 10,
      right: 16,
      bottom: 25,
      left: stateLabelWidth + spacer
    };
    const barAreaWidth = chartW - margin.left - margin.right;
    // Size bars off how many are actually shown, not a fixed count — a phone
    // showing 2 units should get 2 wide bars, not 2 slivers cut for 5.
    const barCount = Math.max(1, selectedUnits.length);
    const widthPerBar = Math.max(46, (barAreaWidth - (barCount - 1) * barGap) / barCount);
    const barHeight = 16;
    const svg = d3.select("#chart")
      .attr("width", chartW)
      .attr("height", states.length * barHeight + margin.top + margin.bottom);

    svg.selectAll("*").remove();

    const data = states.map((state) => {
      const vals = selectedUnits.map((unit) => ({
        unit,
        value: landData[state][unit] !== undefined ? landData[state][unit] : null,
        present: landData[state][unit] !== undefined,
        unverified: unverifiedSet.has(`${state}.${unit}`),
      }));
      return {
        state,
        values: vals,
        isEmptyState: Object.keys(landData[state]).length === 0,
      };
    });

    let globalMax = 0;
    selectedUnits.forEach((unit) => {
      globalMax = Math.max(
        globalMax,
        d3.max(data, d =>
          (d.values.find(v => v.unit === unit) || {}).value || 0
        )
      );
    });

    const xScale = d3.scaleLinear()
      .domain([0, globalMax || 1])
      .range([0, widthPerBar]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.state))
      .range([margin.top, svg.attr("height") - margin.bottom])
      .padding(0.15);

    const stateLabelSel = svg.selectAll(".state-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", d => "state-label" + (d.isEmptyState ? " empty-state" : ""))
      .attr("x", stateLabelWidth + 16)
      .attr("y", d => y(d.state) + y.bandwidth() / 2)
      .attr("alignment-baseline", "middle")
      .style("font-size", "0.90em")
      .text(d => stateDisplayNames[d.state] || d.state);

    // Full name as a native tooltip wherever it's been shortened for space.
    stateLabelSel
      .filter(d => !!stateDisplayNames[d.state])
      .append("title")
      .text(d => d.state);

    const rowGroup = svg.selectAll(".state-row")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "state-row")
      .attr("transform", d => `translate(0,${y(d.state)})`);

    rowGroup
      .selectAll(".bar")
      .data(d =>
        d.values.map((v, i) => ({
          ...v,
          idx: i,
          state: d.state,
        }))
      )
      .enter()
      .append("rect")
      .attr("class", d => "bar" + (d.present && d.unverified ? " unverified" : ""))
      .attr("x", d => margin.left + d.idx * (widthPerBar + barGap))
      .attr("y", 0)
      .attr("width", d => d.value == null ? 0 : xScale(d.value))
      .attr("height", y.bandwidth())
      .attr("fill", d => color(d.unit))
      .filter(d => d.present && d.unverified)
      .append("title")
      .text("Unverified: best-available estimate, not independently confirmed. See SOURCES.md for details.");

    // A bar can be a few pixels wide when its unit's value is tiny next to
    // another selected unit's (e.g. Tripura's 3.6 sq ft Dhur next to
    // Manipur's ~107,639 sq ft Pari on the same shared scale). White text
    // anchored inside such a sliver is effectively invisible against the
    // page background, so labels that don't fit fall back to dark text
    // placed just outside the bar instead — same idea as the "missing" case.
    const labelData = data.flatMap((d) =>
      d.values.map((v, i) => {
        const barX = margin.left + i * (widthPerBar + barGap);
        const hasValue = v.present && v.value !== null && v.value !== 0;
        if (!hasValue) {
          return {
            state: d.state, idx: i, text: "", x: barX + 4,
            anchor: "start", cls: "bar-label missing", fill: "#bbb", unverified: false,
          };
        }
        const barPx = xScale(v.value);
        const text = formatIndian(v.value) + (v.unverified ? " *" : "");
        const estTextWidth = text.length * 6.2 + 8;
        const fitsInside = barPx >= estTextWidth + 10;
        const unverifiedCls = v.unverified ? " unverified" : "";
        return fitsInside
          ? {
              state: d.state, idx: i, text, x: barX + barPx - 6,
              anchor: "end", cls: "bar-label" + unverifiedCls, fill: "white", unverified: v.unverified,
            }
          : {
              state: d.state, idx: i, text, x: barX + barPx + 6,
              anchor: "start", cls: "bar-label outside" + unverifiedCls, fill: "#222", unverified: v.unverified,
            };
      })
    );

    rowGroup
      .selectAll(".bar-label")
      .data((d) => labelData.filter((l) => l.state === d.state))
      .enter()
      .append("text")
      .attr("class", (l) => l.cls)
      .attr("x", (l) => l.x)
      .attr("y", y.bandwidth() / 2)
      .attr("text-anchor", (l) => l.anchor)
      .attr("alignment-baseline", "middle")
      .style("font-size", "0.72em")
      .text((l) => l.text)
      .attr("fill", (l) => l.fill)
      .filter((l) => l.unverified)
      .append("title")
      .text("Unverified: best-available estimate, not independently confirmed. See SOURCES.md for details.");
  }

  function handleResize() {
    const maxUnits = getMaxUnits();
    if (selectedUnits.length > maxUnits) {
      selectedUnits = selectedUnits.slice(0, maxUnits);
      alertDiv.textContent = '';
    }
    renderUnitButtons();
    updateChart();
  }

  window.addEventListener('resize', handleResize);
  renderUnitButtons();
  updateChart();
});

window.addEventListener('scroll', function() {
  const footer = document.getElementById('pageFooter');
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 30
  ) {
    footer.classList.add('visible');
  } else {
    footer.classList.remove('visible');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('backToTopBtn');
  if (btn) {
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
