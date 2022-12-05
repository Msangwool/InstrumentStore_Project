const { Instrument } = require('../models');                                            // mainPage로 접근하는 경로가
                                                                                        // 일반권한 , 로그인, 관리가 각각이므로 이들을 위한 함수를 제공한다.
exports.getInstrumentInfo = () => Instrument.findAll({
    attributes: ['instrumentId', 'name', 'cost', 'category', 'creatorId']
});
