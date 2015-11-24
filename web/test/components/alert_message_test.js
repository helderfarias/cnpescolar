/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import createComponent from 'helpers/shallowRenderHelper';

import AlertMessage from 'components/comuns/alert_message';

describe('AlertMessage', () => {

    let Alert;

    beforeEach(() => {
        Alert = createComponent(AlertMessage);
    });

    it('should have its component name as default className', () => {
        expect(Alert.props).to.not.be.null;
    });

});
