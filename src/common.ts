import { Compare, LiteralUnion } from "./utils";

export interface StDiff {
  diff: string;
  new_path: string;
  old_path: string;
  a_mode: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
}

export interface Issue {
  id: number;
  iid: number;
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
  state: LiteralUnion<"opened">;
  severity?: LiteralUnion<"unknown">;
}

export interface Snippet {
  id: number;
  title: string;
  content: string;
  author_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  file_name: string;
  expires_at: string;
  type: string;
  visibility_level: number;
}

export interface Commit {
  id: string;
  message: string;
  title?: string;
  timestamp: string;
  url: string;
  author: Author;
  added?: string[];
  modified?: string[];
  removed?: string[];
}

export interface Build {
  id: number;
  stage: string;
  name: string;
  status: string;
  created_at: string;
  started_at?: string;
  finished_at?: string;
  when: string;
  manual: boolean;
  user: User;
  runner: any;
  artifacts_file: ArtifactsFile;
}

export interface ArtifactsFile {
  filename: string;
  size: number;
}

export interface Label {
  id: number;
  title: string;
  color: string;
  project_id: number;
  created_at: string;
  updated_at: string;
  template: boolean;
  description: string;
  type: LiteralUnion<"ProjectLabel">;
  group_id: number;
}

export interface Changes {
  milestone_id: Compare<number | null>;
  updated_by_id: Compare<number | null>;
  updated_at: Compare<string>;
  draft: Compare<boolean>;
  labels: Compare<Label[]>;
  last_edited_at: Compare<string | null>;
  last_edited_by_id: Compare<number | null>;
  assignees: Compare<User[]>;
  reviewers: Compare<User[]>;
  description: Compare<string>;
}

/**
 * Use `detailed_merge_status` instead of `merge_status` to account for all potential statuses.
 *
 * - The `detailed_merge_status` field can contain one of the following values related to the merge request:
 *   - `approvals_syncing`: The merge request’s approvals are syncing.
 *   - `checking`: Git is testing if a valid merge is possible.
 *   - `ci_must_pass`: A CI/CD pipeline must succeed before merge.
 *   - `ci_still_running`: A CI/CD pipeline is still running.
 *   - `commits_status`: Source branch should exist, and contain commits.
 *   - `conflict`: Conflicts exist between the source and target branches.
 *   - `discussions_not_resolved`: All discussions must be resolved before merge.
 *   - `draft_status`: Can’t merge because the merge request is a draft.
 *   - `jira_association_missing`: The title or description must reference a Jira issue. To configure, see Require associated Jira issue for merge requests to be merged.
 *   - `mergeable`: The branch can merge cleanly into the target branch.
 *   - `merge_request_blocked`: Blocked by another merge request.
 *   - `merge_time`: May not be merged until after the specified time.
 *   - `need_rebase`: The merge request must be rebased.
 *   - `not_approved`: Approval is required before merge.
 *   - `not_open`: The merge request must be open before merge.
 *   - `preparing`: Merge request diff is being created.
 *   - `requested_changes`: The merge request has reviewers who have requested changes.
 *   - `security_policy_violations`: All security policies must be satisfied.
 *   - `status_checks_must_pass`: All status checks must pass before merge.
 *   - `unchecked`: Git has not yet tested if a valid merge is possible.
 *   - `locked_paths`: Paths locked by other users must be unlocked before merging to default branch.
 *   - `locked_lfs_files`: LFS files locked by other users must be unlocked before merge.
 *   - `title_regex`: Checks whether the title matches the expected regex, if configured in project settings.
 *
 * Learn more https://docs.gitlab.com/api/merge_requests/#merge-status
 */
export type DetailedMergeStatus =
  | "approvals_syncing"
  | "checking"
  | "ci_must_pass"
  | "ci_still_running"
  | "commits_status"
  | "conflict"
  | "discussions_not_resolved"
  | "draft_status"
  | "jira_association_missing"
  | "mergeable"
  | "merge_request_blocked"
  | "merge_time"
  | "need_rebase"
  | "not_approved"
  | "not_open"
  | "preparing"
  | "requested_changes"
  | "security_policy_violations"
  | "status_checks_must_pass"
  | "unchecked"
  | "locked_paths"
  | "locked_lfs_files"
  | "title_regex";

export interface BasesMergeRequestAttributes {
  id: number;
  iid: number;
  target_branch: string;
  target_project_id: number;
  source_branch: string;
  source_project_id: number;
  author_id: number;
  /**
   * @deprecated The fields `assignee_id` and `merge_status` are [deprecated](https://docs.gitlab.com/ee/api/merge_requests.html).
   */
  assignee_id?: number;
  title: string;
  created_at: string;
  updated_at: string;
  milestone_id: number | null;
  state: "opened" | "closed";
  /**
   * @deprecated Use `detailed_merge_status` instead of `merge_status` to account for all potential statuses.
   */
  merge_status?:
    | "unchecked"
    | "can_be_merged"
    | "cannot_be_merged"
    | "cannot_be_merged_recheck"
    | "checking";
  detailed_merge_status: DetailedMergeStatus;
  description: string;
  position: number;
  source: Project;
  target: Project;
  last_commit: LastCommit;
  work_in_progress: boolean;
  draft?: boolean;
  assignee?: User;
  labels?: Label[];
}

export interface User {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  email?: string;
}

export interface LastCommit {
  id: string;
  message: string;
  timestamp: string;
  url: string;
  author: Author;
}

export interface Author {
  name: string;
  email: string;
}

export interface Project {
  name: string;
  description: string;
  web_url: string;
  avatar_url: string;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
  id?: number;
}

export interface Repository {
  name: string;
  url: string;
  description: string;
  homepage: string;
}

export interface Wiki {
  web_url: string;
  git_ssh_url: string;
  git_http_url: string;
  path_with_namespace: string;
  default_branch: string;
}
