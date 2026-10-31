import dust from '@/public/images/video-covers/dust.webp';
import mirage from '@/public/images/video-covers/mirage.webp';
import ancient from '@/public/images/video-covers/ancient.webp';
import highlights from '@/public/images/video-covers/highlights.webp';
import tournament from '@/public/images/video-covers/tournament.webp';

export function videoCover(title: string, series: string) {
  if (series === 'Tournament') return tournament;
  const name = title.toLowerCase();
  if (name.includes('dust') || /\bd2\b/.test(name)) return dust;
  if (name.includes('mirage')) return mirage;
  if (name.includes('ancient')) return ancient;
  return highlights;
}
