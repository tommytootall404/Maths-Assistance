import { Route, Routes } from 'react-router-dom';
import { NavBar } from './components/layout/NavBar';
import { PageShell } from './components/layout/PageShell';
import { HomePage } from './pages/HomePage';
import { ModulePage } from './pages/ModulePage';
import { LessonRoute } from './pages/LessonRoute';
import { DiagnosticPage } from './pages/DiagnosticPage';
import { FormulaSheetPage } from './components/formulaSheet/FormulaSheetPage';
import { GlossaryPage } from './components/glossary/GlossaryPage';

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <NavBar />
      <PageShell>
        <div id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/modules/:moduleId" element={<ModulePage />} />
            <Route path="/lessons/:lessonId" element={<LessonRoute />} />
            <Route path="/diagnostic" element={<DiagnosticPage />} />
            <Route path="/formulas" element={<FormulaSheetPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
          </Routes>
        </div>
      </PageShell>
    </>
  );
}

export default App;
