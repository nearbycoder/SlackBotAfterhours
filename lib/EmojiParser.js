import sendRequest from './sendRequest';

class EmojiParser {
  constructor(data, channel) {
    this.message = data;
    this.channel = channel;
  }

  get emoji() {
    return [
      { emoji: 'smile', matchers: ['happy', 'happier', 'excited'] },
      { emoji: 'disappointed', matchers: ['sad', 'upset', 'unhappy'] },
      { emoji: 'house_with_garden', matchers: ['home', 'remote'] }
    ];
  }

  run() {
    let wordsArray = this.message.text.toLowerCase().split(' ');
    let matchingEmojis = [];
    this.emoji.forEach(pair => {
      pair.matchers.forEach(key => {
        wordsArray.some(word => {
          if (word === key) {
            matchingEmojis.push(pair.emoji);
            return;
          }
        });
      });
    });
    this.buildRequest([...new Set(matchingEmojis)]);
  }

  buildRequest(matchingEmojis) {
    matchingEmojis.forEach(emoji => {
      sendRequest('https://slack.com/api/reactions.add', 'EmojiParser', {
        token: process.env.API_TOKEN,
        name: emoji,
        channel: this.channel.id,
        timestamp: this.message.ts
      });
    });
  }
}

export default EmojiParser;
