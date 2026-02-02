type EduRow = {
  degree: string;
  institute: string;
  year: string;
  notes: string;
};

const edu: EduRow[] = [
  {
    degree: "BSc in CSE",
    institute: "The University of Barishal",
    year: "2022 - Present",
    notes: "Focus on software engineering, algorithms, databases, networking, IoT and web development.",
  },
  {
    degree: "HSC",
    institute: "Dhaka College",
    year: "2019 - 2021",
    notes: "Science (1201920010396). Strong math, physics + programming foundation.",
  },
];

export default function EducationTab() {
  return (
    <div className="tabSection">
      <h3 className="tabH3">Education (Running)</h3>

      <div className="tableWrap">
        <table className="niceTable">
          <thead>
            <tr>
              <th>Degree</th>
              <th>Institute</th>
              <th>Year</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {edu.map((e) => (
              <tr key={e.degree}>
                <td>{e.degree}</td>
                <td>{e.institute}</td>
                <td>{e.year}</td>
                <td>{e.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="tabH3" style={{ marginTop: 18 }}>
        Certificates
      </h3>

      <div className="cardsGrid">
        <div className="card">
          <img
            className="cardImg"
            src="/certificates/c1.png"
            alt="certificate"
            onError={(e) => ((e.currentTarget.style.display = "none"))}
          />
          <div className="cardBody">
            <h4 className="cardTitle">Web Development Certificate</h4>
            <p className="muted">Certificate details.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
