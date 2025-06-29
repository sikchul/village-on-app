const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

const requireEnvVar = (name: string, value: string | undefined) => {
  if (!value) throw new Error(`${name} 환경 변수가 설정되지 않았습니다.`);
  return value;
};

export const ENV = {
  supabase: {
    url: requireEnvVar('VITE_SUPABASE_URL', SUPABASE_URL),
    anonKey: requireEnvVar('VITE_SUPABASE_ANON_KEY', SUPABASE_ANON_KEY),
    projectId: requireEnvVar('VITE_SUPABASE_PROJECT_ID', SUPABASE_PROJECT_ID)
  },
  database: {
    url: requireEnvVar('VITE_DATABASE_URL', DATABASE_URL)
  },
  kakao: {
    restApiKey: requireEnvVar('VITE_KAKAO_REST_API_KEY', KAKAO_REST_API_KEY),
    javascriptKey: requireEnvVar('VITE_KAKAO_JAVASCRIPT_KEY', KAKAO_JAVASCRIPT_KEY)
  }
};
