import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
const root = createRoot(document.getElementById('root'));
root.render(_jsx(App, {}));
