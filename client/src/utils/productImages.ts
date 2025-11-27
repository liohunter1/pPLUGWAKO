import whiskey1 from '@assets/stock_images/premium_whiskey_bott_84938dad.jpg';
import whiskey2 from '@assets/stock_images/premium_whiskey_bott_843935ac.jpg';
import whiskey3 from '@assets/stock_images/premium_whiskey_bott_014daf9c.jpg';
import vodka1 from '@assets/stock_images/premium_vodka_bottle_adeb2ea9.jpg';
import vodka2 from '@assets/stock_images/premium_vodka_bottle_79e6b98e.jpg';
import vodka3 from '@assets/stock_images/premium_vodka_bottle_9d1800f4.jpg';
import cognac1 from '@assets/stock_images/cognac_hennessy_bott_2c97fa38.jpg';
import cognac2 from '@assets/stock_images/cognac_hennessy_bott_3331e4a9.jpg';
import beer1 from '@assets/stock_images/beer_bottles_dark_ba_f8fa195e.jpg';
import beer2 from '@assets/stock_images/beer_bottles_dark_ba_228aa46d.jpg';
import beer3 from '@assets/stock_images/beer_bottles_dark_ba_c2a9ac0e.jpg';
import wine1 from '@assets/stock_images/wine_bottles_red_whi_b5c3bd2f.jpg';
import wine2 from '@assets/stock_images/wine_bottles_red_whi_d76e6d30.jpg';
import wine3 from '@assets/stock_images/wine_bottles_red_whi_e2e05449.jpg';
import rum1 from '@assets/stock_images/rum_bottle_captain_m_34af5669.jpg';
import rum2 from '@assets/stock_images/rum_bottle_captain_m_cf832c24.jpg';
import gin1 from '@assets/stock_images/gin_bottle_tanqueray_5af188cc.jpg';
import gin2 from '@assets/stock_images/gin_bottle_tanqueray_eda1e656.jpg';
import liqueur1 from '@assets/stock_images/cream_liqueur_bailey_6d25e083.jpg';
import liqueur2 from '@assets/stock_images/cream_liqueur_bailey_1bd2b7dc.jpg';
import heroImage from '@assets/stock_images/luxury_bar_liquor_st_e061ed46.jpg';

const categoryImages: Record<string, string[]> = {
  'beer-cider': [beer1, beer2, beer3],
  'whisky': [whiskey1, whiskey2, whiskey3],
  'vodka-gin': [vodka1, vodka2, vodka3, gin1, gin2],
  'rum': [rum1, rum2],
  'cognac-brandy': [cognac1, cognac2],
  'wine': [wine1, wine2, wine3],
  'liqueur': [liqueur1, liqueur2],
  'non-alcoholic': [vodka1, beer1],
};

export function getProductImage(categoryId: string, productId: string): string {
  const images = categoryImages[categoryId] || [whiskey1];
  const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return images[hash % images.length];
}

export function getCategoryImage(categoryId: string): string {
  const images = categoryImages[categoryId];
  return images ? images[0] : whiskey1;
}

export { heroImage };
