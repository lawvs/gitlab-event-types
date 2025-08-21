import type {
  Project,
  Repository,
  Commit,
  User,
  Label,
  Changes,
  BasesMergeRequestAttributes,
  Issue,
  Snippet,
  StDiff,
  Wiki,
  Build,
} from "./common";

export interface PushEvent {
  object_kind: "push";
  before: string;
  after: string;
  ref: string;
  checkout_sha: string;
  user_id: number;
  user_name: string;
  user_username: string;
  user_email: string;
  user_avatar: string;
  project_id: number;
  project: Project;
  repository: Repository;
  commits: Commit[];
  total_commits_count: number;
}

export interface TagPushEvent {
  object_kind: "tag_push";
  before: string;
  after: string;
  ref: string;
  checkout_sha: string;
  user_id: number;
  user_name: string;
  user_avatar: string;
  project_id: number;
  project: Project;
  repository: Repository;
  commits: Commit[];
  total_commits_count: number;
}

export interface IssueEvent {
  object_kind: "issue";
  user: User;
  project: Project;
  repository: Repository;
  object_attributes: IssueAttributes;
  assignees: User[];
  assignee: User;
  labels: Label[];
  changes: Partial<Changes>;
}

export interface IssueAttributes {
  id: number;
  title: string;
  /**
   * @deprecated The `assignee` and `assignee_id` keys are deprecated and contain the first assignee only.
   */
  assignee_ids: number[];
  /**
   * @deprecated The `assignee` and `assignee_id` keys are deprecated and contain the first assignee only.
   */
  assignee_id: number;
  author_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  position: number;
  branch_name: string;
  description: string;
  milestone_id: number;
  state: string;
  iid: number;
  url: string;
  action: string;
}

export interface CommentEvent {
  object_kind: "note";
  /**
   * The `event_type` is set to `confidential_note` for confidential issues.
   */
  event_type: "note" | "confidential_note";
  user: User;
  project_id: number;
  project: Project;
  repository: Repository;
  object_attributes: NoteAttributes;
  commit?: Commit;
  merge_request?: BasesMergeRequestAttributes;
  issue?: Issue;
  snippet?: Snippet;
}

/**
 * Alias for CommentEvent
 *
 * @deprecated Use CommentEvent instead.
 */
export type NoteEvent = CommentEvent;

export interface NoteAttributes {
  id: number;
  note: string;
  noteable_type: "Commit" | "MergeRequest" | "Issue" | "Snippet";
  author_id: number;
  created_at: string;
  updated_at: string;
  project_id: number;
  attachment: unknown;
  line_code: string;
  commit_id: string;
  noteable_id: number | null;
  system: boolean;
  st_diff: StDiff;
  url: string;
  description?: string;
  /**
   * `object_attributes.action` property [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/147856) in GitLab 16.11.
   */
  action?: "create" | "update";
}

export interface MergeRequestEvent {
  object_kind: "merge_request";
  user: User;
  project: Project;
  repository: Repository;
  object_attributes: MergeRequestAttributes;
  labels: Label[];
  changes: Partial<Changes>;
  assignees: User[];
  reviewers: User[];
}

export interface MergeRequestAttributes extends BasesMergeRequestAttributes {
  assignee_ids: number[];
  reviewer_ids: number[];
  last_edited_at: string;
  last_edited_by_id: number;
  state_id: number;
  blocking_discussions_resolved: boolean;
  first_contribution: boolean;
  prepared_at: string;
  total_time_spent: number;
  time_change: number;
  /**
   * @example "30m"
   */
  human_total_time_spent: string | null;
  /**
   * @example "30s"
   */
  human_time_change: string | null;
  /**
   * @example "30m"
   */
  human_time_estimate: string | null;
  /**
   * @example "http://example.com/diaspora/merge_requests/1"
   */
  url: string;
  action:
    | "open"
    | "close"
    | "reopen"
    | "update"
    | "approved"
    | "unapproved"
    | "approval"
    | "unapproval"
    | "merge";
  /**
   * The field `object_attributes.oldrev` is only available when there are actual code changes, like:
   * - New code is pushed.
   * - A suggestion is applied.
   */
  oldrev?: string;
}

export interface WikiPageEvent {
  object_kind: "wiki_page";
  user: User;
  project: Project;
  wiki: Wiki;
  object_attributes: WikiPageAttributes;
}

