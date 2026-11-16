// ASSUMPTIONS: illustrative; verify against sources listed in README before submitting.
const GRID = 0.71;                       // kg CO2e per kWh, India grid average (check latest CEA figure)
const PER_CAPITA = 2000;                 // kg CO2 per person per year in India, approx.
const DC = 10;                           // Wh per GB, data centres
const NET = { wifi: 20, mobile: 50 };    // Wh per GB, network
const DEV = { phone: 2, laptop: 30 };    // watts while in use
const EMB = { phone: 65, laptop: 250 };  // kg CO2e to make the device
const ACT = [                            // gb = GB per hour; h = default hours/day
  { id: 'video',  name: 'Video',            gb: { 480: .5, 720: 1.2, 1080: 3 }, h: 1.5 },
  { id: 'music',  name: 'Music',            gb: .07, h: 1 },
  { id: 'social', name: 'Social media',     gb: .3,  h: 1.5 },
  { id: 'calls',  name: 'Video calls',      gb: .8,  h: .25 },
  { id: 'web',    name: 'Browsing & email', gb: .05, h: .75 }
];

const $ = s => document.querySelector(s);
const fmtH = h => h === 0 ? '0 h' : (h % 1 ? h.toFixed(2).replace(/0$/, '') : h) + ' h';

ACT.forEach(a => {
  const l = document.createElement('label');
  l.innerHTML = `<span>${a.name}</span><input type="range" min="0" max="8" step="0.25" value="${a.h}" data-k="${a.id}"><output>${fmtH(a.h)}</output>`;
  $('#hrs').append(l);
});

function read() {
  const s = { h: {} };
  ACT.forEach(a => s.h[a.id] = +$(`[data-k=${a.id}]`).value);
  ['dev', 'net', 'q'].forEach(n => s[n] = document.querySelector(`input[name=${n}]:checked`).value);
  s.yrs = +$('#yrs').value;
  return s;
}

function calc(s) {
  const kgPerH = gb => (DEV[s.dev] + gb * (NET[s.net] + DC)) / 1000 * GRID;
  const rows = ACT.map(a => ({ n: a.name, kg: s.h[a.id] * 365 * kgPerH(typeof a.gb === 'object' ? a.gb[s.q] : a.gb) }));
  rows.push({ n: 'Making the ' + s.dev, kg: EMB[s.dev] / s.yrs });
  return { rows, tot: rows.reduce((t, r) => t + r.kg, 0) };
}

function draw() {
  const s = read(), r = calc(s), max = Math.max(...r.rows.map(x => x.kg), 1e-9);
  $('#tot').textContent = Math.round(r.tot);
  $('#share').textContent = `About ${(r.tot / PER_CAPITA * 100).toFixed(1)}% of the roughly 2 tonnes an average Indian emits in a year.`;
  $('#bars').innerHTML = r.rows.map(x => `<li><span>${x.n}</span><i style="width:${(x.kg / max * 100).toFixed(1)}%"></i><b>${x.kg.toFixed(1)}</b></li>`).join('');
  const swaps = [];
  const test = (mod, text) => { const d = r.tot - calc({ ...s, ...mod }).tot; if (d > 0.5) swaps.push(`<li>${text} <strong>saves ${d.toFixed(0)} kg</strong> a year.</li>`); };
  test({ q: '480' }, 'Watching at 480p instead of ' + s.q + 'p');
  test({ net: 'wifi' }, 'Using Wi-Fi instead of mobile data');
  if (s.yrs < 6) test({ yrs: s.yrs + 1 }, `Keeping your ${s.dev} one year longer`);
  $('#swaps').innerHTML = swaps.join('') || '<li>You’re already doing the big things right.</li>';
}

document.addEventListener('input', e => {
  if (e.target.dataset.k) e.target.nextElementSibling.textContent = fmtH(+e.target.value);
  if (e.target.id === 'yrs') $('#yo').textContent = e.target.value;
  draw();
});
draw();
