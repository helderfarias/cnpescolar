'use strict';

const testsContext = require.context('.', true, /(test\.js$)|(Helper\.js$)/);

testsContext.keys().forEach(testsContext);
