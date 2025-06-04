// --- Distribuição Uniforme ---

function calcularUniforme() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const x1 = parseFloat(document.getElementById("x1").value);
  const x2 = parseFloat(document.getElementById("x2").value);

  if (
    isNaN(a) || isNaN(b) || isNaN(x1) || isNaN(x2) ||
    a >= b || x1 < a || x2 > b || x1 > x2
  ) {
    alert("Por favor, insira valores válidos com: a < b, a ≤ x1 ≤ x2 ≤ b");
    return;
  }

  const prob = (x2 - x1) / (b - a);
  const media = (a + b) / 2;
  const variancia = Math.pow(b - a, 2) / 12;
  const desvioPadrao = Math.sqrt(variancia);
  const coeficienteVariacao = desvioPadrao / media;

  const resultadoTexto =
    `P(${x1.toFixed(2)} ≤ X ≤ ${x2.toFixed(2)}) = ${(prob * 100).toFixed(2)}%` +
    `<br>Média: ${media.toFixed(2)}` +
    `<br>Variância: ${variancia.toFixed(2)}` +
    `<br>Desvio Padrão: ${desvioPadrao.toFixed(2)}` +
    `<br>Coeficiente de Variação: ${coeficienteVariacao.toFixed(2)}`;

  document.getElementById("resultadoUniforme").innerHTML = resultadoTexto;

  const densidade = 1 / (b - a);

  function linspace(start, end, num) {
    const step = (end - start) / (num - 1);
    return Array.from({ length: num }, (_, i) => start + i * step);
  }

  const xCurve = linspace(a, b, 100);
  const yCurve = xCurve.map(() => densidade);

  const xArea = [a, ...xCurve, b];
  const yArea = [0, ...yCurve, 0];

  const xFill = [x1, ...linspace(x1, x2, 50), x2];
  const yFill = Array(52).fill(densidade);

  const xFillArea = [x1, ...xFill, x2];
  const yFillArea = [0, ...yFill, 0];

  const traceTotal = {
    x: xArea,
    y: yArea,
    type: "scatter",
    mode: "lines",
    name: "Densidade Uniforme",
    fill: "tozeroy",
    line: {
      color: "#9d4edd",
      width: 3,
      shape: "spline",
      smoothing: 1.3,
    },
    fillcolor: "rgba(157, 78, 221, 0.3)",
    hoverinfo: "x+y",
  };

  const traceInterval = {
    x: xFillArea,
    y: yFillArea,
    type: "scatter",
    mode: "lines",
    name: `Intervalo [${x1.toFixed(2)}, ${x2.toFixed(2)}]`,
    fill: "tozeroy",
    line: {
      color: "#7b2cbf",
      width: 4,
      shape: "spline",
      smoothing: 1.3,
    },
    fillcolor: "rgba(123, 44, 191, 0.5)",
    hoverinfo: "x+y",
  };

  const layoutUniforme = {
    title: {
      text: "Distribuição Uniforme",
      font: { color: "#9d4edd", size: 22 },
    },
    paper_bgcolor: "#1f1f1f",
    plot_bgcolor: "#1f1f1f",
    font: { color: "#ddd", family: "'Poppins', sans-serif" },
    xaxis: {
      title: "x",
      zeroline: false,
      gridcolor: "#333",
      tickcolor: "#9d4edd",
      linecolor: "#9d4edd",
      ticks: "outside",
      tickfont: { color: "#ccc" },
      range: [a - (b - a) * 0.1, b + (b - a) * 0.1],
    },
    yaxis: {
      title: "Densidade",
      zeroline: false,
      gridcolor: "#333",
      tickcolor: "#9d4edd",
      linecolor: "#9d4edd",
      ticks: "outside",
      tickfont: { color: "#ccc" },
      range: [0, densidade * 1.3],
    },
    legend: {
      bgcolor: "rgba(0,0,0,0)",
      font: { color: "#ccc" },
      borderwidth: 0,
      orientation: "h",
      y: -0.25,
    },
    margin: { t: 50, b: 70, l: 70, r: 40 },
  };

  Plotly.newPlot(
    "graficoUniforme",
    [traceTotal, traceInterval],
    layoutUniforme,
    { responsive: true }
  );
}

// --- Opções de Dinamismo na Escolha ---

function mostrarCamposExp() {
  const tipo = document.getElementById("tipoProbabilidade").value;
  document.getElementById("campoA").style.display = (tipo === "maior" || tipo === "entre") ? "block" : "none";
  document.getElementById("campoB").style.display = (tipo === "menor" || tipo === "entre") ? "block" : "none";
}

// --- Calculo Exponencial ---

let samples = [];

function gerarAmostrasExponencial(lambda, n) {
  samples = [];
  for (let i = 0; i < n; i++) {
    const u = Math.random();
    samples.push(-Math.log(1 - u) / lambda);
  }
}

function mostrarCamposExp() {
  const tipo = document.getElementById("tipoProbabilidade").value;
  const campoA = document.getElementById("campoA");
  const campoB = document.getElementById("campoB");

  if (tipo === "maior") {
    campoA.style.display = "block";
    campoB.style.display = "none";
  } else if (tipo === "menor") {
    campoA.style.display = "none";
    campoB.style.display = "block";
  } else if (tipo === "entre") {
    campoA.style.display = "block";
    campoB.style.display = "block";
  } else {
    campoA.style.display = "none";
    campoB.style.display = "none";
  }
}

