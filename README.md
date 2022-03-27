# GitLab Event Types

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

## Credits

Thanks to [excaliburhan/node-gitlab-webhook](https://github.com/excaliburhan/node-gitlab-webhook/blob/master/index.d.ts)(MIT License).

## License

MIT
