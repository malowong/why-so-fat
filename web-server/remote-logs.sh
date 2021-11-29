set -e
set -o pipefail
set -x

ssh 13.251.231.193 "cd ~/c17-bad-project-10-tw/web-server && forever logs -f index.js"
