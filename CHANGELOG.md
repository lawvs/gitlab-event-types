# Changelog

All notable changes to this project will be documented in this file.

The format roughly follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/).

## [3.0.1] - 2025-08-22

### Added

- New event types:
  - `ProjectEvent`
  - `MilestoneEvent`
  - `AccessTokenEvent`
  - `VulnerabilityEvent`
- `DetailedMergeStatus` union type enumerating all documented merge statuses.
- Additional properties across existing events:
  - `PipelineEvent.merge_request?`
  - `MergeRequestAttributes.oldrev?`
  - `CommentEvent.event_type` supporting confidential notes (`note` | `confidential_note`).

### Changed

- `MergeRequestAttributes` now extends `BaseMergeRequestAttributes` instead of duplicating fields.
- `MergeRequestAttributes.action` narrowed to a strict union (`open|close|reopen|update|approved|unapproved|approval|unapproval|merge`).
- `MergeRequest` now renames to `BaseMergeRequestAttributes`.

### Removed

### Migration Guide

Migration imports:

Old: `import type { MergeRequest } from 'gitlab-event-types';`
New: `import type { BaseMergeRequestAttributes } from 'gitlab-event-types';`

Replace annotations of `MergeRequest` with `BaseMergeRequestAttributes`.
Use `detailed_merge_status: DetailedMergeStatus` instead of `merge_status`.

---

## [2.1.1] - 2025-03-05

Previous version (see Git history for details).

---

[3.0.0]: https://github.com/lawvs/gitlab-event-types/compare/v2.1.1...v3.0.0
[2.1.1]: https://github.com/lawvs/gitlab-event-types/releases/tag/v2.1.1
