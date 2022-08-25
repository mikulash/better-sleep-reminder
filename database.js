export const data = {
  // todo change to proper data
  should: [
    {name: 'view sunlight', from: '00:00', to: '24:00'},
    {name: 'hot shower', from: '00:00', to: '04:00'},
  ],
  can: [
    {name: 'caffeine', from: '00:00', to: '24:00'},
    {name: 'workout', from: '00:00', to: '22:00'},
    {name: 'cold shower', from: '00:00', to: '12:00'},
    {name: 'drink water', from: '00:00', to: '12:00'},
  ],
};

export const getWhatHeCan = time => {
  return data.can.filter(item => item.from < time && item.to > time);
};
export const getWhatHeShould = time => {
  return data.should.filter(item => item.from < time && item.to > time);
};
export const getWhatHeShouldNot = time => {
  let result = data.should.filter(item => item.from > time || item.to < time);
  result.push(...data.can.filter(item => item.from > time || item.to < time));
  return result;
};
