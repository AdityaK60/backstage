/*
 * Copyright 2023 The Backstage Authors
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

import {
  compatWrapper,
  convertLegacyRouteRefs,
} from '@backstage/core-compat-api';
import { createFrontendPlugin } from '@backstage/frontend-plugin-api';
import { catalogIndexRouteRef } from './routes';
import { EntityCardBlueprint } from '@backstage/plugin-catalog-react/alpha';

/** @alpha */
const EntityGroupProfileCard = EntityCardBlueprint.make({
  name: 'group-profile',
  params: {
    type: 'info',
    filter: { kind: 'group' },
    loader: async () =>
      import('./components/Cards/Group/GroupProfile/GroupProfileCard').then(m =>
        compatWrapper(<m.GroupProfileCard />),
      ),
  },
});

/** @alpha */
const EntityMembersListCard = EntityCardBlueprint.make({
  name: 'members-list',
  params: {
    filter: { kind: 'group' },
    loader: async () =>
      import('./components/Cards/Group/MembersList/MembersListCard').then(m =>
        compatWrapper(<m.MembersListCard />),
      ),
  },
});

/** @alpha */
const EntityOwnershipCard = EntityCardBlueprint.make({
  name: 'ownership',
  params: {
    filter: { kind: { $in: ['group', 'user'] } },
    loader: async () =>
      import('./components/Cards/OwnershipCard/OwnershipCard').then(m =>
        compatWrapper(<m.OwnershipCard />),
      ),
  },
});

/** @alpha */
const EntityUserProfileCard = EntityCardBlueprint.makeWithOverrides({
  name: 'user-profile',
  config: {
    schema: {
      maxRelations: z => z.number().optional(),
      hideIcons: z => z.boolean().default(false),
    },
  },
  factory(originalFactory, { config }) {
    return originalFactory({
      type: 'info',
      filter: { kind: 'user' },
      loader: async () =>
        import('./components/Cards/User/UserProfileCard/UserProfileCard').then(
          m =>
            compatWrapper(
              <m.UserProfileCard
                maxRelations={config.maxRelations}
                hideIcons={config.hideIcons}
              />,
            ),
        ),
    });
  },
});

/** @alpha */
export default createFrontendPlugin({
  pluginId: 'org',
  info: { packageJson: () => import('../package.json') },
  extensions: [
    EntityGroupProfileCard,
    EntityMembersListCard,
    EntityOwnershipCard,
    EntityUserProfileCard,
  ],
  externalRoutes: convertLegacyRouteRefs({
    catalogIndex: catalogIndexRouteRef,
  }),
});

export { orgTranslationRef } from './translation';
