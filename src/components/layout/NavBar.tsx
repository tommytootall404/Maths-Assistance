import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/diagnostic', label: 'Where to start' },
  { to: '/formulas', label: 'Formula sheet' },
  { to: '/glossary', label: 'Glossary' },
];

export function NavBar() {
  return (
    <header className="nav-bar">
      <div className="nav-bar__inner">
        <NavLink to="/" className="nav-bar__brand">
          Maths for Engineering
        </NavLink>
        <nav aria-label="Main navigation">
          <ul className="nav-bar__links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => (isActive ? 'nav-bar__link nav-bar__link--active' : 'nav-bar__link')}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
