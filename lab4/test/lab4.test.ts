import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import Lab4 = require('../lib/lab4-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Lab4.Lab4Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});