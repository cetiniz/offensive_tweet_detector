const cheerio = require('cheerio');
const request = require('request');

module.exports = function get_tweets(user) {
  const url = 'https://twitter.com/i/profiles/show/' + user + '/timeline/tweets?include_available_features=1&include_entities=1&include_new_items_bar=true';
  
  const options = { 
    method: 'GET',
    url: url,
    qs: { 
      include_available_features: '1',
      include_entities: '1',
      include_new_items_bar: 'true' 
    },
    headers: { 
      'Postman-Token': 'a77c53f8-e4a3-49f2-9fa4-47e0d8bee450',
      'Cache-Control': 'no-cache',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Twitter-Active-User': 'yes',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8',
      Referer: 'https://twitter.com/realDonaldTrump',
      Accept: 'application/json, text/javascript, */*; q=0.01' 
    } 
  };

  this.gen_tweets = function(callback, max_position) {
    console.log(max_position)
    if (max_position && parseInt(max_position) > 0) {
      console.log(max_position)
      options.qs.max_position = max_position;
    } else if (options.qs.max_position !== undefined) {
      delete options.qs.max_position;
    }
    console.log()
    request(options, function(err, resp, body) {
      const json_body = body && JSON.parse(body);
      if (json_body && json_body.items_html) {
        tweet_items = json_body.items_html;
      } else {
        console.log('No tweets from this user!');
        return;
      }

      const tweet_data = [];
      const $ = cheerio.load(tweet_items);
      $('.stream-item').each(function(i, elm) {
        const tweet_text = $(this).find('.tweet-text').text();
        const tweet_id = $(this).find('.js-permalink').attr('data-conversation-id');
        const tweet_handle = user;
        tweet_data.push({ tweet_text: tweet_text, tweet_id: tweet_id, tweet_handle: tweet_handle });
      });
      callback(tweet_data);
    })
  }
}
