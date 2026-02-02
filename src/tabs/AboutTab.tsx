export default function AboutTab() {
  return (
    <div className="tabSection">
      <div className="split">
        <div>
          <h3 className="tabH3">Here I am</h3>
          <p className="muted">
            Majoring in CSE and a rookie software developer. Likes building
            full-stack web apps, solving problems and learning new tools. I enjoy
            working on clean UI, smooth animations and scalable backend logic. New languages always excite me!
          </p>

          <div className="infoGrid">
            <div className="infoBox">
              <div className="infoLabel">Current Focus</div>
              <div className="infoValue">React + TypeScript + Backend APIs</div>
            </div>
            <div className="infoBox">
              <div className="infoLabel">Current Goal</div>
              <div className="infoValue">Internship / Junior Developer Role</div>
            </div>
            <div className="infoBox">
              <div className="infoLabel">Location</div>
              <div className="infoValue">Dhaka, Bangladesh</div>
            </div>
            <div className="infoBox">
              <div className="infoLabel">Open to</div>
              <div className="infoValue">Collaboration & Freelance</div>
            </div>
          </div>

          <h3 className="tabH3" style={{ marginTop: 16 }}>
            What I Do
          </h3>

          <ul className="bullets">
            <li>Build responsive UI with React/TS</li>
            <li>Create REST APIs and connect databases</li>
            <li>Deploy and maintain projects</li>
            <li>Write clean code and documentation</li>
          </ul>
        </div>

        <div className="sideCard">
          <img
            className="sideImg"
            src="/about/me2.jpg"
            alt="About"
            onError={(e) => ((e.currentTarget.style.display = "none"))}
          />
          <div className="sideBody">
            <h4 className="cardTitle">Quick Links</h4>
            <div className="btnRow">
              <a className="miniBtn secondary" href="https://github.com/miniSOWAD" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="miniBtn secondary" href="https://linkedin.com/in/md-mahruf-alam-sowad-397aaa309/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="miniBtn secondary" href="https://leetcode.com/u/minisowad/" target="_blank" rel="noreferrer">
                LeetCode
              </a>
            </div>
            <p className="muted" style={{ marginTop: 10 }}>
              (You can contact me through any of these platforms. Best hours to find me online are 10 PM - 1 AM BST, 7 AM - 12 AM EST.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
