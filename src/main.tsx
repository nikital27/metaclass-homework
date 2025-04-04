import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import './config/configureMobX'

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);