-- Migration: Add AI model tracking columns and TinyLlama configuration settings
-- Run this on existing databases to update schema

-- 1. Add analysis_duration_ms column to report_credibility_analysis
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'report_credibility_analysis'
    AND column_name = 'analysis_duration_ms'
  ) THEN
    ALTER TABLE public.report_credibility_analysis
      ADD COLUMN analysis_duration_ms integer NOT NULL DEFAULT 0;
  END IF;
END $$;

-- 2. Add TinyLlama configuration settings to system_settings
INSERT INTO public.system_settings (key, value) VALUES
  ('ai_ollama_url', 'http://localhost:11434'),
  ('ai_model_name', 'tinyllama:1.1b'),
  ('ai_temperature', '0.1'),
  ('ai_timeout', '30000')
ON CONFLICT (key) DO NOTHING;

-- 3. Verify the changes
SELECT key, value FROM public.system_settings WHERE key LIKE 'ai_%';
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'report_credibility_analysis'
AND column_name = 'analysis_duration_ms';
