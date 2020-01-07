import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import Lab2 = require('../lib/lab2-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Lab2.Lab2Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});