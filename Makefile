all: view
start: run

amend:
	git --no-pager status
	git --no-pager diff
	git commit -a --amend --no-edit

reword:
	git --no-pager status
	git --no-pager diff
	git commit -a --amend

commit:
	git --no-pager status
	git --no-pager diff
	git commit -a -m "Updated `git status | sed -n '/modified:/ {s/^[[:space:]]*modified:[[:space:]]*//;s/\.txt$$//;s/\/index$$//;p;q;}'`"

compress:
	git gc --prune=now

diff:
	git diff

log:
	git log -p

push:
	git --no-pager status
	git pull
	git push

push!:
	git --no-pager status
	git push --force

pull:
	git --no-pager status
	git pull

edit:
	emacs ./index.md &

gitk:
	gitk &

gui:
	git gui &

status:
	git status

compile:
	for f in *.md; do pandoc -s -S -f markdown-tex_math_dollars-raw_tex -t html --template=misc/template.html -o "$${f%.md}.html" "$$f"; done

html: compile
	open Home.html

clean:
	rm -f *.html

run:
	./start_httpserver.sh

view:
	open http://localhost:8000/
