import '@testing-library/jest-dom';
import { jestPreviewConfigure } from 'jest-preview';
// Import CSS for jest-preview
import '../styles/globals.scss';

jestPreviewConfigure({ autoPreview: false });
