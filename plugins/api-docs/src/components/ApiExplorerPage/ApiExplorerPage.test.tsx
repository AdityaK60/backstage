/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { renderInTestApp } from '@backstage/test-utils';
import { useOutlet } from 'react-router-dom';
import { ApiExplorerPage } from './ApiExplorerPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutlet: jest.fn().mockReturnValue('Route Children'),
}));

jest.mock('./DefaultApiExplorerPage', () => ({
  DefaultApiExplorerPage: jest.fn().mockReturnValue('DefaultApiExplorerPage'),
}));

describe('ApiExplorerPage', () => {
  it('renders provided router element', async () => {
    const { getByText } = await renderInTestApp(<ApiExplorerPage />);

    expect(getByText('Route Children')).toBeInTheDocument();
  });

  it('renders DefaultApiExplorerPage home when no router children are provided', async () => {
    (useOutlet as jest.Mock).mockReturnValueOnce(null);
    const { getByText } = await renderInTestApp(<ApiExplorerPage />);

    expect(getByText('DefaultApiExplorerPage')).toBeInTheDocument();
  });
});
