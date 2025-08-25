import { createOptimizedPicture } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const products = 'https://main--demo-boilerplate--lamontacrook.hlx.page/misc/products.json?sheets=tory-burch';

  const lastDiv = [...block.children].pop();
  const skus = lastDiv.querySelector('p').textContent.split(',');
  console.log(skus);
  const ul = document.createElement('ul');

  const productsResponse = await fetch(products);
  if (productsResponse.ok) {
    const p = await productsResponse.json();
    p.data.forEach(product => skus.forEach(sku => {
      console.log('Evaluating', product.SKU, sku, product.SKU === sku);
      if (product.SKU === sku) {
        console.log('Match', product.SKU, sku);
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.className = 'product-card-image';
        // const optimizedPic = createOptimizedPicture(product['Image {width:80}'], 'DM Image', false, [{ width: '750' }]);
        div.innerHTML = `<img src="${product['Image {width:80}']}" alt="${product['Product Name']}">`;
        const p = document.createElement('p');
        p.textContent = product['Product Name'];
        li.append(div, p);
        ul.append(li);
      }
    }));
  }
  console.log(ul);
  const place =lastDiv.querySelector('div');
  place.append(ul);
  // block.append(ul);
}