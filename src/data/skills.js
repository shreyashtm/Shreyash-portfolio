export const SKILL_GROUPS = [
  {
    category: 'Data Engineering',
    summary: 'Preparing reliable analytical datasets and production-ready pipelines.',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'PostgreSQL', 'MySQL', 'MongoDB', 'R'],
  },
  {
    category: 'Forecasting & ML',
    summary: 'Building, validating, and communicating models for operational decisions.',
    skills: ['Scikit-learn', 'ARIMA', 'LSTM', 'Random Forest', 'Isolation Forest', 'Feature Engineering', 'Anomaly Detection', 'Time-Series Forecasting'],
  },
  {
    category: 'BI & Decision Systems',
    summary: 'Turning metrics into dashboards and workflows stakeholders can trust.',
    skills: ['Tableau', 'Power BI', 'KPI Reporting', 'Dashboard Design', 'EDA', 'Data Storytelling'],
  },
  {
    category: 'Reliability',
    summary: 'Keeping analytical outputs explainable, documented, and stable.',
    skills: ['Data Quality', 'Validation Protocols', 'Data Integrity', 'SLA Awareness', 'Documentation'],
  },
]

export const ALL_SKILL_TERMS = SKILL_GROUPS.flatMap((g) => g.skills)
