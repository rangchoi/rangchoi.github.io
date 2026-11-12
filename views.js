// 글 상단(.post-meta) 날짜 옆에 GoatCounter 조회수를 붙인다
(function () {
  var meta = document.querySelector('.post-meta');
  if (!meta) return;

  var url = 'https://rangchoi.goatcounter.com/counter/' + encodeURIComponent(location.pathname) + '.json';
  // 응답에 몇 시간짜리 Expires가 붙어 와서, 브라우저 캐시는 쓰지 않는다
  fetch(url, { cache: 'no-cache' })
    // 아직 집계된 방문이 없는 글은 404가 온다
    .then(function (r) { return r.ok ? r.json() : r.status === 404 ? { count: '0' } : null; })
    .then(function (d) {
      if (!d) return;
      var span = document.createElement('span');
      span.className = 'views';
      span.textContent = '조회 ' + d.count;
      meta.appendChild(span);
    })
    .catch(function () {});
})();
