import { createRoot } from 'react-dom/client'
import App from './App.tsx'
//import App from './components/src/App';
import './index.css'
import GamesCard from './components/Home/Games/GamesCard.tsx';
import { BottomNavigation } from './components/Footer/BottomNavigation.tsx';

createRoot(document.getElementById("root")!).render(<App/>);
