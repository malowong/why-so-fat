set -e
set -o pipefail
set -x

git checkout main
git fetch
git commit
git push origin main

git checkout production
git merge main --no-edit
git push origin production
git checkout main

ssh 13.251.231.193 "cd ~/c17-bad-project-10-tw/web-server && git pull && forever restart index.js"
