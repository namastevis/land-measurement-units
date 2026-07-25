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

  function getMaxUnits() {
    return window.innerWidth >= 700 ? 5 : 2;
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
    const stateLabelWidth = 136; // increased for more space
    const spacer = 32;  // more gap
    const container = document.querySelector('.svg-container') || document.body;
    const maxBars = 5;
    const chartW = Math.max(container.clientWidth || 780, 320);
    const margin = {
      top: 10,
      right: 20,
      bottom: 25,
      left: stateLabelWidth + spacer
    };
    const barAreaWidth = chartW - margin.left - margin.right;
    const widthPerBar = Math.max(60, (barAreaWidth - (maxBars - 1) * 6) / maxBars);
    const barHeight = 16;
    const barGap = 6;
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
      return { state, values: vals };
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

    svg.selectAll(".state-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "state-label")
      .attr("x", stateLabelWidth + 16)
      .attr("y", d => y(d.state) + y.bandwidth() / 2)
      .attr("alignment-baseline", "middle")
      .style("font-size", "0.90em")
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

    rowGroup
      .selectAll(".bar-label")
      .data(d =>
        d.values.map((v, i) => ({
          ...v,
          idx: i,
          state: d.state,
        }))
      )
      .enter()
      .append("text")
      .attr("class", v =>
        "bar-label" +
        (v.present ? "" : " missing") +
        (v.present && v.unverified ? " unverified" : "")
      )
      .attr("x", v =>
        margin.left + v.idx * (widthPerBar + barGap) +
        (v.value && v.value > 0
          ? xScale(v.value) - 6
          : 4)
      )
      .attr("y", y.bandwidth() / 2)
      .attr("alignment-baseline", "middle")
      .style("font-size", "0.72em")
      .text(v =>
        v.present && v.value !== null && v.value !== 0
          ? formatIndian(v.value) + (v.unverified ? " *" : "")
          : ""
      )
      .attr("fill", v => (v.present ? "white" : "#bbb"))
      .filter(v => v.unverified)
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
