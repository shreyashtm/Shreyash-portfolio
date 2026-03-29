
import useCardAnimation from '../hooks/useCardAnimation'
import SectionHeader from '../components/SectionHeader'
import './Skills.css'

// Simple Icons slugs — https://simpleicons.org
// Skills without a logo get null (shows styled initial instead)
const SKILL_LOGOS = {
  // Data Engineering & Analysis
  'Python':                   'python',
  'SQL':                      'mysql',
  'Pandas':                   'pandas',
  'NumPy':                    'numpy',
  'PostgreSQL':               'postgresql',
  'MySQL':                    'mysql',
  'MongoDB':                  'mongodb',
  'R':                        'r',
  'Excel':                    'microsoftexcel',
  // ML & Forecasting — use the closest representative tool
  'Scikit-learn':             'scikitlearn',
  'ARIMA':                    'r',               // ARIMA is most associated with R/statsmodels
  'LSTM':                     'tensorflow',      // LSTM = TF/Keras
  'Regression':               'scikitlearn',
  'Classification':           'scikitlearn',
  'Feature Engineering':      'apachespark',
  'Anomaly Detection':        'elastic',
  'Model Evaluation':         'mlflow',
  // BI & Visualisation
  'Tableau':                  'tableau',
  'Power BI':                 'powerbi',
  'Dashboard Design':         'figma',
  'KPI Reporting':            'grafana',
  'EDA':                      'jupyter',
  'Data Storytelling':        'googlecolab',
  // Reliability & Process
  'Data Quality Frameworks':  'dbt',
  'Validation Protocols':     'pytest',
  'Data Integrity':           'amazondynamodb',
  'SLA Management':           'pagerduty',
  'Documentation':            'notion',
}

const SKILL_GROUPS = [
  {
    category: 'Data Engineering & Analysis',
    symbol: '⬡',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'PostgreSQL', 'MySQL', 'MongoDB', 'R', 'Excel'],
  },
  {
    category: 'Machine Learning & Forecasting',
    symbol: '◈',
    skills: ['Scikit-learn', 'ARIMA', 'LSTM', 'Regression', 'Classification', 'Feature Engineering', 'Anomaly Detection', 'Model Evaluation'],
  },
  {
    category: 'BI & Visualisation',
    symbol: '◎',
    skills: ['Tableau', 'Power BI', 'Dashboard Design', 'KPI Reporting', 'EDA', 'Data Storytelling'],
  },
  {
    category: 'Reliability & Process',
    symbol: '⬟',
    skills: ['Data Quality Frameworks', 'Validation Protocols', 'Data Integrity', 'SLA Management', 'Documentation'],
  },
]

function SkillItem({ skill }) {
  const slug = SKILL_LOGOS[skill]

  return (
    <div className="skill-flip" title={skill}>
      {/* invisible — only purpose is to give the pill its natural width */}
      <span className="skill-flip__sizer" aria-hidden="true">{skill}</span>

      <div className="skill-flip__inner">
        <div className="skill-flip__front">
          <span>{skill}</span>
        </div>
        <div className="skill-flip__back">
          {slug ? (
            <img
              src={`https://cdn.simpleicons.org/${slug}/f59e0b`}
              alt={skill}
              className="skill-flip__logo"
              loading="lazy"
            />
          ) : (
            <span className="skill-flip__initial">
              {skill.charAt(0)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function SkillRow({ category, skills, symbol }) {
  return (
    <div className="skill-row">
      <div className="skill-row__header">
        <span className="skill-row__symbol">{symbol}</span>
        <span className="skill-row__category">{category}</span>
        <span className="skill-row__symbol">{symbol}</span>
        <div className="skill-row__line" />
      </div>
      <div className="skill-row__items">
        {skills.map(skill => (
          <SkillItem key={skill} skill={skill} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, visible } = useCardAnimation(0)

  return (
    <section id="skills" className="skills">
      <div className="container">
        <SectionHeader
          label="Skills"
          title="What I work"
          accent="with"
        />

        <div
          ref={ref}
          className={`card skills__card ${visible ? 'card-visible' : 'card-hidden'}`}
        >
          <div className="skills__rows">
            {SKILL_GROUPS.map((group) => (
              <SkillRow
                key={group.category}
                category={group.category}
                symbol={group.symbol}
                skills={group.skills}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}