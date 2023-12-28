
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.baseline.en.5db82a8cb4a58b274e67.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/362.baseline.en.71a9cdb8126de8038f0a.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/845.baseline.en.167d9aca6a4c605025a7.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/598.baseline.en.8bfbb1655756c7f8ce62.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.en.3873779f4bc3308e2fc2.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/731.baseline.en.68ceefcc66cfc32ca175.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/958.baseline.en.57624c0511bb90506fb9.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/917.baseline.en.88daeefe46c532f2180e.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/844.baseline.en.2bcddb1bebd8d00bde9a.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.baseline.en.70face90fedbce52932b.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/362.baseline.en.18c64a7ea22b25582fcb.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.en.bd7e1a04a0d2456be516.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/958.baseline.en.5f2080c96ce3453038d6.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/74.baseline.en.ecca9afed9e660ee7c54.css"];
      var fontPreconnectUrls = ["https://fonts.shopifycdn.com"];
      var fontPrefetchUrls = ["https://fonts.shopifycdn.com/lato/lato_n4.c86cddcf8b15d564761aaa71b6201ea326f3648b.woff2?valid_until=MTcwMzU2Nzg0NA&hmac=8f69e329938dcc847a2c6846c9bc4de915474bb1982abeb08c4f6503bc5c81db","https://fonts.shopifycdn.com/lato/lato_n7.f0037142450bd729bdf6ba826f5fdcd80f2787ba.woff2?valid_until=MTcwMzU2Nzg0NA&hmac=39084d9c96bd40b83e2ae770e27754c32c0af4818c0ddf880a13c677306bea17","https://fonts.shopifycdn.com/roboto/roboto_n4.da808834c2315f31dd3910e2ae6b1a895d7f73f5.woff2?valid_until=MTcwMzU2Nzg0NA&hmac=29c0930f50900a195039955982089324e01db74715ad34e97efb2af282ad1acf","https://fonts.shopifycdn.com/roboto/roboto_n5.126dd24093e910b23578142c0183010eb1f2b9be.woff2?valid_until=MTcwMzU2Nzg0NA&hmac=2fc3367174010a4b4fa6cb344ab757ceec618d3294e3d01a28c5cf42f9f0861a"];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0244/8978/7469/files/img_06_x320.png?v=1639733716","https://cdn.shopify.com/s/files/1/0244/8978/7469/files/img_11_2000x.png?v=1639733682"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res[0], next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  