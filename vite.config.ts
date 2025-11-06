import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/gloss1/' : '/',
  // GitHub Pages에 배포할 때는 저장소 이름으로 base를 설정하세요
})

