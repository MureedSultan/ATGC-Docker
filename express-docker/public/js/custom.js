/*
var api = ghost.url.api('posts', {
    absolute_urls: true
});
var url = 'http://localhost:2368/ghost/api/v0.1/' + api;

// === GET ARTICLES === 

$.get(url)
    .done(function(data) {
        $('.spinner').hide();

        data.posts.map(function(post) {
            $('#append').append(article(post));
        });

    })
    .fail(function(err) {
        console.log(err);
    });

// === ARTICLE TEMPLATE ===

function article({
    title,
    slug,
    published_at,
    feature_image,
    html
}) {
    var img;
    var link = 'news/' + slug;
    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    var date = new Date(published_at).toLocaleDateString('en-us', options);
    if (feature_image) {
        img = `
            <a href="${link}">
                <img alt="Image" src="${feature_image}"/>
            </a>
        `;
    } else {
        img = ``;
    }
    return `
        <article class="masonry__item">
            <div class="article__title text-center">
                <a href="${link}">
                    <h2>${title}</h2>
                </a>
                <span>${date}</span>
            </div>
            <div class="article__body">
                ${img}
                <p>${$(html).text().substring(0,300).trim()+'...'}</p>
                <a href="${link}">Continue reading »</a>
            </div>
        </article>
    `;
}

/*
<article class="masonry__item">
    <div class="article__title text-center">
        <a href="">
            <h2>title</h2>
        </a>
        <span>date</span>
    </div>
    <div class="article__body">
        
        <p>contnet</p>
        <a href="">Continue reading »</a>
    </div>
</article>