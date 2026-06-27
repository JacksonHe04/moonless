> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Personal access tokens

> Create and use personal access tokens for user-scoped API and Workers access.

export const personalAccessTokensUrl = "https://www.notion.so/developers/tokens";

export const developerPortalUrl = "https://www.notion.so/developers";

Personal access tokens (PATs) are user-scoped bearer tokens. A PAT belongs to one Notion user in one workspace, and it uses that user's workspace membership and page permissions when it calls the Notion API.

PATs are useful when you want to authenticate as yourself without creating an [internal connection](/guides/get-started/internal-connections) or implementing the [OAuth flow for a public connection](/guides/get-started/public-connections).

## When to use a PAT

Use a PAT for personal or developer-owned workflows where one Notion user is the right security boundary:

* Local scripts, notebooks, and command-line tools that automate work in your own workspace.
* Development and testing against the Notion API before you create a shared connection.
* Third-party tools that ask you to paste a Notion token and should act with your Notion permissions.
* [Notion Workers](/workers/get-started/overview) development and deployment with the Notion CLI.

Do not use a PAT as the auth model for a product used by many Notion users. For that, create a [public connection](/guides/get-started/public-connections) so each user authorizes access with OAuth. If you need a stable workspace-level bot for a team-owned automation, use an [internal connection](/guides/get-started/internal-connections).

## How PATs work

A PAT is created in the <a href={developerPortalUrl}>Developer portal</a>. When you create one, you choose:

* A token name.
* The workspace the token belongs to.
* Capabilities for the token.

PATs can have two capability bundles:

| Capability     | What it allows                                                                                                                     |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **Notion API** | Read, create, update, and search content; read and create comments; and read supported user information through Notion's REST API. |
| **Workers**    | Deploy and manage [Notion Workers](/workers/get-started/overview) with the Notion CLI.                                             |

The Notion API capability is controlled by the workspace's PAT creation policy. The Workers capability can be granted to workspace members, but Workers feature availability is still checked when you use Workers.

PATs authenticate requests the same way other Notion API tokens do:

<CodeGroup>
  ```http HTTP theme={null}
  GET /v1/users/me HTTP/1.1
  Authorization: Bearer {PERSONAL_ACCESS_TOKEN}
  Notion-Version: 2026-03-11
  ```

  ```javascript JavaScript theme={null}
  const { Client } = require("@notionhq/client")

  const notion = new Client({
    auth: process.env.NOTION_PAT,
  })
  ```
</CodeGroup>

## Permissions and content access

A PAT acts as the user who created it:

* It can access pages, data sources, databases, comments, files, and other resources that the creator can access.
* It does not need pages to be shared with a bot through **Add connections**.
* If the creator loses access to a page or leaves the workspace, the PAT loses that access too.
* API behavior that depends on an authenticated user, such as `"me"` filters or workspace-level private page creation, uses the PAT creator.

PATs are intentionally different from internal connections. An internal connection operates as a separate bot user and only accesses pages explicitly shared with that connection. A PAT uses a real user's permissions, so it is best for user-owned workflows rather than team-owned automations.

<Info>
  [List all users](/reference/get-users) is not available to PATs. A PAT can use [Retrieve token's bot user](/reference/get-self) to retrieve the authorized user, and [Retrieve a user](/reference/get-user) can retrieve that same user.
</Info>

## Workspace admin controls

Workspace admins can manage PATs from **Settings & members → Connections**:

* View all PATs created in the workspace, including active and revoked tokens.
* Search and filter tokens by name, creator, and status.
* See who created a token and, for revoked tokens, who revoked it.
* Revoke active PATs.
* Configure who can create PATs with Notion API access.

Admins cannot reveal or copy another member's token secret. Only the token creator can reveal or copy their own PAT.

If an admin changes the workspace policy so a member is no longer allowed to create PATs with Notion API access, that member's existing PATs stop working for Notion API requests. Those requests return an `unauthorized` error until the policy allows the member again or the member uses a different valid token.

### Who can create PATs

[Guests and restricted members](https://www.notion.com/help/whos-who-in-a-workspace) cannot create PATs or log in with the Notion CLI (`ntn login`). Only full workspace members can create tokens, subject to the workspace's PAT creation policy below. Workspace owners can always create PATs with Notion API access.

| Plan       | Default PAT creation policy           | Admin controls                                                                                                       |
| :--------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------- |
| Free       | Workspace owners only.                | Not configurable.                                                                                                    |
| Plus       | All workspace members.                | Not configurable.                                                                                                    |
| Business   | Workspace owners only.                | Admins can choose **Workspace owners only** or **All workspace members**.                                            |
| Enterprise | Workspace owners and selected groups. | Admins can choose **Workspace owners only**, **Workspace owners and selected groups**, or **All workspace members**. |

On Enterprise, selected groups are managed from the PAT creators settings page. If no groups are selected, workspace owners are the only users who can create PATs with Notion API access.

## Create a PAT

<Steps>
  <Step>
    Open the <a href={developerPortalUrl}>Developer portal</a>.
  </Step>

  <Step>
    Go to <a href={personalAccessTokensUrl}>Personal access tokens</a>.
  </Step>

  <Step>
    Click **New personal access token**.
  </Step>

  <Step>
    Enter a name, choose a workspace, and select the capabilities the token should have.
  </Step>

  <Step>
    Click **Create token**, then copy the token value and store it securely.
  </Step>
</Steps>

PATs expire one year after creation. Create a new PAT and update your scripts or tools before the old token expires.

## Revoke a PAT

Revoke a PAT immediately if it is exposed, no longer needed, or associated with a tool you no longer trust.

* Token creators can revoke their own PATs from the Developer portal.
* Workspace admins can revoke any PAT in their workspace from **Settings & members → Connections → All personal access tokens**.

After revocation, the token immediately stops working for scripts, tools, Workers, and API requests that use it.

## Security best practices

Treat PATs like passwords:

* Store PATs in environment variables or a secret manager.
* Do not commit PATs to source control.
* Use a separate PAT per script, tool, or environment so you can revoke one token without breaking unrelated workflows.
* Grant only the capabilities the workflow needs.
* Revoke tokens you no longer use.

For more guidance, see [Best practices for handling API keys](/guides/get-started/handling-api-keys).