export interface WikiPageAttributes {
  title: string;
  content: string;
  format: string;
  message: string;
  slug: string;
  url: string;
  action: string;
}

export interface PipelineEvent {
  object_kind: "pipeline";
  object_attributes: PipelineAttributes;
  merge_request?: BasesMergeRequestAttributes;
  user: User;
  project: Project;
  commit: Commit;
  builds: Build[];
}

export interface PipelineAttributes {
  id: number;
  ref: string;
  tag: boolean;
  sha: string;
  before_sha: string;
  status: string;
  stages: string[];
  created_at: string;
  finished_at: string;
  duration: number;
}

export interface JobEvent {
  object_kind: "build";
  ref: string;
  tag: boolean;
  before_sha: string;
  sha: string;
  build_id: number;
  build_name: string;
  build_stage: string;
  build_status: string;
  build_started_at: string;
  build_finished_at: string;
  build_duration: any;
  build_allow_failure: boolean;
  project_id: number;
  project_name: string;
  user: User;
  commit: Commit;
  repository: Repository;
}

/**
 * Alias for JobEvent
 *
 * @deprecated Use JobEvent instead.
 */
export type BuildEvent = JobEvent;

/**
 * Deployment events are triggered when a deployment starts, succeeds, fails, or is canceled.
 *
 * https://docs.gitlab.com/user/project/integrations/webhook_events/#deployment-events
 */
export interface DeploymentEvent {
  object_kind: "deployment";
  status: "running" | "success" | "failed" | "canceled";
  status_changed_at: string;
  deployment_id: number;
  deployable_id: number | null;
  deployable_url: string | null;
  environment: string;
  environment_tier: string;
  environment_slug: string;
  environment_external_url: string | null;
  project: Project;
  short_sha: string;
  user: User;
  user_url: string;
  commit_url: string;
  commit_title: string;
}

/**
 * Tier: Premium, Ultimate
 *
 * Access request events introduced in GitLab 17.4.
 *
 * https://docs.gitlab.com/user/project/integrations/webhook_events/#group-member-events
 */
export interface GroupMemberEvent {
  created_at: string;
  updated_at: string;
  group_name: string;
  group_path: string;
  group_id: number;
  user_username: string;
  user_name: string;
  user_email: string;
  user_id: number;
  group_access: "Guest" | "Developer" | string;
  group_plan: string | null;
  expires_at: string;
  event_name:
    | "user_add_to_group"
    | "user_update_for_group"
    | "user_remove_from_group"
    | "user_access_request_to_group"
    | "user_access_request_denied_for_group";
}

/**
 * Tier: Premium, Ultimate
 *
 * Introduced in GitLab 17.6.
 *
 * https://docs.gitlab.com/user/project/integrations/webhook_events/#project-events
 */
export interface ProjectEvent {
  event_name: "project_create" | "project_destroy";
  created_at: string;
  updated_at: string;
  name: string;
  path: string;
  path_with_namespace: string;
  project_id: number;
  project_namespace_id: number;
  owners: User[];
  project_visibility: "private" | string;
}

/**
 * Tier: Premium, Ultimate
 *
 * https://docs.gitlab.com/user/project/integrations/webhook_events/#subgroup-events
 */
export interface SubgroupEvent {
  created_at: string;
  updated_at: string;
  event_name: "subgroup_create" | "subgroup_destroy";
  name: string;
  path: string;
  full_path: string;
  group_id: number;
  parent_group_id: number;
  parent_name: string;
  parent_path: string;
  parent_full_path: string;
}

/**
 * Feature flag events are triggered when a feature flag is turned on or off.
 *
 * https://docs.gitlab.com/user/project/integrations/webhook_events/#feature-flag-events
 */
export interface FeatureFlagEvent {
  object_kind: "feature_flag";
  project: Project;
  user: User;
  user_url: string;
  object_attributes: {
    id: number;
    name: string;
    description: string;
    active: boolean;
  };
}

/**
 * Delete release event introduced in GitLab 16.5.
 *
 * https://docs.gitlab.com/user/project/integrations/webhook_events/#release-events
 */
export interface ReleaseEvent {
  object_kind: "release";
  id: number;
  created_at: string;
  description: string;
  name: string;
  tag: string;
  project: Project;
  url: string;
  action: "create" | "update" | "delete";
  /**
   * WIP
   */
  assets: Record<string, unknown>;
  commit: Commit;
}

