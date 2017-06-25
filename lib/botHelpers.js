export const getChannel = (data, channels) => {
  let channel;
  if (data.channel) {
    channel = channels.filter(channel => data.channel === channel.id)[0];
  }
  return channel;
};

export const getMember = (data, members) => {
  let member;
  if (data.user) {
    member = members.filter(member => data.user === member.id)[0];
  }
  return member;
};
