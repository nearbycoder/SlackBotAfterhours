import YQL from 'yql';
import bot from './bot';

class WeatherParser {
  constructor(data, channel) {
    this.message = data;
    this.channel = channel;
    this.normalizeMessageArray = this.message.text.toLowerCase().split(' ');
  }

  get weatherFound() {
    return this.normalizeMessageArray.some(message => message === 'weather');
  }

  get location() {
    return this.normalizeMessageArray.filter(message =>
      message.match(/\b\d{5}\b/g)
    )[0];
  }

  get weatherAndLocationNotPresent() {
    return !this.weatherFound || (this.weatherFound && !this.location);
  }

  run() {
    if (this.weatherAndLocationNotPresent) return;
    this.query.exec((err, data) => {
      if (err) return;
      let { city, region } = data.query.results.channel.location;
      let { temp, text } = data.query.results.channel.item.condition;

      bot.postMessageToChannel(
        this.channel.name,
        `The weather in ${city}, ${region} right now, is ${text.toLowerCase()} and ${temp} degrees.`
      );
    });
  }

  get query() {
    return new YQL(
      `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${this.location}')`
    );
  }
}

export default WeatherParser;
