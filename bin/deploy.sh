#!/bin/bash
set -e

yarn build
firebase deploy --only hosting
