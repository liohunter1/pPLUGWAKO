const productImageMap: Record<string, string> = {
  // Beer & Cider
  'tusker-lager-500ml': '/images/tusker-lager.jpg',
  'tusker-malt-500ml': '/images/tusker-malt.jpg',
  'guinness-500ml': '/images/guinness.jpg',
  
  // Whisky
  'jameson-750ml': '/images/jameson-750ml.jpg',
  'jameson-black-750ml': '/images/jameson-black.jpg',
  'jameson-1l-750ml': '/images/jameson-1l.jpg',
  'johnnie-walker-black-750ml': '/images/johnnie-black.jpg',
  'johnnie-walker-red-750ml': '/images/johnnie-red.jpg',
  'johnnie-walker-gold-750ml': '/images/johnnie-gold.jpg',
  'johnnie-walker-green-750ml': '/images/johnnie-green.jpg',
  'chivas-regal-12-750ml': '/images/chivas-12.jpg',
  'chivas-regal-18-750ml': '/images/chivas-18.jpg',
  'glenfiddich-12-750ml': '/images/glenfiddich-12.jpg',
  'aberfeldy-12-750ml': '/images/aberfeldy-12.jpg',
  
  // Vodka & Gin
  'ciroc-750ml': '/images/ciroc.jpg',
  'ciroc-pineapple-750ml': '/images/ciroc-pineapple.jpg',
  'absolut-750ml': '/images/absolut.jpg',
  'smirnoff-750ml': '/images/smirnoff.jpg',
  'grey-goose-750ml': '/images/grey-goose.jpg',
  'tanqueray-750ml': '/images/tanqueray.jpg',
  'tanqueray-10-750ml': '/images/tanqueray-10.jpg',
  'tanqueray-sevilla-750ml': '/images/tanqueray-sevilla.jpg',
  
  // Rum
  'bacardi-white-750ml': '/images/bacardi-white.jpg',
  'captain-morgan-750ml': '/images/captain-morgan.jpg',
  'kenya-cane-250ml': '/images/kenya-cane-smooth.jpg',
  'kenya-cane-750ml': '/images/kenya-cane-smooth.jpg',
  'kenya-cane-citrus-750ml': '/images/kenya-cane-citrus.jpg',
  'kenya-cane-pineapple-750ml': '/images/kenya-cane-pineapple.jpg',
  'konyagi-750ml': '/images/konyagi-750ml.jpg',
  
  // Cognac & Brandy
  'hennessy-vs-750ml': '/images/hennessy-vs.jpg',
  'hennessy-vsop-750ml': '/images/hennessy-vsop.jpg',
  'hennessy-xo-750ml': '/images/hennessy-xo.jpg',
  
  // Liqueur
  'baileys-750ml': '/images/baileys.jpg',
  'amarula-750ml': '/images/amarula.jpg',
  
  // Wine
  'whispering-angel-750ml': '/images/whispering-angel.jpg',
  '1659-red-750ml': '/images/1659-red.jpg',
  '1659-rose-750ml': '/images/1659-rose.jpg',
  
  // Non-Alcoholic
  'redbull-watermelon-250ml': '/images/redbull-watermelon-250ml.jpg',
  'redbull-sugarfree-250ml': '/images/redbull-sugarfree-250ml.jpg',
  'chamdor-red-750ml': '/images/chamdor-red-750ml.jpg',
  'chamdor-white-750ml': '/images/chamdor-white-750ml.jpg',
  'codorniu-zero-750ml': '/images/codorniu-zero-750ml.jpg',
  'codorniu-zero-rose-750ml': '/images/codorniu-zero-rose-750ml.jpg',
  'martini-dolce-00-750ml': '/images/martini-dolce-00-750ml.jpg',
};

const categoryImages: Record<string, string[]> = {
  'beer-cider': ['/images/tusker-lager.jpg', '/images/tusker-malt.jpg', '/images/guinness.jpg'],
  'whisky': ['/images/jameson-750ml.jpg', '/images/johnnie-black.jpg', '/images/chivas-12.jpg', '/images/aberfeldy-12.jpg', '/images/glenfiddich-12.jpg'],
  'vodka-gin': ['/images/ciroc.jpg', '/images/absolut.jpg', '/images/smirnoff.jpg', '/images/grey-goose.jpg', '/images/tanqueray.jpg'],
  'rum': ['/images/bacardi-white.jpg', '/images/captain-morgan.jpg', '/images/kenya-cane-smooth.jpg', '/images/konyagi-750ml.jpg'],
  'cognac-brandy': ['/images/hennessy-vs.jpg', '/images/hennessy-vsop.jpg', '/images/hennessy-xo.jpg'],
  'wine': ['/images/1659-red.jpg', '/images/1659-rose.jpg', '/images/whispering-angel.jpg'],
  'liqueur': ['/images/baileys.jpg', '/images/amarula.jpg'],
  'non-alcoholic': ['/images/chamdor-red-750ml.jpg', '/images/codorniu-zero-rose-750ml.jpg', '/images/martini-dolce-00-750ml.jpg', '/images/redbull-watermelon-250ml.jpg', '/images/redbull-sugarfree-250ml.jpg'],
};

const heroImage = '/images/jameson-750ml.jpg';

export function getProductImage(categoryId: string, productId: string): string {
  if (productImageMap[productId]) {
    return productImageMap[productId];
  }
  const images = categoryImages[categoryId] || categoryImages['whisky'];
  const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return images[hash % images.length];
}

export function getCategoryImage(categoryId: string): string {
  const images = categoryImages[categoryId];
  return images ? images[0] : '/images/jameson-750ml.jpg';
}

export { heroImage };
