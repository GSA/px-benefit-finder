#!/bin/bash

#Waiting a few seconds for GitHub to create the previous ticket.
sleep 10

# Check if running in CloudFoundry environment
if [ -d "/home/vcap/deps/0/bin" ]; then
  home="/home/vcap"
  PATH="${PATH}:${home}/deps/0/bin/"
else
  # Set to a similar path on a plain Ubuntu install
  home="$HOME"
  PATH="${PATH}:/usr/local/bin/"
fi

VERSION=$(curl -s "https://api.github.com/repos/cli/cli/releases/latest" | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/' | cut -c2-)
curl -sSL "https://github.com/cli/cli/releases/download/v${VERSION}/gh_${VERSION}_linux_amd64.tar.gz" -o "gh_${VERSION}_linux_amd64.tar.gz"

tar xvf "gh_${VERSION}_linux_amd64.tar.gz"

if cp "gh_${VERSION}_linux_amd64/bin/gh" "${home}/deps/0/bin/"; then
  echo "Successfully copied to ${home}/deps/0/bin/"
else
  # Fallback to copying to the local user's .local/bin directory
  cp "gh_${VERSION}_linux_amd64/bin/gh" "/usr/local/bin/"
  echo "Fallback: copied to /usr/local/bin/"
fi

## Field configuration options.
gh_status_option="QA"
gh_domain_option="DevOps"
gh_sprint_option="0" ## Set to 0 for current sprint. Set to 1 for next sprint.
gh_effort_option="1"
gh_priority_option="Low"

echo "Getting project ID..."
gh_project_id=$(gh api graphql -f query="
  query{
    organization(login: \"GSA\"){
      projectV2(number: ${GH_PROJECT_NUMBER}) {
        id
      }
    }
  }" | jq -r '.data.organization.projectV2.id')

echo "Getting issue ID..."
gh_issue_id=$(gh api graphql -f query="
  query{
    node(id: \"${gh_project_id}\") {
      ... on ProjectV2 {
        items(last: 30) {
          nodes{
            id
            content {
              ...on Issue {
                title
                number
              }
            }
          }
        }
      }
    }
  }" jq -r ".data.node.items.nodes[] | select(.content.number == ${ISSUE_NUMBER}).id"
)

echo "Looking up field values..."
field_values=$(gh api graphql -f query="
  query{
  node(id: \"${gh_project_id}\") {
    ... on ProjectV2 {
      fields(first: 20) {
        nodes {
          ... on ProjectV2Field {
            id
            name
          }
          ... on ProjectV2IterationField {
            id
            name
            configuration {
              iterations {
                startDate
                id
              }
            }
          }
          ... on ProjectV2SingleSelectField {
            id
            name
            options {
              id
              name
            }
          }
        }
      }
    }
  }
}" | jq '.data.node.fields.nodes[]')

echo "Parsing field and option IDs..."
gh_status_id=$(echo "${field_values}" | jq -r 'select(.name == "Status").id')
gh_status_option_id=$(echo "${field_values}" | jq -r "select(.name == \"Status\") | .options[] | select(.name == \"${gh_status_option}\").id")

gh_domain_id=$(echo "${field_values}" | jq -r 'select(.name == "Domain").id')
gh_domain_option_id=$(echo "${field_values}" | jq -r "select(.name == \"Domain\") | .options[] | select(.name == \"${gh_domain_option}\").id")

gh_sprint_id=$(echo "${field_values}" | jq -r 'select(.name == "Sprint").id')
gh_sprint_option_id=$(echo "${field_values}" | jq -r "select(.name == \"Sprint\") | .configuration.iterations[${gh_sprint_option}].id")

gh_effort_id=$(echo "${field_values}" | jq -r 'select(.name == "Effort").id')
gh_effort_option_id=$(echo "${field_values}" | jq -r "select(.name == \"Effort\") | .options[] | select(.name == \"${gh_effort_option}\").id")

gh_priority_id=$(echo "${field_values}" | jq -r 'select(.name == "Priority").id')
gh_priority_option_id=$(echo "${field_values}" | jq -r "select(.name == \"Priority\") | .options[] | select(.name == \"${gh_priority_option}\").id")

echo "Updating issue project fields..."
{
  gh project item-edit \
    --project-id "${gh_project_id}" \
    --id "${gh_issue_id}" \
    --field-id "${gh_status_id}" \
    --single-select-option-id "${gh_status_option_id}"

  gh project item-edit \
    --project-id "${gh_project_id}" \
    --id "${gh_issue_id}" \
    --field-id "${gh_domain_id}" \
    --single-select-option-id "${gh_domain_option_id}"

  gh project item-edit \
    --project-id "${gh_project_id}" \
    --id "${gh_issue_id}" \
    --field-id "${gh_sprint_id}" \
    --iteration-id "${gh_sprint_option_id}"

  gh project item-edit \
    --project-id "${gh_project_id}" \
    --id "${gh_issue_id}" \
    --field-id "${gh_effort_id}" \
    --single-select-option-id "${gh_effort_option_id}"

  gh project item-edit \
    --project-id "${gh_project_id}" \
    --id "${gh_issue_id}" \
    --field-id "${gh_priority_id}" \
    --single-select-option-id "${gh_priority_option_id}"
} >/dev/null 2>&1 

echo "Update completed."
