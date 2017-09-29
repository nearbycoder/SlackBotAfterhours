import bot from './bot';
import { getChannel, getMember } from './botHelpers';
import EmojiParser from './EmojiParser';
import WeatherParser from './WeatherParser';
let channels = [];
let members = [];

bot.on('start', () => {
  bot.getChannels().then(function(data) {
    channels = data.channels;
  });
  bot.getUsers().then(function(data) {
    members = data.members;
  });
});

bot.on('message', data => {
  let channel = getChannel(data, channels);
  let member = getMember(data, members);

  if (data.type === 'message') {
    new EmojiParser(data, channel).run();
    new WeatherParser(data, channel).run();
  }
  if (data.type === 'member_joined_channel') {
    bot.postMessageToChannel(channel.name, `Welcome ${member.name}`);
  }
  if (data.type === 'member_left_channel') {
    bot.postMessageToChannel(channel.name, `Hey @everyone ${member.name} just left`);
  }
});
