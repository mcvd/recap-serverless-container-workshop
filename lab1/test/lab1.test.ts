import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import Lab1 = require('../lib/lab1-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Lab1.Lab1Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});