function calcularExponencial() {
  // Pegando os valores do HTML
  const xifi = parseFloat(document.getElementById("xifi").value);
  const n = parseFloat(document.getElementById("n").value);
  const tipo = document.getElementById("tipoProbabilidade").value;

  if (isNaN(xifi) || isNaN(n) || n <= 0 || xifi < 0) {
    alert("Por favor, insira valores válidos para ΣXiFi e N.");
    return;
  }

  const lambda = n / xifi;

  if (lambda <= 0) {
    alert("Valor inválido para λ (lambda).");
    return;
  }

  let p = null; // probabilidade
  let resultadoTexto = "";

  if (tipo === "maior") {
    const a = parseFloat(document.getElementById("a_exp").value);
    if (isNaN(a) || a < 0) {
      alert("Por favor, insira um valor válido para A.");
      return;
    }
    // P(X ≥ A) = e^{-λA}
    p = Math.exp(-lambda * a);
    resultadoTexto = `P(X ≥ ${a.toFixed(2)}) = ${(p * 100).toFixed(2)}%`;
  } else if (tipo === "menor") {
    const b = parseFloat(document.getElementById("b_exp").value);
    if (isNaN(b) || b < 0) {
      alert("Por favor, insira um valor válido para B.");
      return;
    }
    // P(X ≤ B) = 1 - e^{-λB}
    p = 1 - Math.exp(-lambda * b);
    resultadoTexto = `P(X ≤ ${b.toFixed(2)}) = ${(p * 100).toFixed(2)}%`;
  } else if (tipo === "entre") {
    const a = parseFloat(document.getElementById("a_exp").value);
    const b = parseFloat(document.getElementById("b_exp").value);
    if (isNaN(a) || isNaN(b) || a < 0 || b < 0 || b < a) {
      alert("Por favor, insira valores válidos para A e B, com B ≥ A.");
      return;
    }
    // P(A ≤ X ≤ B) = e^{-λA} - e^{-λB}
    p = Math.exp(-lambda * a) - Math.exp(-lambda * b);
    resultadoTexto = `P(${a.toFixed(2)} ≤ X ≤ ${b.toFixed(2)}) = ${(p * 100).toFixed(2)}%`;
  } else {
    alert("Por favor, selecione um tipo de cálculo.");
    return;
  }

  // Simula amostras para histograma
  gerarAmostrasExponencial(lambda, n);

  document.getElementById("resultadoExponencial").innerHTML = resultadoTexto;

  // Montar histograma

  // Definir bins para histograma (10 bins)
  const maxSample = Math.max(...samples);
  const binWidth = maxSample / 10;

  // Inicializa bins
  const bins = Array(10).fill(0);

  // Conta amostras em cada bin
  samples.forEach((val) => {
    let binIndex = Math.floor(val / binWidth);
    if (binIndex >= bins.length) binIndex = bins.length - 1;
    bins[binIndex]++;
  });

  // Normaliza contagem para densidade
  const yHist = bins.map((count) => count / (n * binWidth));
  const xHist = bins.map((_, i) => i * binWidth + binWidth / 2);

// Curva teórica da densidade exponencial
const xCurve = [];
const yCurve = [];
const numPoints = 100;
for (let i = 0; i <= numPoints; i++) {
  const x = (maxSample * i) / numPoints;
  xCurve.push(x);
  yCurve.push(lambda * Math.exp(-lambda * x));
}

const xArea = [0, ...xCurve, maxSample];
const yArea = [0, ...yCurve, 0];

const traceHist = {
  x: xHist,
  y: yHist,
  type: "bar",
  name: "Histograma",
  marker: { color: "#7b2cbf" },
  opacity: 0.7,
};

const traceCurve = {
  x: xArea,
  y: yArea,
  type: "scatter",
  mode: "lines",
  name: "Densidade Teórica",
  fill: "tozeroy",
  line: {
    color: "#9d4edd",
    width: 3,
    shape: "spline",
    smoothing: 1.3,
  },
  fillcolor: "rgba(157, 78, 221, 0.3)",
  hoverinfo: "x+y",
};

const layoutExp = {
  title: {
    text: "Distribuição Exponencial",
    font: { color: "#9d4edd", size: 22, family: "'Poppins', sans-serif" },
  },
  paper_bgcolor: "#1f1f1f",
  plot_bgcolor: "#1f1f1f",
  font: { color: "#ddd", family: "'Poppins', sans-serif" },
  xaxis: {
    title: "x",
    zeroline: false,
    gridcolor: "#333",
    tickcolor: "#9d4edd",
    linecolor: "#9d4edd",
    ticks: "outside",
    tickfont: { color: "#ccc" },
    range: [0, maxSample * 1.1],
  },
  yaxis: {
    title: "Densidade",
    zeroline: false,
    gridcolor: "#333",
    tickcolor: "#9d4edd",
    linecolor: "#9d4edd",
    ticks: "outside",
    tickfont: { color: "#ccc" },
    range: [0, Math.max(...yCurve) * 1.3],
  },
  legend: {
    bgcolor: "rgba(0,0,0,0)",
    font: { color: "#ccc", family: "'Poppins', sans-serif" },
    borderwidth: 0,
    orientation: "h",
    y: -0.25,
  },
  margin: { t: 50, b: 70, l: 70, r: 40 },
};

Plotly.newPlot("graficoExponencial", [traceHist, traceCurve], layoutExp, {
  responsive: true,
})}