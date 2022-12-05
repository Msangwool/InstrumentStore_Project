exports.getPercussions = (instruments) => instruments
.filter(instrument => instrument.category == 'percussion')
.map(instrument => [instrument.name, instrument.cost, instrument.creatorId]);

exports.getWinds = (instruments) => instruments
.filter(instrument => instrument.category == 'wind')
.map(instrument => [instrument.name, instrument.cost, instrument.creatorId]);

exports.getStrings = (instruments) => instruments
.filter(instrument => instrument.category == 'string')
.map(instrument => [instrument.name, instrument.cost, instrument.creatorId]);

exports.getKeyboards = (instruments) => instruments
.filter(instrument => instrument.category == 'keyboard')
.map(instrument => [instrument.name, instrument.cost, instrument.creatorId]);