import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import * as ace from 'ace-builds';
ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict');
// 'workerPath'와 'modePath'도 명시적으로 설정하면 더 안정적일 수 있어.
ace.config.set('workerPath', '/node_modules/ace-builds/src-noconflict');
ace.config.set('modePath', '/node_modules/ace-builds/src-noconflict');

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
