/** Mirrors thinkable_hero_background_style() in functions.php: featured image, else the theme fallback. */
export function heroStyle(gradient: string, featuredImage?: string, fallback = '/images/Top_Pg_Patient_01%201.png') {
  const img = featuredImage ? encodeURI(featuredImage) : fallback;
  return { background: `${gradient}, url("${img}") center / cover no-repeat` } as const;
}

export const HERO_GRADIENTS = {
  internal: 'linear-gradient(90deg, rgba(0, 65, 59, 0.9), rgba(0, 109, 98, 0.76))',
  partner: 'linear-gradient(90deg, rgba(0, 55, 50, 0.94), rgba(0, 110, 98, 0.72))',
  resource: 'linear-gradient(90deg, rgba(0, 55, 50, 0.94), rgba(0, 103, 94, 0.84))',
} as const;
