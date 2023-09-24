import type {
  Project,
  Repository,
  Commit,
  User,
  Label,
  Changes,
  MergeRequest,
  Issue,
  Snippet,
  StDiff,
  LastCommit,
  Wiki,
  Build,
} from "./common";
import { LiteralUnion } from "./utils";

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
  assignee_ids: number[];
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

export interface NoteEvent {
  object_kind: "note";
  user: User;
  project_id: number;
  project: Project;
  repository: Repository;
  object_attributes: NoteAttributes;
  commit?: Commit;
  merge_request?: MergeRequest;
  issue?: Issue;
  snippet?: Snippet;
}

/**
 * alias for NoteEvent
 */
export type CommentEvent = NoteEvent;

export interface NoteAttributes {
  id: number;
  note: string;
  noteable_type: string;
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

export interface MergeRequestAttributes {
  id: number;
  target_branch: string;
  source_branch: string;
  source_project_id: number;
  author_id: number;
  /**
   * @deprecated
   */
  assignee_id?: number;
  title: string;
  created_at: string;
  updated_at: string;
  milestone_id: null;
  state: string;
  /**
   * @deprecated
   */
  merge_status?:
    | "can_be_merged"
    | "cannot_be_merged"
    | "cannot_be_merged_recheck"
    | "checking";
  target_project_id: number;
  iid: number;
  description: string;
  source: Project;
  target: Project;
  last_commit: LastCommit;
  work_in_progress: boolean;
  url: string;
  action: string;
  assignee: User;
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

export interface BuildEvent {
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
 * alias for BuildEvent
 */
export type JobEvent = BuildEvent;

/**
 * WIP
 */
export interface DeploymentEvent {
  object_kind: "deployment";
  // TODO
}

/**
 * WIP
 */
export interface GroupMemberEvent {
  // TODO
}

/**
 * WIP
 */
export interface SubgroupEvent {
  // TODO
}

/**
 * WIP
 */
export interface FeatureFlagEvent {
  object_kind: "feature_flag";
  project: Project;
  user: User;
  // TODO
}

/**
 * WIP
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
  action: LiteralUnion<"create">;
  assets: Record<string, unknown>;
  commit: Commit;
  // TODO
}

export interface EmojiEvent {
  object_kind: "emoji";
  // event_type: "award";
  user: User;
  project_id: number;
  project: Project;
  object_attributes: Record<string, unknown>;
  note: Record<string, unknown>;
  issue: Issue;
}

/**
 * See [Webhook events | Gitlab](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html)
 */
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
  | ReleaseEvent
  | EmojiEvent;