/**
 * Milestone events are triggered when a milestone is created, closed, reopened, or deleted.
 *
 * Introduced in GitLab 18.2.
 *
 * https://docs.gitlab.com/user/project/integrations/webhook_events/#milestone-events
 */
export interface MilestoneEvent {
  object_kind: "milestone";
  event_type: "milestone";
  project: Project;
  object_attributes: MilestoneAttributes;
  action: "create" | "close" | "reopen" | "delete";
}

export interface MilestoneAttributes {
  id: number;
  iid: number;
  title: string;
  description: string;
  state: "active" | "closed";
  created_at: string;
  updated_at: string;
  due_date: string | null;
  start_date: string | null;
  group_id: number | null;
  project_id: number;
}

export interface EmojiEvent {
  object_kind: "emoji";
  event_type: "award" | "revoke";
  user: User;
  project_id: number;
  project: Project;
  object_attributes: EmojiAttributes;
  /**
   * WIP
   */
  note: Record<string, unknown>;
  issue: Issue;
}

export interface EmojiAttributes {
  user_id: number;
  created_at: string;
  id: number;
  name: string;
  awardable_type: "Note" | string;
  awardable_id: number;
  updated_at: string;
  action: "award" | "revoke";
  awarded_on_url: string;
}

/**
 * Access token expiry events trigger before an access token expires.
 *
 * Introduced in GitLab 16.10 with a flag named access_token_webhooks. Disabled by default.
 * Enabled on GitLab.com in GitLab 16.11.
 * Generally available in GitLab 16.11. Feature flag access_token_webhooks removed.
 * full_path attribute added in GitLab 17.4.
 * 60 and 30 day notifications generally available in GitLab 17.7.
 *
 * https://docs.gitlab.com/user/project/integrations/webhook_events/#project-and-group-access-token-events
 */
export interface AccessTokenEvent {
  object_kind: "access_token";
  project?: Project;
  group?: {
    group_name: string;
    group_path: string;
    group_id: number;
    full_path: string;
  };
  object_attributes: AccessTokenAttributes;
  event_name: "expiring_access_token";
}

export interface AccessTokenAttributes {
  user_id: number;
  created_at: string;
  id: number;
  name: string;
  expires_at: string;
}

/**
 * Introduced in GitLab 17.7 with a flag named vulnerabilities_as_webhook_events. Disabled by default.
 * Creating an event when a vulnerability is created or when an issue is linked to a vulnerability introduced in GitLab 17.8.
 * Generally available in GitLab 17.11. Feature flag vulnerabilities_as_webhook_events removed.
 *
 * https://docs.gitlab.com/user/project/integrations/webhook_events/#vulnerability-events
 */
export interface VulnerabilityEvent {
  object_kind: "vulnerability";
  object_attributes: VulnerabilityAttributes;
}

export interface VulnerabilityAttributes {
  url: string;
  title: string;
  state: "detected" | "confirmed" | "dismissed" | "resolved";
  project_id: number;
  location: {
    file: string;
    dependency?: {
      package: {
        name: string;
      };
      version: string;
    };
  };
  cvss: Array<{
    vector: string;
    vendor: string;
  }>;
  severity: "info" | "unknown" | "low" | "medium" | "high" | "critical";
  severity_overridden: boolean;
  identifiers: Array<{
    name: string;
    external_id: string;
    external_type: string;
    url: string;
  }>;
  issues: Array<{
    title: string;
    url: string;
    created_at: string;
    updated_at: string;
  }>;
  report_type: string;
  confidence:
    | "ignore"
    | "unknown"
    | "experimental"
    | "low"
    | "medium"
    | "high"
    | "confirmed";
  confidence_overridden: boolean;
  confirmed_at: string | null;
  confirmed_by_id: number | null;
  dismissed_at: string | null;
  dismissed_by_id: number | null;
  resolved_on_default_branch: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * See [Webhook events | Gitlab](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html)
 */
export type WebhookEvents =
  | PushEvent
  | TagPushEvent
  | IssueEvent
  | CommentEvent
  | MergeRequestEvent
  | WikiPageEvent
  | PipelineEvent
  | JobEvent
  | DeploymentEvent
  | GroupMemberEvent
  | ProjectEvent
  | SubgroupEvent
  | FeatureFlagEvent
  | ReleaseEvent
  | MilestoneEvent
  | EmojiEvent
  | AccessTokenEvent
  | VulnerabilityEvent;
