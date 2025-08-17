import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';
import '@valibot/i18n/zh-CN';
import { setGlobalConfig } from 'valibot';
const browserLanguage = navigator.language;
if (browserLanguage.startsWith('zh')) {
  setGlobalConfig({ lang: 'zh-CN' });
}
const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;
