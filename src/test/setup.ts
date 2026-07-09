import '@testing-library/jest-dom';
import { jestPreviewConfigure } from 'jest-preview';
// Import CSS for jest-preview
import '../styles/globals.css';

jestPreviewConfigure({ autoPreview: false });
