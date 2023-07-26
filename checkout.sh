#!/bin/bash

# Check if a commit number is provided as an argument
if [ -z "$1" ]; then
  echo "Error: Commit number not provided."
  exit 1
fi

# Get the total number of commits in the branch
total_commits=$(git rev-list main --count)

# Store the commit number from the first argument in a variable
commit_number="$1"

# Check if the commit number is a valid positive integer within the range
if ! [[ "$commit_number" =~ ^[1-9][0-9]*$ ]] || [ "$commit_number" -gt "$total_commits" ]; then
  echo "Error: Invalid commit number. Please provide a positive integer within the range (1-$total_commits)."
  exit 1
fi

# Get the commit hash for the provided commit number
commit_hash=$(git rev-list --reverse main | sed -n "${commit_number}p")

# Perform the git checkout with the valid commit hash
git checkout $commit_hash