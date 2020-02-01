#!/bin/sh

while [ -n "$1" ]
do
	convert \
		-alpha set\
		-channel RGBA \
		-fill none \
		-floodfill +0+0 white \
		-morphology Erode Octagon \
		-trim \
		-resize 50% \
		"$1" "../sprites/$1"

	shift
done
