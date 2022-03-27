# GitLab Event Types

[![Build](https://github.com/lawvs/gitlab-event-types/actions/workflows/build.yml/badge.svg)](https://github.com/lawvs/gitlab-event-types/actions/workflows/build.yml)
[![npm](https://img.shields.io/npm/v/gitlab-event-types)](https://www.npmjs.com/package/gitlab-event-types)

TypeScript definitions for [GitLab Webhook Event](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html).

## Install

```sh
# Use npm
npm install -D gitlab-event-types

# Use yarn
yarn add -D gitlab-event-types

# Use pnpm
pnpm add -D gitlab-event-types
```

## Usages

```ts
import type { WebhookEvents, PushEvent } from "gitlab-event-types";

const isPushEvent = (event: WebhookEvents): event is PushEvent =>
  "object_kind" in event && event.object_kind === "push";

const hookHandler = async (event: WebhookEvents) => {
  if (isPushEvent(event)) {
    console.log(event.commits);
  }
};
```

Or

```ts
import type * as GitlabEventTypes from "gitlab-event-types";

const pushEventHandler = async (event: GitlabEventTypes.PushEvent) => {
  console.log(event.object_kind);
};
```

## Definitions

```ts
export type WebhookEvents =
  | PushEvent
  | TagPushEvent
  | IssueEvent
  | NoteEvent
  | MergeRequestEvent
  | WikiPageEvent
  | PipelineEvent
  | BuildEvent
  | DeploymentEvent
  | GroupMemberEvent
  | SubgroupEvent
  | FeatureFlagEvent
  | ReleaseEvent;
```

## Credits

Thanks to [excaliburhan/node-gitlab-webhook](https://github.com/excaliburhan/node-gitlab-webhook)(MIT License).

## License

MIT
