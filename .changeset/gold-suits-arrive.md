---
'@backstage/plugin-catalog-react': minor
'@backstage/plugin-catalog': patch
---

`@backstage/plugin-catalog-react`: Exported `useStarredEntitiesCount`, `useOwnedEntitiesCount`, and `useAllEntitiesCount` as public API, allowing custom catalog UI components to display accurate entity counts consistent with the sidebar.

`@backstage/plugin-catalog`: Fixed a bug where the catalog table header showed an incorrect entity count when the Starred, Owned, or All filter was active and multiple entities shared the same name in different namespaces. The count in the table header now uses the same hook-based count as the sidebar filter, correctly deduplicating by full `kind:namespace/name` reference rather than name alone.
