#!/usr/bin/env python2

from __future__ import print_function
import json, re, sys

if __name__ == '__main__':

    text = sys.argv[1].lower()
    res = { "ok" : True }

    if text in ['bonjour', 'salut']:
        res["type"] = "greetings"

    elif re.match( r"^je m'appelle (.*)", text ):
        res["type"] = "introduction"
        res["info"] = {}

    else:
        res["ok"] = False

    print(json.dumps(res))
