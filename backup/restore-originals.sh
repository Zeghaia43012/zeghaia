#!/bin/sh
# Instant rollback: restores the original candidate photos (run from the site root)
cp -p backup/candidate-images-original/*.jpg images/candidates/ && echo restored
