import test from 'ava';

import React from 'react';
import ImageContainer from './index';

import { render } from 'enzyme';

test('is instantiable', t => {
  const wrapper = render(<ImageContainer />);

  t.ok(wrapper);
});
