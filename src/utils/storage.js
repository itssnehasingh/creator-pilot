import { INITIAL_PROMPTS } from '../data/initialPrompts';
import { INITIAL_PIPELINE } from '../data/initialPipeline';

const PROMPTS_STORAGE_KEY = 'creatorpilot_prompts_v1';
const PIPELINE_STORAGE_KEY = 'creatorpilot_pipeline_v1';

export const getStoredPrompts = () => {
  try {
    const raw = localStorage.getItem(PROMPTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PROMPTS_STORAGE_KEY, JSON.stringify(INITIAL_PROMPTS));
      return INITIAL_PROMPTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load prompts from storage:", err);
    return INITIAL_PROMPTS;
  }
};

export const saveStoredPrompts = (prompts) => {
  try {
    localStorage.setItem(PROMPTS_STORAGE_KEY, JSON.stringify(prompts));
  } catch (err) {
    console.error("Failed to save prompts to storage:", err);
  }
};

export const getStoredPipeline = () => {
  try {
    const raw = localStorage.getItem(PIPELINE_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PIPELINE_STORAGE_KEY, JSON.stringify(INITIAL_PIPELINE));
      return INITIAL_PIPELINE;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load pipeline from storage:", err);
    return INITIAL_PIPELINE;
  }
};

export const saveStoredPipeline = (pipeline) => {
  try {
    localStorage.setItem(PIPELINE_STORAGE_KEY, JSON.stringify(pipeline));
  } catch (err) {
    console.error("Failed to save pipeline to storage:", err);
  }
};

export const exportProjectData = (prompts, pipeline) => {
  const data = {
    exportedAt: new Date().toISOString(),
    version: "1.0",
    appName: "CreatorPilot",
    prompts,
    pipeline
  };
  const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", jsonStr);
  downloadAnchor.setAttribute("download", `creatorpilot_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const resetToDefaults = () => {
  localStorage.setItem(PROMPTS_STORAGE_KEY, JSON.stringify(INITIAL_PROMPTS));
  localStorage.setItem(PIPELINE_STORAGE_KEY, JSON.stringify(INITIAL_PIPELINE));
  return { prompts: INITIAL_PROMPTS, pipeline: INITIAL_PIPELINE };
};
