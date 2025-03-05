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

export interface MergeRequest {
  id: number;
  target_branch: string;
  source_branch: string;
  source_project_id: number;
  author_id: number;
  assignee_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  milestone_id: number;
  state: string;
  merge_status:
    | "can_be_merged"
    | "cannot_be_merged"
    | "cannot_be_merged_recheck"
    | "checking";
  target_project_id: number;
  iid: number;
  description: string;
  position: number;
  source: Project;
  target: Project;
  last_commit: LastCommit;
  work_in_progress: boolean;
  assignee: User;
  /**
   * Returns merge requests which have been approved by all the users with the given `id`.
   * Maximum of 5. `None` returns merge requests with no approvals.
   * `Any` returns merge requests with an approval.
   */
  approved_by_ids?: number[];
  /**
   * Returns merge requests which have specified all the users with the given `id` as individual approvers.
   * `None` returns merge requests without approvers.
   * `Any` returns merge requests with an approver.
   */
  approver_ids?: number[];
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
