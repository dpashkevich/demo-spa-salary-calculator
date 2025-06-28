import * as stylex from "@stylexjs/stylex";
import { useState, useMemo, useEffect } from "react";
import Select from "./components/Select";
import SalaryChart from "./components/SalaryChart";

// Dynamic options
const getCountryOptions = (data: CalculatorData | null) => {
  if (!data) return [{ value: "", label: "Select country" }];
  return [
    { value: "", label: "Select country" },
    ...Object.keys(data).map((country) => ({ value: country, label: country })),
  ];
};

function InfoNote() {
  return (
    <div {...stylex.props(styles.infoNote)}>
      <span {...stylex.props(styles.infoIcon)}>i</span>
      <span>
        Note: Experience levels refer to total years of professional coding, not
        years using the selected technology.
      </span>
    </div>
  );
}

type CalculatorEntry = {
  value: number;
  category: string;
  metadata: Record<string, string>;
};

type CalculatorData = {
  [country: string]: {
    [language: string]: {
      entries: CalculatorEntry[];
    };
  };
};

export default function SalaryCalculatorPage() {
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [data, setData] = useState<CalculatorData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamic options
  const countryOptions = getCountryOptions(data);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/calculatorData.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Select first available country and language on data load
  useEffect(() => {
    if (data) {
      const countryList = Object.keys(data);
      if (!country && countryList.length > 0) {
        setCountry(countryList[0]);
      }
    }
  }, [data, country]);

  useEffect(() => {
    if (data && country) {
      const langList = Object.keys(data[country] || {});
      if (!language && langList.length > 0) {
        setLanguage(langList[0]);
      }
    }
  }, [data, country, language]);

  // Gather all unique languages from all countries
  const allLanguages = useMemo(() => {
    if (!data) return [];
    const langSet = new Set<string>();
    Object.values(data).forEach((countryObj) => {
      Object.keys(countryObj).forEach((lang) => langSet.add(lang));
    });
    return Array.from(langSet).sort();
  }, [data]);

  // Dynamic language options
  const languageOptionsDynamic = [
    { value: "", label: "Select language" },
    ...allLanguages.map((lang) => ({ value: lang, label: lang })),
  ];

  // Chart data and dynamic Y labels (experience categories)
  const chartData = useMemo(() => {
    if (!data || !language || !country) return undefined;
    const entries = data[country]?.[language]?.entries;
    if (!entries || !Array.isArray(entries)) return undefined;
    // Group by experience/category, pick the highest value per category
    const expMap = new Map<string, number>();
    entries.forEach((e) => {
      if (!expMap.has(e.category) || e.value > (expMap.get(e.category) ?? 0)) {
        expMap.set(e.category, e.value);
      }
    });
    // Sort by value ascending (junior to senior)
    const sorted = Array.from(expMap.entries()).sort((a, b) => a[1] - b[1]);
    return sorted.map(([category, value]) => ({
      category,
      salary: value * 1000, // Assuming value is in K
    }));
  }, [data, language, country]);

  // Demo values for summary text
  const summaryLang = language || "-";
  const summaryCountry = country || "-";
  const summaryExp = "all experience levels";

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.heroWrap)}>
        <h1 {...stylex.props(styles.heroTitle)}>
          IT Salary
          <br />
          Calculator
        </h1>
        <p {...stylex.props(styles.heroInfo)}>
          Each year, our extensive surveys reach out to over 30,000 developers
          across over 180 countries, representing a diverse range of
          specialties. With data collected over multiple years, we are able to
          present a comprehensive analysis of tech trends using the methodology
          described{" "}
          <a href="#" {...stylex.props(styles.heroLink)}>
            here
          </a>
          .
        </p>
        <p {...stylex.props(styles.heroSub)}>
          Use our calculator to estimate your income potential based on software
          developer skills, programming language, location, and experience.
        </p>
      </div>
      <div {...stylex.props(styles.stepsRow)}>
        <div {...stylex.props(styles.stepCard)}>
          <div {...stylex.props(styles.stepNum)}>1</div>
          <div {...stylex.props(styles.stepDesc)}>
            Enter your programming language, and country.
          </div>
          <div {...stylex.props(styles.formWrap)}>
            <label
              {...stylex.props(styles.inputLabel)}
              htmlFor="language-select"
            >
              Programming language
            </label>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              options={languageOptionsDynamic}
              placeholder="Select language"
              id="language-select"
            />
            <label
              {...stylex.props(styles.inputLabel)}
              htmlFor="country-select"
            >
              Country
            </label>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              options={countryOptions}
              placeholder="Select country"
              id="country-select"
            />
          </div>
        </div>
        <div {...stylex.props(styles.stepCard)}>
          <div {...stylex.props(styles.stepNum)}>2</div>
          <div {...stylex.props(styles.stepDesc)}>
            Calculate the salary range based on your parameters.
          </div>
          <div {...stylex.props(styles.chartCardWrap)}>
            <div {...stylex.props(styles.chartCard)}>
              {loading && <div>Loading data...</div>}
              {error && <div style={{ color: "#ff4d4f" }}>Error: {error}</div>}
              {!loading && !error && (
                <>
                  <div {...stylex.props(styles.summaryText)}>
                    Most{" "}
                    <span {...stylex.props(styles.summaryLang)}>
                      {summaryLang}
                    </span>{" "}
                    developers with{" "}
                    <span {...stylex.props(styles.summaryExp)}>
                      {summaryExp}
                    </span>{" "}
                    of professional experience in{" "}
                    <span {...stylex.props(styles.summaryCountry)}>
                      {summaryCountry}
                    </span>{" "}
                    can expect the following net salary distribution (excluding
                    any bonuses):
                  </div>
                  <div {...stylex.props(styles.chartWrap)}>
                    <SalaryChart
                      data={chartData}
                      yKey="category"
                      xKey="salary"
                      xLabel="Salary"
                    />
                  </div>
                  <div {...stylex.props(styles.chartLegend)}>
                    The graph shows salary distribution among users of the
                    selected technology in the specified region, based on
                    responses from{" "}
                    <a href="#" {...stylex.props(styles.heroLink)}>
                      Developer Ecosystem Survey 2024
                    </a>
                    .
                  </div>
                  <InfoNote />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    fontFamily: "JetBrains Sans, sans-serif",
    position: "relative",
    padding: 0,
    margin: 0,
    overflowX: "hidden",
    width: "100vw",
    maxWidth: "100vw",
  },
  heroWrap: {
    maxWidth: 700,
    margin: "0 auto",
    paddingTop: 64,
    paddingBottom: 32,
    position: "relative",
    zIndex: 1,
    textAlign: "left",
    width: "100%",
    "@media (max-width: 900px)": {
      maxWidth: "90vw",
      paddingTop: 32,
      paddingBottom: 16,
    },
  },
  heroTitle: {
    fontSize: 64,
    fontWeight: 700,
    lineHeight: "72px",
    margin: 0,
    letterSpacing: -0.5,
    fontFamily: "JetBrains Sans, sans-serif",
    "@media (max-width: 600px)": {
      fontSize: 40,
      lineHeight: "48px",
    },
  },
  heroInfo: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: "28px",
    color: "#fff",
    margin: "32px 0 0 0",
    opacity: 0.9,
    fontFamily: "JetBrains Sans, sans-serif",
    "@media (max-width: 600px)": {
      fontSize: 15,
      lineHeight: "22px",
      margin: "20px 0 0 0",
    },
  },
  heroSub: {
    fontSize: 22,
    fontWeight: 400,
    lineHeight: "32px",
    color: "#fff",
    margin: "32px 0 0 0",
    fontFamily: "JetBrains Sans, sans-serif",
    "@media (max-width: 600px)": {
      fontSize: 16,
      lineHeight: "22px",
      margin: "16px 0 0 0",
    },
  },
  heroLink: {
    color: "#b18cff",
    textDecoration: "underline",
    cursor: "pointer",
  },
  stepsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100vw",
    maxWidth: "1200px",
    margin: "0 auto",
    zIndex: 1,
    position: "relative",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
      gap: 32,
      maxWidth: "98vw",
    },
  },
  stepCard: {
    minWidth: 320,
    maxWidth: 500,
    background: "linear-gradient(180deg, #6b57ff 0%, #6b57ff00 100%)",
    borderRadius: 20,
    boxShadow: "0 8px 32px 0 rgba(107,87,255,0.12)",
    padding: "32px 32px 32px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    marginBottom: 64,
    width: "100%",
    "@media (max-width: 900px)": {
      maxWidth: "100%",
      minWidth: 0,
      marginBottom: 32,
      padding: "24px 12px 24px 12px",
    },
  },
  stepNum: {
    fontSize: 32,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 8,
    fontFamily: "JetBrains Sans, sans-serif",
  },
  stepDesc: {
    fontSize: 18,
    fontWeight: 400,
    color: "#fff",
    marginBottom: 24,
    fontFamily: "JetBrains Sans, sans-serif",
  },
  formWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginTop: 8,
  },
  inputLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 4,
    opacity: 0.7,
    fontFamily: "JetBrains Sans, sans-serif",
  },
  chartCardWrap: {
    width: "100%",
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
  },
  chartCard: {
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 8px 32px 0 rgba(25,25,28,0.10)",
    padding: "32px 32px 24px 32px",
    color: "#19191c",
    width: 520,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    zIndex: 2,
    "@media (max-width: 600px)": {
      padding: "16px 4px 12px 4px",
      width: "100%",
    },
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: "28px",
    marginBottom: 24,
    fontFamily: "JetBrains Sans, sans-serif",
    "@media (max-width: 600px)": {
      fontSize: 15,
      lineHeight: "22px",
      marginBottom: 12,
    },
  },
  summaryLang: {
    color: "#6b57ff",
    fontWeight: 500,
  },
  summaryExp: {
    color: "#6b57ff",
    fontWeight: 500,
  },
  summaryCountry: {
    color: "#6b57ff",
    fontWeight: 500,
  },
  chartWrap: {
    width: "100%",
    margin: "0 0 16px 0",
  },
  chartLegend: {
    fontSize: 14,
    color: "#888",
    margin: "8px 0 16px 0",
    fontFamily: "JetBrains Sans, sans-serif",
  },
  infoNote: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    background: "#f5f5f7",
    color: "#19191c",
    borderRadius: 10,
    fontSize: 14,
    padding: "12px 16px",
    marginTop: 8,
    fontFamily: "JetBrains Sans, sans-serif",
  },
  infoIcon: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#e0e0e0",
    color: "#6b57ff",
    fontWeight: 700,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
    flexShrink: 0,
    fontFamily: "JetBrains Sans, sans-serif",
  },
});
