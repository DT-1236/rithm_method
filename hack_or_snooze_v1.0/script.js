$(() => {
  $('.nav-submit').on('click', () => {
    $('#slideup').slideToggle();
  });

  $('button').click(() => {
    let title = $('#inputTitle').val();
    let url = $('#inputUrl').val();
    addLink(title, url);

    $('#slideup').slideToggle();
  });

  $('ol').on('click', 'i', e => {
    $(e.target).toggleClass('far fas');
  });

  $('ol').on('click', 'small', e => {
    filterByDomain($(e.target).text());
  });

  $('.nav-fav').click(showFavorites);
});

function addLink(title, url) {
  $('ol').append(
    $('<li>')
      .append($('<i>', { class: 'far fa-star' }))
      .append(
        $('<a>', { class: 'large-link', href: `${url}`, text: `\n${title}\n` })
      )
      .append(
        $('<a>', {
          class: 'small-link',
          href: `#`
        }).append($('<small>', { text: `(${getShortLink(url)})` }))
      )
  );
}

function getShortLink(url) {
  let shortLink = '';

  if (url.slice(0, 13).includes('www.')) {
    shortLink = url.slice(url.indexOf('.') + 1);
  } else {
    shortLink = url.slice(url.indexOf('//') + 2);
  }

  if (shortLink.indexOf('/') === -1) {
    return shortLink.slice(0);
  } else {
    return shortLink.slice(0, shortLink.indexOf('/'));
  }
}

function showFavorites() {
  if ($('.nav-fav').text() === 'favorites') {
    $('ol').css({ listStyle: 'none' });

    $('li:has(i.far)').css({ display: 'none' });

    $('.nav-fav').text('all');
  } else {
    $('li').css({ display: 'list-item' });

    $('ol').css({ listStyle: 'decimal' });
    $('.nav-fav').text('favorites');
  }
}

function filterByDomain(domain) {
  $(`li:has(small:not(small:contains(${domain})))`).css({ display: 'none' });
  $('.nav-fav').text('all');
  $('ol').css({ listStyle: 'none' });
}
